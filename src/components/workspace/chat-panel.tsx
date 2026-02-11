"use client";

import { X, Send, FileQuestion, Layers, PenLine, Brain, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatTools, suggestions } from "@/lib/mock-data";

interface ChatPanelProps {
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  quiz: FileQuestion,
  flashcards: Layers,
  fill: PenLine,
  mindmap: Brain,
  podcast: Mic,
};

export function ChatPanel({ onClose }: ChatPanelProps) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-tapnote-card overflow-hidden relative">
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
          {/* Greeting */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-foreground mb-2">
              <span className="mr-1">👋</span> Hey, I&apos;m Tappy!
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              I&apos;ll help you understand and practice this note. Ask a
              question or start a quiz, flashcards, or other learning tools.
            </p>
          </div>

          {/* Tool Buttons */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-[280px] mb-6">
            {chatTools.map((tool) => {
              const Icon = iconMap[tool.key];
              return (
                <button
                  key={tool.key}
                  className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs text-foreground transition-colors hover:bg-white/10"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${tool.colorClass}`}
                  >
                    <Icon className="h-3 w-3 text-white" />
                  </span>
                  {tool.name}
                </button>
              );
            })}
          </div>

          {/* Suggestion Chips */}
          <div className="flex gap-2 w-full overflow-x-auto pb-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="flex-shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-3 pt-0">
        <div className="relative">
          <Input
            placeholder="Type your question"
            className="h-9 rounded-xl bg-white/5 pr-9 text-xs border-border placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
