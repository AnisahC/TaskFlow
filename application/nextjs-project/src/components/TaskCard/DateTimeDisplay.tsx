import * as React from "react";

interface DateDisplayProps {
  date: string;
  time?: string;
}

export function DateDisplay({ date, time }: DateDisplayProps) {
  const isOverdue = false; // Logic to determine if date is overdue
  const baseClasses = "flex gap-2.5 items-center px-2 py-1.5 rounded-sm";
  const colorClasses = isOverdue
    ? "text-red-700 bg-rose-100"
    : "bg-neutral-100 text-zinc-500";

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <div className="flex gap-1 items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d52e48b6081a4d395ae17ad3dac28aac384440a1e5bdb776165cb8181acf7414?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          alt=""
          className="object-contain shrink-0 w-3.5 aspect-square"
        />
        <time dateTime={date} className="self-stretch my-auto">
          {date}
        </time>
      </div>
      {time && (
        <div className="flex gap-1 items-center whitespace-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/889ce94a7b43d09a3c71bbc0ab2200cd9f3197261a1f72532cee72766678698c?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
            alt=""
            className="object-contain shrink-0 w-3.5 aspect-square"
          />
          <time dateTime={time} className="self-stretch my-auto">
            {time}
          </time>
        </div>
      )}
    </div>
  );
}
