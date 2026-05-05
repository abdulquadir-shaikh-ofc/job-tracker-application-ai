# 🚀 Deployment Guide - Full Stack

## Overview

Deploy strategy:
- **Backend** → Render.com (or Railway/Fly.io)
- **Frontend** → GitHub Pages

---

## Step 1: Deploy Backend to Render

### A. Prepare Backend for Deployment

The backend folder is already set up and ready to deploy!

### B. Push to GitHub

**Option 1: Single Repository (Monorepo)**

```bash
# From root directory
git init
git add .
git commit -m "Initial commit: Full stack job tracker"
git remote add origin https://github.com/YOUR_USERNAME/job-tracker-fullstack.git
git push -u origin main
```

**Option 2: Separate Repositories**

```bash
# Backend only
cd backend
git init
git add .
git commit -m "Initial commit: Backend"
git remote add origin https://github.com/YOUR_USERNAME/job-tracker-backend.git
git push -u origin main
```

### C. Deploy on Render

1. **Go to** https://render.com

2. **Sign up / Log in**

3. **Click "New +"** → **"Web Service"**

4. **Connect Repository:**
   - If monorepo: Select `job-tracker-fullstack`
   - If separate: Select `job-tracker-backend`

5. **Configure Service:**
   - **Name:** `job-tracker-backend`
   - **Root Directory:** `backend` (if monorepo) or leave empty
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

6. **Advanced Settings** (optional):
   - Add environment variable: `NODE_ENV=production`

7. **Click "Create Web Service"**

8. **Wait 2-3 minutes** for first deployment

9. **Copy your URL:**
   ```
   https://job-tracker-backend-abcd.onrender.com
   ```

### Render Notes:
- Free tier spins down after inactivity
- First request after inactivity takes ~30 seconds
- Great for testing, upgrade for production

---

## Step 2: Configure Frontend for Production

### A. Update Environment Variable

```bash
cd frontend

# Create production .env
echo "REACT_APP_API_URL=https://job-tracker-backend-abcd.onrender.com" > .env
```

**Replace with YOUR Render URL!**

### B. Update Vite Config

Edit `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/job-tracker-fullstack/',  // Your repo name!
})
```

**Make sure `base` matches your repository name exactly!**

---

## Step 3: Deploy Frontend to GitHub Pages

### A. Setup GitHub Actions Workflow

Create `frontend/.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### B. Push to GitHub

```bash
# From root directory
git add .
git commit -m "Configure for production deployment"
git push
```

### C. Enable GitHub Pages

1. Go to your repository on GitHub
2. **Settings** → **Pages**
3. **Source:** Select "GitHub Actions"
4. Wait 2-3 minutes for deployment

### D. Access Your App

```
https://YOUR_USERNAME.github.io/job-tracker-fullstack/
```

---

## Alternative: Deploy Both on Vercel

If you want everything on one platform:

### A. Install Vercel CLI

```bash
npm install -g vercel
```

### B. Deploy Backend

```bash
cd backend
vercel
# Follow prompts
```

### C. Deploy Frontend

```bash
cd frontend
# Update .env with Vercel backend URL
vercel
# Follow prompts
```

---

## Alternative: Deploy Both on Railway

Railway makes it easy:

1. **Go to** https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Add service:** Backend
   - Root directory: `backend`
   - Build: Auto-detected
4. **Add service:** Frontend
   - Root directory: `frontend`
   - Build: Auto-detected
5. **Configure environment variables**
6. Deploy!

---

## Deployment Checklist

### Backend:
- [ ] Pushed to GitHub
- [ ] Deployed to Render/Railway/Vercel
- [ ] Got production URL
- [ ] Tested health endpoint (GET /)
- [ ] Logs show server running

### Frontend:
- [ ] Updated .env with backend URL
- [ ] Updated vite.config.js base path
- [ ] Created/updated GitHub workflow
- [ ] Pushed to GitHub
- [ ] GitHub Actions completed successfully
- [ ] Site loads (not blank)
- [ ] Backend connected indicator shows

### Integration:
- [ ] Settings page works
- [ ] Can save API key
- [ ] AI Job Finder loads
- [ ] Can upload resume
- [ ] Job search works end-to-end

---

## Troubleshooting

### Backend Issues

**Build fails:**
```bash
# Make sure package-lock.json exists
cd backend
npm install
git add package-lock.json
git commit -m "Add package-lock"
git push
```

**Server won't start:**
- Check Render/Railway logs
- Verify `npm start` works locally
- Check PORT environment variable

### Frontend Issues

**Blank page:**
- Verify `base` in vite.config.js
- Check GitHub Actions logs
- Hard refresh (Ctrl+Shift+R)

**Can't connect to backend:**
- Check REACT_APP_API_URL in .env
- Verify backend URL is correct
- Check browser console for CORS errors
- Make sure backend is actually running

**Settings not working:**
- Clear browser cache
- Check localStorage (F12 → Application → Local Storage)

---

## Production URLs

After deployment, you'll have:

**Backend:**
```
https://job-tracker-backend-abcd.onrender.com
```

**Frontend:**
```
https://YOUR_USERNAME.github.io/job-tracker-fullstack/
```

---

## Monitoring

### Backend (Render):
- Dashboard shows logs, metrics, deployments
- Can see request logs in real-time
- Free tier: 750 hours/month

### Frontend (GitHub Pages):
- Actions tab shows deployment history
- Pages settings shows deployment status
- Analytics available with GitHub Pro

---

## Cost

**Free Tier:**
- Render: 750 hours/month backend
- GitHub Pages: Unlimited static hosting
- API usage: ~$0.25-$0.35 per search

**Paid if needed:**
- Render: $7/month (always-on, no spin down)
- Anthropic API: Pay per token

---

## Need Help?

Check logs:
- **Render:** Dashboard → Logs tab
- **GitHub Actions:** Actions tab → Click workflow
- **Browser:** F12 → Console tab

Common issues are in Troubleshooting section above.

---

Good luck with deployment! 🚀
