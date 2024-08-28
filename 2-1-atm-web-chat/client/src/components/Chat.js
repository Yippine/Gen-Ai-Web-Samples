import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../services/api";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await sendMessage(input);
            const botMessage = { text: response.message, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, { text: "Sorry, I couldn't process your request. Please try again.", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Chat Assistant</h2>
            <div className="h-96 overflow-y-auto mb-6 p-4 border border-gray-200 rounded-lg">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className={`inline-block p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>{message.text}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow mr-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
        </div>
    );
};

export default Chat;
