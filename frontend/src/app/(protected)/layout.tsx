// app/(protected)/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../../lib/auth/auth.service";
import ChatWidget from "@/components/ChatBot/ChatWidget";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main>{children}</main>
      <ChatWidget
        PanelType="Todo"
        suggestedQuestions={[
          "Show me my pending tasks.",
          "Show me all my completed tasks.",
          "Show me my due tasks.",
        ]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
