import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, SendHorizonal, Bot, User, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function CulinaryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Pranam! 🙏 Welcome to PraNam Cafe's sacred kitchens. I am Saras, your interactive Culinary Host. I can share the historical roots of our Uttar Pradesh dishes from Varanasi to Lucknow, help you configure our 100% plant-based variations, or guide your contactless order. What spicy or sweet legacy can I explore with you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const starterPrompts = [
    { text: "What is Tamatar Chaat?", short: "Tamatar Chaat story" },
    { text: "Suggest some sweets from Varanasi", short: "Varanasi sweets recommendation" },
    { text: "How do you make Lucknow's Basket Chaat vegan?", short: "Basket Chaat vegan recipe" },
    { text: "What breakfast is famous in Agra?", short: "Agra morning breakfast" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText("");
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Map history to server compatible format (role: 'user' | 'model', text: string)
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Saras is currently in the spice room. Let's try calling her again.");
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: "msg-" + Date.now() + "-bot",
        role: "model",
        text: data.text || "Pranam! I am reflecting on your request. Please ask again about our traditional items.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[92vw] sm:w-[410px] h-[550px] bg-brand-ivory rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/20 flex flex-col mb-4 glow-gold"
            id="chat-window"
          >
            {/* Header */}
            <div className="bg-brand-blue-dark text-white p-5 flex items-center justify-between border-b border-brand-gold/35">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wider text-brand-beige">Saras · Culinary Host</h3>
                  <span className="text-[10px] font-mono text-brand-blue flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    AI STORYTELLER ACTIVE
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                id="close-chat-btn-top"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-brand-beige/10">
              {messages.map((msg) => {
                const isBot = msg.role === "model";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${isBot ? "self-start mr-auto" : "self-end ml-auto flex-row-reverse"}`}
                  >
                    {/* Avatar Icon */}
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      isBot ? "bg-white border-brand-gold/30 text-brand-gold" : "bg-brand-blue border-transparent text-white"
                    }`}>
                      {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>

                    {/* text content bubble */}
                    <div className={`rounded-2xl p-3.5 text-xs shadow-sm leading-relaxed ${
                      isBot
                        ? "bg-white text-stone-850 border border-stone-100 rounded-tl-none font-sans"
                        : "bg-brand-blue text-white rounded-tr-none font-medium"
                    }`}>
                      {/* Very simple custom renderer for linebreaks and double stars represent bolding */}
                      {msg.text.split("\n").map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? "mt-1" : ""}>
                          {line.split("**").map((chunk, cIdx) => 
                            cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-brand-dark">{chunk}</strong> : chunk
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-white border border-brand-gold/30 text-brand-gold flex items-center justify-center">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-white text-stone-500 rounded-2xl rounded-tl-none p-4 text-xs border border-stone-100 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {/* Error block */}
              {errorText && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-600">
                  <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Connection Issue</p>
                    <p className="text-[10px] mt-0.5 leading-tight">{errorText}</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts Overlay inside chat window */}
            <div className="px-5 py-2.5 bg-brand-beige/30 border-t border-brand-gold/10 flex gap-2 overflow-x-auto scrollbar-none">
              {starterPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="flex-shrink-0 bg-white hover:bg-brand-gold/5 border border-brand-gold/22 px-3 py-1.5 rounded-full text-[10px] font-sans font-medium text-brand-gold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  id={`starter-prompt-${pIdx}`}
                >
                  <HelpCircle className="w-3 h-3" />
                  {prompt.short}
                </button>
              ))}
            </div>

            {/* Message input action */}
            <div className="p-4 border-t border-stone-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage(inputMessage);
                  }
                }}
                disabled={isLoading}
                placeholder="Ask Saras about Varanasi kachoris, vegan substitutes..."
                className="flex-grow text-xs font-sans text-stone-800 bg-stone-50 border border-stone-250 rounded-xl px-3.5 py-3 outline-none focus:bg-white focus:border-brand-blue disabled:opacity-50"
                id="chat-input-field"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-brand-gold text-white flex items-center justify-center hover:bg-brand-gold-light transition-colors cursor-pointer disabled:opacity-40"
                id="send-chat-message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-gold text-white flex items-center justify-center shadow-2xl cursor-pointer hover:bg-brand-gold-light transition-colors z-50 ring-4 ring-white/30 border-2 border-brand-gold"
        id="chat-launcher-btn"
      >
        <MessageSquare className="w-6.5 h-6.5" />
      </motion.button>
    </div>
  );
}
