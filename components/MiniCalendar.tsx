"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateRange = { start: Date | null; end: Date | null };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WD = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function MiniCalendar({
  value,
  onPick,
}: {
  value: DateRange;
  onPick: (d: Date) => void;
}) {
  const today = midnight(new Date());
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
  const daysIn = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(new Date(year, month, d));

  const inRange = (d: Date) =>
    value.start && value.end && d > value.start && d < value.end;
  const isEnd = (d: Date) =>
    (value.start && d.getTime() === value.start.getTime()) ||
    (value.end && d.getTime() === value.end.getTime());

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-black/5"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display text-sm font-bold text-ink">
          {MONTHS[month]} {year}
        </p>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-black/5"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[0.6rem] font-semibold uppercase tracking-wide text-ink/35">
        {WD.map((w) => (
          <span key={w} className="py-1">{w}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const past = d < today;
          const selected = isEnd(d);
          const between = inRange(d);
          return (
            <button
              key={i}
              disabled={past}
              onClick={() => !past && onPick(d)}
              className={cn(
                "flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                past && "cursor-not-allowed text-status-booked/70 line-through",
                !past && !selected && !between && "text-ink hover:bg-status-available/15",
                between && "bg-status-selected/15 text-status-selected",
                selected && "bg-status-selected text-white"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-black/5 pt-3 text-[0.66rem] text-ink/55">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-available" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-selected" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-booked" /> Past date
        </span>
      </div>
    </div>
  );
}
