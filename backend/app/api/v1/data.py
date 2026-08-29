from collections.abc import Iterator
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, File, Query, UploadFile, status

from app.core.errors import ERROR_RESPONSES
from app.intake.contracts import DatasetDescriptor, Readiness
from app.intake.service import IntakeService
from app.mapping.contracts import (
    ApprovalCommand,
    JoinAudit,
    JoinAuditCreate,
    JoinRegistration,
    JoinRegistrationCreate,
    MappingProposal,
)
from app.mapping.join_service import JoinService
from app.mapping.service import MappingService

_CHUNK_BYTES = 64 * 1024


def _chunks(file: UploadFile) -> Iterator[bytes]:
    while chunk := file.file.read(_CHUNK_BYTES):
        yield chunk


def build_data_router(
    service: IntakeService,
    mapping_service: MappingService | None = None,
    join_service: JoinService | None = None,
) -> APIRouter:
    router = APIRouter(prefix="/data", tags=["data-intake"])

    @router.post(
        "/profile",
        response_model=DatasetDescriptor,
        status_code=status.HTTP_201_CREATED,
        responses={
            **ERROR_RESPONSES,
            413: {"description": "Upload body exceeds the configured limit."},
            415: {"description": "Uploaded dataset format is unsupported."},
        },
    )
    def profile_dataset(file: Annotated[UploadFile, File()]) -> DatasetDescriptor:
        try:
            return service.ingest(file.filename, _chunks(file))
        finally:
            file.file.close()

    @router.get(
        "/datasets",
        response_model=list[DatasetDescriptor],
        responses=ERROR_RESPONSES,
    )
    def list_datasets(
        limit: int = Query(default=100, ge=1, le=200),
        offset: int = Query(default=0, ge=0, le=1_000_000),
    ) -> tuple[DatasetDescriptor, ...]:
        return service.list_datasets(limit, offset)

    @router.get(
        "/readiness/{dataset_id}",
        response_model=Readiness,
        responses=ERROR_RESPONSES,
    )
    def get_readiness(dataset_id: str) -> Readiness:
        return service.readiness(dataset_id)

    if mapping_service is not None:

        @router.get(
            "/mappings/{dataset_id}/proposal",
            response_model=MappingProposal,
            responses=ERROR_RESPONSES,
        )
        def mapping_proposal(dataset_id: str) -> MappingProposal:
            return mapping_service.propose(dataset_id)

    if join_service is not None:

        @router.post(
            "/joins",
            response_model=JoinRegistration,
            status_code=status.HTTP_201_CREATED,
            responses=ERROR_RESPONSES,
        )
        def register_join(command: JoinRegistrationCreate) -> JoinRegistration:
            return join_service.register(command)

        @router.post(
            "/joins/{join_id}/approve",
            response_model=JoinRegistration,
            responses={**ERROR_RESPONSES, 409: {"description": "Invalid state transition."}},
        )
        def approve_join(join_id: UUID, command: ApprovalCommand | None = None) -> JoinRegistration:
            return join_service.approve(join_id, command)

        @router.get(
            "/joins",
            response_model=list[JoinRegistration],
            responses=ERROR_RESPONSES,
        )
        def list_joins(
            dataset_id: str | None = Query(default=None, pattern=r"^[0-9a-f]{32}$"),
            limit: int = Query(default=100, ge=1, le=200),
            offset: int = Query(default=0, ge=0, le=1_000_000),
        ) -> tuple[JoinRegistration, ...]:
            return join_service.list(dataset_id, limit, offset)

        @router.post(
            "/joins/{join_id}/audits",
            response_model=JoinAudit,
            status_code=status.HTTP_201_CREATED,
            responses=ERROR_RESPONSES,
        )
        def register_audit(join_id: UUID, command: JoinAuditCreate) -> JoinAudit:
            return join_service.audit(join_id, command)

        @router.get(
            "/joins/{join_id}/audits",
            response_model=list[JoinAudit],
            responses=ERROR_RESPONSES,
        )
        def list_audits(
            join_id: UUID,
            limit: int = Query(default=100, ge=1, le=200),
            offset: int = Query(default=0, ge=0, le=1_000_000),
        ) -> tuple[JoinAudit, ...]:
            return join_service.audits(join_id, limit, offset)

    return router
