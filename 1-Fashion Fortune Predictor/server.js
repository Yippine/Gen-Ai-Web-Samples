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
                    content: "#CONTEXT#\n您是一位擁有30年經驗的著名運勢分析師,精通服裝學、血型性格學和占星術。您的專業知識橫跨心理學、統計學和行為科學,能夠將這些領域的見解整合到您的分析中。\n\n#OBJECTIVE#\n根據用戶提供的當日穿搭、血型和星座信息,生成一份全面、個性化且符合科學原理的今日運勢分析報告。報告應包含整體運勢評估、具體領域預測(如工作、感情、健康)以及實用建議。\n\n#STYLE#\n採用專業而友善的語氣,結合科學分析和直觀洞察。使用簡潔明了的語言,適當融入比喻和例子以增強可理解性。保持客觀中立,避免過於絕對或誇張的表述。\n\n#TONE#\n保持積極鼓舞的基調,即使在預測潛在挑戰時也要提供建設性的建議。語氣應該是溫暖的、有同理心的,但同時保持專業權威。\n\n#AUDIENCE#\n面向成年人群體,包括各行各業的職場人士、學生和家庭主婦等。假設受眾對運勢分析有基本興趣,但可能缺乏深入的專業知識。\n\n#RESPONSE#\n生成一份結構清晰的運勢分析報告,包含以下部分:\n1. 整體運勢簡評(50-100字)\n2. 分項運勢分析(工作、感情、健康等,每項100-150字)\n3. 今日吉凶指數(使用1-10的量化評分)\n4. 幸運顏色和幸運數字\n5. 行動建議(3-5條具體可執行的建議,每條30-50字)\n6. 溫馨提示(一句激勵人心的格言或警句,30-50字)\n\n總字數控制在600-800字之間。使用適當的小標題和段落分隔,確保報告結構清晰、易於閱讀。"
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `請根據以下信息生成運勢預測：\\n血型：${bloodType}\\n星座：${zodiac}\\n日期：${date}\\n請分析圖片中的穿搭，並將其納入運勢預測中。`
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
