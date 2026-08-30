.PHONY: help docs-check safety-check status backend frontend gates

help:
	@printf '%s\n' \
	  'Vaga Certa' \
	  '  make backend       sobe a API em 127.0.0.1:8000' \
	  '  make frontend      sobe a interface em 5173' \
	  '  make gates         ruff, mypy, pytest, tsc, build e lint' \
	  '  make docs-check    valida links Markdown relativos e caminhos obrigatorios' \
	  '  make safety-check  procura arquivo de dado ou segredo fora de lugar' \
	  '  make status        mostra branch/status sem alterar o repositorio'

backend:
	cd backend && uv run uvicorn app.main:app --host 127.0.0.1 --port 8000

frontend:
	cd frontend && npm run dev

gates:
	cd backend && uv run ruff check app tests scripts && uv run mypy app scripts && uv run python -m pytest -q
	cd frontend && npx tsc -b && npm run build && npm run lint

docs-check:
	@python -c "import pathlib,re,sys; root=pathlib.Path('.').resolve(); files=[root/'README.md',*root.glob('docs/**/*.md'),root/'data/README.md']; required=['README.md','.gitignore','.env.example','Makefile','docs/ESTADO-DO-PROJETO.md','docs/architecture/overview.md','docs/architecture/module-contract.md','docs/architecture/agent-runtime.md','docs/architecture/data-provenance.md','docs/architecture/privacy-and-safety.md','docs/architecture/decisions/ADR-001-modular-monolith.md','data/README.md']; missing=[p for p in required if not (root/p).exists()]; broken=[]; rx=re.compile(r'\\[[^]]*\\]\\(([^)]+)\\)'); [(broken.append((str(f.relative_to(root)),u)) if not ((f.parent/u.split('#',1)[0]).resolve().exists()) else None for f in files for u in rx.findall(f.read_text(encoding='utf-8')) if u and not u.startswith(('#','http://','https://','mailto:'))]; print('missing:',missing); print('broken links:',broken); sys.exit(bool(missing or broken))"

# O extrato da SME tem dado de criança, mesmo anonimizado. Nenhum .csv, .xlsx,
# .parquet ou banco local pode entrar no repositório — este alvo é a rede de
# segurança antes do commit, não o substituto da revisão do staged.
safety-check:
	@python -c "import pathlib,re,sys; root=pathlib.Path('.'); skip=re.compile(r'(^|/)(\\.git|node_modules|\\.venv|dist|\\.mypy_cache|\\.ruff_cache|\\.pytest_cache)/'); bad=re.compile(r'(^|/)(data/(private|personal|raw)|uploads|dadoscreche)/|\\.(pem|key|duckdb|sqlite3?|db|parquet|csv|xlsx|gz)$$',re.I); hits=[p.as_posix() for p in root.rglob('*') if p.is_file() and not skip.search(p.as_posix()) and bad.search(p.as_posix())]; print('arquivos sensiveis fora de lugar:',hits); sys.exit(bool(hits))"

status:
	@git status --short --branch
