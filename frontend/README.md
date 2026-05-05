# 🎯 AI-Powered Job Application Tracker

A modern, AI-enhanced job application tracker built with React. Track your job search progress with a sleek terminal-inspired interface, complete with **AI-powered job search**, Kanban boards, analytics, and JSON export/import for easy backup.

![Job Application Tracker](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF) ![AI](https://img.shields.io/badge/AI-Claude%20API-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🤖 AI-Powered Job Search (NEW!)
- **Smart Resume Analysis**: AI extracts your skills, experience, and preferences
- **Intelligent Job Matching**: Searches the web and scores jobs 0-100 based on fit
- **Automatic Filtering**: Skips jobs you've already applied to
- **Bulk Import**: Add multiple jobs to your wishlist at once
- **Match Insights**: See exactly why each job matches your profile

### 📊 Multiple Views
- **Kanban Board**: Visualize your applications across different stages
- **List View**: See all applications in a detailed list format
- **Analytics Dashboard**: Get insights with charts and statistics

### 🎨 Rich Functionality
- ✅ Track company, role, status, location, salary, and more
- 📅 Set application dates and deadlines
- 👤 Store contact information for recruiters
- 📝 Add notes for each application
- 🔗 Save job posting links
- 🎨 8 different status categories with color coding

### 💾 Data Management
- 📤 Export applications to JSON file
- 📥 Import applications from JSON file
- 💿 Auto-save to browser localStorage
- 🔒 All data stored locally (privacy-first)

### 📈 Analytics
- Total application count
- Active applications tracker
- Success rate calculation
- Status distribution pie chart
- Application timeline chart

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🤖 AI Features Setup

### Get Your Anthropic API Key

1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy it (starts with `sk-ant-...`)

### Using AI Job Search

1. Click the AI Job Finder section
2. Enter your API key
3. Upload your resume (.txt) or paste it
4. Set how many jobs to fetch (1-20)
5. Click "FIND MATCHING JOBS"
6. Review scored results and add to wishlist

**Cost:** ~$0.25-$0.35 per search with Claude Sonnet 4

For detailed instructions, see [AI-FEATURES.md](AI-FEATURES.md)

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🌐 GitHub Pages Deployment

1. Update the `base` path in `vite.config.js` to match your repository name:
```javascript
base: '/your-repo-name/',
```

2. Build the project:
```bash
npm run build
```

3. Deploy to GitHub Pages:
```bash
# Install gh-pages (first time only)
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

4. Go to your repository settings → Pages → Set source to `gh-pages` branch

Your app will be live at: `https://yourusername.github.io/your-repo-name/`

### Alternative: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎯 Usage Guide

### Adding an Application
1. Click "NEW APPLICATION" button
2. Fill in company name and role (required)
3. Optionally add location, salary, dates, contacts, notes
4. Click "SAVE"

### Managing Applications
- **Edit**: Click the edit icon on any application
- **Delete**: Click the trash icon (confirmation required)
- **Search**: Use the search bar to filter by company or role
- **Filter**: Use the status dropdown to filter applications

### Exporting/Importing Data
- **Export**: Click "EXPORT" to download a JSON backup
- **Import**: Click "IMPORT" and select a previously exported JSON file

### Status Categories
- ⭐ **Wishlist**: Jobs you're interested in
- 📤 **Applied**: Application submitted
- 📞 **Screening**: Phone/initial screening
- 💼 **Interview**: In interview process
- 🎉 **Offer**: Received an offer
- ❌ **Rejected**: Application rejected
- ✅ **Accepted**: Offer accepted
- 🚫 **Declined**: You declined

## 🛠️ Technology Stack

- **React 18.2** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **LocalStorage API** - Data persistence

## 📂 Project Structure

```
job-application-tracker/
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Changing the Theme
Edit the color variables in `App.jsx`:

```javascript
// Main gradient background
background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)'

// Primary accent color (green)
#34D399

// Secondary colors in STATUS_OPTIONS array
```

### Adding New Status Types
Add to the `STATUS_OPTIONS` array in `App.jsx`:

```javascript
{ value: 'newstatus', label: 'New Status', icon: '🎯', color: '#FF6B6B' }
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with a detailed description
3. Include screenshots if applicable

## 🔮 Future Enhancements

- [ ] Add browser notifications for upcoming deadlines
- [ ] Email integration for application tracking
- [ ] Resume version management
- [ ] Interview preparation checklist
- [ ] Company research notes
- [ ] Networking contact tracking
- [ ] Calendar integration
- [ ] Mobile app version

## 📸 Screenshots

### Kanban View
Track your applications visually across different stages.

### Analytics Dashboard
Get insights into your job search with detailed charts and statistics.

### List View
See all your applications in a comprehensive list with full details.

---

Made with ❤️ for job seekers everywhere. Good luck with your search! 🚀
