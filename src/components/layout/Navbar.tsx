
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
          <span className="text-xl font-bold">Community Feedback</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/feedback">
            <Button variant="ghost">All Feedback</Button>
          </Link>
          <Link to="/submit-feedback">
            <Button>Submit Feedback</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
