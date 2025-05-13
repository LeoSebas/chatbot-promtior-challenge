
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(message.timestamp);

  return (
    <div
      className={cn(
        "flex items-start gap-3 group",
        message.isUser && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
          message.isUser ? "bg-primary text-primary-foreground" : "bg-white"
        )}
      >
        {message.isUser ? (
          <span className="text-sm font-medium">You</span>
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>
      <div
        className={cn(
          "flex flex-col space-y-1 max-w-[80%] md:max-w-[70%]",
          message.isUser && "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2 shadow-sm",
            message.isUser
              ? "bg-primary text-primary-foreground"
              : "bg-white border border-gray-200"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500">{formattedTime}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
