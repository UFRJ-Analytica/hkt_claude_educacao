.PHONY: help docs-check safety-check status

help:
	@printf '%s\n' \
	  'Pulso da Rede — Etapa 0' \
	  '  make docs-check    valida links Markdown relativos e caminhos obrigatorios' \
	  '  make safety-check  procura nomes de arquivos potencialmente sensiveis' \
	  '  make status        mostra branch/status sem alterar o repositorio' \
	  '' \
	  'Backend e frontend ainda nao existem; comandos de execucao sao futuros.'

docs-check:
	@python -c "import pathlib,re,sys; root=pathlib.Path('.').resolve(); files=[root/'README.md',*root.glob('docs/**/*.md'),root/'data/README.md']; required=['README.md','.gitignore','.env.example','Makefile','docs/product/vision.md','docs/product/premissas.md','docs/product/capabilities.md','docs/product/personas-e-jornadas.md','docs/product/regras-de-negocio.md','docs/product/roteiro-demo.md','docs/architecture/overview.md','docs/architecture/module-contract.md','docs/architecture/agent-runtime.md','docs/architecture/data-provenance.md','docs/architecture/privacy-and-safety.md','docs/architecture/decisions/ADR-001-modular-monolith.md','docs/api/frontend-handoff.md','data/README.md']; missing=[p for p in required if not (root/p).exists()]; broken=[]; rx=re.compile(r'\\[[^]]*\\]\\(([^)]+)\\)'); [(broken.append((str(f.relative_to(root)),u)) if not ((f.parent/u.split('#',1)[0]).resolve().exists()) else None for f in files for u in rx.findall(f.read_text(encoding='utf-8')) if u and not u.startswith(('#','http://','https://','mailto:'))]; print('missing:',missing); print('broken links:',broken); sys.exit(bool(missing or broken))"

safety-check:
	@python -c "import pathlib,re,sys; root=pathlib.Path('.'); bad=re.compile(r'(^|/)(data/(private|personal|raw)|uploads|model[-_]payloads)/|\\.(pem|key|duckdb|sqlite3?|db|parquet|csv|xlsx)$$',re.I); hits=[p.as_posix() for p in root.rglob('*') if p.is_file() and bad.search(p.as_posix())]; print('potentially sensitive files:',hits); sys.exit(bool(hits))"

status:
	@git status --short --branch
