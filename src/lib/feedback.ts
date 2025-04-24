
import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase
    .from("feedback")
    .select(`
      *,
      profiles:profiles(username, full_name)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
