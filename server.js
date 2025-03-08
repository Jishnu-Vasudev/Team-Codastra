const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5500;

const genAI = new GoogleGenerativeAI("AIzaSyDEqzTY2yCZBQfTiK7qgZ0Dz7215UKKynI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Enable CORS for frontend requests

// API Route to handle requests from the frontend
app.post('/process-data', async (req, res) => {
    const receivedParam = req.body.param; // Get parameter from request body
    try {
        const result = await model.generateContent(receivedParam);
        const response = await result.response;
        const text = response.text();
        res.json({ result: text }); // Send response back
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Error generating content" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});