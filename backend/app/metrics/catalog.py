from app.contracts.data import IndicatorDefinition

METRICS = {
    "attendance_rate": IndicatorDefinition(
        id="attendance_rate",
        label="Taxa de frequência",
        formula="present_count / expected_count",
        unit="ratio",
        grain="school-month",
        coverage_rule="expected_count observed / expected_count expected",
        formula_version="1.0.0",
    ),
    "assessment_score": IndicatorDefinition(
        id="assessment_score",
        label="Pontuação de avaliação",
        formula="weighted mean score",
        unit="points",
        grain="school-period-subject",
        coverage_rule="participants / eligible",
        formula_version="1.0.0",
    ),
    "assessment_participation": IndicatorDefinition(
        id="assessment_participation",
        label="Participação na avaliação",
        formula="participants / eligible",
        unit="ratio",
        grain="school-period-subject",
        coverage_rule="eligible records observed / expected",
        formula_version="1.0.0",
    ),
    "capacity_utilization": IndicatorDefinition(
        id="capacity_utilization",
        label="Utilização da capacidade",
        formula="enrolled / capacity",
        unit="ratio",
        grain="school-period",
        coverage_rule="schools with capacity / expected schools",
        formula_version="1.0.0",
    ),
    "teacher_shortage_hours": IndicatorDefinition(
        id="teacher_shortage_hours",
        label="Horas de carência docente",
        formula="sum shortage_hours",
        unit="hours",
        grain="school-period-subject",
        coverage_rule="required hours observed / expected",
        formula_version="1.0.0",
    ),
}

RATIO_INDICATORS = frozenset(
    {"attendance_rate", "assessment_participation", "capacity_utilization"}
)
UNIT_INTERVAL_INDICATORS = frozenset({"attendance_rate", "assessment_participation"})
