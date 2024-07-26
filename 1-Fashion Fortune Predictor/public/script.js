let images = [];  
const bloodTypes = ['A', 'B', 'AB', 'O'];
const zodiacs = ['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'];

async function loadImages() {
    try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        images = await response.json();
        console.log("Loaded images:", images); // 加入這行來檢查載入的圖片
    } catch (error) {
        console.error("Error loading images:", error);
        images = ["Portrait_1.jpg", "Portrait_2.jpg"]; // 降級方案
    }
}

function randomize() {
    if (images.length === 0) {
        console.error("No images available");
        return;
    }
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageUrl = `./images/${randomImage}`;
    console.log("Setting image:", imageUrl); // 加入這一行來檢查選取的圖片
    document.getElementById("imagePreview").src = imageUrl;
    document.getElementById('bloodType').textContent = `血型：${bloodTypes[Math.floor(Math.random() * bloodTypes.length)]}`;
    document.getElementById('zodiac').textContent = `星座：${zodiacs[Math.floor(Math.random() * zodiacs.length)]}`;
    document.getElementById('date').textContent = `日期：${new Date().toISOString().split('T')[0]}`;
}

document.addEventListener('DOMContentLoaded', async () => {  
    await loadImages();  
    randomize();  
    document.getElementById('generateFortune').addEventListener('click', generateFortune);  
    document.getElementById('randomize').addEventListener('click', randomize);  
});

async function generateFortune() {
    const imageName = document.getElementById('imagePreview').src.split('/').pop();
    const bloodType = document.getElementById('bloodType').textContent.split('：')[1];
    const zodiac = document.getElementById('zodiac').textContent.split('：')[1];
    const date = document.getElementById('date').textContent.split('：')[1];

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '正在生成運勢...';

    try {
        const response = await fetch('/generate-fortune', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageName, bloodType, zodiac, date }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        resultDiv.innerHTML = '';

        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value);
            const lines = buffer.split('\n\n');
            buffer = lines.pop();

            for (const line of lines) {
                console.log(`Line: ${line}`);
                if (line.startsWith('data: ')) {
                    const data = line.slice(5).trim();
                    if (data === '[DONE]') {
                        console.log('Stream complete');
                        return;
                    }
                    try {
                        const parsedData = JSON.parse(data);
                        if (parsedData.content) {
                            resultDiv.innerHTML += marked.parse(parsedData.content);
                        }
                    } catch (error) {
                        console.error('Error parsing JSON:', error, 'Data:', data);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = '生成運勢時出錯，請稍後再試。';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadImages();
    randomize();
    document.getElementById("generateFortune").addEventListener("click", generateFortune);
    document.getElementById("randomize").addEventListener("click", randomize);
});
