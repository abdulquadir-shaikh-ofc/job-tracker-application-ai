import React, { useState, useEffect } from 'react';
import { Sparkles, Upload, Search, Brain, CheckCircle, X } from 'lucide-react';

// Backend API URL - change this based on your deployment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const AIJobFetcher = ({ applications, onAddApplications }) => {
  const [resume, setResume] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [numberOfJobs, setNumberOfJobs] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState(null);

  // Load saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropicApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResume(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Helper function to call backend API
  const callClaudeAPI = async (messages, tools = null) => {
    const response = await fetch(`${API_URL}/api/claude`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        model: 'claude-sonnet-4-20250514',
        max_tokens: tools ? 4000 : 2000,
        messages,
        ...(tools && { tools })
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  };

  const fetchJobs = async () => {
    if (!resume || !apiKey) {
      alert('Please provide both your resume and API key');
      return;
    }

    setIsProcessing(true);
    setProgress('Analyzing your resume...');

    try {
      // Step 1: Analyze resume with Claude
      setProgress('🧠 Analyzing your resume to extract skills and preferences...');
      
      console.log('Analyzing resume via backend...');
      
      const analysisData = await callClaudeAPI([{
        role: 'user',
        content: `Analyze this resume and extract:
1. Key technical skills
2. Years of experience
3. Preferred job titles
4. Location preferences (if mentioned)
5. Salary expectations (if mentioned)

Resume:
${resume}

Respond ONLY with JSON in this format:
{
  "skills": ["skill1", "skill2"],
  "experience_years": 5,
  "preferred_titles": ["title1", "title2"],
  "location": "city/remote",
  "salary_range": "$X-$Y"
}`
      }]);

      console.log('Analysis response:', analysisData);

      const analysisText = analysisData.content[0].text;
      const cleanedAnalysis = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const resumeData = JSON.parse(cleanedAnalysis);

      console.log('Resume Analysis:', resumeData);

      // Step 2: Search for jobs using web search
      setProgress('🔍 Searching for relevant job opportunities...');
      
      const searchQuery = `${resumeData.preferred_titles.join(' OR ')} ${resumeData.skills.slice(0, 3).join(' ')} jobs ${new Date().getFullYear()}`;
      
      const searchData = await callClaudeAPI([{
        role: 'user',
        content: `Search for ${numberOfJobs} job listings for: ${searchQuery}. Focus on recent postings from job boards like LinkedIn, Indeed, Glassdoor, etc. Extract company name, job title, location, and job posting URL if available.`
      }], [{
        type: 'web_search_20250305',
        name: 'web_search'
      }]);

      console.log('Search Response:', searchData);

      // Step 3: Score each job against resume
      setProgress('⚡ Scoring jobs based on your resume match...');

      const jobsText = searchData.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      const scoringData = await callClaudeAPI([{
        role: 'user',
        content: `Based on this resume profile:
Skills: ${resumeData.skills.join(', ')}
Experience: ${resumeData.experience_years} years
Preferred titles: ${resumeData.preferred_titles.join(', ')}

Score these job opportunities from 0-100 based on match quality. Extract EXACTLY ${numberOfJobs} unique jobs and avoid duplicates.

Job search results:
${jobsText}

Respond ONLY with JSON array:
[
  {
    "company": "Company Name",
    "role": "Job Title",
    "location": "Location",
    "score": 85,
    "match_reasons": ["reason1", "reason2"],
    "link": "URL if available or empty string",
    "salary": "salary range if mentioned or empty string"
  }
]

IMPORTANT: 
- Return EXACTLY ${numberOfJobs} jobs
- No duplicates
- Each job must have a unique company name
- Scores should range from 50-100`
      }]);

      const scoringText = scoringData.content[0].text;
      const cleanedScoring = scoringText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const scoredJobs = JSON.parse(cleanedScoring);

      // Filter out duplicates based on existing applications
      const existingCompanies = new Set(
        applications.map(app => app.company.toLowerCase())
      );

      const newJobs = scoredJobs.filter(job => 
        !existingCompanies.has(job.company.toLowerCase())
      );

      setResults({
        resumeProfile: resumeData,
        jobs: newJobs,
        duplicatesFiltered: scoredJobs.length - newJobs.length
      });

      setProgress('✅ Complete! Review and add jobs to your tracker.');
    } catch (error) {
      console.error('Error details:', error);
      
      let errorMessage = error.message;
      
      // Provide helpful error messages
      if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Network error: Unable to connect to backend server.\n\n' +
          'Make sure the backend server is running:\n' +
          '1. Open a new terminal\n' +
          '2. Navigate to job-tracker-backend folder\n' +
          '3. Run: npm start\n\n' +
          'Backend should be running on http://localhost:3001';
      } else if (error.message.includes('401') || error.message.includes('authentication')) {
        errorMessage = 'Authentication failed: Your API key is invalid or expired.\n\n' +
          'Please check your API key in Settings.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded: Too many requests.\n\n' +
          'Please wait a few minutes and try again.';
      }
      
      setProgress(`❌ Error: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const addSelectedJobs = (selectedJobs) => {
    const newApplications = selectedJobs.map(job => ({
      id: Date.now() + Math.random(),
      company: job.company,
      role: job.role,
      status: 'wishlist',
      location: job.location,
      salary: job.salary || '',
      appliedDate: '',
      deadline: '',
      contact: '',
      contactEmail: '',
      notes: `AI Score: ${job.score}/100\n\nMatch Reasons:\n${job.match_reasons.map(r => `• ${r}`).join('\n')}`,
      link: job.link || ''
    }));

    onAddApplications(newApplications);
    setResults(null);
    alert(`Added ${selectedJobs.length} jobs to your wishlist!`);
  };

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '8px',
      padding: '2rem',
      border: '2px solid #A78BFA',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Sparkles size={28} color="#A78BFA" />
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#A78BFA' }}>
          AI JOB FINDER
        </h2>
      </div>

      {!results ? (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(52, 211, 153, 0.1)',
            border: '2px solid #34D399',
            borderRadius: '4px',
            padding: '1rem'
          }}>
            <p style={{ margin: 0, color: '#34D399', fontSize: '0.9rem' }}>
              ✅ <strong>Backend Connected!</strong> AI features now work without CORS issues.
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#94A3B8',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              ANTHROPIC API KEY
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={apiKey ? "API key loaded from settings" : "Enter API key or go to Settings"}
              disabled={!!apiKey}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: apiKey ? 'rgba(52, 211, 153, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                border: `2px solid ${apiKey ? '#34D399' : '#475569'}`,
                borderRadius: '4px',
                color: '#F1F5F9',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                cursor: apiKey ? 'not-allowed' : 'text'
              }}
            />
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.5rem' }}>
              {apiKey ? (
                <>✓ API key loaded from Settings • Cost: ~$0.30 per search</>
              ) : (
                <>
                  Click <strong>SETTINGS</strong> (top right) to save your API key permanently
                </>
              )}
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#94A3B8',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              YOUR RESUME
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '2px solid #475569',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <Upload size={20} color="#60A5FA" />
              <span style={{ color: '#F1F5F9' }}>
                {resume ? '✓ Resume uploaded' : 'Upload resume (.txt or paste below)'}
              </span>
              <input
                type="file"
                accept=".txt"
                onChange={handleResumeUpload}
                style={{ display: 'none' }}
              />
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Or paste your resume text here..."
              rows={6}
              style={{
                width: '100%',
                marginTop: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '2px solid #475569',
                borderRadius: '4px',
                color: '#F1F5F9',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#94A3B8',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              NUMBER OF JOBS TO FETCH
            </label>
            <input
              type="number"
              value={numberOfJobs}
              onChange={(e) => setNumberOfJobs(Math.max(1, Math.min(20, parseInt(e.target.value) || 10)))}
              min="1"
              max="20"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '2px solid #475569',
                borderRadius: '4px',
                color: '#F1F5F9',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {progress && (
            <div style={{
              padding: '1rem',
              background: 'rgba(167, 139, 250, 0.1)',
              border: '2px solid #A78BFA',
              borderRadius: '4px',
              color: '#F1F5F9',
              fontSize: '0.9rem',
              whiteSpace: 'pre-wrap'
            }}>
              {progress}
            </div>
          )}

          <button
            onClick={fetchJobs}
            disabled={isProcessing || !resume || !apiKey}
            style={{
              padding: '1rem',
              background: isProcessing ? '#475569' : '#A78BFA',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            {isProcessing ? (
              <>⏳ PROCESSING...</>
            ) : (
              <>
                <Brain size={20} /> FIND MATCHING JOBS
              </>
            )}
          </button>
        </div>
      ) : (
        <JobResults
          results={results}
          onAddJobs={addSelectedJobs}
          onClose={() => setResults(null)}
        />
      )}
    </div>
  );
};

const JobResults = ({ results, onAddJobs, onClose }) => {
  const [selectedJobs, setSelectedJobs] = useState(new Set());

  const toggleJob = (index) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedJobs(newSelected);
  };

  const handleAddSelected = () => {
    const jobsToAdd = results.jobs.filter((_, idx) => selectedJobs.has(idx));
    if (jobsToAdd.length === 0) {
      alert('Please select at least one job to add');
      return;
    }
    onAddJobs(jobsToAdd);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#34D399', fontSize: '1.25rem' }}>
            Found {results.jobs.length} Matching Jobs
          </h3>
          {results.duplicatesFiltered > 0 && (
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>
              Filtered {results.duplicatesFiltered} duplicate(s) already in your tracker
            </p>
          )}
        </div>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: '#F87171',
          cursor: 'pointer',
          padding: '0.5rem'
        }}>
          <X size={24} />
        </button>
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.4)',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1.5rem',
        border: '1px solid #475569'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600 }}>
          YOUR PROFILE
        </p>
        <p style={{ margin: 0, color: '#F1F5F9', fontSize: '0.9rem' }}>
          Skills: {results.resumeProfile.skills.join(', ')} • 
          {results.resumeProfile.experience_years} years exp
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
        {results.jobs.map((job, idx) => (
          <div
            key={idx}
            onClick={() => toggleJob(idx)}
            style={{
              background: selectedJobs.has(idx) ? 'rgba(52, 211, 153, 0.1)' : 'rgba(15, 23, 42, 0.6)',
              border: `2px solid ${selectedJobs.has(idx) ? '#34D399' : '#475569'}`,
              borderRadius: '4px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, color: '#F1F5F9', fontSize: '1.1rem' }}>
                    {job.company}
                  </h4>
                  {selectedJobs.has(idx) && <CheckCircle size={20} color="#34D399" />}
                </div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#94A3B8', fontSize: '0.95rem' }}>
                  {job.role}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', color: '#64748B', fontSize: '0.85rem' }}>
                  {job.location} {job.salary && `• ${job.salary}`}
                </p>
                <div style={{
                  display: 'inline-block',
                  background: job.score >= 80 ? '#10B981' : job.score >= 60 ? '#FBBF24' : '#F87171',
                  color: '#0F172A',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem'
                }}>
                  {job.score}% MATCH
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  {job.match_reasons.map((reason, i) => (
                    <div key={i}>• {reason}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={handleAddSelected}
          style={{
            flex: 1,
            padding: '1rem',
            background: '#34D399',
            color: '#0F172A',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <CheckCircle size={20} /> ADD {selectedJobs.size} SELECTED TO WISHLIST
        </button>
        <button
          onClick={() => setSelectedJobs(new Set(results.jobs.map((_, idx) => idx)))}
          style={{
            padding: '1rem',
            background: 'transparent',
            color: '#60A5FA',
            border: '2px solid #60A5FA',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}
        >
          SELECT ALL
        </button>
      </div>
    </div>
  );
};

export default AIJobFetcher;
