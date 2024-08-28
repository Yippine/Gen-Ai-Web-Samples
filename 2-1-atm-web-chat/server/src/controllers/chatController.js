const gptService = require("../services/gptService");

exports.processMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await gptService.generateResponse(message);
        res.json({ message: response });
    } catch (error) {
        console.error("Error processing message:", error);
        res.status(500).json({ error: "An error occurred while processing the message" });
    }
};
