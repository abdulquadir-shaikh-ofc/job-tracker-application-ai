import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Job Tracker Backend API is running',
    endpoints: {
      health: 'GET /',
      claude: 'POST /api/claude'
    }
  });
});

// Anthropic API proxy endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { apiKey, model, messages, max_tokens, tools } = req.body;

    // Validate required fields
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'API key is required',
        message: 'Please provide your Anthropic API key' 
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'Messages array is required' 
      });
    }

    console.log(`[${new Date().toISOString()}] Claude API request:`, {
      model: model || 'claude-sonnet-4-20250514',
      messageCount: messages.length,
      hasTools: !!tools
    });

    // Build request body
    const requestBody = {
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 4000,
      messages
    };

    // Add tools if provided
    if (tools) {
      requestBody.tools = tools;
    }

    // Make request to Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // Check if API returned an error
    if (!response.ok) {
      console.error(`[${new Date().toISOString()}] Anthropic API error:`, data);
      return res.status(response.status).json({
        error: data.error?.type || 'api_error',
        message: data.error?.message || 'An error occurred with the Anthropic API'
      });
    }

    console.log(`[${new Date().toISOString()}] Claude API response successful`);

    // Return the response
    res.json(data);

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Server error:`, error);
    res.status(500).json({ 
      error: 'server_error',
      message: error.message || 'Internal server error' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'server_error',
    message: 'An unexpected error occurred' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   Job Tracker Backend Server Running      ║
║   Port: ${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}               ║
╚════════════════════════════════════════════╝

Endpoints:
  GET  /           - Health check
  POST /api/claude - Anthropic API proxy

Ready to receive requests!
  `);
});

export default app;
