import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export const sendMessage = async (message) => {
    try {
        const response = await api.post("/chat", { message });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const performATMOperation = async (operation, amount) => {
    try {
        const response = await api.post("/atm", { operation, amount });
        return response.data;
    } catch (error) {
        console.error("Error performing ATM operation:", error);
        throw error;
    }
};

// 新增一個用於獲取餘額的函數
export const getBalance = async () => {
    try {
        const response = await api.get("/atm/balance");
        return response.data;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
};
