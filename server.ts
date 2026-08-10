import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', system: 'macOS Tahoe Expressive OS', timestamp: new Date().toISOString() });
  });

  // Gemini Copilot AI endpoint
  app.post('/api/copilot', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({
          response: `[Gemini Copilot - Demo Mode]\n\nI am macOS Tahoe Intelligence Assistant! Since a live GEMINI_API_KEY was not supplied in secrets, I am responding in demo mode:\n\nTo perform actual live reasoning and assistance, please configure your GEMINI_API_KEY in the Secrets panel.\n\nYour query: "${prompt}"`,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are macOS Tahoe Assistant, a helpful AI built directly into the macOS Tahoe Expressive Operating System. 
Respond concisely, accurately, and politely in Markdown format. Use a friendly Apple macOS tone.
Context: ${context || 'Operating system assistant'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser request: ${prompt}` }],
          },
        ],
      });

      const reply = response.text || 'No response generated.';
      res.json({ response: reply });
    } catch (err: any) {
      console.error('Gemini Copilot error:', err);
      res.status(500).json({
        error: 'Failed to process AI prompt',
        details: err?.message || 'Unknown error',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[macOS Tahoe OS] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
