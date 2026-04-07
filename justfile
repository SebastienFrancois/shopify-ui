set dotenv-load
set windows-shell := ["bash", "-cu"]

default:
    @just --list

# ─── Development ──────────────────────────────────────────

# Start Vite dev server
dev:
    npm run dev

# Start Storybook
storybook:
    npm run storybook

# ─── Build ────────────────────────────────────────────────

# Build the library (ES + UMD)
build:
    npm run build

# Build + copy to shopify/assets
build-shopify: build
    npm run build:shopify

# ─── Test ─────────────────────────────────────────────────

# Run tests once
test:
    npm run test

# Run tests in watch mode
test-watch:
    npm run test:watch

# Run tests with coverage
test-coverage:
    npm run test:coverage

# ─── Lint & Format ────────────────────────────────────────

# Lint source files
lint:
    npm run lint

# Format source files
format:
    npm run format

# Run all checks (lint + test + build)
check: lint test build

# ─── Docker ───────────────────────────────────────────────

# Start dev containers
docker-up:
    docker compose up -d

# Stop dev containers
docker-down:
    docker compose down

# Open a shell in the app container
docker-shell:
    docker compose exec app sh

# ─── Scaffolding ──────────────────────────────────────────

# Generate a new component: just generate my-component
generate name:
    npm run generate -- {{name}}

# ─── Release ──────────────────────────────────────────────

# Bump version and push tag
release version:
    npm version {{version}}
    git push --follow-tags
