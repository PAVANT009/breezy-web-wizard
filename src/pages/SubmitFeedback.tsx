import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { submitFeedback } from "@/lib/feedback";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitFeedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await submitFeedback(data);
      toast.success("Feedback submitted successfully!");
      navigate("/feedback");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit feedback");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Submit Your Feedback</h1>
          <p className="text-muted-foreground mt-2">
            We value your input to help us improve our products and services.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief summary of your feedback" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short, descriptive title for your feedback.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed information about your feedback"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide as much detail as possible.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="improvement">Improvement</SelectItem>
                          <SelectItem value="general">General Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll use this to follow up on your feedback.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitFeedback;
