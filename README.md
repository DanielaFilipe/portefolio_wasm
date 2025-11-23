- `cd backend && npm run dev`
- Porta: 5050
- Variáveis: `backend/.env` (não versionar)
- `npm start` (CRA) ou `npm run dev` (Vite)
- API base: http://localhost:5050/api (configurada em `src/api.js` ou `VITE_API_URL`)

# Portfolio API + PostgreSQL (Starter – macOS)

## PostgreSQL via Homebrew
brew install postgresql@16
brew services start postgresql@16

## Utilizador e BD
createuser -P portfolio_user
createdb -O portfolio_user portfolio

## Importar schema/seed
psql -U portfolio_user -d portfolio -f portfolio_schema_seed_pg.sql

## API
cp .env.example .env
npm install
npm run dev

