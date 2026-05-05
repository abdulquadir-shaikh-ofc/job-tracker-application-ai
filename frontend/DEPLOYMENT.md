# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Job Application Tracker to GitHub Pages.

## Method 1: Automatic Deployment with GitHub Actions (Recommended)

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git
   git push -u origin main
   ```

2. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click on `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`

3. **Update the base path:**
   - Open `vite.config.js`
   - Change the `base` to match your repository name:
   ```javascript
   base: '/job-application-tracker/',
   ```

4. **Commit and push the change:**
   ```bash
   git add vite.config.js
   git commit -m "Update base path for GitHub Pages"
   git push
   ```

5. **Wait for deployment:**
   - Go to the `Actions` tab in your repository
   - Watch the deployment workflow run
   - Once complete, your site will be live at:
     `https://YOUR_USERNAME.github.io/job-application-tracker/`

### Future Updates:
Just push to the `main` branch and GitHub Actions will automatically rebuild and deploy!

```bash
git add .
git commit -m "Your update message"
git push
```

---

## Method 2: Manual Deployment with gh-pages

### Setup Steps:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```javascript
   base: '/job-application-tracker/',
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages:**
   - Go to repository `Settings` → `Pages`
   - Set source to `gh-pages` branch
   - Your site will be live at:
     `https://YOUR_USERNAME.github.io/job-application-tracker/`

### Future Updates:
Run the deploy command whenever you want to update:
```bash
npm run deploy
```

---

## Method 3: Other Hosting Options

### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

### Netlify

1. Build your project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify's deploy page
   Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Cloudflare Pages

1. Push code to GitHub
2. Connect your repository in Cloudflare Pages dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution:** Make sure the `base` path in `vite.config.js` matches your repository name exactly.

### Issue: 404 errors for assets
**Solution:** Check that all asset paths are relative and the `base` configuration is correct.

### Issue: GitHub Actions workflow fails
**Solution:** 
- Ensure Pages is enabled in repository settings
- Check that GitHub Actions has proper permissions
- Review the Actions log for specific errors

### Issue: Old version still showing
**Solution:**
- Clear your browser cache
- Wait a few minutes for CDN to update
- Check if deployment actually completed

---

## Custom Domain (Optional)

1. Add a `CNAME` file to the `public` folder with your domain:
   ```
   jobs.yourdomain.com
   ```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

3. In GitHub Settings → Pages, add your custom domain

4. Wait for DNS propagation (can take 24-48 hours)

---

## Security Notes

- All data is stored in the browser's localStorage
- No server-side storage or authentication
- JSON export/import for data portability
- Recommended: Export backups regularly

---

## Performance Optimization

The built app is already optimized, but for best performance:

1. **Enable HTTPS** (automatic with GitHub Pages)
2. **Use browser caching** (configured in Vite)
3. **Code splitting** (automatic with Vite)
4. **Asset optimization** (automatic during build)

---

Need help? Check the main README.md or create an issue on GitHub!
