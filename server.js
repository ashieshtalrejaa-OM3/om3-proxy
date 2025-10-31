const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// NAYA FRESH KEY (ABHI BANAYA HAI)
const GEMINI_KEY = "AIzaSyC9dE8fG7hI6jK5lM4nO3pQ2rS1tU0vW9x";

app.post('/', async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt missing' });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();

        // ERROR HANDLING
        if (data.error) {
            console.error("Gemini Error:", data.error);
            return res.status(500).json({ error: data.error.message });
        }

        // SUCCESS PATH
        const text = data.candidates[0]?.content?.parts[0]?.text || "No content generated.";
        res.json({ content: text });

    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'OM3 Proxy LIVE', time: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`OM3 Proxy LIVE on port ${port}`);
});
