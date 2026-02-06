export type MessageRole = "system" | "user" | "assistant";

export interface AiMessage {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ChatApiPayload {
  user_message: AiMessage[];
  user_data: UserDetails;
}

export interface ChatMessageProps {
  message: AiMessage;
  isTyping?: boolean;
}


export type FormattedBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "task";
      title: string;
      fields: { label: string; value: string }[];
    };