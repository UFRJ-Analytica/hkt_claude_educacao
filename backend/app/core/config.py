import ipaddress
import re
from pathlib import Path
from typing import Annotated, Any, Literal
from urllib.parse import urlsplit

from pydantic import BeforeValidator, Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


def _split_csv(value: Any) -> Any:
    if isinstance(value, str):
        return value.split(",")
    return value


CsvTuple = Annotated[tuple[str, ...], NoDecode, BeforeValidator(_split_csv)]
CsvFrozenSet = Annotated[frozenset[str], NoDecode, BeforeValidator(_split_csv)]

_DNS_LABEL = re.compile(r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?")


def _is_valid_hostname(hostname: str) -> bool:
    if hostname == "localhost":
        return True
    try:
        ipaddress.ip_address(hostname)
    except ValueError:
        if all(character.isdigit() or character == "." for character in hostname):
            return False
        return len(hostname) <= 253 and all(
            _DNS_LABEL.fullmatch(label) is not None for label in hostname.split(".")
        )
    return True


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="PULSO_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        frozen=True,
    )

    service_name: str = "pulso-da-rede-api"
    version: str = "0.1.0"
    environment: str = "local"
    mock_data_enabled: bool = False
    ai_provider: Literal["fake", "anthropic"] = "fake"
    anthropic_api_key: str | None = None
    intake_root: Path = Path(".intake")
    intake_catalog_path: Path = Path(".control/intake_catalog.sqlite3")
    intake_max_bytes: int = Field(default=10_000_000, gt=0)
    intake_max_descriptors: int = Field(default=1_000, gt=0)
    intake_max_joins_per_dataset: int = Field(default=100, gt=0)
    intake_max_audits_per_join: int = Field(default=1_000, gt=0)
    cors_origins: CsvTuple = Field(
        default_factory=lambda: ("http://localhost:3000", "http://localhost:5173")
    )
    disabled_modules: CsvFrozenSet = Field(
        default_factory=lambda: frozenset({"equity", "interventions"})
    )

    @field_validator("cors_origins")
    @classmethod
    def validate_cors_origins(cls, origins: tuple[str, ...]) -> tuple[str, ...]:
        validated: list[str] = []
        for origin in origins:
            parsed = urlsplit(origin)
            try:
                port_is_valid = parsed.port is None or 0 < parsed.port <= 65535
            except ValueError as exc:
                raise ValueError("CORS origins must contain a valid port") from exc
            if (
                not origin
                or any(
                    character.isspace() or ord(character) < 32 or ord(character) == 127
                    for character in origin
                )
                or "*" in origin
                or parsed.scheme not in {"http", "https"}
                or not parsed.hostname
                or not _is_valid_hostname(parsed.hostname)
                or parsed.username is not None
                or parsed.password is not None
                or parsed.path
                or parsed.query
                or parsed.fragment
                or not port_is_valid
            ):
                raise ValueError("CORS origins must be HTTP(S) origins without path or wildcard")
            validated.append(origin)
        return tuple(validated)

    @field_validator("disabled_modules")
    @classmethod
    def strip_and_reject_blank_disabled_modules(cls, module_ids: frozenset[str]) -> frozenset[str]:
        cleaned = frozenset(module_id.strip() for module_id in module_ids)
        if any(not module_id for module_id in cleaned):
            raise ValueError("disabled module ids cannot be blank")
        return cleaned
