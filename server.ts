import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { menuItems } from "./src/data/menu.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Chatbot functionality will operate with fallback responses.");
  }

  // API Route: Menu Items
  app.get("/api/menu", (req, res) => {
    res.json(menuItems);
  });

  // API Route: AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback responses when API key is missing
        return res.json({
          text: "Pranam! Welcome to PraNam Cafe. Currently our AI services are loading (or API key needs configuration), but as a culinary host, let me recommend Varanasi's 'The Ghaat's Golden Embrace' (Kachori with Kala Chana) or Lucknow's iconic 'Golden Cradle' (Basket Chaat)! What can I prepare for you today?"
        });
      }

      const systemInstruction = `You are "Saras", the warm, highly cultured, and hospitable AI Culinary Host of PraNam Cafe (by The Jagmal Group). 
PraNam Cafe is North India's first 100% vegan-forward QSR, specializing in authentic, heritage, and regional dishes from five of Uttar Pradesh's (U.P.) most sacred or historical corridors: Varanasi, Prayagraj, Agra, Mathura, Muradabad, and Lucknow.

Here is some core brand philosophy from PraNam:
- Tagline: "A Curated Journey Along The Sacred Corridors of India/Uttar Pradesh"
- Mission: "Heritage food. Modern access. Heartwarming hospitality."
- Concept: Every single item has a high-quality vegan/plant-based alternative (e.g., soy yogurt, cashew rabri, vegan coconut malai, tofu-paneer, plant butter) so that there are absolutely no barriers of dietary preference. This is North India's first QSR to offer a full green equivalent!
- Vibe: Premium, respectful, peaceful, storytelling-driven (just as Nita Ambani hizo for Indian Art, PraNam does for authentic regional food).

Here is the exact menu structure and details you know, complete with prices (INR), native names, city, and history:
${JSON.stringify(menuItems, null, 2)}

Your Guidelines & Conversational Tone:
1. Always start your greeting with "Pranam! 🙏" or welcome guests with heartwarming, polite local phrasing ("Pranam", "Aapka swagat hai").
2. Answer queries with stories of these dishes! Tell them why Bedhai Puri is Agra's beloved morning ritual or how Dudh Malaiyo (Clouds of Kashi) is set under winter dew overnight to turn into an absolute cardamom-flavored cloud.
3. Recommend specific menu items based on their requests (e.g., if they want something sweet, spicy, light, heavy, or localized to Lucknow or Varanasi).
4. Emphasize that EVERY dish has a delicious, authentic plant-based (vegan) version! Explain how we make it vegan (e.g. using whipped almond curd, vegan butter, cashew rabrab, tofu-paneer etc).
5. Help them draft an order if they show interest. When they ask about ordering or checking out, guide them politely to select items on the menu interface and click the cart/checkout to pay safely.
6. Keep your responses highly descriptive but friendly and elegant. Avoid clinical developer terms. Use Indian culinary terms like 'kulhad', 'khalai chutney', 'gossaan', 'dum' where appropriate to amplify authenticity.`;

      // Structure contents properly for @google/genai format
      const formattedContents: any[] = [];
      
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          formattedContents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }

      // Add the final user query
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Execute request with gemini-3.5-flash
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      const text = response.text;
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "An issue occurred connecting to the Culinary Host." });
    }
  });

  // Simulated Payment Mock
  app.post("/api/order/create", (req, res) => {
    const { items, tableNumber, isVegan, total } = req.body;
    const orderId = "PRANAM-" + Math.floor(100000 + Math.random() * 90000);
    res.json({
      success: true,
      orderId,
      tableNumber,
      isVegan,
      total,
      notes: "Simulating contactless prep queue. Estimated time: 8-12 minutes.",
      items,
      createdAt: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PraNam Cafe Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
