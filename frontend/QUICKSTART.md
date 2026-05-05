# 🚀 Quick Start Guide - Job Application Tracker

## What You Have

A complete, production-ready job application tracker with:
- ✅ React + Vite setup
- ✅ Beautiful terminal-inspired UI
- ✅ Kanban board, list view, and analytics
- ✅ JSON export/import functionality
- ✅ GitHub Actions for automatic deployment
- ✅ Sample data for testing

## 📁 Project Files

```
job-tracker/
├── src/
│   ├── App.jsx              # Main application (all features)
│   └── main.jsx             # React entry point
├── .github/
│   └── workflows/
│       └── deploy.yml       # Automatic deployment
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Build configuration
├── .gitignore              # Git ignore rules
├── README.md               # Full documentation
├── DEPLOYMENT.md           # Deployment guide
└── sample-data.json        # Test data
```

## ⚡ Local Development (3 Steps)

1. **Navigate to the project:**
   ```bash
   cd job-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser!

## 🌐 Deploy to GitHub Pages (5 Steps)

1. **Create a new repository on GitHub**
   - Name it `job-application-tracker` (or any name you like)
   - Don't initialize with README

2. **Update the base path in `vite.config.js`:**
   ```javascript
   base: '/your-repository-name/',
   ```

3. **Initialize and push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Job Application Tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/your-repository-name.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

5. **Wait for deployment:**
   - Check the Actions tab
   - Once complete, visit:
     `https://YOUR_USERNAME.github.io/your-repository-name/`

## 🎯 Features Overview

### Data Entry
- Company name, role, status
- Location, salary range
- Application and deadline dates
- Contact information
- Notes and job links

### Views
- **Kanban**: Visual board with 8 status columns
- **List**: Detailed table view
- **Analytics**: Charts and statistics

### Data Management
- Auto-save to browser localStorage
- Export to JSON file (backup)
- Import from JSON file (restore)
- Search and filter

### Status Tracking
- ⭐ Wishlist
- 📤 Applied
- 📞 Screening
- 💼 Interview
- 🎉 Offer
- ❌ Rejected
- ✅ Accepted
- 🚫 Declined

## 🧪 Testing with Sample Data

1. Start the app
2. Click "IMPORT"
3. Select `sample-data.json`
4. Explore the features with pre-loaded applications!

## 🎨 Customization

### Change Colors
Edit the colors in `src/App.jsx`:
- Background gradient (line ~72)
- Primary accent color: `#34D399` (search and replace)
- Status colors in `STATUS_OPTIONS` array

### Add Features
The code is well-organized and commented. Key areas:
- Form fields: Line ~290
- Status options: Line ~10
- Analytics: Line ~600+

## 📝 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
git add .
git commit -m "Update"
git push             # Auto-deploys via GitHub Actions
```

## 🆘 Troubleshooting

**Issue: Blank page after deployment**
- Check `vite.config.js` base path matches repo name
- Wait a few minutes for GitHub Pages to update

**Issue: npm install fails**
- Ensure Node.js v16+ is installed
- Try deleting `node_modules` and running `npm install` again

**Issue: Port 5173 already in use**
- Stop other Vite processes or use: `npm run dev -- --port 3000`

## 📚 Learn More

- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- React docs: https://react.dev
- Vite docs: https://vitejs.dev

## 🎉 You're Ready!

Your job tracker is ready to use. Start by running `npm install` then `npm run dev`.

Good luck with your job search! 🚀
