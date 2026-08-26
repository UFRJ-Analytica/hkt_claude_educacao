import pytest
from pydantic import ValidationError

from app.core.config import Settings


def test_settings_load_environment_and_csv_module_configuration(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("PULSO_ENVIRONMENT", "homologacao")
    monkeypatch.setenv("PULSO_DISABLED_MODULES", "network, schools")
    monkeypatch.setenv(
        "PULSO_CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173",
    )

    settings = Settings()

    assert settings.environment == "homologacao"
    assert settings.disabled_modules == frozenset({"network", "schools"})
    assert settings.cors_origins == ("http://localhost:3000", "http://localhost:5173")


@pytest.mark.parametrize(
    "origin",
    ["*", "ftp://example.com", "https://example.com/path", "https://example.com/", "example.com"],
)
def test_cors_rejects_wildcard_non_http_and_non_origin_urls(origin: str) -> None:
    with pytest.raises(ValidationError):
        Settings(cors_origins=[origin])


def test_cors_accepts_valid_origin_and_rejects_blank_entries() -> None:
    assert Settings(cors_origins=["https://example.com:8443"]).cors_origins == (
        "https://example.com:8443",
    )
    with pytest.raises(ValidationError):
        Settings(cors_origins=[" "])


@pytest.mark.parametrize(
    "origin",
    [
        " https://example.com",
        "https://example.com ",
        "https://exa mple.com",
        "https://example.com\n.evil.test",
        "https://example.com\x00.evil.test",
        "https://-example.com",
        "https://example-.com",
        "https://example..com",
        "https://exa_mple.com",
        "https://999.999.999.999",
    ],
)
def test_cors_rejects_whitespace_controls_and_malformed_hostnames(origin: str) -> None:
    with pytest.raises(ValidationError):
        Settings(cors_origins=[origin])


def test_settings_collections_and_fields_are_immutable() -> None:
    settings = Settings()

    assert isinstance(settings.cors_origins, tuple)
    assert isinstance(settings.disabled_modules, frozenset)
    field_name = "cors_origins"
    with pytest.raises(ValidationError):
        setattr(settings, field_name, ("https://evil.test",))
