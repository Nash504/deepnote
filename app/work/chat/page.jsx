'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, MoveLeft } from 'lucide-react';


export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello there!', sender: 'bot', timestamp: new Date().toLocaleTimeString() },
        { id: 2, text: 'Hi! How can I help you today?', sender: 'bot', timestamp: new Date().toLocaleTimeString() }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages([...messages, userMessage]);
        setNewMessage('');
        
        // Simulate bot response after a delay
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                text: `I received: "${newMessage}"`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    // Auto-scroll to the bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen max-w-3xl mx-auto">
           
            <div className="bg-blue-500 text-white p-4 text-center">
                <h1 className="text-xl font-bold">Chat Demo</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                        <div 
                            className={`inline-block p-3 rounded-lg ${
                                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                        >
                            <p>{message.text}</p>
                            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}