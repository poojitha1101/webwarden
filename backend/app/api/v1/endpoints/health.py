"""Health-check endpoint."""

from fastapi import APIRouter

from app.schemas.health import HealthResponse
from app.services.health import get_health_status

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse, summary="Health Check")
async def health_check() -> HealthResponse:
    """Return basic service health metadata."""
    return get_health_status()
