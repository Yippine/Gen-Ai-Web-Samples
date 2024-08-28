const fs = require("fs-extra");
const path = require("path");
const ini = require("ini");
const os = require("os");

const CONFIG_DIR = path.join(os.homedir(), ".gpt-atm-demo");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.ini");

// 確保配置目錄存在
fs.ensureDirSync(CONFIG_DIR);

function readConfig() {
    if (fs.existsSync(CONFIG_PATH)) {
        return ini.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    }
    return {};
}

function writeConfig(config) {
    fs.writeFileSync(CONFIG_PATH, ini.stringify(config));
}

module.exports = {
    getConfig: (key) => {
        const config = readConfig();
        return key ? config[key] : config;
    },
    setConfig: (key, value) => {
        const config = readConfig();
        config[key] = value;
        writeConfig(config);
    },
    CONFIG_DIR,
};
