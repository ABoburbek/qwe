import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // API Routes
  app.post("/api/ai/simulate-sales", async (req, res) => {
    try {
      const { persona, history } = req.body;
      
      const systemPrompt = `You are a customer named ${persona.name}. You are interacting with a sales person.
Your difficulty level is: ${persona.difficulty}.
Your personality is: ${persona.personality}.
Target product they want to sell you: ${persona.targetProduct}.

Evaluate the salesperson's latest response and provide:
1. Your reaction/dialogue as the customer.
2. A score from 0-100 on how well they handled it.
3. Feedback on what they did well or poorly.
4. If the simulation should end (did they successfully sell or fail completely?).

Respond in JSON format:
{
  "reaction": "your dialogue here",
  "score": 85,
  "feedback": "good empathy but didn't mention price",
  "isFinished": false
}
`;

      const prompt = `Conversation history:
${history.map((h: any) => `${h.role}: ${h.text}`).join('\n')}

Based on the salesperson's last response, reply as the customer in Uzbek in the requested JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        }
      });

      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "AI processing failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
