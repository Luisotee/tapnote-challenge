"use client";

import {
  Search,
  Home,
  Settings,
  Plus,
  LayoutGrid,
  BarChart3,
  Users,
  Calendar,
  PieChart,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { folders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const sidebarIcons = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Search, label: "Search" },
  { icon: Home, label: "Home" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "People" },
  { icon: Calendar, label: "Calendar" },
  { icon: PieChart, label: "Charts" },
];

export function Sidebar({ isOpen }: SidebarProps) {
  if (!isOpen) {
    return (
      <div className="flex h-full w-12 flex-col items-center gap-1 border-r border-border bg-tapnote-sidebar py-3">
        {sidebarIcons.map((item) => (
          <button
            key={item.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
        <Separator className="my-2 w-6 bg-border" />
        {folders.map((folder) => (
          <button
            key={folder.name}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", folder.color)} />
          </button>
        ))}
        <div className="mt-auto">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-green-400 transition-colors hover:bg-white/5">
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-60 flex-col border-r border-border bg-tapnote-sidebar">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-white">T</span>
        </div>
        <span className="text-sm font-semibold text-foreground">TapNote</span>
      </div>

      <div className="px-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes"
            className="h-8 bg-white/5 pl-8 text-xs border-border placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <nav className="mt-3 flex flex-col gap-0.5 px-2">
        <button className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
          <Home className="h-4 w-4" />
          Home
        </button>
        <button className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </nav>

      <div className="mt-3 px-3">
        <Button className="w-full gap-1.5 bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New note
        </Button>
      </div>

      <Separator className="mx-3 mt-4 bg-border" />

      <div className="mt-3 px-3">
        <span className="text-xs font-medium text-muted-foreground">
          Folders
        </span>
      </div>

      <ScrollArea className="flex-1 px-2 mt-2">
        <div className="flex flex-col gap-0.5">
          {folders.map((folder) => (
            <button
              key={folder.name}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <span
                className={cn("h-2.5 w-2.5 rounded-full", folder.color)}
              />
              {folder.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
