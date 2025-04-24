
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
