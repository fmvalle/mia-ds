# MatDash Design System — local & Vercel
# Usage: make help

.DEFAULT_GOAL := help

SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

NPM ?= npm
NPX ?= npx
VERCEL ?= vercel

PORT_STORYBOOK ?= 6006
PORT_APP ?= 5173

STORYBOOK_OUT := storybook-static
DIST_OUT := dist

# Vercel: preview by default; production with `make deploy-prod`
VERCEL_SCOPE ?=
VERCEL_PROJECT ?= matdash-design-system

.PHONY: help \
	install reinstall \
	dev storybook app preview \
	build build-storybook build-app build-all \
	typecheck lint check \
	clean clean-deps clean-all \
	vercel-login vercel-link vercel-env \
	deploy deploy-preview deploy-prod \
	open open-storybook open-app \
	ci

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"; printf "\n\033[1mMatDash Design System\033[0m\n\nUsage: make \033[36m<target>\033[0m\n\n"} \
		/^[a-zA-Z0-9_.-]+:.*?##/ { printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2 } \
		/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)
	@echo ""

##@ Setup

install: ## Install npm dependencies
	$(NPM) install

reinstall: ## Clean node_modules and reinstall
	rm -rf node_modules package-lock.json
	$(NPM) install

##@ Local development

dev: storybook ## Alias: start Storybook (primary local workflow)

storybook: ## Start Storybook at http://localhost:6006
	@if lsof -tiTCP:$(PORT_STORYBOOK) -sTCP:LISTEN >/dev/null 2>&1; then \
		echo "Port $(PORT_STORYBOOK) in use — stopping previous process…"; \
		lsof -tiTCP:$(PORT_STORYBOOK) -sTCP:LISTEN | xargs kill 2>/dev/null || true; \
		sleep 1; \
	fi
	$(NPX) storybook dev -p $(PORT_STORYBOOK) --exact-port

app: ## Start Vite playground at http://localhost:5173
	$(NPM) run dev -- --port $(PORT_APP)

preview: build-storybook ## Serve built Storybook locally on :6006
	$(NPX) --yes serve $(STORYBOOK_OUT) -l $(PORT_STORYBOOK)

open: open-storybook ## Open Storybook in the browser

open-storybook: ## Open http://localhost:6006
	@open "http://localhost:$(PORT_STORYBOOK)" 2>/dev/null || xdg-open "http://localhost:$(PORT_STORYBOOK)" 2>/dev/null || true

open-app: ## Open http://localhost:5173
	@open "http://localhost:$(PORT_APP)" 2>/dev/null || xdg-open "http://localhost:$(PORT_APP)" 2>/dev/null || true

##@ Build & quality

typecheck: ## TypeScript check (no emit)
	$(NPX) tsc -p tsconfig.app.json --noEmit

lint: ## Run oxlint
	$(NPM) run lint

check: typecheck lint ## typecheck + lint

build-storybook: ## Build static Storybook → storybook-static/
	$(NPM) run build-storybook

build-app: ## Build Vite playground → dist/
	$(NPM) run build

build: build-storybook ## Default build (Storybook static — what Vercel publishes)

build-all: build-storybook build-app ## Build Storybook + Vite app

##@ Cleanup

clean: ## Remove build outputs
	rm -rf $(STORYBOOK_OUT) $(DIST_OUT) debug-storybook.log

clean-deps: ## Remove node_modules
	rm -rf node_modules

clean-all: clean clean-deps ## Remove builds + node_modules

##@ Vercel

vercel-login: ## Log in to Vercel CLI
	$(VERCEL) login

vercel-link: ## Link this folder to a Vercel project
	$(VERCEL) link $(if $(VERCEL_SCOPE),--scope $(VERCEL_SCOPE),)

vercel-env: ## Pull env vars into .env.local (optional)
	$(VERCEL) env pull .env.local $(if $(VERCEL_SCOPE),--scope $(VERCEL_SCOPE),)

deploy: deploy-preview ## Deploy preview to Vercel (default)

deploy-preview: ## Deploy preview URL (non-production)
	@command -v $(VERCEL) >/dev/null || { echo "Install Vercel CLI: npm i -g vercel"; exit 1; }
	$(VERCEL) deploy \
		--yes \
		$(if $(VERCEL_SCOPE),--scope $(VERCEL_SCOPE),)

deploy-prod: ## Deploy to production
	@command -v $(VERCEL) >/dev/null || { echo "Install Vercel CLI: npm i -g vercel"; exit 1; }
	$(VERCEL) deploy \
		--prod \
		--yes \
		$(if $(VERCEL_SCOPE),--scope $(VERCEL_SCOPE),)

##@ CI

ci: install check build ## Install, check, and build (CI pipeline)
