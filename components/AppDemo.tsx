"use client";

import { useMemo, useState } from "react";
import {
  Home,
  BedDouble,
  CalendarDays,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getRoom } from "@/lib/rooms";
import type { DateRange } from "@/components/MiniCalendar";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { RoomsScreen } from "@/components/screens/RoomsScreen";
import { RoomDetailScreen } from "@/components/screens/RoomDetailScreen";
import { BookScreen } from "@/components/screens/BookScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";

export type Tab = "home" | "rooms" | "book" | "settings";
const fmt = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function AppDemo() {
  const t = useT();
  const { lang, setLang } = useLang();

  const [tab, setTab] = useState<Tab>("home");
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [bookSlug, setBookSlug] = useState<string>("gilgal-studio");
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [guests, setGuests] = useState(2);
  const [fromCameroon, setFromCameroon] = useState(true);

  const detail = detailSlug ? getRoom(detailSlug) : null;

  const buildWa = (slug: string) => {
    const r = getRoom(slug);
    const number = fromCameroon ? site.whatsapp.cm : site.whatsapp.intl;
    const lines = [
      "Hello Gilgal Tower,",
      "",
      "I would like to book and confirm availability:",
      "",
      r ? `Room: ${r.name}` : "",
      range.start ? `Check-in: ${fmt(range.start)}` : "",
      range.end ? `Check-out: ${fmt(range.end)}` : "",
      `Guests: ${guests}`,
      "",
      "Thank you.",
    ].filter(Boolean);
    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const bookOnWhatsApp = (slug: string) => {
    if (typeof window !== "undefined") window.open(buildWa(slug), "_blank");
  };

  const openBooking = (slug: string) => {
    setBookSlug(slug);
    setDetailSlug(null);
    setTab("book");
  };

  const pickDate = (date: Date) =>
    setRange((r) => {
      if (!r.start || (r.start && r.end)) return { start: date, end: null };
      if (date.getTime() > r.start.getTime()) return { start: r.start, end: date };
      return { start: date, end: null };
    });

  const tabs = useMemo(
    () =>
      [
        { key: "home", label: t("Home"), icon: Home },
        { key: "rooms", label: t("Rooms"), icon: BedDouble },
        { key: "book", label: t("Book"), icon: CalendarDays },
        { key: "settings", label: t("Settings"), icon: SettingsIcon },
      ] as { key: Tab; label: string; icon: typeof Home }[],
    [t]
  );

  return (
    <div className="flex min-h-[100dvh] justify-center bg-neutral-200/60">
      <div className="relative flex h-[100dvh] w-full max-w-[460px] flex-col overflow-hidden bg-cloud shadow-2xl">
        <header className="flex items-center justify-between bg-royal px-4 py-3 text-white">
          <span className="font-display text-base font-extrabold tracking-wide">
            Gilgal Tower
          </span>
          <div className="flex items-center rounded-full border border-white/25 p-0.5 text-[0.7rem] font-semibold">
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase transition-colors",
                  lang === l ? "bg-gold text-ink" : "text-white/70"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        <div className="no-scrollbar relative flex-1 overflow-y-auto">
          {tab === "home" && (
            <HomeScreen
              onOpenRoom={setDetailSlug}
              goRooms={() => setTab("rooms")}
              goBook={() => setTab("book")}
            />
          )}
          {tab === "rooms" && <RoomsScreen onOpenRoom={setDetailSlug} />}
          {tab === "book" && (
            <BookScreen
              bookSlug={bookSlug}
              setBookSlug={setBookSlug}
              range={range}
              pickDate={pickDate}
              guests={guests}
              setGuests={setGuests}
              fromCameroon={fromCameroon}
              setFromCameroon={setFromCameroon}
              onBook={() => bookOnWhatsApp(bookSlug)}
            />
          )}
          {tab === "settings" && <SettingsScreen />}

          {detail && (
            <RoomDetailScreen
              room={detail}
              onClose={() => setDetailSlug(null)}
              onBook={() => bookOnWhatsApp(detail.slug)}
              onReserve={() => openBooking(detail.slug)}
            />
          )}
        </div>

        <nav className="grid grid-cols-4 border-t border-black/5 bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
          {tabs.map((it) => {
            const active = tab === it.key && !detail;
            const I = it.icon;
            return (
              <button
                key={it.key}
                onClick={() => {
                  setDetailSlug(null);
                  setTab(it.key);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[0.64rem] font-medium transition-colors",
                  active ? "text-royal" : "text-ink/45"
                )}
              >
                <I className="h-5 w-5" strokeWidth={active ? 2.3 : 1.7} />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
