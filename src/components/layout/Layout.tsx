
import React from "react";
import Navbar from "./Navbar";
import ChatBot from "../chatbot/ChatBot";
import { toast } from "sonner";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // Show a toast to notify the user about connecting to Supabase
  React.useEffect(() => {
    toast.info(
      "Connect to Supabase to enable authentication and data storage",
      {
        description: "Click the green Supabase button in the top right",
        duration: 8000,
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">{children}</main>
      <ChatBot />
    </div>
  );
};

export default Layout;
