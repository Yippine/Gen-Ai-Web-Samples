const express = require("express");
const router = express.Router();
const { getConfig, setConfig } = require("../utils/config-manager");

router.get("/apikey/:api", (req, res) => {
    const apiKey = getConfig(`${req.params.api}ApiKey`) || "";
    res.json({ apiKey });
});

router.post("/apikey/:api", (req, res) => {
    const { apiKey } = req.body;
    setConfig(`${req.params.api}ApiKey`, apiKey);
    res.json({ success: true });
});

module.exports = router;
