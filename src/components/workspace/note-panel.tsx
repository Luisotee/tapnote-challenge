"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp, CheckCircle, Lightbulb, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { noteData } from "@/lib/mock-data";

interface NotePanelProps {
  onClose: () => void;
}

function SectionBadge({
  icon: Icon,
  label,
  isOpen,
}: {
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
      <Icon className="h-3 w-3" />
      {label}
      {isOpen ? (
        <ChevronUp className="h-3 w-3" />
      ) : (
        <ChevronDown className="h-3 w-3" />
      )}
    </div>
  );
}

export function NotePanel({ onClose }: NotePanelProps) {
  const [overviewOpen, setOverviewOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card-gradient overflow-hidden relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/5 z-10"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground text-center mb-6 pr-8">
            {noteData.title}
          </h1>

          {/* Overview Section */}
          <Collapsible open={overviewOpen} onOpenChange={setOverviewOpen}>
            <CollapsibleTrigger className="mb-3 w-full flex justify-center">
              <SectionBadge
                icon={CheckCircle}
                label="Overview"
                isOpen={overviewOpen}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm leading-relaxed text-foreground/80 mb-6">
                {noteData.overview}
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* Key Insights Section */}
          <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
            <CollapsibleTrigger className="mb-3 w-full flex justify-center">
              <SectionBadge
                icon={Lightbulb}
                label="Key Insights"
                isOpen={insightsOpen}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-2 mb-6">
                {noteData.keyInsights.map((insight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* Detailed Breakdown Section */}
          <Collapsible open={breakdownOpen} onOpenChange={setBreakdownOpen}>
            <CollapsibleTrigger className="mb-3 w-full flex justify-center">
              <SectionBadge
                icon={List}
                label="Detailed Breakdown"
                isOpen={breakdownOpen}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm leading-relaxed text-foreground/80 mb-6">
                A detailed breakdown of the key concepts and historical events that shaped Rome&apos;s rise to power.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {/* Additional Sections */}
          {noteData.sections.map((section, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
