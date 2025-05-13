import ChatMessage from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Message {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
}

const Index = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            content: "Hello! How can I help you today?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === "") return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const API_URL = (import.meta as unknown as { env: { VITE_API_HOST: string } }).env.VITE_API_HOST;

        try {
            // Replace with your actual API endpoint
            const response = await fetch(`${API_URL}/private/qa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: input,
                }),
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();
            console.log(data);

            // Add bot response
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.response || "I'm having trouble connecting to my brain right now. Please try again.",
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching from API:", error);

            // Add error message from bot
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, I'm having trouble connecting to the API right now. Please try again later.",
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
            toast.error("Failed to connect to the chatbot API");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
                <h1 className="text-lg font-medium text-center text-gray-800">AI Chatbot</h1>
            </header>

            <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 max-w-4xl mx-auto w-full">
                <Card className="flex-1 overflow-hidden flex flex-col rounded-lg shadow-sm border border-gray-200">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        {isLoading && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                                <span>AI is thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || input.trim() === ""}
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Index;