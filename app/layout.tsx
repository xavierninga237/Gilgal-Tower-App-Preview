import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../lib/i18n";

export const metadata: Metadata = {
  title: "Gilgal Tower, App Preview",
  description:
    "Interactive preview of the Gilgal Tower customer app: browse rooms, view descriptions, check availability and book on WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cloud font-body text-ink antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
