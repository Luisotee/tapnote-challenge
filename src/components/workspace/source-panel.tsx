"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Pencil,
  MoreHorizontal,
  X,
  Copy,
  Check,
  Download,
  Share2,
  Trash2,
  FileEdit,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { noteData } from "@/lib/mock-data";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => ({ default: m.PdfViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-xs text-muted-foreground">Loading PDF...</span>
      </div>
    ),
  }
);

interface SourcePanelProps {
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SourcePanel({
  onClose,
  activeTab,
  onTabChange,
}: SourcePanelProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [noteName, setNoteName] = useState(noteData.noteName);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleRenameSubmit = () => {
    if (noteName.trim() === "") {
      setNoteName(noteData.noteName);
    }
    setIsRenaming(false);
  };

  const handleCopy = async (text: string, tabId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card-gradient overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-0">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {noteData.date}
          </div>
          {isRenaming ? (
            <Input
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") {
                  setNoteName(noteData.noteName);
                  setIsRenaming(false);
                }
              }}
              autoFocus
              className="h-7 text-base font-semibold bg-white/5 border-primary w-48"
            />
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                {noteName}
              </h2>
              <button onClick={() => setIsRenaming(true)}>
                <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-border bg-tapnote-card"
              align="end"
            >
              <DropdownMenuItem
                className="gap-2 text-xs"
                onClick={() => setIsRenaming(true)}
              >
                <FileEdit className="h-3.5 w-3.5" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-xs"
                onClick={() => toast.info("Download started")}
              >
                <Download className="h-3.5 w-3.5" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-xs"
                onClick={() => toast.info("Share link copied")}
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-xs text-destructive"
                onClick={() => toast.error("Note deleted")}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/5"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex flex-1 flex-col min-h-0"
      >
        <div className="px-4 pt-3">
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            <TabsTrigger
              value="document"
              className="rounded-full px-3 py-1 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
            >
              Document
            </TabsTrigger>
            <TabsTrigger
              value="transcription"
              className="rounded-full px-3 py-1 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
            >
              Transcription
            </TabsTrigger>
            <TabsTrigger
              value="notetext"
              className="rounded-full px-3 py-1 text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
            >
              Note text
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="document" className="flex-1 p-4 pt-3 mt-0 min-h-0">
          <PdfViewer />
        </TabsContent>

        <TabsContent
          value="transcription"
          className="flex-1 p-4 pt-3 mt-0 min-h-0"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-medium text-foreground">
              File Transcription
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
              onClick={() =>
                handleCopy(noteData.transcription, "transcription")
              }
            >
              {copiedTab === "transcription" ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <ScrollArea className="flex-1 h-[calc(100%-2rem)]">
            <p className="text-sm leading-relaxed text-foreground/70">
              {noteData.transcription}
            </p>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="notetext"
          className="flex-1 p-4 pt-3 mt-0 min-h-0"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-medium text-foreground">
              Note text
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
              onClick={() => handleCopy(noteData.noteText, "notetext")}
            >
              {copiedTab === "notetext" ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <ScrollArea className="flex-1 h-[calc(100%-2rem)]">
            <p className="text-sm leading-relaxed text-foreground/70">
              {noteData.noteText}
            </p>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
