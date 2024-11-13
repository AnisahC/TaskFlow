import * as React from "react";

interface PriorityTagProps {
  priority: string;
}

const priorityStyles = {
  Low: "text-emerald-600 bg-teal-200",
  Medium: "text-yellow-600 bg-amber-200",
  High: "text-amber-600 bg-orange-200",
  HTMLAreaElementighest: "text-rose-800 bg-red-300",
};

export function PriorityTag({ priority }: PriorityTagProps) {
  return (
    <span
      className={`gap-2.5 px-2 py-0.5 rounded-lg ${
        priorityStyles[priority as keyof typeof priorityStyles]
      }`}
    >
      {priority} priority
    </span>
  );
}
