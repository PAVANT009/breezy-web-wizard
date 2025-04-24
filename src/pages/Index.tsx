
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <section className="py-12 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Community Feedback Collector
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collect and manage feedback from your community members to build
            better products and services.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/submit-feedback">
            <Button size="lg">Submit Feedback</Button>
          </Link>
          <Link to="/feedback">
            <Button variant="outline" size="lg">
              View All Feedback
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Collect Feedback</h3>
            <p className="text-muted-foreground">
              Gather valuable insights from your community through our
              streamlined feedback submission form.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-secondary"
              >
                <path d="M2 9a3 3 0 0 1 0 6h1.83c.31 0 .62.1.87.28l4.96 3.54c.92.66 2.2.66 3.12 0l4.96-3.54c.25-.18.56-.28.87-.28H20a3 3 0 0 0 0-6h-1.83c-.31 0-.62-.1-.87-.28l-4.96-3.54a2.46 2.46 0 0 0-3.12 0L4.26 8.72A1.59 1.59 0 0 1 3.39 9H2Z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Analyze Results</h3>
            <p className="text-muted-foreground">
              Categorize and prioritize feedback to identify patterns and make
              data-driven decisions.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-accent"
              >
                <path d="M12 2v4" />
                <path d="m6.41 6.41 2.83 2.83" />
                <path d="M2 12h4" />
                <path d="m6.41 17.59 2.83-2.83" />
                <path d="M12 18v4" />
                <path d="m17.59 17.59-2.83-2.83" />
                <path d="M22 12h-4" />
                <path d="m17.59 6.41-2.83 2.83" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Take Action</h3>
            <p className="text-muted-foreground">
              Implement changes based on feedback and close the loop by
              communicating back to your community.
            </p>
          </div>
        </div>

        <div className="mt-12 border rounded-lg p-6 bg-primary/5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Start Collecting Feedback?
            </h2>
            <p className="text-muted-foreground mb-6">
              Set up your feedback collection system in minutes and start
              gaining valuable insights from your community.
            </p>
            <div className="flex justify-center">
              <Link to="/submit-feedback">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
