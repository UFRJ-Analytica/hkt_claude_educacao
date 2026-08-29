from pathlib import Path

from app.data_access.school_identity_adapter import CuratedSchoolIdentityAdapter
from app.schools.identity_contracts import IdentityMatchField, OfficialSchoolListQuery
from scripts.import_official_school_identity import normalize_features, publish_release


def test_import_official_sme_layer_publishes_governed_identity_release(tmp_path: Path) -> None:
    features = [
        {
            "attributes": {
                "objectid": 1,
                "cre": 3.0,
                "designacao": 123,
                "denominacao": "E.M. Darcy Ribeiro",
                "latitude": -22.91,
                "longitude": -43.21,
                "tipo": "Escola Municipal",
            }
        },
        {
            "attributes": {
                "objectid": 2,
                "cre": 9.0,
                "designacao": 456,
                "denominacao": "EDI Paulo Freire",
                "latitude": -22.82,
                "longitude": -43.55,
                "tipo": "EDI",
            }
        },
        {
            "attributes": {
                "objectid": 3,
                "cre": 12.0,
                "designacao": 1202701,
                "denominacao": "FORA DO RECORTE CRE",
                "latitude": -22.9,
                "longitude": -43.2,
                "tipo": "Centro",
            }
        },
        {
            "attributes": {
                "objectid": 4,
                "cre": 11.0,
                "designacao": 11200301,
                "denominacao": "DESIGNACAO FORA DO PADRAO",
                "latitude": -22.8,
                "longitude": -43.2,
                "tipo": "Clube Escolar",
            }
        },
    ]

    rows = normalize_features(features)
    manifest = publish_release(rows, tmp_path / "identity")
    adapter = CuratedSchoolIdentityAdapter(tmp_path / "identity", allow_external_root=True)
    list_result, total, with_coordinates, available_cres = adapter.list_official_schools(
        OfficialSchoolListQuery(cre=3)
    )
    record = adapter.lookup(IdentityMatchField.SME_DESIGNATION, "0000123")

    assert manifest["source_kind"] == "REAL_PUBLIC"
    assert manifest["files"]["school_identity.parquet"]["row_count"] == 2
    assert adapter.validate() is True
    assert available_cres == (3, 9)
    assert total == 1
    assert with_coordinates == 1
    assert len(list_result) == 1
    assert list_result[0].identity.school_id == "SME-RIO-0000123"
    assert list_result[0].identity.inep_id is None
    assert list_result[0].identity.sme_designation == "0000123"
    assert list_result[0].identity.cre == 3
    assert list_result[0].coordinates is not None
    assert record is not None
    assert record.identity.nome == "E.M. Darcy Ribeiro"
