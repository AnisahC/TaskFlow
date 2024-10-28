import * as React from "react";

interface PriorityTagProps {
  priority: string;
}

const priorityStyles = {
  low: "text-emerald-800 bg-teal-300",
  medium: "text-yellow-900 bg-amber-200",
  high: "text-amber-900 bg-orange-300",
  highest: "text-rose-950 bg-red-400",
};

export function PriorityTag({ priority }: PriorityTagProps) {
  return (
    <span
      className={`gap-2.5 px-2 py-0.5 rounded-sm ${
        priorityStyles[priority as keyof typeof priorityStyles]
      }`}
    >
      {priority} priority
    </span>
  );
}
