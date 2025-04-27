
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function getFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select(`
      *,
      profiles:profiles(username, full_name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching feedback:", error);
    toast.error("Unable to load feedback. Please try again.");
    return [];
  }

  return data || [];
}
