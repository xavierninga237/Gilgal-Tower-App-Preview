"use client";

import { useMemo, useState } from "react";
import {
  Home,
  BedDouble,
  CalendarDays,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  Bath,
  Maximize,
  Users,
  ArrowLeft,
  Check,
  Star,
  Minus,
  Plus,
  Globe,
  Bell,
  Phone,
  Mail,
  Info,
  User,
} from "lucide-react";
import { rooms, getRoom, roomBlurb, roomDescription, type Room } from "../lib/rooms";
import { useT, useLang } from "../lib/i18n";

/* ---- inlined helpers (were lib/utils.ts) ---- */
const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
const formatXAF = (n: number) => n.toLocaleString("en-US");

/* ---- inlined site data (were lib/site.ts) ---- */
const site = {
  name: "Gilgal Tower",
  phone: "+237 672 742 630",
  phoneHref: "tel:+237672742630",
  email: "info@gilgaltowerhotel.com",
  emailHref: "mailto:info@gilgaltowerhotel.com",
  address: "Gilgal Tower, Newtown Limbe, South-West Region, Cameroon",
  whatsapp: { cm: "237675813543", intl: "13017040015" },
  version: "1.1.3",
};
const spaces = [
  { title: "Conference Hall", descKey: "Meetings for up to 40 guests", image: "/images/spaces/conference-13.webp", tag: "Meetings" },
  { title: "Erica Ballroom", descKey: "Weddings & galas up to 800", image: "/images/spaces/ballroom-1.webp", tag: "Events" },
  { title: "Rooftop Lounge", descKey: "Sunset views & fine drinks", image: "/images/spaces/rooftop-1.webp", tag: "Lounge" },
];

/* ===== MiniCalendar.tsx ===== */
type DateRange = { start: Date | null; end: Date | null };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WD = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function MiniCalendar({
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

/* ===== HomeScreen.tsx ===== */
function HomeScreen({
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

/* ===== RoomsScreen.tsx ===== */
const tiers = ["All", "Studio", "Deluxe", "Executive", "Suite", "Presidential", "Two Bedroom"];

function RoomsScreen({ onOpenRoom }: { onOpenRoom: (slug: string) => void }) {
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

/* ===== RoomDetailScreen.tsx ===== */
function RoomDetailScreen({
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

/* ===== BookScreen.tsx ===== */
const fmtShort = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function BookScreen({
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
          value={range.start ? fmtShort(range.start) : t("Select dates on the calendar.")}
        />
        <Row label={t("Check-out")} value={range.end ? fmtShort(range.end) : "-"} />
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

/* ===== SettingsScreen.tsx ===== */
function Toggle({ on, set }: { on: boolean; set: (v: boolean) => void }) {
  return (
    <button
      onClick={() => set(!on)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-royal" : "bg-black/15"
      )}
      aria-pressed={on}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          on ? "left-[1.4rem]" : "left-0.5"
        )}
      />
    </button>
  );
}

function SettingsScreen() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [signedIn, setSignedIn] = useState(false);
  const [notif, setNotif] = useState({ booking: true, offers: true, news: false });

  return (
    <div className="p-4 pb-8">
      <h2 className="mb-4 font-display text-lg font-extrabold text-ink">
        {t("Settings")}
      </h2>

      {/* Member */}
      <button
        onClick={() => setSignedIn((v) => !v)}
        className="flex w-full items-center gap-3 rounded-2xl bg-royal p-4 text-left text-white shadow-card"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          <User className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">
            {signedIn ? "Eric I." : t("Member")}
          </p>
          <p className="text-xs text-white/70">
            {signedIn ? "Gilgal Elite · Gold" : t("Sign in")}
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-white/60" />
      </button>

      {/* Language */}
      <Section icon={Globe} title={t("Language")}>
        <div className="flex gap-2">
          {(["en", "fr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                lang === l ? "border-royal bg-royal text-white" : "border-black/10 text-ink/60"
              )}
            >
              {l === "en" ? "English" : "Français"}
            </button>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title={t("Notifications")}>
        <Line label={t("Booking updates")}>
          <Toggle on={notif.booking} set={(v) => setNotif((n) => ({ ...n, booking: v }))} />
        </Line>
        <Line label={t("Offers & promotions")}>
          <Toggle on={notif.offers} set={(v) => setNotif((n) => ({ ...n, offers: v }))} />
        </Line>
        <Line label={t("News & events")}>
          <Toggle on={notif.news} set={(v) => setNotif((n) => ({ ...n, news: v }))} />
        </Line>
      </Section>

      {/* Contact */}
      <Section icon={Phone} title={t("Contact")}>
        <a href={site.phoneHref} className="flex items-center gap-3 py-2 text-sm text-ink/75">
          <Phone className="h-4 w-4 text-royal" /> {site.phone}
        </a>
        <a
          href={`https://wa.me/${site.whatsapp.cm}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2 text-sm text-ink/75"
        >
          <MessageCircle className="h-4 w-4 text-status-available" /> {t("WhatsApp")}
        </a>
        <a href={site.emailHref} className="flex items-center gap-3 py-2 text-sm text-ink/75">
          <Mail className="h-4 w-4 text-royal" /> <span className="truncate">{site.email}</span>
        </a>
      </Section>

      {/* About */}
      <Section icon={Info} title={t("About Gilgal Tower")}>
        <p className="text-sm leading-relaxed text-ink/65">
          {t(
            "Luxury hotel rooms, an elegant ballroom, world-class conference facilities and premium amenities in the heart of Limbe, Cameroon."
          )}
        </p>
        <div className="mt-3 flex items-start gap-2 text-xs text-ink/55">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal" />
          <span>{site.address}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-ink/45">
          <span>{t("Version")}</span>
          <span>{site.version}</span>
        </div>
      </Section>

      <p className="mt-5 text-center text-xs text-ink/40">
        {t("App preview, no payment is taken here.")}
      </p>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Globe;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
        <Icon className="h-4 w-4 text-royal" /> {title}
      </p>
      {children}
    </div>
  );
}

function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-ink/70">{label}</span>
      {children}
    </div>
  );
}

/* ===== AppDemo.tsx ===== */
type Tab = "home" | "rooms" | "book" | "settings";
const fmt = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function AppDemo() {
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

export default function Page() {
  return <AppDemo />;
}
