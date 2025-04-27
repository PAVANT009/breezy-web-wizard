
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function submitFeedback(feedback: {
  title: string;
  description: string;
  category: string;
  priority: string;
  email: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User must be logged in to submit feedback");

  const { data, error } = await supabase
    .from("feedback")
    .insert([{ ...feedback, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getFeedback() {
  // Remove the join with profiles that's causing the error
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching feedback:", error);
    toast.error("Unable to load feedback. Please try again.");
    return [];
  }

  return data || [];
}
