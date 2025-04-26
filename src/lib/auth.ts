
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error("Login error:", error);
    
    // Check specifically for email not confirmed error
    if (error.message === "Email not confirmed") {
      throw new Error("Please verify your email before signing in. Check your inbox for a confirmation link.");
    }
    
    throw error;
  }
  
  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error("Signup error:", error);
    throw error;
  }
  
  if (data.user && !data.session) {
    toast.info("Please check your email for verification link");
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });
  
  if (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
  
  return { success: true };
}
