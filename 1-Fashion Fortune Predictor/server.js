const { promisify } = require('util');
const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const fsPromises = require('fs').promises;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-fortune', async (req, res) => {
    const { imageName, bloodType, zodiac, date } = req.body;

    try {
        const imagePath = path.join(__dirname, 'public', 'images', imageName);
        const imageBuffer = await readFileAsync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "#CONTEXT#\n您是一位擁有 30 年經驗的著名運勢分析師，專精於服裝學、血型性格學和占星術。您的專業知識橫跨心理學、統計學和行為科學。您具有敏銳的觀察力，能夠準確辨識各種情境下的服裝顏色。\n\n#OBJECTIVE#\n根據使用者提供的上衣顏色（通過圖片）、星座、血型和日期，生成一份簡潔、個性化且專業的今日運勢分析。確保分析中明確提及這四項關鍵資訊。\n\n#STYLE#\n採用專業而友善的語氣，結合科學分析和直觀洞察。使用簡潔明了的語言，適當融入比喻增強可理解性。保持積極鼓舞的基調，即使在預測潛在挑戰時也要提供建設性的建議。\n\n#TONE#\n溫暖、有同理心，同時保持專業權威。讓使用者感受到分析的個人化和獨特性。\n\n#AUDIENCE#\n面向成年人群體，包括各行各業的職場人士、學生和家庭主婦等。假設受眾對運勢分析有基本興趣，但可能缺乏深入的專業知識。\n\n#RESPONSE#\n1. 首先，仔細分析提供的圖片，準確辨識上衣顏色。考慮各種光線條件、角度和可能的色彩變化。\n2. 生成一份不超過 100 個中文字的運勢分析報告，包含以下部分：\n   - 一句話呈現整體運勢簡評。\n   - 一句話呈現積極正面的行動建議。\n   - 一句話呈現溫馨體貼的總結和祝福。\n3. 將上述三句話以一個段落呈現，不使用 Markdown 格式或標題。\n4. 務必在分析中自然且巧妙地提及使用者輸入的四項資訊：上衣顏色、星座、血型、日期。\n5. 確保每次回應都包含這四項資訊，不遺漏任何一項。\n6. 以${language}進行輸出，適用該地區的字詞和語法習慣。\n\n注意：確保分析專業、個性化，避免負面或模糊的表述。讓使用者感受到 AI 分析的神奇之處。如果無法確定某項資訊（如上衣顏色），請禮貌地要求使用者提供更清晰的圖片或描述。"
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `請根據以下資訊生成運勢預測：\n星座：${zodiac}\n血型：${bloodType}\n日期：${date}\n請分析圖片中的上衣顏色，並將其納入運勢預測中。`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            // max_tokens: 300,
            stream: true,
        });

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        let buffer = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                buffer += content;
                if (buffer.endsWith('\n') || buffer.length > 100) {
                    const message = JSON.stringify({ content: buffer.trim() });
                    res.write(`data: ${message}\n\n`);
                    buffer = '';
                }
            }
        }
        if (buffer) {
            const message = JSON.stringify({ content: buffer.trim() });
            res.write(`data: ${message}\n\n`);
        }

        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '生成運勢時出錯，請稍後再試。', details: error.message });
    }
});

// 新增的路由來取得圖片列表
app.get('/api/images', async (req, res) => {
    try {
        const imageDir = path.join(__dirname, 'public', 'images');
        const files = await fsPromises.readdir(imageDir);
        const images = files.filter(file => 
            ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())
        );
        res.json(images);
    } catch (error) {
        console.error('Error reading image directory:', error);
        res.status(500).json({ error: 'Unable to retrieve images' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
