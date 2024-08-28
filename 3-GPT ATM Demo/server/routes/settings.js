const express = require("express");
const router = express.Router();
const { getConfig, setConfig } = require("../utils/config-manager");

router.get("/", (req, res) => {
  res.json({
    username: getConfig("username") || "",
  });
});

router.post("/", (req, res) => {
  const { username } = req.body;
  setConfig("username", username);
  res.json({ success: true });
});

module.exports = router;
