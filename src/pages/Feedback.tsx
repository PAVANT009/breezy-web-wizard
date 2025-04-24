import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getFeedback } from "@/lib/feedback";

const Feedback = () => {
  const { data: feedbackItems, isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: getFeedback
  });

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeedback = (feedbackItems || []).filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      return false;
    }

    if (priorityFilter !== "all" && item.priority !== priorityFilter) {
      return false;
    }

    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "bug":
        return "destructive";
      case "feature":
        return "primary";
      case "improvement":
        return "secondary";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "warning";
      case "critical":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Community Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Browse and filter feedback submitted by our community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-card rounded-lg shadow-sm border">
          <div className="flex-1">
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="improvement">Improvement</SelectItem>
                <SelectItem value="general">General Feedback</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={priorityFilter}
              onValueChange={setPriorityFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredFeedback.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No feedback found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredFeedback.map((item) => (
              <Card key={item.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>
                        Submitted on {formatDate(item.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={`bg-${getCategoryColor(item.category)}/10`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={`bg-${getPriorityColor(item.priority)}/10`}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    From: {item.email}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Comment
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Feedback;
