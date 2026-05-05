# 🤖 AI-Powered Job Fetcher Guide

## Overview

Your job tracker now includes an **AI-powered job search feature** that:
- 📄 Analyzes your resume to understand your skills and preferences
- 🔍 Searches the web for matching job opportunities
- 🎯 Scores each job (0-100) based on how well it matches your profile
- ✅ Filters out jobs you've already applied to
- 📋 Adds selected jobs directly to your Wishlist

## How It Works

### 1. Resume Analysis
The AI reads your resume and extracts:
- Key technical skills
- Years of experience
- Preferred job titles
- Location preferences
- Salary expectations

### 2. Smart Job Search
Using your profile, it searches for relevant opportunities across:
- LinkedIn
- Indeed
- Glassdoor
- Company career pages
- Other job boards

### 3. Intelligent Scoring
Each job gets scored 0-100 based on:
- Skills match
- Experience level fit
- Role title alignment
- Location compatibility
- Salary range match

### 4. Duplicate Detection
The system automatically filters out:
- Companies you've already applied to
- Duplicate listings from your tracker

## Setup Guide

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "Get API Keys"
4. Create a new key
5. Copy it (starts with `sk-ant-...`)

### Step 2: Prepare Your Resume

**Option A: Upload Text File**
- Save your resume as a `.txt` file
- Click "Upload resume"
- Select your file

**Option B: Copy-Paste**
- Copy your resume text
- Paste directly into the text area

**Tips for best results:**
- Include clear sections for skills, experience, education
- List specific technologies and tools
- Mention years of experience
- Include preferred locations if any

### Step 3: Run the Search

1. Enter your API key
2. Upload or paste your resume
3. Set number of jobs to fetch (1-20)
4. Click "FIND MATCHING JOBS"

### Step 4: Review Results

The AI will:
- Show your extracted profile
- Display matching jobs with scores
- Highlight match reasons for each job
- Show number of duplicates filtered

### Step 5: Add to Tracker

1. Click on jobs to select them
2. Or use "SELECT ALL"
3. Click "ADD SELECTED TO WISHLIST"
4. Jobs appear in your Kanban board!

## Cost Information

### API Pricing (as of 2026)

Using Claude Sonnet 4:
- **Input:** $3 per million tokens
- **Output:** $15 per million tokens

**Typical cost per search:**
- Resume analysis: ~$0.01
- Job search: ~$0.10
- Scoring: ~$0.15
- **Total: ~$0.25-$0.35 per search**

### Cost-Saving Tips

1. **Reuse the same search**
   - Download results
   - Review offline before adding

2. **Batch processing**
   - Search for more jobs at once (up to 20)
   - Better than multiple small searches

3. **Optimize resume**
   - Keep it concise
   - Focus on key info
   - Reduces token count

## Features Explained

### Resume Profile Extraction

The AI identifies:
```
Skills: React, Python, AWS, Docker, etc.
Experience: 5 years
Preferred Titles: Senior Engineer, Tech Lead
Location: Remote or San Francisco
Salary: $120k-$160k
```

### Job Scoring System

**90-100:** Perfect match
- All key skills present
- Experience level exact fit
- Preferred title
- Ideal location/salary

**80-89:** Excellent match
- Most skills match
- Experience close
- Title similar

**70-79:** Good match
- Many skills overlap
- Experience acceptable
- Related role

**60-69:** Decent match
- Some skills match
- Different but related role

**50-59:** Weak match
- Few skills overlap
- Significant gaps

### Match Reasons

For each job, the AI explains:
- "Strong Python and AWS skills match"
- "5 years experience aligns with requirement"
- "Remote position matches preference"
- "Salary range $130k-$170k fits expectations"

### Duplicate Filtering

Automatically skips:
- Companies already in your tracker
- Same job from multiple sources
- Positions you've already reviewed

## Best Practices

### 1. Keep Resume Updated

Update your resume file when:
- You learn new skills
- You gain more experience
- Your preferences change
- You want to target different roles

### 2. Review Scores

Don't just go by the number:
- Read the match reasons
- Check the actual job description
- Verify the company is legitimate

### 3. Customize Notes

After adding jobs:
- Research the company
- Add interview prep notes
- Set follow-up reminders
- Track referrals

### 4. Regular Searches

Run searches:
- Weekly for active job hunting
- Bi-weekly to monitor market
- After skill upgrades

## Troubleshooting

### "Error: Invalid API key"
- Check you copied the full key
- Verify it starts with `sk-ant-`
- Try generating a new key

### "Error: Rate limit exceeded"
- Wait a few minutes
- Your account has usage limits
- Check console.anthropic.com for details

### "No jobs found"
- Try broader search terms
- Adjust resume to include more skills
- Increase number of jobs to fetch

### "Low match scores"
- Your skills might be very specialized
- Consider updating resume keywords
- Try different preferred job titles

### "All jobs filtered as duplicates"
- You've already added similar companies
- Try a different job search
- Clear old applications if no longer relevant

## Privacy & Security

### Your Data
- API key stored locally in browser only
- Resume never saved on servers
- All processing happens via API calls

### API Key Security
- Never share your API key
- Regenerate if exposed
- Monitor usage in console

### Job Data
- Jobs stored in browser localStorage
- Export regularly as backup
- No data sent to third parties

## Advanced Tips

### 1. Profile Optimization

Make your resume AI-friendly:
```
✅ Good:
"5 years of React, Node.js, and AWS experience"
"Senior Software Engineer role preferred"
"Open to remote or San Francisco"

❌ Avoid:
Vague descriptions
Missing experience years
No clear preferences
```

### 2. Search Strategies

**Cast wide net:**
- Set to 15-20 jobs
- Use general job titles
- Good for exploration

**Targeted search:**
- Set to 5-10 jobs
- Specific niche skills
- Better quality matches

### 3. Score Interpretation

**Score > 85:** Apply immediately
**Score 70-85:** Strong candidates
**Score 60-70:** Consider if interested
**Score < 60:** Usually skip unless exciting

## FAQ

**Q: Can I search without an API key?**
A: No, the AI features require an Anthropic API key for processing.

**Q: How accurate is the scoring?**
A: Very accurate for technical skills. Subjective factors (culture fit, etc.) aren't considered.

**Q: Does it apply to jobs automatically?**
A: No! It only adds to Wishlist. You control when/where to apply.

**Q: Can I search for different role types?**
A: Yes! Update your resume to reflect the roles you want, then search.

**Q: What if a job link is missing?**
A: Sometimes the AI can't extract URLs. You can add them manually later.

**Q: Does it work for non-tech jobs?**
A: Yes! It works for any job type. Just make sure your resume is clear.

**Q: Can I search international jobs?**
A: Yes! Specify your location preference in your resume.

## Future Enhancements

Potential features we could add:
- [ ] Automatic weekly searches
- [ ] Email alerts for new matches
- [ ] Company research integration
- [ ] Salary negotiation tips
- [ ] Interview prep based on job description
- [ ] Network analysis (LinkedIn connections)
- [ ] Application tracking automation

---

## Example Workflow

1. **Monday morning:**
   - Upload updated resume
   - Search for 15 jobs
   - Review and select top 5

2. **Add to wishlist:**
   - Review match reasons
   - Research companies
   - Add custom notes

3. **Customize applications:**
   - Move to "Applied" when submitted
   - Track interview stages
   - Update notes with details

4. **Weekly review:**
   - Run new search
   - Compare with previous results
   - Adjust resume based on trends

---

Happy job hunting! 🚀

For questions or issues, check the main README.md or create an issue on GitHub.
