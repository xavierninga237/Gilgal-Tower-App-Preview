"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Star,
  MessageCircle,
  BedDouble,
  Bath,
  Users,
  Maximize,
} from "lucide-react";
import { cn, formatXAF } from "@/lib/utils";
import { useT, useLang } from "@/lib/i18n";
import { roomDescription, type Room } from "@/lib/rooms";

export function RoomDetailScreen({
  room,
  onClose,
  onBook,
  onReserve,
}: {
  room: Room;
  onClose: () => void;
  onBook: () => void;
  onReserve: () => void;
}) {
  const t = useT();
  const { lang } = useLang();
  const [img, setImg] = useState(0);
  const images = room.images.slice(0, 5);

  const specs = [
    { icon: BedDouble, label: `${room.beds} ${t(room.beds > 1 ? "Beds" : "Bed")}` },
    { icon: Bath, label: `${room.baths} ${t(room.baths > 1 ? "Baths" : "Bath")}` },
    { icon: Users, label: `${room.guests} ${t("Guests")}` },
    { icon: Maximize, label: `${room.size} m²` },
  ];

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-cloud">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-24">
        <div className="relative h-56">
          <img src={images[img]} alt="" className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="absolute right-3 top-3 rounded-full bg-royal px-3 py-1 text-xs font-semibold text-white">
            {t(room.tier)}
          </span>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === img ? "w-5 bg-white" : "w-1.5 bg-white/50"
                )}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <h2 className="font-display text-xl font-extrabold text-ink">{t(room.name)}</h2>
          <p className="mt-1 flex items-center gap-1 text-xs text-gold-dark">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> 4.9 · Limbe
          </p>
          <p className="mt-1.5 font-display text-lg font-extrabold text-royal">
            XAF {formatXAF(room.pricePerNight)}
            <span className="text-sm font-normal text-ink/45"> {t("/ night")}</span>
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 rounded-xl border border-black/5 bg-white py-2.5 text-center shadow-card"
              >
                <s.icon className="h-4 w-4 text-royal" />
                <span className="text-[0.6rem] font-medium leading-tight text-ink/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <h3 className="mt-5 font-display text-sm font-bold text-ink">
            {t("About this room")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            {roomDescription(room, lang)}
          </p>

          <h3 className="mt-5 font-display text-sm font-bold text-ink">
            {t("Room amenities")}
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {room.amenities.map((am) => (
              <div
                key={am}
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-white p-2 text-[0.72rem] font-medium text-ink/70 shadow-card"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-status-available" />
                <span className="truncate">{t(am)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex gap-2 border-t border-black/5 bg-white p-3">
        <button
          onClick={onReserve}
          className="flex-1 rounded-full border border-royal py-3 text-sm font-semibold text-royal"
        >
          {t("Pick your dates")}
        </button>
        <button
          onClick={onBook}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-royal py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          {t("Book on WhatsApp")}
        </button>
      </div>
    </div>
  );
}
