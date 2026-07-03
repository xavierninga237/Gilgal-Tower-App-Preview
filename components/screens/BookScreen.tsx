"use client";

import { MessageCircle, Minus, Plus } from "lucide-react";
import { cn, formatXAF } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { rooms, getRoom } from "@/lib/rooms";
import { MiniCalendar, type DateRange } from "@/components/MiniCalendar";

const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export function BookScreen({
  bookSlug,
  setBookSlug,
  range,
  pickDate,
  guests,
  setGuests,
  fromCameroon,
  setFromCameroon,
  onBook,
}: {
  bookSlug: string;
  setBookSlug: (s: string) => void;
  range: DateRange;
  pickDate: (d: Date) => void;
  guests: number;
  setGuests: (n: number) => void;
  fromCameroon: boolean;
  setFromCameroon: (v: boolean) => void;
  onBook: () => void;
}) {
  const t = useT();
  const room = getRoom(bookSlug);

  const nights =
    range.start && range.end
      ? Math.max(
          1,
          Math.round((range.end.getTime() - range.start.getTime()) / 86400000)
        )
      : 0;
  const total = room && nights ? room.pricePerNight * nights : 0;

  return (
    <div className="p-4 pb-8">
      <h2 className="mb-1 font-display text-lg font-extrabold text-ink">
        {t("Book your stay")}
      </h2>

      <p className="mb-2 mt-4 text-sm font-semibold text-ink/70">{t("Choose a room")}</p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {rooms.map((r) => (
          <button
            key={r.slug}
            onClick={() => setBookSlug(r.slug)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              bookSlug === r.slug
                ? "border-royal bg-royal text-white"
                : "border-black/10 text-ink/60"
            )}
          >
            {t(r.name)}
          </button>
        ))}
      </div>

      <p className="mb-2 mt-5 text-sm font-semibold text-ink/70">{t("Pick your dates")}</p>
      <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-card">
        <MiniCalendar value={range} onPick={pickDate} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink/70">{t("Guests")}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-ink/70"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center text-sm font-bold text-ink">{guests}</span>
          <button
            onClick={() => setGuests(Math.min(8, guests + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-ink/70"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mb-2 mt-5 text-sm font-semibold text-ink/70">{t("Where are you?")}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setFromCameroon(true)}
          className={cn(
            "flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
            fromCameroon ? "border-royal bg-royal text-white" : "border-black/10 text-ink/70"
          )}
        >
          {t("In Cameroon")}
        </button>
        <button
          onClick={() => setFromCameroon(false)}
          className={cn(
            "flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
            !fromCameroon ? "border-royal bg-royal text-white" : "border-black/10 text-ink/70"
          )}
        >
          {t("Abroad")}
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 shadow-card">
        <p className="mb-2 text-sm font-bold text-ink">{t("Your request")}</p>
        <Row label={t("Choose a room")} value={room ? t(room.name) : "-"} />
        <Row
          label={t("Check-in")}
          value={range.start ? fmt(range.start) : t("Select dates on the calendar.")}
        />
        <Row label={t("Check-out")} value={range.end ? fmt(range.end) : "-"} />
        {nights > 0 && <Row label={t("Nights")} value={String(nights)} />}
        <Row label={t("Guests")} value={String(guests)} />
        {total > 0 && (
          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2">
            <span className="text-sm font-semibold text-ink/70">{t("Estimated total")}</span>
            <span className="font-display text-base font-extrabold text-royal">
              XAF {formatXAF(total)}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={onBook}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-royal py-3 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        {t("Send on WhatsApp")}
      </button>
      <p className="mt-2 text-center text-xs text-ink/45">
        {t("We will confirm availability and the total with you.")}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-ink/55">{label}</span>
      <span className="max-w-[60%] truncate text-right font-medium text-ink">{value}</span>
    </div>
  );
}
