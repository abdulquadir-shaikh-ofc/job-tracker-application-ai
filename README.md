# 🎯 AI-Powered Job Application Tracker - Full Stack

A complete job application tracking system with AI-powered job search, resume analysis, and intelligent matching.

## 🏗️ Project Structure

```
job-tracker-fullstack/
├── frontend/              # React application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AIJobFetcher.jsx
│   │   ├── Settings.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Express API server
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── package.json          # Root scripts
└── README.md            # This file
```

---

## ⚡ Quick Start

### Option 1: Run Everything with One Command

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend together
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

---

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn
- Anthropic API key (get from https://console.anthropic.com)

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
# Install root dependencies (includes concurrently for running both servers)
npm install

# Install frontend and backend dependencies
npm run install:all
```

### 2. Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit if needed (default PORT=3001)
```

**Frontend (.env):**
```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:3001" > .env
```

### 3. Get API Key

1. Go to https://console.anthropic.com/
2. Sign up / Log in
3. Create new API key
4. Save it - you'll enter it in the app's Settings

### 4. Run the Application

```bash
# From root directory
npm run dev
```

Open http://localhost:5173

---

## ✨ Features

### Core Features
- 📋 Manual job entry and tracking
- 📊 Kanban board view
- 📝 List view with detailed information
- 📈 Analytics dashboard with charts
- 💾 Export/Import as JSON
- ⚙️ Settings page with API key management

### AI Features
- 🤖 Resume analysis (extracts skills, experience, preferences)
- 🔍 Intelligent job search
- 🎯 Match scoring (0-100)
- 💡 Match reason explanations
- 🚫 Automatic duplicate filtering
- ➕ Bulk add to wishlist

---

## 🌐 Deployment

### Deploy Backend (Render.com)

1. **Push backend to GitHub:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend"
   git remote add origin https://github.com/YOUR_USERNAME/job-tracker-backend.git
   git push -u origin main
   ```

2. **Deploy to Render:**
   - Go to https://render.com
   - New Web Service
   - Connect GitHub repo
   - Build: `npm install`
   - Start: `npm start`
   - Deploy!

3. **Get your URL:**
   ```
   https://job-tracker-backend-xxxx.onrender.com
   ```

### Deploy Frontend (GitHub Pages)

1. **Update backend URL:**
   ```bash
   cd frontend
   echo "REACT_APP_API_URL=https://your-backend.onrender.com" > .env
   ```

2. **Update vite.config.js:**
   ```javascript
   base: '/your-repo-name/',
   ```

3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: GitHub Actions
   - Wait for deployment

---

## 🛠️ Development

### Available Scripts

**Root:**
- `npm run install:all` - Install all dependencies
- `npm run dev` - Run both servers concurrently
- `npm run dev:backend` - Run backend only
- `npm run dev:frontend` - Run frontend only
- `npm run build:frontend` - Build frontend for production

**Backend (cd backend):**
- `npm start` - Start Express server
- `npm run dev` - Start with nodemon (auto-reload)

**Frontend (cd frontend):**
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

For production, change to your deployed backend URL.

---

## 🎨 Tech Stack

**Frontend:**
- React 18
- Vite
- Lucide Icons
- Recharts (analytics)

**Backend:**
- Node.js
- Express
- CORS
- Anthropic Claude API

---

## 💰 Cost

**API Usage:** ~$0.25-$0.35 per AI job search

**Hosting:**
- Backend: Free on Render.com (with limitations)
- Frontend: Free on GitHub Pages

---

## 🔒 Security

- API keys stored in browser localStorage only
- Backend acts as proxy (keys never exposed in frontend code)
- CORS configured for security
- No data stored on servers (localStorage only)

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Kill the process or change port in backend/.env
PORT=3002
```

### Frontend can't connect to backend
- Verify backend is running (`npm run dev:backend`)
- Check REACT_APP_API_URL in frontend/.env
- Check browser console for errors

### Blank page after deployment
- Verify `base` in vite.config.js matches repo name
- Check GitHub Actions completed successfully
- Hard refresh browser (Ctrl+Shift+R)

---

## 📚 Documentation

- **Frontend README:** `frontend/README.md`
- **Backend README:** `backend/README.md`
- **AI Features Guide:** `frontend/AI-FEATURES.md`
- **Deployment Guide:** `frontend/DEPLOYMENT.md`

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 🎉 Getting Started Checklist

- [ ] Install Node.js
- [ ] Clone/download this repository
- [ ] Run `npm run install:all`
- [ ] Get Anthropic API key
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Go to Settings → Save API key
- [ ] Try AI Job Finder!

---

**Happy job hunting! 🚀**

For questions or issues, check the documentation or create an issue on GitHub.
