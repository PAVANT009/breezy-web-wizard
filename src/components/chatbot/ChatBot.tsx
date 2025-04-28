
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getFeedback } from "@/lib/feedback";
import { MessageCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import LoadingIndicator from "./LoadingIndicator";
import ChatInput from "./ChatInput";
import { Message } from "./types";

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
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);
  const { user } = useAuth();
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [feedbackLoaded, setFeedbackLoaded] = useState(false);

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user && isOpen && !feedbackLoaded) {
      const loadFeedback = async () => {
        try {
          const data = await getFeedback();
          setFeedbackData(data);
          setFeedbackLoaded(true);
        } catch (error) {
          console.error("Error loading feedback data:", error);
        }
      };
      
      loadFeedback();
    }
  }, [user, isOpen, feedbackLoaded]);

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

    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { message },
      });

      if (error) throw error;

      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: "bot" as const,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      toast.error('Failed to get AI response. Please try again.');
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: "bot" as const,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

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
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
          </div>
        </ScrollArea>

        <ChatInput
          message={message}
          setMessage={setMessage}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ChatBot;
