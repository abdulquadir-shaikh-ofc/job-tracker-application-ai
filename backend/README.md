# 🚀 Backend Setup Guide

## What You're Building

```
Browser (React App) → Express Backend → Anthropic API
```

This architecture solves the CORS issue and keeps your API key secure!

---

## Quick Start (5 Minutes)

### Step 1: Install Backend Dependencies

```powershell
# Navigate to the backend folder
cd job-tracker-backend

# Install dependencies
npm install
```

### Step 2: Start the Backend Server

```powershell
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   Job Tracker Backend Server Running      ║
║   Port: 3001                              ║
╚════════════════════════════════════════════╝
```

### Step 3: Update Frontend

Replace `src/AIJobFetcher.jsx` with `AIJobFetcher-with-backend.jsx`

```powershell
# In your job-tracker-ai folder
cp AIJobFetcher-with-backend.jsx src/AIJobFetcher.jsx
```

### Step 4: Start Frontend

```powershell
# In job-tracker-ai folder
npm run dev
```

### Step 5: Test!

1. Open http://localhost:5173
2. Go to Settings → Save your API key
3. Upload your resume
4. Click "FIND MATCHING JOBS"
5. It works! 🎉

---

## How It Works

### Without Backend (CORS Error):
```
Browser → ❌ BLOCKED → Anthropic API
```

### With Backend (Works!):
```
Browser → ✅ Backend Server → ✅ Anthropic API
```

The backend acts as a "middleman" that:
- Receives requests from your browser
- Forwards them to Anthropic
- Sends responses back to your browser
- Bypasses CORS restrictions

---

## Project Structure

```
job-tracker-backend/
├── server.js              # Express server
├── package.json           # Dependencies
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore rules
└── AIJobFetcher-with-backend.jsx  # Updated frontend component
```

---

## Running Both Servers

You need **TWO terminal windows**:

**Terminal 1 - Backend:**
```powershell
cd job-tracker-backend
npm start
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```powershell
cd job-tracker-ai
npm run dev
# Runs on http://localhost:5173
```

---

## Environment Variables

Create `.env` file (optional):

```env
PORT=3001
NODE_ENV=development
```

---

## API Endpoints

### Health Check
```
GET http://localhost:3001/
```

Response:
```json
{
  "status": "ok",
  "message": "Job Tracker Backend API is running"
}
```

### Claude API Proxy
```
POST http://localhost:3001/api/claude
```

Request body:
```json
{
  "apiKey": "sk-ant-...",
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}
```

---

## Deployment Options

### Option 1: Deploy Backend to Render (Free)

1. **Create account** at https://render.com

2. **New Web Service** → Connect your GitHub repo

3. **Build Command:**
   ```
   npm install
   ```

4. **Start Command:**
   ```
   npm start
   ```

5. **Environment Variables:**
   - Add `NODE_ENV=production`

6. **Get your URL:**
   ```
   https://your-app.onrender.com
   ```

7. **Update frontend** - Create `.env` in job-tracker-ai:
   ```
   REACT_APP_API_URL=https://your-app.onrender.com
   ```

### Option 2: Deploy to Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select job-tracker-backend
4. It auto-detects Node.js
5. Get your URL and update frontend

### Option 3: Deploy to Fly.io

```powershell
# Install Fly CLI
# Then in backend folder:
fly launch
fly deploy
```

### Option 4: Deploy to Heroku

```powershell
# In backend folder:
heroku create your-app-name
git push heroku main
```

---

## Production Checklist

### Backend:

✅ Install dependencies: `npm install`
✅ Test locally: `npm start`
✅ Add error logging
✅ Set up CORS for your domain
✅ Deploy to cloud service
✅ Test deployed endpoint

### Frontend:

✅ Update `REACT_APP_API_URL` in `.env`
✅ Replace AIJobFetcher.jsx
✅ Test locally with deployed backend
✅ Build: `npm run build`
✅ Deploy to GitHub Pages

---

## Troubleshooting

### Backend won't start

**Error:** `EADDRINUSE: address already in use :::3001`

**Solution:** Port 3001 is already in use
```powershell
# Change port in .env or kill the process
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or change port:
# In .env: PORT=3002
```

### Frontend can't connect to backend

**Error:** `Failed to fetch`

**Solutions:**
1. Make sure backend is running (`npm start`)
2. Check backend URL in frontend
3. Verify port 3001 is accessible
4. Check firewall settings

### API key invalid

**Error:** `Authentication failed`

**Solutions:**
1. Verify API key in Settings
2. Check key at console.anthropic.com
3. Generate a new key if needed

### CORS errors still happening

**Solution:** Make sure you're using the updated AIJobFetcher that calls the backend, not the Anthropic API directly.

---

## Cost Monitoring

The backend logs all requests:

```
[2026-05-04T12:00:00.000Z] Claude API request: {
  model: 'claude-sonnet-4-20250514',
  messageCount: 1,
  hasTools: false
}
```

Monitor your usage at: https://console.anthropic.com/

---

## Security Best Practices

### ✅ DO:
- Keep backend code on GitHub
- Use environment variables for config
- Monitor API usage
- Add rate limiting in production
- Use HTTPS in production

### ❌ DON'T:
- Commit API keys to Git
- Expose backend publicly without auth
- Store API keys in frontend code
- Share backend URL publicly

---

## Next Steps

1. ✅ Get backend running locally
2. ✅ Update frontend to use backend
3. ✅ Test AI job search
4. ✅ Deploy backend to Render/Railway
5. ✅ Update frontend with production URL
6. ✅ Deploy frontend to GitHub Pages

---

## Support

**Backend not working?**
- Check terminal for error messages
- Verify port 3001 is free
- Restart: `Ctrl+C` then `npm start`

**Need help?**
- Check server logs in terminal
- Open browser console (F12)
- Review error messages

---

Happy coding! 🚀 Your AI job tracker is now production-ready!
