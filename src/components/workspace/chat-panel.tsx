"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  FileQuestion,
  Layers,
  PenLine,
  Brain,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  chatTools,
  suggestions,
  mockAiResponses,
  toolResponses,
  type ToolKey,
} from "@/lib/mock-data";

interface ChatPanelProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "ai";
  text: string;
}

const iconMap: Record<string, React.ElementType> = {
  quiz: FileQuestion,
  flashcards: Layers,
  fill: PenLine,
  mindmap: Brain,
  podcast: Mic,
};

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const sendMessage = useCallback(
    (text: string, aiResponse?: string) => {
      if (!text.trim()) return;
      setMessages((prev) => [...prev, { role: "user", text }]);
      setInputValue("");
      setIsTyping(true);
      timeoutRef.current = setTimeout(() => {
        const response =
          aiResponse ??
          mockAiResponses[text as keyof typeof mockAiResponses] ??
          mockAiResponses.default;
        setMessages((prev) => [...prev, { role: "ai", text: response }]);
        setIsTyping(false);
      }, 1000);
    },
    []
  );

  const handleSend = () => sendMessage(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleToolClick = (toolKey: ToolKey, toolName: string) => {
    setActiveTool((prev) => (prev === toolKey ? null : toolKey));
    sendMessage(
      `Start ${toolName}`,
      toolResponses[toolKey]
    );
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card-gradient overflow-hidden relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/5 z-10"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <ScrollArea className="flex-1">
        <div className="p-5 pt-8 flex flex-col items-center">
          {/* Greeting - always visible */}
          {!hasMessages && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  <span className="mr-1">👋</span> Hey, I&apos;m Tappy!
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                  I&apos;ll help you understand and practice this note. Ask a
                  question or start a quiz, flashcards, or other learning tools.
                </p>
              </div>

              {/* Tool Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-[320px] mb-6">
                {chatTools.map((tool) => {
                  const Icon = iconMap[tool.key];
                  return (
                    <button
                      key={tool.key}
                      className={cn(
                        "flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-foreground transition-all hover:bg-white/10",
                        activeTool === tool.key && "ring-2 ring-primary"
                      )}
                      onClick={() => handleToolClick(tool.key, tool.name)}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${tool.colorClass}`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </span>
                      {tool.name}
                    </button>
                  );
                })}
              </div>

            </>
          )}

          {/* Messages */}
          {hasMessages && (
            <div className="w-full space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground"
                        : "bg-white/5 text-foreground/80"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start" role="status" aria-label="AI is typing">
                  <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestion Chips - anchored above input */}
      {!hasMessages && (
        <div className="px-3 pb-2">
          <div className="flex gap-2 overflow-x-auto">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="flex-shrink-0 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground whitespace-nowrap"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-3 pt-0">
        <div className="relative">
          <Input
            placeholder="Type your question"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-10 rounded-xl bg-white/5 pr-9 text-sm border-border placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-white/5",
              inputValue.trim()
                ? "text-primary hover:text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={handleSend}
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
