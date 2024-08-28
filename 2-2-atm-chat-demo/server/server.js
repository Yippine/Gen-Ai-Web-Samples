require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const atm = require("./atm");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful AI assistant for an ATM. Provide information about account balance, transactions, and help with ATM operations." },
                { role: "user", content: message },
            ],
        });

        // const aiResponse = completion.choices[0].message.content;
        // console.log(`AI response: ${aiResponse}`);

        // Process ATM operations based on AI response
        // const { newBalance, operationResponse } = atm.processOperation(aiResponse);
        const { newBalance, operationResponse } = atm.processOperation(message);

        res.json({
            message: operationResponse || aiResponse,
            balance: newBalance,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
