# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `29517d2` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
simple chat bot-1 is a Quorq-generated project with two independent apps in one repo: a Vite + React 19 single-page frontend containing the approved, reviewed screens (currently rendering seeded sample data, not wired to the API), and a FastAPI 0.115 backend scaffold that only implements a /health endpoint because no backend architecture had been approved yet. The backend uses SQLAlchemy with a SQLite file by default (swappable via DATABASE_URL) and a docker-compose file provisions Postgres 16 and Redis for the eventually-approved architecture.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / React 19 / npm scripts)
- Python 3.12
- pip
- Docker and docker-compose (optional, for Postgres/Redis services)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in any values it references
3. Backend: cd backend && pip install -r requirements.txt
4. Backend: uvicorn app.main:app --reload  (starts the API on http://localhost:8000, creates SQLite tables on startup)
5. Frontend: cd frontend && npm install
6. Frontend: npm run dev  (starts the Vite dev server, default http://localhost:5173)
7. Optional: from the repo root, docker-compose up to start Postgres and Redis if targeting the full approved architecture
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `uvicorn app.main:app --reload` | Run the FastAPI app locally with autoreload from the backend/ directory |
| frontend dev | `npm run dev` | Start the Vite dev server for the React SPA |
| frontend build | `npm run build` | Bundle the app with Vite (does not typecheck) |
| frontend preview | `npm run preview` | Serve the built frontend bundle locally |
| docker services | `docker-compose up` | Start Postgres 16 and Redis 7 containers defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | FastAPI service: app package (main entrypoint, database, models, schemas, routers, services), tests, Dockerfile, requirements.txt |
| `backend/app` | Application code: main.py (FastAPI app + CORS + health route), database.py (engine/session), models.py (SQLAlchemy models, currently empty), schemas.py (Pydantic schemas incl. StubResponse), services.py, routers/ (one router per architecture component) |
| `backend/tests` | Pytest tests, e.g. test_health.py |
| `frontend/` | Vite + React 19 SPA: approved screens, src, e2e tests, config files |
| `frontend/src` | Application source: lib/ (api client, icons, navigate, ui helpers), main.tsx entrypoint, index.css, test-setup.ts |
| `frontend/e2e` | Playwright end-to-end specs |
| `.quorq/` | Platform handoff metadata (handoff.json) for the Quorq AI SDLC platform |
| `docker-compose.yml` | Defines Postgres 16 and Redis 7 services for local infrastructure |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are organized one router per architecture component under backend/app/routers/, imported into main.py
- Unimplemented backend endpoints return a typed StubResponse (schemas.py) rather than raising, keeping the OpenAPI spec complete before handlers are written
- SQLAlchemy models inherit from the shared Base declared in app/database.py; main.py imports models before calling Base.metadata.create_all
- Backend DB connection is configured via the DATABASE_URL env var, defaulting to a local SQLite file so the service runs without external infra
- CORS allowed origins are configured via the ALLOWED_ORIGINS env var (comma-separated), falling back to localhost:5173/127.0.0.1:5173 for dev
- Frontend uses the '@/*' path alias mapped to src/ (configured in tsconfig.json and vite.config.ts)
- Frontend API access is centralized in src/lib/api.ts (apiFetch helper), reading VITE_API_BASE_URL and VITE_API_SECRET_KEY env vars; screens currently use seeded sample data instead of this client
- Styling via Tailwind CSS through the @tailwindcss/vite plugin, plus index.css for brand tokens
- Frontend linting via ESLint flat config (eslint.config.js) and formatting via Prettier (.prettierrc)
- Component tests live beside the components they test and are run with Vitest in jsdom; Playwright e2e specs live separately under frontend/e2e
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend test | `pytest` | Run backend unit tests (pytest.ini sets pythonpath so `app` imports correctly) |
| backend lint | `ruff check .` | Lint backend Python code |
| backend format | `ruff format .` | Format backend Python code |
| frontend test | `npm test` | Run Vitest component tests (jsdom environment) |
| frontend lint | `npm run lint` | Run ESLint over the frontend app |
| frontend typecheck | `npm run typecheck` | Run tsc --noEmit (not run by npm run build) |
| frontend e2e install | `npm run test:e2e:install` | Install the Chromium browser needed by Playwright |
| frontend e2e | `npm run test:e2e` | Run Playwright acceptance tests from e2e/; without E2E_BASE_URL it builds and serves the frontend plus starts the backend locally |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend calls to the backend are blocked by the browser (CORS error) | Set ALLOWED_ORIGINS on the backend to include the frontend's origin, or rely on the default dev origins (localhost:5173 / 127.0.0.1:5173) |
| `npm run build` succeeds but the app has type errors | Vite build does not typecheck; run `npm run typecheck` separately to catch tsc errors |
| `pytest` fails with `ModuleNotFoundError: app` | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` setting applies |
| Backend data isn't persisting where expected / using the wrong database | Set the DATABASE_URL env var to point at Postgres (or another DB); default is a local SQLite file (app.db) |
| `npm run test:e2e` fails to launch a browser | Run `npm run test:e2e:install` first to fetch Chromium |
<!-- sdlc:auto:end troubleshooting -->
