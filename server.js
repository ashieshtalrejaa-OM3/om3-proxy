const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const GEMINI_KEY = "PASTE_YOUR_NEW_GEMINI_KEY_HERE"; // ← YAHAN NAYA KEY DAALO

app.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                method: 'POST',
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const data = await response.json();
        res.json({ content: data.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: 'API Error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
