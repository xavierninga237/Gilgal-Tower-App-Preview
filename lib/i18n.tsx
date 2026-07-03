"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fr";

const fr: Record<string, string> = {
  // Tabs & chrome
  Home: "Accueil",
  Rooms: "Chambres",
  Book: "Réserver",
  Settings: "Paramètres",
  "Gilgal Tower": "Gilgal Tower",
  // Home screen
  "Welcome to": "Bienvenue à",
  "Good day": "Bonjour",
  "Book a room": "Réserver une chambre",
  "Our spaces": "Nos espaces",
  "Featured rooms": "Chambres en vedette",
  "See all": "Tout voir",
  "Explore our spaces": "Découvrez nos espaces",
  "Conference Hall": "Salle de conférence",
  "Erica Ballroom": "Salle de bal Erica",
  "Rooftop Lounge": "Rooftop Lounge",
  "Meetings for up to 40 guests": "Réunions jusqu'à 40 personnes",
  "Weddings & galas up to 800": "Mariages et galas jusqu'à 800",
  "Sunset views & fine drinks": "Vue coucher de soleil et boissons raffinées",
  // Rooms
  "Hotel Rooms": "Chambres d'hôtel",
  All: "Tous",
  Available: "Disponible",
  Booked: "Complet",
  "View": "Voir",
  "per night": "par nuit",
  "/ night": "/ nuit",
  night: "nuit",
  From: "À partir de",
  // Room detail
  "About this room": "À propos de cette chambre",
  "Room amenities": "Équipements de la chambre",
  "Book on WhatsApp": "Réserver sur WhatsApp",
  Guests: "Personnes",
  Beds: "Lits",
  Bed: "Lit",
  Baths: "Salles de bain",
  Bath: "Salle de bain",
  // Booking
  "Book your stay": "Réservez votre séjour",
  "Choose a room": "Choisissez une chambre",
  "Pick your dates": "Choisissez vos dates",
  "Select dates on the calendar.": "Sélectionnez des dates sur le calendrier.",
  "Where are you?": "Où êtes-vous ?",
  "In Cameroon": "Au Cameroun",
  "Abroad": "À l'étranger",
  "Your request": "Votre demande",
  "Check-in": "Arrivée",
  "Check-out": "Départ",
  "Send on WhatsApp": "Envoyer sur WhatsApp",
  "We will confirm availability and the total with you.":
    "Nous confirmerons la disponibilité et le total avec vous.",
  Nights: "Nuits",
  "Estimated total": "Total estimé",
  // Settings
  Language: "Langue",
  Notifications: "Notifications",
  "Booking updates": "Suivi des réservations",
  "Offers & promotions": "Offres et promotions",
  "News & events": "Actualités et événements",
  Contact: "Contact",
  "Call us": "Nous appeler",
  Email: "E-mail",
  WhatsApp: "WhatsApp",
  About: "À propos",
  "About Gilgal Tower": "À propos de Gilgal Tower",
  "Luxury hotel rooms, an elegant ballroom, world-class conference facilities and premium amenities in the heart of Limbe, Cameroon.":
    "Chambres d'hôtel de luxe, une élégante salle de bal, des installations de conférence de classe mondiale et des services premium au cœur de Limbe, au Cameroun.",
  Address: "Adresse",
  Version: "Version",
  "App preview, no payment is taken here.":
    "Aperçu de l'application, aucun paiement n'est effectué ici.",
  "Member": "Membre",
  "Sign in": "Se connecter",
  "Signed in as guest": "Connecté en tant qu'invité",
  // Room names
  "Gilgal Studio": "Studio Gilgal",
  "Deluxe Room": "Chambre Deluxe",
  "Executive Room": "Chambre Exécutive",
  "Double Bed Suite": "Suite à Lits Doubles",
  "Presidential Suite": "Suite Présidentielle",
  "2-Bedroom Ocean View": "Appartement 2 Chambres Vue Océan",
  "X-Large 2-Bedroom Apartment": "Grand Appartement 2 Chambres",
  // Tiers
  Studio: "Studio",
  Deluxe: "Deluxe",
  Executive: "Exécutive",
  Suite: "Suite",
  Presidential: "Présidentielle",
  "Two Bedroom": "Deux Chambres",
  // Amenities
  "Full-size bed": "Lit double standard",
  "Queen-size bed": "Lit Queen",
  "King-size bed": "Lit King",
  "Two double beds": "Deux lits doubles",
  "Air Conditioning": "Climatisation",
  "Free high-speed Wi-Fi": "Wi-Fi haut débit gratuit",
  "High-speed Wi-Fi": "Wi-Fi haut débit",
  "Smart TV": "Smart TV",
  "Smart TVs": "Smart TV",
  "Large Smart TV": "Grande Smart TV",
  "Work Desk": "Bureau de travail",
  "Executive Workspace": "Espace de travail exécutif",
  "Private Office": "Bureau privé",
  "Mini Fridge": "Mini réfrigérateur",
  "Mini Bar": "Mini bar",
  "In-room Safe": "Coffre-fort en chambre",
  "Daily Housekeeping": "Ménage quotidien",
  "Rainfall Shower": "Douche à effet pluie",
  "Coffee & Tea Maker": "Machine à café et thé",
  "Room Service": "Service en chambre",
  "24-hour Room Service": "Service en chambre 24h/24",
  "Concierge Service": "Service de conciergerie",
  "Concierge Assistance": "Assistance conciergerie",
  "Full Kitchen": "Cuisine complète",
  Kitchenette: "Kitchenette",
  "Ocean View": "Vue sur l'océan",
  "Panoramic Ocean View": "Vue panoramique sur l'océan",
  "Private Balcony": "Balcon privé",
  "Seating Area": "Coin salon",
  "Private living room": "Salon privé",
  "Living & dining area": "Salon et salle à manger",
  "Expansive living & dining": "Vaste salon et salle à manger",
  "Formal dining area": "Coin repas",
  "Marble bathroom & tub": "Salle de bain en marbre avec baignoire",
  "Two bathrooms": "Deux salles de bain",
  "Two en-suite bathrooms": "Deux salles de bain privatives",
  "Two bedrooms": "Deux chambres",
  "Grand master bedroom": "Grande chambre principale",
  "Three sofa beds, sleeps 8": "Trois canapés-lits, jusqu'à 8 personnes",
};

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
}>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gilgal-app-lang") as Lang | null;
      if (saved === "en" || saved === "fr") {
        setLang(saved);
        return;
      }
      if ((navigator.language || "").toLowerCase().startsWith("fr")) setLang("fr");
    } catch {
      /* ignore */
    }
  }, []);

  const change = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("gilgal-app-lang", l);
    } catch {
      /* ignore */
    }
  };

  const t = (s: string) => (lang === "fr" ? fr[s] ?? s : s);

  return (
    <Ctx.Provider value={{ lang, setLang: change, t }}>{children}</Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
