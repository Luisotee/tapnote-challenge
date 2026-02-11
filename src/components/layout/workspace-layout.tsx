"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { SourcePanel } from "@/components/workspace/source-panel";
import { NotePanel } from "@/components/workspace/note-panel";
import { ChatPanel } from "@/components/workspace/chat-panel";
import {
  AdjustWorkspaceModal,
  type PanelType,
} from "@/components/workspace/adjust-workspace-modal";
import { LayoutGrid, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visiblePanels, setVisiblePanels] = useState<PanelType[]>([
    "source",
    "note",
    "chat",
  ]);
  const [activeTab, setActiveTab] = useState("document");
  const [adjustWorkspaceOpen, setAdjustWorkspaceOpen] = useState(false);

  const togglePanel = (panel: PanelType) => {
    setVisiblePanels((prev) =>
      prev.includes(panel)
        ? prev.filter((p) => p !== panel)
        : [...prev, panel]
    );
  };

  const removePanel = (panel: PanelType) => {
    setVisiblePanels((prev) => prev.filter((p) => p !== panel));
  };

  return (
    <div className="flex h-screen bg-tapnote-deep">
      {/* Sidebar */}
      <div
        className="flex-shrink-0 transition-all duration-300"
        style={{ width: sidebarOpen ? 240 : 48 }}
      >
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar - with adjust workspace popover embedded */}
        <div className="flex h-12 items-center justify-between border-b border-border bg-tapnote-deep px-3">
          {/* Left section of top bar */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full bg-white/5 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
              </svg>
              Back
            </Button>

            <nav className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                Notes
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-foreground">Roman Legacy</span>
            </nav>
          </div>

          {/* Center - Adjust workspace button with popover */}
          <AdjustWorkspaceModal
            open={adjustWorkspaceOpen}
            onOpenChange={setAdjustWorkspaceOpen}
            visiblePanels={visiblePanels}
            onTogglePanel={togglePanel}
          >
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full border border-border bg-white/5 px-4 text-xs text-muted-foreground shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:text-foreground hover:bg-white/10"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Adjust workspace
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  adjustWorkspaceOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </AdjustWorkspaceModal>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <span className="text-xs font-medium text-primary">U</span>
            </div>
          </div>
        </div>

        {/* Workspace panels */}
        <div className="flex flex-1 gap-3 p-3 min-h-0">
          {visiblePanels.includes("source") && (
            <SourcePanel
              onClose={() => removePanel("source")}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
          {visiblePanels.includes("note") && (
            <NotePanel onClose={() => removePanel("note")} />
          )}
          {visiblePanels.includes("chat") && (
            <ChatPanel onClose={() => removePanel("chat")} />
          )}

          {/* Empty state when no panels */}
          {visiblePanels.length === 0 && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Click &quot;Adjust workspace&quot; to add panels
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
