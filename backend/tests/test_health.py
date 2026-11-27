"""Tests for the WebWarden health endpoint and error handlers."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check_returns_healthy_status() -> None:
    """GET /api/v1/health should return expected status and app name."""
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy",
        "app": "WebWarden",
    }


def test_unknown_route_returns_standardized_error_payload() -> None:
    """Unknown routes should return the standardized JSON error shape."""
    response = client.get("/api/v1/does-not-exist")

    assert response.status_code == 404
    body = response.json()
    assert body["error"]["code"] == "http_error"
    assert "message" in body["error"]
