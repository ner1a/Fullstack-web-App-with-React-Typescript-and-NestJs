This is the frontend for the **Web Development Assignment (Frontend + Backend)**.  
It implements a simple UI with **Users** and **Posts** pages, supports **CRUD** actions, and shows the relation between posts and users via the `userId` field.

## Tech Stack
- React + TypeScript
- Vite
- React Router
- (Optional) Redux Toolkit for state and async thunks
- ESLint

## Prerequisites
- Node.js >= 18
- pnpm (recommended) or npm/yarn

## Getting Started
```bash
# from project root
cd frontend
pnpm install            # or npm install / yarn
pnpm dev                # runs Vite dev server (defaults to http://localhost:5173)
```
If you prefer npm:
```bash
npm run dev
```

## Available Scripts
```bash
pnpm dev         # Start Vite dev server
pnpm build       # Build for production
pnpm preview     # Preview production build
pnpm lint        # Run ESLint
```
(Use `npm run ...` or `yarn ...` equivalents if not using pnpm.)

## Pages & Features
- **Navigation**: Links to `/users` and `/posts`.
- **Users**: List users; create, edit, and delete users.
- **Posts**: List posts; create, edit, and delete posts. Shows the author based on `userId`. If the linked user is missing, the UI labels it as “Deleted user”.
- **Accessibility**: Main region is focusable; lists have proper roles.
- **Styling**: Tailwind or minimal utility classes (depending on your setup).