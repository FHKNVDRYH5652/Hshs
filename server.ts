import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI Deep Pattern & Loss-Protected Prediction Endpoint
  app.post("/api/gemini-predict", async (req, res) => {
    try {
      const { history, lastPredictionStatus, consecutiveLosses = 0 } = req.body;
      if (!Array.isArray(history) || history.length === 0) {
        return res.status(400).json({ success: false, error: "History array required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({ success: false, reason: "GEMINI_API_KEY not configured" });
      }

      const recentRounds = history.slice(0, 100).map((item: any) => ({
        period: item.period,
        number: item.number,
        size: item.size,
        color: item.color
      }));

      const prompt = `You are the Ultra Pro Max Wingo 1M Real Gemini 3.6 AI Intelligence & Anti-Trap Monitor Engine v10.0.
Your primary directive is to perform deep real-time pattern analysis on the FULL PAST 100 Wingo rounds to predict the next round outcome with ZERO LOSS LOGIC, WINGO SYSTEM TRAP MONITORING, and Anti-Loss Streak Protection.

Past 100 Rounds Data (newest to oldest):
${JSON.stringify(recentRounds, null, 2)}

Last Prediction Status: ${lastPredictionStatus || 'NORMAL'}
Consecutive Losses Count: ${consecutiveLosses}

${consecutiveLosses >= 2 ? `
⚡ CRITICAL EMERGENCY ALERT: ${consecutiveLosses}-ROUND LOSS STREAK DETECTED!
The Wingo game server is currently in a WHIPSAW / PATTERN INVERSION CHAOS REGIME designed to drain pattern players!
YOU MUST IMMEDIATELY EXECUTE EMERGENCY LOSS BREAKING MANDATES:
1. ABANDON ALL STANDARD PATTERN CONTINUATION ATTEMPTS (e.g. stop predicting standard dragons or streaks).
2. FORCE A DOMAIN JUMP: If recent failed predictions were SIZE, switch predictionType to "COLOR". If recent failed predictions were COLOR, switch predictionType to "SIZE"!
3. PREDICT COUNTER-TRAP OPPOSITE OR FOLLOW IMMEDIATE LAST ROUND MOMENTUM TO CUT LOSS STREAKS IMMEDIATELY!
4. Set confidence score realistically to 74.0% - 82.0% indicating active market volatility protection.
` : ''}

CRITICAL TASK 1: WINGO GAME SYSTEM TRAP MONITORING & COUNTER-PREDICTION:
- The WINGO game system frequently manipulates outcomes to TRAP normal players who rely blindly on simple obvious patterns (e.g., setting up a 3-round fake Dragon lure, a fake Quadra repeat, or a whipsaw anomaly).
- YOU MUST CONSTANTLY MONITOR FOR WINGO SYSTEM TRAPS:
  1. FAKE DRAGON BAIT TRAP (e.g., S-B-S-B lure encouraging players to bet S, but the system is about to break it into B).
  2. QUADRA STICKY TRAP (e.g., 4 consecutive identical results like S-S-S-S or G-G-G-G where normal players expect continuation, but the system forces a reversal).
  3. WHIPSAW ANOMALY TRAP (e.g., rapid random sequence shifts designed to create back-to-back losses for trend-followers).
- IF A WINGO SYSTEM TRAP IS DETECTED OR LOSS STREAK >= 2:
  * Set "isSystemTrapDetected": true
  * Set "trapType": "${consecutiveLosses >= 2 ? 'WHIPSAW_CHAOS_TRAP' : 'FAKE_DRAGON_BAIT'}"
  * Set "trapCounterAction": "BET_COUNTER_TRAP_OPPOSITE"
  * PREDICT THE OPPOSITE OF THE BAIT TO COUNTER-TRAP THE SYSTEM AND SAFEGUARD CAPITAL!

CRITICAL TASK 2: PURE PATTERN MERITOCRACY & BALANCED TARGET SELECTION (SIZE vs COLOR):
- Compare SIZE pattern clarity vs COLOR pattern clarity in the 100-round history.
- Select whichever target category (SIZE or COLOR) exhibits the CLEARER, HIGHER PROBABILITY, and SMOOTHER pattern structure, or counter-trap opportunity!
- DO NOT force COLOR or SIZE artificially. Ensure natural ~50/50 distribution across rounds according to pattern merit.

CRITICAL TASK 3: QUADRA PATTERN REVERSAL RULE:
- When 4 identical results occur in a row (QUADRA PATTERN, e.g., 4 SMALLs, 4 BIGs, 4 GREENs, 4 REDs), the block is complete.
- Predict REVERSAL (OPPOSITE outcome):
  * 4 SMALLs -> PREDICT BIG!
  * 4 BIGs -> PREDICT SMALL!
  * 4 GREENs -> PREDICT RED!
  * 4 REDs -> PREDICT GREEN!

CRITICAL TASK 4: WINGO NUMBER TRAJECTORY MATRIX:
- Select 2 recommended numbers (0-9) that strictly match both SIZE (SMALL: 0-4, BIG: 5-9) AND COLOR (GREEN: 1,3,7,9, RED: 0,2,4,6,8, VIOLET: 0 or 5).
- Base number selection on Repeat Clusters, Step Ladders, or Complement Flips (+5 Jump).

Provide 1 concise tactical sentence in "reasoning" explaining whether a System Trap or Loss Streak Protection was triggered, the detected pattern/trap type, and why the target outcome was selected.`;

      let aiResponse: any;
      try {
        aiResponse = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                predictionType: { type: Type.STRING, description: "SIZE or COLOR" },
                targetResult: { type: Type.STRING, description: "BIG, SMALL, GREEN, or RED" },
                predictedOutcome: { type: Type.STRING, description: "BIG or SMALL" },
                predictedColor: { type: Type.STRING, description: "GREEN or RED" },
                primaryNumber: { type: Type.INTEGER, description: "Primary recommended number (0-9)" },
                secondaryNumber: { type: Type.INTEGER, description: "Secondary recommended number (0-9)" },
                confidence: { type: Type.NUMBER, description: "Winning confidence percentage (88.0 - 99.2)" },
                sizeConfidence: { type: Type.NUMBER, description: "Size winning confidence percentage" },
                colorConfidence: { type: Type.NUMBER, description: "Color winning confidence percentage" },
                isSystemTrapDetected: { type: Type.BOOLEAN, description: "True if WINGO system trap/bait is detected" },
                trapType: { type: Type.STRING, description: "Name of the system trap detected" },
                trapCounterAction: { type: Type.STRING, description: "Counter action taken against trap" },
                reasoning: { type: Type.STRING, description: "Tactical reasoning for decision" },
                dominantPattern: { type: Type.STRING, description: "Detected pattern or counter-trap name" },
              },
              required: [
                "predictionType",
                "targetResult",
                "predictedOutcome",
                "predictedColor",
                "primaryNumber",
                "secondaryNumber",
                "confidence",
                "sizeConfidence",
                "colorConfidence",
                "isSystemTrapDetected",
                "reasoning",
                "dominantPattern",
              ],
            },
          },
        });
      } catch (firstModelError: any) {
        // Fallback to gemini-3.1-pro-preview if flash fails
        try {
          aiResponse = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  predictionType: { type: Type.STRING, description: "SIZE or COLOR" },
                  targetResult: { type: Type.STRING, description: "BIG, SMALL, GREEN, or RED" },
                  predictedOutcome: { type: Type.STRING, description: "BIG or SMALL" },
                  predictedColor: { type: Type.STRING, description: "GREEN or RED" },
                  primaryNumber: { type: Type.INTEGER, description: "Primary recommended number (0-9)" },
                  secondaryNumber: { type: Type.INTEGER, description: "Secondary recommended number (0-9)" },
                  confidence: { type: Type.NUMBER, description: "Winning confidence percentage (88.0 - 99.2)" },
                  sizeConfidence: { type: Type.NUMBER, description: "Size winning confidence percentage" },
                  colorConfidence: { type: Type.NUMBER, description: "Color winning confidence percentage" },
                  isSystemTrapDetected: { type: Type.BOOLEAN, description: "True if WINGO system trap/bait is detected" },
                  trapType: { type: Type.STRING, description: "Name of the system trap detected" },
                  trapCounterAction: { type: Type.STRING, description: "Counter action taken against trap" },
                  reasoning: { type: Type.STRING, description: "Tactical reasoning for decision" },
                  dominantPattern: { type: Type.STRING, description: "Detected pattern or counter-trap name" },
                },
                required: [
                  "predictionType",
                  "targetResult",
                  "predictedOutcome",
                  "predictedColor",
                  "primaryNumber",
                  "secondaryNumber",
                  "confidence",
                  "sizeConfidence",
                  "colorConfidence",
                  "isSystemTrapDetected",
                  "reasoning",
                  "dominantPattern",
                ],
              },
            },
          });
        } catch (secondError: any) {
          return res.json({ success: false, reason: "Gemini API unavailable or quota reached. Fallback to pattern engine." });
        }
      }

      const parsedData = JSON.parse(aiResponse.text.trim());
      res.json({ success: true, aiPrediction: parsedData });
    } catch (err: any) {
      console.warn("Gemini prediction call error:", err?.message || err);
      res.json({ success: false, error: err?.message || "Failed to process Gemini prediction" });
    }
  });

  // Proxy endpoint for Wingo 1M History
  app.get("/api/wingo-history", async (req, res) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const targetUrl = "https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-1m-100";
      
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Upstream API status: ${response.status}`);
      }

      const json = await response.json();
      
      let rawList: any[] = [];
      if (Array.isArray(json)) {
        rawList = json;
      } else if (json?.data && Array.isArray(json.data.list)) {
        rawList = json.data.list;
      } else if (json?.data && Array.isArray(json.data)) {
        rawList = json.data;
      } else if (Array.isArray(json?.list)) {
        rawList = json.list;
      } else if (Array.isArray(json?.history)) {
        rawList = json.history;
      }

      if (!Array.isArray(rawList) || rawList.length === 0) {
        throw new Error("Empty array from Wingo API");
      }

      // Normalize items cleanly
      const normalizedList = rawList.map((item: any, idx: number) => {
        const num = Number(item.number !== undefined ? item.number : 0);
        const period = String(item.issueNumber || item.period || item.issue || (Date.now() - idx * 60000));
        const rawSize = (item.size || '').toString().toUpperCase();
        const size = (rawSize === 'BIG' || rawSize === 'SMALL') ? rawSize : (num >= 5 ? 'BIG' : 'SMALL');

        const rawColour = (item.colour || item.color || '').toString().toLowerCase();
        let color = 'GREEN';
        if (rawColour.includes('violet')) {
          color = rawColour.includes('red') ? 'RED_VIOLET' : rawColour.includes('green') ? 'GREEN_VIOLET' : 'VIOLET';
        } else if (rawColour.includes('red')) {
          color = 'RED';
        } else if (rawColour.includes('green')) {
          color = 'GREEN';
        } else {
          if (num === 0) color = 'RED_VIOLET';
          else if (num === 5) color = 'GREEN_VIOLET';
          else if ([2, 4, 6, 8].includes(num)) color = 'RED';
          else color = 'GREEN';
        }

        return {
          issueNumber: period,
          period: period,
          number: num,
          size: size,
          color: color,
          time: item.time || '',
        };
      });

      res.json({ success: true, source: "live", count: normalizedList.length, data: normalizedList });
    } catch (err: any) {
      console.warn("Wingo live API fetch error/fallback:", err?.message || err);
      
      const fallbackList = generateFallbackWingoHistory(100);
      res.json({
        success: true,
        source: "simulated_fallback",
        error: err?.message || "Failed to fetch remote API",
        data: fallbackList
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware setup
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
    console.log(`[ULTRA PREDICTION SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

// Fallback generator for Wingo 1M data when API is unreachable
function generateFallbackWingoHistory(count: number) {
  const list = [];
  const now = new Date();
  
  // Format current minute as Wingo period id: YYYYMMDD1000 + minute sequence number
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const currentMinuteOfDay = now.getHours() * 60 + now.getMinutes();
  
  const basePeriodNumber = parseInt(`${yyyy}${mm}${dd}100000`, 10) + currentMinuteOfDay;

  // Generate sequence with patterns
  let lastNum = Math.floor(Math.random() * 10);
  for (let i = 0; i < count; i++) {
    const period = String(basePeriodNumber - i);
    
    // Simulate slight non-randomness / pattern clustering
    let rand = Math.random();
    let num: number;
    if (rand < 0.45) {
      // Dragon/streak tendency
      num = (lastNum + (Math.random() > 0.5 ? 1 : 2)) % 10;
    } else if (rand < 0.7) {
      // Repeat small/big
      const isLastBig = lastNum >= 5;
      num = isLastBig ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 5);
    } else {
      num = Math.floor(Math.random() * 10);
    }
    
    lastNum = num;
    
    const size = num >= 5 ? "BIG" : "SMALL";
    let color = "GREEN";
    if (num === 0) color = "RED_VIOLET";
    else if (num === 5) color = "GREEN_VIOLET";
    else if ([2, 4, 6, 8].includes(num)) color = "RED";
    else color = "GREEN";

    list.push({
      issueNumber: period,
      period: period,
      number: num,
      size: size,
      color: color,
      type: size.toLowerCase(),
      time: new Date(now.getTime() - i * 60000).toISOString(),
    });
  }
  
  return list;
}

startServer();
