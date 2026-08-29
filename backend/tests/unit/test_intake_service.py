from pathlib import Path

import pytest

from app.intake.contracts import ReadinessStatus
from app.intake.service import (
    IntakeError,
    IntakeNotFoundError,
    IntakeService,
    MemoryIntakeRepository,
)
from app.profiling.schema_profiler import ProfileLimits


def test_service_uses_opaque_name_cleans_raw_payload_and_is_deterministic(tmp_path: Path) -> None:
    repository = MemoryIntakeRepository()
    service = IntakeService(tmp_path, repository, ProfileLimits(max_bytes=1_000))
    raw = b"school_id,score\n1,8\n2,9\n"

    descriptor = service.ingest("../../sensitive-name.csv", iter((raw,)))

    assert descriptor.original_filename is None
    assert descriptor.status == ReadinessStatus.READY
    assert descriptor.profile.candidate_keys == ("school_id", "score")
    assert not any(tmp_path.iterdir())
    assert repository.get(descriptor.dataset_id) == descriptor
    assert service.readiness(descriptor.dataset_id) == service.readiness(descriptor.dataset_id)
    assert service.list_datasets() == (descriptor,)


def test_high_privacy_risk_blocks_readiness_without_echoing_value(tmp_path: Path) -> None:
    secret = "maria@example.com"
    service = IntakeService(tmp_path, MemoryIntakeRepository())

    descriptor = service.ingest("people.csv", iter((f"id,email\n1,{secret}\n".encode(),)))

    assert descriptor.status == ReadinessStatus.BLOCKED
    assert descriptor.readiness.blocking_reasons == ("probable_pii_high_risk",)
    assert secret not in descriptor.model_dump_json()


def test_limit_failure_cleans_payload_and_has_typed_sanitized_error(tmp_path: Path) -> None:
    service = IntakeService(tmp_path, MemoryIntakeRepository(), ProfileLimits(max_bytes=4))

    with pytest.raises(IntakeError) as error:
        service.ingest("secret.csv", iter((b"123", b"456")))

    assert error.value.code == "upload_too_large"
    assert "secret" not in error.value.message
    assert not any(tmp_path.iterdir())


def test_unknown_dataset_is_typed() -> None:
    service = IntakeService(Path.cwd(), MemoryIntakeRepository())

    with pytest.raises(IntakeNotFoundError) as error:
        service.readiness("missing")
    assert error.value.code == "dataset_not_found"
