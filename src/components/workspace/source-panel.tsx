"use client";

import dynamic from "next/dynamic";
import { Pencil, MoreHorizontal, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-tapnote-card overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-0">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {noteData.date}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">
              {noteData.noteName}
            </h2>
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
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
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
            >
              Document
            </TabsTrigger>
            <TabsTrigger
              value="transcription"
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
            >
              Transcription
            </TabsTrigger>
            <TabsTrigger
              value="notetext"
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-white/5"
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
            <span className="text-sm font-medium text-foreground">
              File Transcription
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Copy className="h-3 w-3" />
              Copy
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
            <span className="text-sm font-medium text-foreground">
              Note text
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Copy className="h-3 w-3" />
              Copy
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
