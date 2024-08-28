import React, { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import ATMInterface from "./components/ATMInterface";

function App() {
    const [messages, setMessages] = useState([]);
    const [balance, setBalance] = useState(1000); // Initial balance

    const sendMessage = async (text) => {
        const userMessage = { user: true, text };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("http://localhost:3001/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: text }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { user: false, text: data.message }]);
            if (data.balance !== undefined) {
                setBalance(data.balance);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, { user: false, text: "Sorry, there was an error processing your request." }]);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <h1 className="text-3xl font-bold p-4 bg-blue-600 text-white">ATM Chat Demo</h1>
                <ChatInterface onSendMessage={sendMessage} messages={messages} />
            </div>
            <div className="w-1/3 p-4">
                <ATMInterface balance={balance} />
            </div>
        </div>
    );
}

export default App;
