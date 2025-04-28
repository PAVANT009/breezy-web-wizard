
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg px-3 py-2 max-w-[80%] ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary/10 text-foreground"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
