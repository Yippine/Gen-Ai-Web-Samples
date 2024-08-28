const express = require("express");
const ini = require("ini");
const fs = require("fs-extra");
const path = require("path");
const app = express();
const port = 3000;

// 設定 INI 文件路徑
const configDir = path.join(
  process.env.APPDATA || process.env.HOME,
  ".gpt-atm-demo"
);
const iniPath = path.join(configDir, "config.ini");
// 確保目錄存在
fs.ensureDirSync(configDir);
app.use(express.json());

// 讀取設定
app.get("/api/settings", (req, res) => {
  try {
    const config = ini.parse(fs.readFileSync(iniPath, "utf-8"));
    res.json({
      username: config.username || "",
      botName: config.botName || "ATM",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read settings" });
  }
});

// 保存設定
app.post("/api/settings", (req, res) => {
  try {
    const { username, botName } = req.body;
    const config = ini.parse(
      fs.existsSync(iniPath) ? fs.readFileSync(iniPath, "utf-8") : ""
    );
    config.username = username;
    config.botName = botName;
    fs.writeFileSync(iniPath, ini.stringify(config));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

// 讀取 API Key
app.get("/api/apikey/:api", (req, res) => {
  try {
    const config = ini.parse(
      fs.existsSync(iniPath) ? fs.readFileSync(iniPath, "utf-8") : ""
    );
    res.json({ apiKey: config[`${req.params.api}ApiKey`] || "" });
  } catch (error) {
    res.status(500).json({ error: "Failed to read API key" });
  }
});

// 保存 API Key
app.post("/api/apikey/:api", (req, res) => {
  try {
    const { apiKey } = req.body;
    const config = ini.parse(
      fs.existsSync(iniPath) ? fs.readFileSync(iniPath, "utf-8") : ""
    );
    config[`${req.params.api}ApiKey`] = apiKey;
    fs.writeFileSync(iniPath, ini.stringify(config));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save API key" });
  }
});

// 靜態文件服務
app.use(express.static(path.join(__dirname, "../client/dist")));

// 處理前端路由
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
