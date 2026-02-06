// import React, { useState, useRef, useEffect } from 'react';
// import ChatMessage from './ChatMessage';
// import { Send, X, Bot as BotIcon, User } from 'lucide-react';
// import { AiMessage, UserDetails } from '@/types/chatbot.types';
// import { streamChatResponse } from '@/api/ChatBot/chat.service';
// import LoadingSpinner from './LoadingSpinner';

// interface ChatBotProps {
//   isOpen: boolean;
//   onClose: () => void;
//   userData: UserDetails;
// }

// const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose, userData }) => {
//   const [messages, setMessages] = useState<AiMessage[]>([
//     {
//       role: 'assistant',
//       content: `Hello ${userData.firstName}! I'm your todo assistant. How can I help you today?`
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || isLoading) return;

//     const userMessage: AiMessage = {
//       role: 'user',
//       content: inputMessage.trim()
//     };

//     // Add user message to chat
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInputMessage('');
//     setIsLoading(true);

//     // Prepare assistant's typing indicator
//     const typingIndicator: AiMessage = {
//       role: 'assistant',
//       content: ''
//     };
    
//     setMessages(prev => [...prev, typingIndicator]);

//     let assistantResponse = '';

//     try {
//       await streamChatResponse(
//         updatedMessages,
//         userData,
//         (chunk) => {
//           assistantResponse += chunk;
//           setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//               role: 'assistant',
//               content: assistantResponse
//             };
//             return newMessages;
//           });
//         },
//         () => {
//           setIsLoading(false);
//         },
//         (error) => {
//           console.error('Error:', error);
//           setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//               role: 'assistant',
//               content: 'Sorry, I encountered an error. Please try again.'
//             };
//             return newMessages;
//           });
//           setIsLoading(false);
//         }
//       );
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: 'Sorry, there was an error processing your request.'
//       }]);
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl flex flex-col z-50">
//       {/* Chat Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//               <BotIcon className="w-6 h-6" />
//             </div>
//             <div>
//               <h2 className="font-semibold text-lg">Todo Assistant</h2>
//               <p className="text-sm text-white/80">Hi {userData.firstName}!</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-white/10 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 cursor-pointer" />
//           </button>
//         </div>
//       </div>

//       {/* Chat Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50"
//       >
//         <div className="space-y-4">
//           {messages.map((message, index) => (
//             <ChatMessage
//               key={index}
//               message={message}
//               isTyping={isLoading && index === messages.length - 1 && message.role === 'assistant' && !message.content}
//             />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Chat Input */}
//       <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex items-end space-x-2">
//           <div className="flex-1 relative">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type your message here..."
//               className="w-full border text-black border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//               rows={1}
//               disabled={isLoading}
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={isLoading || !inputMessage.trim()}
//               className={`absolute right-3 bottom-3 p-2 rounded-full ${
//                 isLoading || !inputMessage.trim()
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-blue-500 hover:bg-blue-600'
//               } transition-colors`}
//             >
//               <Send className={`w-4 h-4 ${
//                 isLoading || !inputMessage.trim() ? 'text-gray-500' : 'text-white'
//               }`} />
//             </button>
//           </div>
//         </div>
//         {isLoading && (
//           <div className="mt-2 text-center">
//             <LoadingSpinner />
//             <p className="text-xs text-gray-500 mt-1">AI is thinking...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


// components/chat-widget/ChatPanel.tsx
import { AiMessage } from "@/types/chatbot.types";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, User, Bot, X, Brain } from "lucide-react";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import FormatProperText from "./FormatProperText";
import { formatTime } from "../../utils/FormatTime";

export default function ChatPanel({
  isOpen,
  setIsOpen,
  messages,
  isStreaming,
  onSendMessage,
  onClearMessages,
  PanelType,
  suggestedQuestions,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: AiMessage[];
  isStreaming: boolean;
  onSendMessage: (message: string) => void;
  onClearMessages: () => void;
  PanelType: string;
  suggestedQuestions: string[];
}) {
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    onSendMessage(input.trim());
    setInput("");
    // keep focus in textarea after sending
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
      const el = messagesRef.current;
      if (!el) return;
      // scroll to bottom
      const top = el.scrollHeight - el.clientHeight;
      // if already at bottom, no need to animate
      el.scrollTo({ top: Math.max(0, top), behavior });
    };

    // Wait for layout to settle
    requestAnimationFrame(() => scrollToBottom("smooth"));
  }, [messages, isStreaming, isOpen]);

  // Focus textarea when panel opens and whenever messages change (so user can continue typing)
  useEffect(() => {
    if (!isOpen) return;
    if (isStreaming) return; // don't steal focus while streaming
    textareaRef.current?.focus();
  }, [isOpen, isStreaming]);

  useEffect(() => {
    if (!isOpen) return;
    if (isStreaming) return;
    // focus after new messages arrive
    textareaRef.current?.focus();
  }, [messages, isOpen, isStreaming]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.8, // ⏱️ 5 seconds
              ease: "easeInOut",
            }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-gradient-to-b from-[#061f4b] via-[#0a2a63] to-[#144d88] shadow-2xl border-l border-cyan-500/20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 bg-black/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {PanelType} Assistant
                    </h3>
                    <p className="text-xs text-cyan-300">AI-powered help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">

                  <button
                    onClick={onClearMessages}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title="Close chat"
                  >
                    <X className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="p-4 bg-cyan-500/10 rounded-2xl inline-block">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-2">
                      Hi! I&apos;m your {PanelType} Assistant
                    </h4>
                    <p className="text-cyan-300 text-sm mb-4">
                      Ask me anything about your {PanelType} tasks
                    </p>

                    <div className="space-y-2">
                      {suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isStreaming) return;
                            setInput(question);
                            onSendMessage(question);
                            setInput("");
                            // ensure textarea keeps focus so user can type next
                            textareaRef.current?.focus();
                          }}
                          className="w-full px-3 py-2 text-left bg-white/5 hover:bg-white/10 border border-cyan-500/20 rounded-lg text-cyan-300 text-sm transition-colors cursor-pointer"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none"
                          : "bg-white/10 backdrop-blur-sm border border-cyan-500/20 text-cyan-100 rounded-tl-none"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">
                        <FormatProperText
                          textColor="text-white/80"
                          msg={msg.content}
                        />
                      </div>
                      {msg.timestamp && (
                        <div
                          className={`text-xs mt-2 ${
                            msg.role === "user"
                              ? "text-blue-100/70"
                              : "text-cyan-300/70"
                          }`}
                        >
                          {formatTime(
                            msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            }),
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}

              {/* Typing Indicator */}
              {isStreaming && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    {/* <Bot className="w-4 h-4 text-white" /> */}
                    <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl rounded-tl-none px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                      <span className="text-sm text-cyan-300">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Auto-scroll to bottom when messages change, streaming state changes, or panel opens */}
              {/* useEffect placed in component scope to auto-scroll */}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-cyan-500/20 bg-black/20">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Type your ${PanelType} question...`}
                  className="flex-1 bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder:text-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  disabled={isStreaming}
                  style={{
                    scrollbarWidth: "none",
                  }}
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className={`p-3 rounded-lg transition-colors h-12 ${
                    !input.trim() || isStreaming
                      ? "bg-cyan-500/30 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  }`}
                >
                  <Send
                    className={`w-5 h-5 ${
                      !input.trim() || isStreaming
                        ? "text-cyan-300"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              <div className="text-xs text-cyan-300/50 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}