import React, { useEffect, useState } from "react";
import GetAIResponce from "@/appwrite_controller/ChatBot.controller.mjs";
import { X, User, Bot, Send, MessageCircle } from "lucide-react";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

function ChatBot() {
  const [message, setMessage] = useState([
    {
      id: 1,
      text: "Hello from Inventiff, How Can i Help you ?",
      sender: "bot",
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isMinimize, setisMinimize] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const handelSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "User",
      time: new Date(),
    };

    setMessage((prev) => [...prev, userMessage]);
    setInputText("");
    
    // Show typing indicator while waiting for AI response
    setIsTyping(true);

    try {
      const botResponse = await GetAIResponce(inputText);
      
      // Hide typing indicator after getting response
      setIsTyping(false);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse || "Sorry, I couldn't generate a response. Please try again.",
        sender: "bot",
        time: new Date(),
      };

      setMessage((prev) => [...prev, botMessage]);
    } catch (error) {
      // Hide typing indicator on error
      setIsTyping(false);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        time: new Date(),
      };

      setMessage((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handelSendMessage();
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [message, isTyping]); // Added isTyping to dependencies to scroll when typing indicator appears

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <div>
            <button
              className="w-16 h-16 rounded-full bg-white/45 dark:bg-black/25 backdrop-blur-2xl flex justify-center items-center"
              onClick={() => setisOpen(true)}
            >
              <MessageCircle size={33} className="text-black dark:text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs font-afacad animate-bounce">
                Chat
              </div>
            </button>
          </div>
        ) : (
          <div className="w-[23rem] h-[29rem] rounded-2xl backdrop-blur-2xl flex flex-col">
            <div className="bg-white/25 dark:black/25 rounded-t-2xl py-4 px-2 flex justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={"/assets/Chatbot.gif"}
                  className="w-10 h-10 object-cover rounded-full"
                  alt="logo"
                />
                <div>

                <h1 className="text-lg font-afacad">Inventiff AI Bot</h1>
                <p className="text-xs font-Poppins"> Online</p>
                </div>
              </div>

              <button
                onClick={() => setisOpen(false)}
                className="relative right-0 mx-2"
              >
                <X size={20} className="dark:text-gray-400" />
              </button>
            </div>

            {/* chat area */}
            <div ref={chatRef} className="flex-1 px-3 py-2 overflow-y-auto space-y-2 scrollbar-thin font-Poppins">
              {message.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-start gap-3 ${
                    chat.sender == "bot" ? "" : "justify-end"
                  }`}
                >
                  {chat.sender === "bot" && (
                    <div className="w-8 h-8 bg-blue-50 text-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs text-md p-2 rounded-xl ${
                      chat.sender === "User" ? "bg-blue-400" : "bg-gray-600"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        // Paragraph
                        p: ({ node, ...props }) => (
                          <p
                            className="whitespace-pre-line text-white text-sm mb-2"
                            {...props}
                          />
                        ),

                        // Bold
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-semibold text-white"
                            {...props}
                          />
                        ),

                        // Italics
                        em: ({ node, ...props }) => (
                          <em className="italic text-white/90" {...props} />
                        ),

                        // Link
                        a: ({ node, ...props }) => (
                          <a
                            className="text-blue-300 underline hover:text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),

                        // Unordered List
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc ml-5 text-white space-y-1"
                            {...props}
                          />
                        ),

                        // Ordered List
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal ml-5 text-white space-y-1"
                            {...props}
                          />
                        ),

                        // List Item
                        li: ({ node, ...props }) => (
                          <li className="text-sm" {...props} />
                        ),

                        // Code block
                        code: ({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }) => {
                          return inline ? (
                            <code
                              className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto text-sm mb-2">
                              <code {...props}>{children}</code>
                            </pre>
                          );
                        },

                        // Headings
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-xl font-bold text-white mb-2"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-lg font-semibold text-white mb-2"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-md font-medium text-white mb-2"
                            {...props}
                          />
                        ),

                        // Blockquote
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-500 pl-4 italic text-gray-300 my-2"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {chat.text}
                    </ReactMarkdown>

                    <p
                      className={`text-xs mt-1 ${
                        chat.sender === "User"
                          ? "text-gray-900"
                          : "text-gray-200"
                      }`}
                    >
                      {chat.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {chat.sender === "User" && (
                    <div className="w-8 h-8 bg-purple-200 text-black rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-600 px-3 py-2 rounded-xl max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-2 mx-2">
              <textarea
                value={inputText}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our analytics solutions..."
                className="w-full rounded-md text-black dark:text-white bg-white/80 dark:bg-black/50 px-4 py-1 stroke-none outline-none my-4"
                onChange={(e) => setInputText(e.target.value)}
                rows="1"
                disabled={isTyping} // Disable input while AI is typing
              ></textarea>
              <button
                className="rounded-md bg-slate-600 dark:bg-slate-900 py-1 px-2 disabled:opacity-50"
                onClick={handelSendMessage}
                disabled={isTyping} // Disable button while AI is typing
              >
                <Send className="text-white w-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mb-2">Ai Bot can make mistakes, Check important info</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBot;