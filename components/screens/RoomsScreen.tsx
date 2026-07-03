"use client";

import { useState } from "react";
import { BedDouble, Bath, Maximize, Users } from "lucide-react";
import { cn, formatXAF } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { rooms } from "@/lib/rooms";

const tiers = ["All", "Studio", "Deluxe", "Executive", "Suite", "Presidential", "Two Bedroom"];

export function RoomsScreen({ onOpenRoom }: { onOpenRoom: (slug: string) => void }) {
  const t = useT();
  const [filter, setFilter] = useState("All");

  const list = filter === "All" ? rooms : rooms.filter((r) => r.tier === filter);

  return (
    <div className="p-4">
      <h2 className="mb-3 font-display text-lg font-extrabold text-ink">
        {t("Hotel Rooms")}
      </h2>

      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4">
        {tiers.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              filter === f
                ? "border-royal bg-royal text-white"
                : "border-black/10 text-ink/60"
            )}
          >
            {t(f)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((r) => (
          <button
            key={r.slug}
            onClick={() => onOpenRoom(r.slug)}
            className="flex w-full gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white p-2.5 text-left shadow-card"
          >
            <img
              src={r.images[0]}
              alt=""
              className="h-24 w-24 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-bold text-ink">{t(r.name)}</p>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[0.58rem] font-semibold",
                    r.available
                      ? "bg-status-available/15 text-status-available"
                      : "bg-status-booked/15 text-status-booked"
                  )}
                >
                  {r.available ? t("Available") : t("Booked")}
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.66rem] text-ink/50">
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3 w-3" />
                  {r.beds}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  {r.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {r.guests}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="h-3 w-3" />
                  {r.size}m²
                </span>
              </p>
              <p className="mt-1.5 text-sm font-extrabold text-royal">
                XAF {formatXAF(r.pricePerNight)}
                <span className="text-xs font-normal text-ink/45"> {t("/ night")}</span>
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
