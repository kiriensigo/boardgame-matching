import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm shadow-md transition-all duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        aria-label={props["aria-label"] || "textarea"}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
