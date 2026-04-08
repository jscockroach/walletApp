# Wallet App

## Project Description
Mobile-first wallet demo built with React + TypeScript.

The app includes:
- Transactions list screen
- Transaction detail screen
- JSON-based test data loading
- FontAwesome-based transaction icons

## Tech Stack
- React
- TypeScript
- Vite
- FontAwesome

## Project Structure
- `src/components` reusable UI blocks
- `src/screens` page-level screens
- `src/utils` formatting and business logic
- `src/types` shared TypeScript types
- `public/transactions.json` test data source

## Screenshots
- List screen: `screenshots/transactions-list.png`
- Detail screen: `screenshots/transaction-detail.png`

## Getting Started
```bash
npm install
npm run dev
```

## Quality Checks
```bash
npm run lint
npm run build
```

## Optional: Regenerate Screenshots
```bash
npm run dev -- --host 127.0.0.1 --port 4173
node scripts/capture-screenshots.mjs
```
