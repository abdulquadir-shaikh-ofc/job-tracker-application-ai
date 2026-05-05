import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Eye, EyeOff, Key, X } from 'lucide-react';

const Settings = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved API key on mount
    const savedKey = localStorage.getItem('anthropicApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropicApiKey', apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('API key saved successfully! The AI Job Finder will now use this key automatically.');
    } else {
      alert('Please enter a valid API key');
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to remove your saved API key?')) {
      localStorage.removeItem('anthropicApiKey');
      setApiKey('');
      alert('API key removed');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '100%',
        border: '2px solid #60A5FA',
        boxShadow: '0 10px 40px rgba(96, 165, 250, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SettingsIcon size={28} color="#60A5FA" />
            <h2 style={{ margin: 0, color: '#60A5FA', fontSize: '1.5rem' }}>SETTINGS</h2>
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

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            background: 'rgba(96, 165, 250, 0.1)',
            border: '1px solid #60A5FA',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#94A3B8', fontSize: '0.9rem' }}>
              💡 <strong>Save your Anthropic API key here</strong> so you don't have to enter it every time you use the AI Job Finder.
            </p>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
              Your key is stored locally in your browser only - it never leaves your device.
            </p>
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            color: '#94A3B8',
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Key size={18} />
            ANTHROPIC API KEY
          </label>

          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingRight: '3rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '2px solid #475569',
                borderRadius: '4px',
                color: '#F1F5F9',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748B' }}>
            Don't have an API key?{' '}
            <a
              href="https://console.anthropic.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#60A5FA', textDecoration: 'none' }}
            >
              Get one from console.anthropic.com
            </a>
          </p>
        </div>

        {saved && (
          <div style={{
            background: 'rgba(52, 211, 153, 0.1)',
            border: '2px solid #34D399',
            borderRadius: '4px',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#34D399',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✓ API key saved successfully!
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: '#60A5FA',
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
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <Save size={18} /> SAVE API KEY
          </button>

          {apiKey && (
            <button
              onClick={handleClear}
              style={{
                padding: '0.75rem 1rem',
                background: 'transparent',
                color: '#F87171',
                border: '2px solid #F87171',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              CLEAR
            </button>
          )}
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.4)',
          border: '1px solid #475569',
          borderRadius: '4px'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#94A3B8', fontSize: '0.9rem', fontWeight: 600 }}>
            💰 COST INFORMATION
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#64748B', fontSize: '0.85rem' }}>
            <li>Each AI job search costs ~$0.25-$0.35</li>
            <li>Using Claude Sonnet 4 model</li>
            <li>No monthly subscription needed</li>
            <li>Pay only for what you use</li>
          </ul>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid #FBBF24',
          borderRadius: '4px'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#FBBF24', fontSize: '0.9rem', fontWeight: 600 }}>
            🔒 SECURITY & PRIVACY
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#94A3B8', fontSize: '0.85rem' }}>
            <li>Your API key is stored only in your browser's localStorage</li>
            <li>It never leaves your device or gets sent anywhere except Anthropic's API</li>
            <li>Clear your browser data to remove it permanently</li>
            <li>Never share your API key with anyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
