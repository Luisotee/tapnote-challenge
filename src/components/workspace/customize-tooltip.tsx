"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CustomizeTooltipProps {
  children: React.ReactNode;
}

export function CustomizeTooltip({ children }: CustomizeTooltipProps) {
  const [open, setOpen] = useState(true);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-64 border-border bg-tapnote-card p-4"
        sideOffset={8}
      >
        <h3 className="text-sm font-semibold text-foreground mb-1.5">
          Customize your workspace
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Arrange the tools the way you like. Click here to add or move blocks.
        </p>
        <Button
          size="sm"
          className="w-full bg-primary text-xs text-primary-foreground hover:bg-primary/90"
          onClick={() => setOpen(false)}
        >
          Got it
        </Button>
      </PopoverContent>
    </Popover>
  );
}
