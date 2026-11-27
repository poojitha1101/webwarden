# WebWarden Architecture Overview

WebWarden uses a separated frontend/backend architecture:

- **`frontend/`**: Next.js (App Router, TypeScript, Tailwind CSS) responsible for the interactive learning interface, visualizations, and API integration.
- **`backend/`**: FastAPI (Python) REST API responsible for sandboxed simulation logic, scoring/progression rules, and PostgreSQL persistence via SQLAlchemy and Alembic.

## API Versioning

All backend API routes are mounted under `API_V1_PREFIX` (default `/api/v1`) through `backend/app/api/v1/router.py`. New feature routers (such as labs, progression, and leaderboard modules) will plug into `api_v1_router` cleanly without changing the entrypoint.

## Database & Migrations

SQLAlchemy ORM models live in `backend/app/models/` and inherit from `Base`. Alembic is configured in `backend/alembic/` to read `DATABASE_URL` from environment settings so schema migrations stay reproducible across local and production environments.
