# Java Royale Nusantara — Monorepo

Company profile + export catalog website for **Java Royale Nusantara** (F&B export: Jamu/herbal drinks & vacuum-fried fruit/vegetable snacks).

## Structure

```
/
├── apps/
│   ├── web/        # Next.js 16 (App Router, TypeScript, Tailwind CSS)
│   └── api/        # Laravel 13 (PHP 8.4, REST API)
├── packages/
│   └── shared/     # Shared TypeScript types (API responses, category enums, etc.)
├── package.json    # Root — pnpm workspaces
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js >= 20
- pnpm >= 11
- PHP >= 8.2
- Composer >= 2

## Running Locally

Open **two separate terminals**:

### Terminal 1 — Next.js frontend

```bash
cd apps/web
pnpm dev
# Runs on http://localhost:3000
```

### Terminal 2 — Laravel API

```bash
cd apps/api
php artisan serve
# Runs on http://localhost:8000
```

## First-time Setup

### Frontend

```bash
# From repo root
pnpm install
```

### Backend

```bash
cd apps/api
cp .env.example .env
php artisan key:generate
php artisan migrate
```

## Environment Variables

### apps/web — `.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Laravel API (e.g. `http://localhost:8000`) |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this frontend |

### apps/api — `.env`

| Variable | Description |
|---|---|
| `APP_KEY` | Laravel application key (auto-generated) |
| `APP_URL` | URL of the API server |
| `DB_CONNECTION` | Database driver (`sqlite`, `mysql`, etc.) |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_DATABASE` | Database name |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |
| `FRONTEND_URL` | URL of the Next.js frontend (for CORS) |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16.2.9, React 19, Tailwind CSS 4, TypeScript |
| Backend | Laravel 13 (framework v13.16.1), PHP 8.4 |
| Package Manager | pnpm 11 (workspaces) |
