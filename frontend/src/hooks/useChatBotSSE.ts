import { AiMessage, UserDetails } from "@/types/chatbot.types";
import { useState, useCallback, useRef, useEffect } from "react";

export function useChatBotSSE() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<AiMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const cleanSSEText = (text: string): string => {
    let cleaned = text.replace(/^data:\s*/g, "");
    cleaned = cleaned.replace(/^: ping - .*/g, "");

    cleaned = cleaned
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith(":") && line !== "data:")
      .join("\n")
      .trim();

    return cleaned;
  };

  const sendMessage = useCallback(
    async (userMessage: string, userData: UserDetails) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsStreaming(true);
      setError(null);

      try {
        const userAiMessage: AiMessage = {
          role: "user",
          content: userMessage,
          timestamp: new Date(),
        };

        const updatedMessages = [...messagesRef.current, userAiMessage];
        setMessages(updatedMessages);

        const base_url = process.env.NEXT_PUBLIC_API_URL;

        // is main timestampt ko remove kar raha ho ky wo backned main nhi jaye
        type MessagePayload = Omit<AiMessage, "timestamp">;

        const payload = {
          user_message: updatedMessages.map(
            (m): MessagePayload => ({
              role: m.role,
              content: m.content,
            }),
          ),
          user_data: userData,
        };

        const response = await fetch(`${base_url}/todo/agent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: abortController.signal,
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        if (!response.body) throw new Error("No response body");

        const assistantMessage: AiMessage = {
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";
        let accumulatedContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          buffer += chunk;

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim() || line.includes(": ping")) continue;

            const cleaned = cleanSSEText(line);
            if (cleaned) {
              accumulatedContent += cleaned + "\n";

              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];

                if (lastMessage.role === "assistant") {
                  lastMessage.content = accumulatedContent.trim();
                }

                return newMessages;
              });
            }
          }
        }

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];

          if (lastMessage.role === "assistant") {
            lastMessage.content = accumulatedContent.trim();
          }

          return newMessages;
        });
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setError("Failed to send message");
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  };
}