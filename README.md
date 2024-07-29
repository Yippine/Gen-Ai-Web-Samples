# Gen AI Web App

# Fashion Fortune Predictor 時尚運勢預測器

Fashion Fortune Predictor 是一個有趣的網頁應用，它結合了時尚、星座和血型，為使用者提供個性化的每日運勢預測。這個應用利用 OpenAI 的 GPT-4o mini 模型，根據使用者的穿搭、血型和星座生成獨特的運勢分析。

## 功能特點

- 隨機選擇時尚穿搭照片
- 根據血型、星座和日期生成運勢預測
- 實時串流輸出預測結果
- 響應式設計，兼容各種設備

## 安裝步驟

1. 克隆儲存庫：
   ```
   git clone https://github.com/your-username/Gen-AI-Web-App.git
   cd Gen-AI-Web-App/1-Fashion\ Fortune\ Predictor/
   ```

2. 設定環境變量：
   - 將`.env.sample`文件重新命名為`.env`
   - 在`.env`文件中填入您的 OpenAI API 密鑰：
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

3. 加入時尚照片：
   - 將您喜歡的時尚照片放入`public/images`目錄

4. 安裝依賴：
   ```
   npm install express openai dotenv
   ```

5. 啟動服務器：
   ```
   node server.js
   ```

6. 在瀏覽器中訪問 `http://localhost:3000` 即可使用網頁應用

## 使用方法

1. 打開應用後，您會看到一個隨機選擇的時尚照片，以及隨機生成的血型和星座資訊。
2. 點擊「隨機照片」按鈕可以更換照片和相關資訊。
3. 點擊「生成運勢」按鈕，應用將根據當前顯示的資訊生成一份個性化的運勢預測。
4. 預測結果將實時顯示在頁面上。

## 技術棧

- 後端：Node.js、Express
- 前端：HTML、CSS、JavaScript
- AI：OpenAI GPT-4o mini API
- 其他：dotenv（環境變量管理）

## 貢獻

歡迎提交問題和功能請求。如果您想貢獻代碼，請提交拉取請求。

## 許可證

MIT license

---

享受您的時尚運勢預測之旅！