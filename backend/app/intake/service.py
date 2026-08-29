from collections.abc import Iterable
from datetime import UTC, datetime
from pathlib import Path
from threading import RLock
from typing import Protocol
from uuid import uuid4

import duckdb
from openpyxl.utils.exceptions import InvalidFileException

from app.core.errors import AppError
from app.intake.contracts import DatasetDescriptor, Readiness, ReadinessStatus
from app.profiling.schema_profiler import ProfileLimits, SchemaProfile, SchemaProfiler

_SUPPORTED_SUFFIXES = frozenset({".csv", ".json", ".jsonl", ".ndjson", ".parquet", ".xlsx"})


class IntakeError(AppError):
    pass


class IntakeNotFoundError(IntakeError):
    def __init__(self) -> None:
        super().__init__("dataset_not_found", "Dataset was not found.", 404)


class IntakeRepository(Protocol):
    def add(self, descriptor: DatasetDescriptor) -> None: ...

    def get(self, dataset_id: str) -> DatasetDescriptor | None: ...

    def list(self, limit: int = 100, offset: int = 0) -> tuple[DatasetDescriptor, ...]: ...


class MemoryIntakeRepository:
    def __init__(self, max_descriptors: int = 1_000) -> None:
        if max_descriptors <= 0:
            raise ValueError("max_descriptors must be positive")
        self._max_descriptors = max_descriptors
        self._items: dict[str, DatasetDescriptor] = {}
        self._lock = RLock()

    def add(self, descriptor: DatasetDescriptor) -> None:
        with self._lock:
            self._items[descriptor.dataset_id] = descriptor
            while len(self._items) > self._max_descriptors:
                oldest_id = next(iter(self._items))
                del self._items[oldest_id]

    def get(self, dataset_id: str) -> DatasetDescriptor | None:
        with self._lock:
            return self._items.get(dataset_id)

    def list(self, limit: int = 100, offset: int = 0) -> tuple[DatasetDescriptor, ...]:
        with self._lock:
            ordered = tuple(self._items.values())
            return ordered[offset : offset + limit]


class IntakeService:
    def __init__(
        self,
        root: Path,
        repository: IntakeRepository,
        limits: ProfileLimits | None = None,
    ) -> None:
        self._root = root.resolve()
        self._root.mkdir(parents=True, exist_ok=True)
        self._repository = repository
        self._limits = limits or ProfileLimits()
        self._profiler = SchemaProfiler(self._root, self._limits)

    @staticmethod
    def _readiness(profile: SchemaProfile) -> Readiness:
        if any(finding.risk == "HIGH" for finding in profile.privacy_findings):
            return Readiness(
                status=ReadinessStatus.BLOCKED,
                score=0,
                blocking_reasons=("probable_pii_high_risk",),
                warnings=profile.warnings,
            )
        if profile.privacy_findings or profile.warnings:
            return Readiness(
                status=ReadinessStatus.REVIEW,
                score=70,
                warnings=("privacy_review_required",)
                if profile.privacy_findings
                else profile.warnings,
            )
        return Readiness(status=ReadinessStatus.READY, score=100)

    def ingest(self, filename: str | None, chunks: Iterable[bytes]) -> DatasetDescriptor:
        suffix = Path(filename or "").suffix.lower()
        if suffix not in _SUPPORTED_SUFFIXES:
            raise IntakeError("unsupported_format", "Uploaded file format is not supported.", 415)
        dataset_id = uuid4().hex
        physical_name = f"{uuid4().hex}{suffix}"
        target = self._root / physical_name
        total = 0
        try:
            with target.open("xb") as stream:
                for chunk in chunks:
                    total += len(chunk)
                    if total > self._limits.max_bytes:
                        raise IntakeError(
                            "upload_too_large",
                            "Upload exceeds configured byte limit.",
                            413,
                        )
                    stream.write(chunk)
            try:
                profile = self._profiler.profile(physical_name)
            except IntakeError:
                raise
            except (
                ValueError,
                OSError,
                UnicodeError,
                RuntimeError,
                duckdb.Error,
                InvalidFileException,
            ) as exc:
                raise IntakeError(
                    "invalid_dataset", "Uploaded dataset could not be profiled.", 422
                ) from exc
            readiness = self._readiness(profile)
            descriptor = DatasetDescriptor(
                dataset_id=dataset_id,
                created_at=datetime.now(UTC),
                status=readiness.status,
                profile=profile,
                readiness=readiness,
            )
            self._repository.add(descriptor)
            return descriptor
        finally:
            target.unlink(missing_ok=True)

    def list_datasets(self, limit: int = 100, offset: int = 0) -> tuple[DatasetDescriptor, ...]:
        return self._repository.list(limit, offset)

    def readiness(self, dataset_id: str) -> Readiness:
        descriptor = self._repository.get(dataset_id)
        if descriptor is None:
            raise IntakeNotFoundError()
        return descriptor.readiness
