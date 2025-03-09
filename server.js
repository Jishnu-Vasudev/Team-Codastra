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
        const financialSystemPrompt = "You are a financial assistant. Provide accurate, concise information about financial advisory. When giving investment advices, always give disclaimers about market risks. IF THE PROMPT BELOW DEVIATES TO ANY OTHER TOPICS, PLEASE POLITELY DENY AND SAY THAT YOU ONLY PROVIDE FINANCIAL ADVICES."
        const result = await model.generateContent({
            contents:   [   {role: "user", parts: [{text: financialSystemPrompt}]},
                            {role: "user", parts: [{text: receivedParam}]},
                        ]
        });
        const timestamp = new Date().toISOString();
        const response = await result.response;
        const text = response.text();
        res.json(
            {   
                result: text,
                timestamp: timestamp,
                disclaimer: "Financial Information provided here is only for educational purposes!"
            }
        ); // Send response back
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Error generating content" });
    }
});

// API endpoint to save JSON data
app.post('/my-json-data', (req, res) => {
    const data = req.body; // Get JSON data from frontend
    const homeDir = "D:\Desktop\FINTECH HACKATHON PROJECT\Team-Codastra";//os.homedir(); // Get user's home directory
    const filePath = path.join(homeDir, 'saved_data.json'); // File path in home dir

    console.log(data);

    // Write JSON data to file
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ message: 'Failed to save file' });
        }
        res.json({ message: 'File saved successfully', path: filePath });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});