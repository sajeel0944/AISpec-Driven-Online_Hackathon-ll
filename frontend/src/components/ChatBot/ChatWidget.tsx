"use client";

import { useState, useEffect } from "react";
import ChatPanel from "./ChatBot";
import FloatingButton from "./FloatingButton";
import { UserDetails } from "@/types/chatbot.types";
import { useChatBotSSE } from "@/hooks/useChatBotSSE";
import GetUserData from "@/utils/GetUserData";

export default function ChatWidget({
  PanelType,
  suggestedQuestions,
  isOpen,
  setIsOpen,
}: {
  PanelType: string;
  suggestedQuestions: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { messages, isStreaming, sendMessage, clearMessages } = useChatBotSSE();

  const info = GetUserData();
  const [UserData] = useState<UserDetails>({
    email: info?.email || "",
    firstName: info?.firstName || "Guest",
    lastName: info?.lastName || "",
  });

  // Show notification when new message arrives while closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setHasNewMessage(true);
      }
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(message, UserData);
  };

  const handleClearMessages = () => {
    clearMessages();
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      <FloatingButton
        isOpen={isOpen}
        onToggle={handleToggle}
        hasNewMessage={hasNewMessage}
      />

      <ChatPanel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        isStreaming={isStreaming}
        onSendMessage={handleSendMessage}
        onClearMessages={handleClearMessages}
        PanelType={PanelType}
        suggestedQuestions={suggestedQuestions}
      />
    </>
  );
}
