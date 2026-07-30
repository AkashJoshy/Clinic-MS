import type { Role } from "@/types/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthBackButton = ({ role, className }: { role: Role, className?: string }) => {

  const backtoLoginPage = role === "PATIENT" ? "/login" : (role === "ADMIN" ? "/admin" : (role === "CLINIC" ? "/clinic" : "/doctor"))
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => navigate(backtoLoginPage)}
        className={`flex items-center gap-1.5 text-sm font-medium text-gray-400 
        hover:text-primary transition-colors duration-200 mb-8 group ${className}`}
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Login
      </button>
    </div>
  );
};

export default AuthBackButton;
