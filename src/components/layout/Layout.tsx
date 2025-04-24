
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ChatBot from "../chatbot/ChatBot";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);

  // Only show the toast if we haven't connected to Supabase yet
  useEffect(() => {
    // Check if we already have a connection to Supabase
    const checkConnection = async () => {
      try {
        // Try to make a simple query to verify connection
        const { error } = await supabase.auth.getSession();
        
        // If there's no error, we're connected
        if (!error) {
          // Connection successful, do nothing
          setHasCheckedConnection(true);
        } else if (!hasCheckedConnection) {
          // Show toast only the first time
          toast.info(
            "Connect to Supabase to enable authentication and data storage",
            {
              description: "Click the green Supabase button in the top right",
              duration: 8000,
            }
          );
          setHasCheckedConnection(true);
        }
      } catch (error) {
        // If there's an error (not connected), show the toast
        if (!hasCheckedConnection) {
          toast.info(
            "Connect to Supabase to enable authentication and data storage",
            {
              description: "Click the green Supabase button in the top right",
              duration: 8000,
            }
          );
          setHasCheckedConnection(true);
        }
      }
    };

    checkConnection();
  }, [hasCheckedConnection]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">{children}</main>
      <ChatBot />
    </div>
  );
};

export default Layout;
