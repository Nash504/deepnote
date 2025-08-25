"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ChatInterface({ pdfName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // No API call needed - using pdfName directly.disabled
// const { data: publicData } = supabase.storage
//   .from(type)
//   .getPublicUrl(data.path);
// const fileUrl = publicData.publicUrl;
const fileUrl="https://xbcezaheqpgbffmcxjdr.supabase.co/storage/v1/object/public/question-papers/users/user_31jiuE2ivzqRToB4k9l5ROoONhE/uploads/OST_UNIT_III.pdf"
      // Call our backend API to get the AI's response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          pdfUrl: fileUrl, // Send the name of the PDF we're chatting with
// Send the user ID to locate the file in Supabase
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 truncate">
        Chat with: {pdfName}
      </h1>

      {/* Message display area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            Assistant is thinking...
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the PDF..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
