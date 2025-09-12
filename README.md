# Fullstack Web App — React Frontend + NestJS Backend

Bu repo, **React + TypeScript (Vite)** tabanlı bir frontend ve **NestJS + TypeScript** tabanlı bir backend içerir.  
Her iki proje de kendi klasöründe bağımsız olarak çalışır ve ayrı README dosyalarına sahiptir.

---

## 📂 Proje Yapısı

```
project-root/
├── frontend/      # React + Vite + TS (UI)
├── backend/       # NestJS + TS (API)
├── package.json   # (root meta)
└── README.md      # (bu dosya)
```

- **frontend/** klasöründe uygulamanın kullanıcı arayüzü vardır.  
- **backend/** klasöründe REST API servisleri vardır.  
- Frontend ve backend birbirinden bağımsızdır; farklı portlarda çalışır.

---

## 🚀 Başlangıç

### Gereksinimler
- Node.js **>=18**
- npm veya pnpm

### Çalıştırma

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
pnpm dev          # http://localhost:5173
```

> Daha ayrıntılı kurulum ve kullanım yönergeleri için **frontend/** ve **backend/** dizinlerindeki README.md dosyalarına bakın.

---

## 🔍 Hızlı Kontrol (Smoke Test)

Backend çalışırken:
```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

Frontend çalışırken:
- `http://localhost:5173/users` → kullanıcı listesi
- `http://localhost:5173/posts` → gönderi listesi

---

## ⚙️ Build & Deploy

### Backend
```bash
cd backend
pnpm build   # dist/ klasörü oluşur
```

### Frontend
```bash
cd frontend
pnpm build   # dist/ klasörü oluşur
```

- **Frontend deploy**: Netlify / Vercel gibi platformlarda `dist/` yayınlanabilir.  
- **Backend deploy**: Node.js destekli platformlarda (Heroku, Render, Railway vb.) çalıştırılabilir.

---

## 📝 Notlar

- Frontend ve backend kendi README dosyalarında ayrıntılı açıklamalara sahiptir.  
- Root README yalnızca **projenin genel yapısı ve yönlendirmeleri** içerir.