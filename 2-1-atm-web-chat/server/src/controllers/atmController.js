const atmService = require("../services/atmService");

exports.performOperation = async (req, res) => {
    try {
        const { operation, amount } = req.body;
        const result = await atmService.performOperation(operation, amount);
        res.json(result);
    } catch (error) {
        console.error("Error performing ATM operation:", error);
        res.status(500).json({ error: "An error occurred while performing the ATM operation" });
    }
};

exports.getBalance = async (req, res) => {
    try {
        const balance = await atmService.getBalance();
        res.json({ balance });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ error: "An error occurred while fetching the balance" });
    }
};
