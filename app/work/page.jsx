"use client";

import { useState, useRef, useEffect } from 'react';



export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to the chat!", sender: "system" }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;
        
        // Add user message
        const userMsg = { id: messages.length + 1, text: newMessage, sender: "user" };
        setMessages([...messages, userMsg]);
        
        // Simulate response (in a real app, this would be from an API)
        setTimeout(() => {
            const botMsg = { id: messages.length + 2, text: "Thanks for your message!", sender: "bot" };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
        
        setNewMessage("");
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header */}
            <header className="bg-lime-300 p-4">
                <h1 className="text-black font-bold text-2xl text-center">Chat App</h1>
            </header>
            
            {/* Chat container */}
            <div className="flex-1 p-4 overflow-y-auto max-w-3xl mx-auto w-full">
                <div className="space-y-4 pb-20">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                                    msg.sender === 'user' 
                                        ? 'bg-lime-300 text-black rounded-br-none' 
                                        : 'bg-white text-black rounded-bl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            {/* Message input */}
            <div className="fixed bottom-0 w-full bg-black border-t border-lime-300 p-4">
                <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 bg-black text-white border border-lime-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300"
                    />
                    <button 
                        type="submit"
                        className="bg-lime-300 text-black px-4 py-2 rounded-md font-medium hover:bg-lime-400 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}