# WebWarden

WebWarden is an interactive cybersecurity education and simulation platform built with a separated **Next.js** frontend and **FastAPI** backend.

> **Current Status:** Initial project foundation setup (no UI modules, authentication, or simulation labs implemented yet).

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React, Recharts
- **Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic Settings
- **Database:** PostgreSQL, SQLAlchemy ORM, Alembic migrations
- **Quality & Testing:** ESLint, TypeScript (`tsc`), Ruff, Pytest

## Project Structure

```text
webwarden/
├── frontend/                 # Next.js App Router application
│   ├── src/
│   │   ├── app/              # App Router routes and layouts
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-specific modules (labs, dashboard, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Shared config and API client helpers
│   │   └── types/            # TypeScript interfaces and API types
│   ├── public/               # Static assets
│   ├── .env.example          # Frontend environment template
│   └── package.json
├── backend/                  # FastAPI REST API application
│   ├── alembic/              # Database migration scripts and environment
│   ├── app/
│   │   ├── api/              # Versioned API routers and HTTP endpoints
│   │   ├── core/             # Settings, database engine/session, exception handlers
│   │   ├── models/           # SQLAlchemy ORM models
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   ├── services/         # Business and simulation logic
│   │   └── main.py           # FastAPI app factory and middleware setup
│   ├── tests/                # Pytest test suite
│   ├── .env.example          # Backend environment template
│   ├── alembic.ini           # Alembic configuration
│   ├── pyproject.toml        # Ruff and Pytest configuration
│   └── requirements.txt      # Python dependencies
├── docs/                     # Architecture and design documentation
├── .gitignore
└── README.md
```

## Prerequisites

- **Node.js** 20+ (with `npm`)
- **Python** 3.12+
- **PostgreSQL** 15+ (required when running database migrations or future persistence features)

## Local Development Setup

The frontend and backend run as independent applications.

### 1. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Update `backend/.env` with your local PostgreSQL credentials if needed.

Start the backend development server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Verify the health endpoint:

```bash
curl http://localhost:8000/api/v1/health
```

Expected response:

```json
{
  "status": "healthy",
  "app": "WebWarden"
}
```

Interactive API docs are available at `http://localhost:8000/docs`.

### 2. Frontend Setup (Next.js)

In a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs at `http://localhost:3000`.

## Running Checks and Tests

### Backend

```bash
cd backend
source .venv/bin/activate
ruff check .
pytest
```

### Frontend

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
```

## Database Migrations (Alembic)

Once PostgreSQL is running and `DATABASE_URL` is set in `backend/.env`:

```bash
cd backend
source .venv/bin/activate
alembic upgrade head
```
