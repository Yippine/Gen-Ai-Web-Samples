# ATM 聊天機器人範例專案

## 專案概述

這是一個簡單的 ATM 聊天應用程式範例，前端使用 React 框架，後端採用 Express.js，並整合了 OpenAI 的 GPT-4o mini 模型。本專案旨在展示如何結合現代網頁技術與人工智慧，創造出互動式的金融服務體驗。

## 系統需求

- Node.js（版本 14 或更新）
- npm（Node.js 套件管理器）
- OpenAI API 金鑰

## 安裝指南

1. 複製專案儲存庫：
```git clone https://github.com/yourusername/atm-chat-demo.git
cd atm-chat-demo```

2. 安裝前後端相依套件：
```cd client
npm install
cd ../server
npm install```

3. 設定環境變數：
在 `server` 目錄下建立 `.env` 檔案，並加入您的 OpenAI API 金鑰：
```OPENAI_API_KEY=您的 API 金鑰```

## 執行應用程式

1. 啟動後端伺服器：

```cd server
npm start```

伺服器將在 `http://localhost:3001` 運行。

2. 開啟新的終端機視窗，啟動前端應用程式：

```cd client
npm start```

前端應用程式將在 `http://localhost:3000` 運行。

3. 在瀏覽器中開啟 `http://localhost:3000` 即可使用應用程式。

## 功能特色

- 互動式聊天界面，模擬 ATM 操作
- 支援基本 ATM 功能（查詢餘額、提款、存款）
- 整合 GPT-4o mini 模型，提供自然語言處理能力
- 即時更新帳戶餘額

## 專案結構

- `client/`：React 前端應用程式
- `src/components/`：React 元件
- `src/App.js`：主要應用程式元件
- `src/index.js`：應用程式入口點
- `server/`：Express.js 後端伺服器
- `server.js`：主要伺服器檔案
- `atm.js`：模擬 ATM 邏輯

## 客製化指南

您可以透過以下方式自訂應用程式：

1. 修改 React 元件（`client/src/components/`）以改變使用者界面
2. 調整 `server/atm.js` 中的 ATM 邏輯
3. 在 `server/server.js` 中修改 GPT 提示詞

## 專案限制

請注意，這是一個範例應用程式，存在以下限制：

- 未與實際銀行系統整合
- 錯誤處理機制有限
- 無使用者認證或連線管理功能

## 貢獻指南

我們歡迎各種形式的貢獻！如果您有任何改善建議或功能增添，請隨時提交 Pull Request。

## 授權資訊

本專案採用 [MIT 授權條款](LICENSE)，為開放原始碼專案。