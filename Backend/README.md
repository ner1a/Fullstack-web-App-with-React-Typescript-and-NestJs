# Backend — NestJS + TypeScript

This is the backend for the **Web Development Assignment (Frontend + Backend)**.  
It provides CRUD APIs for **Users** and **Posts**. Initial data is hardcoded in the services (no database required).

## Tech Stack
- NestJS (TypeScript)
- Express (via Nest)
- ESLint

## Prerequisites
- Node.js >= 18
- pnpm (recommended) or npm/yarn

## Getting Started
```bash
# from project root
cd backend
pnpm install           # or npm install / yarn
pnpm start:dev         # runs backend on http://localhost:3000 by default
```
If you prefer npm:
```bash
npm run start:dev
```

## API Endpoints

### Users
- `GET    /users` — list users
- `GET    /users/:id` — get one
- `POST   /users` — create
- `PUT    /users/:id` — replace
- `DELETE /users/:id` — delete

### Posts
- `GET    /posts` — list posts
- `GET    /posts/:id` — get one
- `POST   /posts` — create
- `PUT    /posts/:id` — replace
- `DELETE /posts/:id` — delete

> **Relation:** `post.userId` must refer to an existing user. You may validate this on create/update.

## Data Source
Per the assignment, initial data is **hardcoded** in the service files (arrays in memory).  
No database is required.

## Scripts
```bash
pnpm start        # production mode (node dist/main.js)
pnpm start:dev    # development with watch (ts-node-dev / nest start --watch)
pnpm build        # compile to dist/
pnpm lint         # ESLint
```

## ESLint
Ensure the backend has **no lint errors** before submission:
```bash
pnpm lint
```
