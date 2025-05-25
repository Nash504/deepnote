"use client"

import { useState } from "react"
import { Send, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Chat() {
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")

    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I understand your question about the PDF content. Let me help you with that based on what I can see in the document.",
        },
      ])
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              {/* <CardTitle>{pdf?.name || "PDF Chat"}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {pdf?.category || "PDF"}
              </Badge> */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {/* {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))} */}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about the PDF..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

}