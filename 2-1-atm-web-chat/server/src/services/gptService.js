const OpenAI = require("openai");
const config = require("../config/default.json");

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

exports.generateResponse = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
            max_tokens: 150,
            temperature: 0.7,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating GPT response:", error);
        throw new Error("Failed to generate response");
    }
};
