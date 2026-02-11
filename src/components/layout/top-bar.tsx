"use client";

import { Menu, ArrowLeft, ChevronDown, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { noteData } from "@/lib/mock-data";

interface TopBarProps {
  onToggleSidebar: () => void;
  onAdjustWorkspace: () => void;
  adjustWorkspaceOpen: boolean;
}

export function TopBar({
  onToggleSidebar,
  onAdjustWorkspace,
  adjustWorkspaceOpen,
}: TopBarProps) {
  return (
    <div className="flex h-12 items-center justify-between border-b border-border bg-tapnote-deep px-3">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 rounded-full bg-white/5 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Button>

        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground hover:text-foreground" href="#">
                {noteData.breadcrumb[0]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                {noteData.breadcrumb[1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 rounded-full border border-border bg-white/5 px-4 text-xs text-muted-foreground shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:text-foreground hover:bg-white/10"
        onClick={onAdjustWorkspace}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Adjust workspace
        <ChevronDown className={`h-3 w-3 transition-transform ${adjustWorkspaceOpen ? "rotate-180" : ""}`} />
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/20 text-xs text-primary">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
