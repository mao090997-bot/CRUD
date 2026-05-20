# crud1 — AGENTS.md

## Stack
- **Backend:** JSON Server (v1.0.0-beta.15), Node.js. No custom server code.
- **Frontend:** HTML5 + CSS3 + vanilla JS (ES modules). No frameworks.

## Commands
```bash
# Start the API server
npx json-server --watch Server/db.json
# Server listens on http://localhost:3000 by default
```

No `npm start` or scripts defined in `package.json`.

## Architecture
- `CLIENT/` — static frontend (open `index.html` directly in browser, no dev server)
- `Server/db.json` — database with two collections: `users` (id, name, email) and `tasks` (id, title, description, status, userId)
- `Server/package.json` — single dependency: `json-server`

## Gotchas
- **API URL is hardcoded** in `CLIENT/script.js:1` to `http://192.168.2.12:3000`. Change to `http://localhost:3000` for local dev.
- **Only GET/read is implemented** in the frontend. Form submit handlers and Editar/Eliminar button events are **not wired up**.
- **No `.gitignore`** — `node_modules/` is tracked in git.
- **No tests, no linter, no typecheck** configured.
- Task `status` enum: `"pendiente"`, `"en progreso"`, `"completado"`.
- The `<script>` tag uses `type="module"` — `import`/`export` works, but no bundler.
- Forms have hidden inputs (`userId`, `taskId`) and hidden Cancel buttons for future edit mode — unused in current code.
