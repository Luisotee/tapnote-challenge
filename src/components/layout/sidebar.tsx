"use client";

import { useState, useRef } from "react";
import { Search, Home, Settings, SquarePlus, PanelLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { folders } from "@/lib/mock-data";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState<string | null>("home");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { setOpen } = useSidebar();

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarToggleButton />
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:flex hidden">
            <SidebarMenuButton
              tooltip="Search notes"
              onClick={() => {
                setOpen(true);
                setTimeout(() => searchRef.current?.focus(), 200);
              }}
            >
              <Search />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-white">T</span>
          </div>
          <span className="text-sm font-semibold text-foreground">TapNote</span>
        </div>
        <div className="group-data-[collapsible=icon]:hidden px-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              placeholder="Search notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 bg-white/5 pl-8 text-xs border-border placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Home"
                isActive={activeNav === "home"}
                onClick={() => setActiveNav("home")}
              >
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                isActive={activeNav === "settings"}
                onClick={() => setActiveNav("settings")}
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="New folder"
                onClick={() => toast.info("New folder created")}
              >
                <SquarePlus />
                <span>New folder</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {filteredFolders.map((folder) => (
              <SidebarMenuItem key={folder.name}>
                <SidebarMenuButton
                  tooltip={folder.name}
                  isActive={activeFolder === folder.name}
                  onClick={() =>
                    setActiveFolder(
                      activeFolder === folder.name ? null : folder.name
                    )
                  }
                >
                  <span>{folder.emoji}</span>
                  <span>{folder.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <SidebarMenuButton tooltip="Toggle sidebar" onClick={toggleSidebar}>
      <PanelLeft />
      <span>Toggle</span>
    </SidebarMenuButton>
  );
}
