import React, { useState, useEffect, useRef } from "react";

const ChatInterface = ({ onSendMessage, messages }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.user ? "bg-blue-500 text-white" : "bg-gray-200"}`}>{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="border-t p-4">
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-2 focus:outline-none" placeholder="Type your message..." />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
