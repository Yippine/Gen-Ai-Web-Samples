const config = require("../config/default.json");

module.exports = (req, res, next) => {
    const apiKey = req.header("X-API-Key");

    if (!apiKey || apiKey !== config.apiKey) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};
