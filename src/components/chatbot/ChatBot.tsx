
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your community feedback assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate API call for chatbot response
    setTimeout(() => {
      // Hard-coded responses based on user input
      let botResponse = "";
      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        botResponse = "Hello! How can I assist you with community feedback today?";
      } else if (lowerCaseMessage.includes("feedback") && lowerCaseMessage.includes("submit")) {
        botResponse = "To submit feedback, click the 'Submit Feedback' button in the navigation bar or visit the /submit-feedback page.";
      } else if (lowerCaseMessage.includes("category") || lowerCaseMessage.includes("categories")) {
        botResponse = "We have several feedback categories: Bug Report, Feature Request, Improvement, and General Feedback.";
      } else if (lowerCaseMessage.includes("login") || lowerCaseMessage.includes("sign")) {
        botResponse = "To login, click the 'Login' button in the navigation bar. Note that you'll need to connect this project to Supabase for authentication to work.";
      } else if (lowerCaseMessage.includes("thank")) {
        botResponse = "You're welcome! Let me know if you need anything else.";
      } else {
        botResponse = "I don't have specific information about that. Once this project is connected to Supabase, I'll be able to provide more helpful responses.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
        },
      ]);
      setIsLoading(false);
    }, 1000);

    toast({
      title: "Note",
      description: "Connect to Supabase to enable real chatbot functionality",
    });
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg bg-primary hover:bg-primary/90"
        aria-label="Chat"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
        )}
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-4 w-80 sm:w-96 bg-card shadow-xl rounded-lg overflow-hidden border transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-primary/5">
          <h3 className="font-semibold">Community Assistant</h3>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>

        <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/10 text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary/10 rounded-lg px-3 py-2">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSendMessage}
          className="border-t p-4 flex gap-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
