"use client";

import { BedDouble, MessageCircle, ChevronRight, MapPin } from "lucide-react";
import { cn, formatXAF } from "@/lib/utils";
import { useT, useLang } from "@/lib/i18n";
import { rooms, roomBlurb } from "@/lib/rooms";
import { spaces } from "@/lib/site";

export function HomeScreen({
  onOpenRoom,
  goRooms,
  goBook,
}: {
  onOpenRoom: (slug: string) => void;
  goRooms: () => void;
  goBook: () => void;
}) {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="pb-6">
      <div className="relative h-44">
        <img
          src="/images/rooms/ocean-2br-1.webp"
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/hero/hero-1.webp";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-xs text-white/70">{t("Welcome to")}</p>
          <p className="font-display text-xl font-bold">Gilgal Tower</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
            <MapPin className="h-3 w-3" /> Newtown, Limbe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        <button
          onClick={goBook}
          className="flex items-center gap-2.5 rounded-2xl border border-black/5 bg-white p-3.5 text-left shadow-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal/10 text-royal">
            <BedDouble className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink/80">{t("Book a room")}</span>
        </button>
        <button
          onClick={goRooms}
          className="flex items-center gap-2.5 rounded-2xl border border-black/5 bg-white p-3.5 text-left shadow-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink/80">{t("See all")}</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-4">
        <h3 className="font-display text-base font-bold text-ink">{t("Featured rooms")}</h3>
        <button onClick={goRooms} className="flex items-center gap-1 text-xs font-semibold text-royal">
          {t("See all")} <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
        {rooms.slice(0, 5).map((r) => (
          <button
            key={r.slug}
            onClick={() => onOpenRoom(r.slug)}
            className="w-44 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-card"
          >
            <img src={r.images[0]} alt="" className="h-24 w-full object-cover" />
            <div className="p-2.5">
              <p className="truncate text-xs font-bold text-ink">{t(r.name)}</p>
              <p className="mt-0.5 line-clamp-2 text-[0.66rem] leading-snug text-ink/50">
                {roomBlurb(r, lang)}
              </p>
              <p className="mt-1 text-xs font-semibold text-royal">
                XAF {formatXAF(r.pricePerNight)}
                <span className="font-normal text-ink/45"> /{t("night")}</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      <h3 className="mt-6 px-4 font-display text-base font-bold text-ink">
        {t("Explore our spaces")}
      </h3>
      <div className="mt-3 space-y-3 px-4">
        {spaces.map((s) => (
          <div
            key={s.title}
            className="relative h-28 overflow-hidden rounded-2xl shadow-card"
          >
            <img src={s.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-4 text-white">
              <span
                className={cn(
                  "mb-1 w-fit rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide"
                )}
              >
                {s.tag}
              </span>
              <p className="font-display text-base font-bold">{t(s.title)}</p>
              <p className="text-[0.7rem] text-white/75">{t(s.descKey)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 px-4">
        <button
          onClick={goBook}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-royal py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          {t("Book on WhatsApp")}
        </button>
      </div>
    </div>
  );
}
