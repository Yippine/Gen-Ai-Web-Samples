const express = require("express");
const router = express.Router();
const { getConfig, setConfig } = require("../utils/config-manager");

router.get("/", (req, res) => {
    res.json({
        username: getConfig("username") || "",
        userIcon: getConfig("userIcon") || "",
    });
});

router.post("/", (req, res) => {
    const { username, userIcon } = req.body;
    setConfig("username", username);
    setConfig("userIcon", userIcon);
    res.json({ success: true });
});

module.exports = router;
