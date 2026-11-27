"""Health service returning application status."""

from app.core.config import settings
from app.schemas.health import HealthResponse


def get_health_status() -> HealthResponse:
    """Return the current application health status."""
    return HealthResponse(status="healthy", app=settings.APP_NAME)
