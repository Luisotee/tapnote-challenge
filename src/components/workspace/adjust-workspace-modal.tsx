"use client";

import { FileText, StickyNote, MessageCircle, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { workspaceTools } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export type PanelType = "source" | "note" | "chat";

interface AdjustWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visiblePanels: PanelType[];
  onTogglePanel: (panel: PanelType) => void;
  children: React.ReactNode;
}

const blocks = [
  { id: "source" as PanelType, label: "Source file", icon: FileText },
  { id: "note" as PanelType, label: "Note", icon: StickyNote },
  { id: "chat" as PanelType, label: "Chat", icon: MessageCircle },
];

const toolColors: Record<string, string> = {
  chat: "bg-primary",
  quiz: "bg-tool-quiz",
  flashcards: "bg-tool-flashcards",
  fill: "bg-tool-fill",
  mindmap: "bg-tool-mindmap",
  podcast: "bg-tool-podcast",
};

export function AdjustWorkspaceModal({
  open,
  onOpenChange,
  visiblePanels,
  onTogglePanel,
  children,
}: AdjustWorkspaceModalProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-auto border-border bg-tapnote-card p-4"
        sideOffset={8}
      >
        <div className="flex items-center gap-3">
          {blocks.map((block) => {
            const isActive = visiblePanels.includes(block.id);
            return (
              <div
                key={block.id}
                className="flex flex-col items-center gap-1.5"
              >
                <button
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl border transition-colors",
                    isActive
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-white/5 text-muted-foreground hover:bg-white/10",
                  )}
                  onClick={() => onTogglePanel(block.id)}
                >
                  <block.icon className="h-5 w-5" />
                </button>
                <span className="text-[10px] text-muted-foreground">
                  {block.label}
                </span>
              </div>
            );
          })}
          <div className="flex flex-col items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-border bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
                  <Plus className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-border bg-tapnote-card"
                sideOffset={4}
              >
                {workspaceTools.map((tool) => (
                  <DropdownMenuItem
                    key={tool.key}
                    className="gap-2 text-xs text-foreground/80 hover:text-foreground focus:bg-white/5 focus:text-foreground"
                    onClick={() => {
                      if (!visiblePanels.includes("chat")) {
                        onTogglePanel("chat");
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full",
                        toolColors[tool.key] || "bg-primary",
                      )}
                    />
                    {tool.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-[10px] text-muted-foreground">Add more</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
