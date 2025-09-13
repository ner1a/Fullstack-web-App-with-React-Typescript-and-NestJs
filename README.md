# Fullstack Web App — React Frontend + NestJS Backend

This repository contains a **React + TypeScript (Vite)** based frontend and a **NestJS + TypeScript** based backend.  
Both projects live in their own directories, run independently, and have their own detailed README files.

---

# Check the development from Vercel

https://frontend-git-onlyfrontend-ner1as-projects.vercel.app/

---

## 📂 Project Structure

```
project-root/
├── frontend/      # React + Vite + TS (UI)
├── backend/       # NestJS + TS (API)
├── package.json   # (root meta)
└── README.md      # (this file)
```

- **frontend/** contains the user interface of the application.  
- **backend/** contains the REST API services.  
- They run independently on different ports.

---

## 🚀 Getting Started

### Requirements
- Node.js **>=18**
- npm or pnpm

### Running

#### Backend
```bash
cd backend
pnpm install
pnpm start:dev    # http://localhost:3000
```

#### Frontend
```bash
cd frontend
pnpm install
pnpm run dev      # http://localhost:5173
```

> For more detailed setup and usage instructions, please refer to the README.md inside **frontend/** and **backend/** directories.

---

## 🔍 Quick Check (Smoke Test)

With backend running:
```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

With frontend running:
- `http://localhost:5173/` → users list
- `http://localhost:5173/posts` → posts list

---

- **Frontend deploy**: Can be deployed on Netlify / Vercel using the `dist/` output.  
- **Backend deploy**: Can be hosted on Node.js capable platforms such as Heroku, Render, Railway, etc.

---

## 📝 Notes

- Frontend and backend each have their own README files with detailed setup and usage instructions.  
- The root README only provides **overall project structure and navigation**.
