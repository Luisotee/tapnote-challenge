"use client";

import { useState, useEffect, useCallback, type ComponentType } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// No top-level react-pdf imports — they use DOMMatrix which breaks SSR.
// We lazy-load everything inside useEffect instead.

interface PdfModules {
  Document: ComponentType<Record<string, unknown>>;
  Page: ComponentType<Record<string, unknown>>;
}

export function PdfViewer() {
  const [pdf, setPdf] = useState<PdfModules | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([
      import("react-pdf"),
      import("react-pdf/dist/Page/AnnotationLayer.css"),
      import("react-pdf/dist/Page/TextLayer.css"),
    ]).then(([mod]) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdf({
        Document: mod.Document as unknown as ComponentType<Record<string, unknown>>,
        Page: mod.Page as unknown as ComponentType<Record<string, unknown>>,
      });
    });
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  if (!pdf) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-xs text-muted-foreground">Loading PDF...</span>
      </div>
    );
  }

  const { Document, Page } = pdf;

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Zoom toolbar */}
      <div className="flex items-center gap-1 mb-3">
        <span className="text-xs text-muted-foreground mr-1">Source file</span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[36px] text-center">
            100%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* PDF display */}
      <ScrollArea className="flex-1 min-h-0">
        <Document
          file="/Test-pdf_4.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-40">
              <span className="text-xs text-muted-foreground">
                Loading PDF...
              </span>
            </div>
          }
        >
          <div className="space-y-3 pr-2">
            {Array.from({ length: numPages }, (_, i) => i + 1).map(
              (page) => (
                <div
                  key={page}
                  className="rounded-sm overflow-hidden shadow-lg"
                >
                  <Page
                    pageNumber={page}
                    width={380}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              )
            )}
          </div>
        </Document>
      </ScrollArea>
    </div>
  );
}
