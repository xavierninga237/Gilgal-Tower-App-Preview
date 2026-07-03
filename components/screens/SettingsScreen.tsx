"use client";

import { useState } from "react";
import {
  Globe,
  Bell,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Info,
  User,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

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

export function SettingsScreen() {
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
