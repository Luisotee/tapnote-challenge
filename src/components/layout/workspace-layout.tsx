"use client";

import { useState } from "react";
import { AppSidebar } from "./sidebar";
import { SourcePanel } from "@/components/workspace/source-panel";
import { NotePanel } from "@/components/workspace/note-panel";
import { ChatPanel } from "@/components/workspace/chat-panel";
import {
  AdjustWorkspaceModal,
  type PanelType,
} from "@/components/workspace/adjust-workspace-modal";
import { LayoutGrid, ChevronDown, ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceLayout() {
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
    <SidebarProvider
      defaultOpen={false}
      style={{ "--sidebar-width": "240px" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="bg-page-gradient">
        {/* Top bar */}
        <div className="flex h-12 items-center justify-between border-b border-border bg-tapnote-deep px-3">
          {/* Left section of top bar */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full bg-white/5 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10"
              onClick={() => toast.info("Navigating back...")}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Navigating to Notes...");
                    }}
                  >
                    Notes
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Roman Legacy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
                className={cn(
                  "h-3 w-3 transition-transform",
                  adjustWorkspaceOpen && "rotate-180"
                )}
              />
            </Button>
          </AdjustWorkspaceModal>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
              onClick={() => setVisiblePanels([])}
            >
              <X className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 cursor-pointer transition-colors hover:bg-primary/30">
                  <span className="text-xs font-medium text-primary">U</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-border bg-tapnote-card"
                align="end"
              >
                <DropdownMenuItem className="text-xs">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
