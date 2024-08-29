const express = require("express");
const router = express.Router();
const { getConfig, setConfig } = require("../utils/config-manager");

router.get("/", (req, res) => {
  res.json({
    userName: getConfig("userName") || "",
    botName: getConfig("botName") || "",
  });
});

router.post("/", (req, res) => {
  const { userName, botName } = req.body;
  setConfig("userName", userName);
  setConfig("botName", botName);
  res.json({ success: true });
});

module.exports = router;
