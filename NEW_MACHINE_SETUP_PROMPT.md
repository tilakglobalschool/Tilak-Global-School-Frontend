# Kiro AI — New Machine Setup Prompt
# Tilak Global School Project

Copy this entire prompt and give it to Kiro AI on the new machine.

---

## PROMPT START

You are setting up the Tilak Global School project on a new machine.
This is a monorepo with 3 parts: frontend (Next.js), admin (Next.js), backend (Express + MongoDB Atlas).

**Repo URL:** https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Frontend.git
**Backend Repo:** https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Backend.git

---

## STEP 1: PREREQUISITES CHECK

Check if these are installed. If not, tell the user to install them:

```
node --version    → must be v20 or higher
npm --version     → must be v9 or higher
git --version     → any recent version
```

Node.js download: https://nodejs.org (LTS version)

---

## STEP 2: CLONE BOTH REPOS

```bash
# Choose a folder, e.g. F:\School_Project\
cd F:\School_Project

# Clone frontend (contains frontend/ + admin/ folders)
git clone https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Frontend.git

# Rename folder to project root
# (optional — or just cd into it)
cd Tilak-Global-School-Frontend

# Now clone backend INSIDE this folder
git clone https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Backend.git backend
```

After this, the structure should be:
```
Tilak-Global-School-Frontend/
├── frontend/
├── admin/
├── nginx/
├── backend/          ← cloned separately
├── package.json
└── .gitignore
```

---

## STEP 3: BACKEND SETUP

```bash
cd backend
npm install
```

Create `backend/.env` file with this EXACT content:

```env
PORT=5000
MONGO_URI=mongodb://itsolutioncodecarft_db_user:ItSolutions123@ac-jluq0yl-shard-00-00.sntqtkp.mongodb.net:27017,ac-jluq0yl-shard-00-01.sntqtkp.mongodb.net:27017,ac-jluq0yl-shard-00-02.sntqtkp.mongodb.net:27017/tilak_school?ssl=true&replicaSet=atlas-wcatcv-shard-0&authSource=admin
NODE_ENV=development
JWT_SECRET=tilak_school_dev_secret_change_before_production
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
CLIENT_URL=http://localhost:3000,http://localhost:3001
COOKIE_DOMAIN=
RENDER_URL=https://api.tilakglobalschool.com
ADMIN_EMAIL=admin@tilakglobalschool.com
ADMIN_PASSWORD=ChangeMe123!
ADMIN_NAME=Super Admin
```

IMPORTANT: This uses MongoDB Atlas (cloud DB) — no local MongoDB needed.

Run seed (creates admin user in Atlas):
```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB Atlas!
🌐 Host: ac-jluq0yl-shard-00-00.sntqtkp.mongodb.net
🗄️ Database: tilak_school
✅ Admin user created: admin@tilakglobalschool.com
🔍 VERIFICATION: Found 1 admin document(s) in Atlas.
🔑 Password hash verify: ✅ PASS
🎉 Seed complete
```

If seed already ran (user exists), run it again — it will delete old user and recreate cleanly.

Start backend:
```bash
npm run dev
```

Verify it works:
```
GET http://localhost:5000/api/health
→ { "success": true, "db": "connected" }
```

---

## STEP 4: FRONTEND SETUP

```bash
cd ../frontend
npm install
```

Create `frontend/.env.local` file:
```env
API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Runs on: http://localhost:3000

---

## STEP 5: ADMIN PANEL SETUP

```bash
cd ../admin
npm install
```

Create `admin/.env.local` file:
```env
API_URL=http://localhost:5000/api
```

**IMPORTANT — workspace root warning fix:**
The warning "Next.js inferred your workspace root" appears because there are multiple `package-lock.json` files. Fix it by adding `outputFileTracingRoot` to `admin/next.config.mjs`:

Read current `admin/next.config.mjs` and add this line inside `nextConfig`:
```js
output: 'standalone',
outputFileTracingRoot: require('path').join(__dirname, '../'),
```

Actually, simpler fix — just add to `admin/next.config.mjs`:
```js
experimental: {
  outputFileTracingRoot: path.join(path.dirname(new URL(import.meta.url).pathname), '..'),
},
```

OR — the easiest fix — just ignore the warning. It is a WARNING, not an error. The app still works perfectly. Just proceed.

Start admin:
```bash
npm run dev
```

Runs on: http://localhost:3001

---

## STEP 6: RUN ALL 3 TOGETHER (from project root)

From the `Tilak-Global-School-Frontend/` folder:

```bash
npm install   # installs concurrently
npm run dev:all
```

This starts all 3: frontend (3000) + admin (3001) + backend (5000) simultaneously.

---

## STEP 7: VERIFY EVERYTHING WORKS

### 1. Backend health check
Open: http://localhost:5000/api/health
Expected: `{ "success": true, "message": "Tilak Global School API is running", "db": "connected" }`

### 2. Public site
Open: http://localhost:3000
Expected: Tilak Global School homepage loads

### 3. Admin login
Open: http://localhost:3001/login
Enter:
  Email:    admin@tilakglobalschool.com
  Password: ChangeMe123!
Expected: Redirects to dashboard with charts and stats

---

## COMMON ERRORS & FIXES

### Error: ECONNREFUSED localhost:5000
**Cause:** Backend is not running.
**Fix:** Open a terminal, `cd backend`, run `npm run dev`. Keep this terminal open.

### Error: ✅ Admin user already exists (but login still fails)
**Cause:** Old user in Atlas has double-hashed password from previous code version.
**Fix:** Run seed again — it will delete old user and create fresh:
```bash
cd backend
npm run seed
```

### Error: Cannot find module / import errors in backend
**Cause:** `npm install` not run in backend folder.
**Fix:**
```bash
cd backend
npm install
```

### Error: next: command not found
**Cause:** `npm install` not run in frontend or admin folder.
**Fix:**
```bash
cd frontend && npm install
cd ../admin && npm install
```

### Warning: "Next.js inferred your workspace root"
**Cause:** Multiple package-lock.json files in the monorepo.
**This is just a WARNING — app still works. You can ignore it.**
To silence it permanently, add this to `admin/next.config.mjs` inside the `nextConfig` object:
```js
outputFileTracingRoot: path.join(new URL('.', import.meta.url).pathname, '..'),
```
And add `import path from 'path';` at the top.

### Error: MONGO_URI contains 127.0.0.1 (env validation error)
**Cause:** `.env` still has localhost MongoDB URI.
**Fix:** Re-create `backend/.env` with the Atlas URI from Step 3 above.

### Error: Cannot connect to MongoDB Atlas (timeout)
**Cause:** Network/firewall blocking port 27017, or Atlas IP whitelist not configured.
**Fix:** 
1. Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0) for dev
2. Or add your specific IP

---

## FILE CHECKLIST (must exist before starting)

```
backend/.env                    ← Atlas URI + all vars (see Step 3)
frontend/.env.local             ← API_URL=http://localhost:5000/api
admin/.env.local                ← API_URL=http://localhost:5000/api
```

These files are git-ignored (not in the repo). You must create them manually every time on a new machine.

---

## QUICK START (TL;DR for experienced devs)

```bash
# 1. Clone both repos
git clone https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Frontend.git
cd Tilak-Global-School-Frontend
git clone https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Backend.git backend

# 2. Create .env files (copy from .env.example and fill MONGO_URI)
cp backend/.env.example backend/.env
# Edit backend/.env — set the Atlas MONGO_URI
cp frontend/.env.example frontend/.env.local
cp admin/.env.example admin/.env.local

# 3. Install all dependencies
npm install && cd frontend && npm install && cd ../admin && npm install && cd ../backend && npm install

# 4. Seed the database
cd backend && npm run seed && cd ..

# 5. Start everything
npm run dev:all
```

---

## PORTS REFERENCE

| Service | Port | URL |
|---------|------|-----|
| Public Site | 3000 | http://localhost:3000 |
| Admin Panel | 3001 | http://localhost:3001/login |
| Backend API | 5000 | http://localhost:5000/api/health |
| MongoDB Atlas | cloud | No local port needed |

---

## ADMIN LOGIN

| Field | Value |
|-------|-------|
| URL | http://localhost:3001/login |
| Email | admin@tilakglobalschool.com |
| Password | ChangeMe123! |

## PROMPT END
