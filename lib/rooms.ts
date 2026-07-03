export type Room = {
  slug: string;
  name: string;
  tier: string;
  beds: number;
  baths: number;
  size: number;
  guests: number;
  pricePerNight: number;
  priceUsd?: number;
  available: boolean;
  blurb: string;
  description: string;
  amenities: string[];
  images: string[];
  videoUrl?: string;
};

export const rooms: Room[] = [
  {
    slug: "gilgal-studio",
    name: "Gilgal Studio",
    tier: "Studio",
    beds: 1,
    baths: 1,
    size: 28,
    guests: 2,
    pricePerNight: 40000,
    priceUsd: 75,
    available: true,
    blurb:
      "A smart, light-filled studio for solo travellers and couples who value calm and convenience.",
    description:
      "The Gilgal Studio blends modern luxury with warm hospitality. A comfortable full-size bed, refreshing air conditioning and breathtaking views make every morning unforgettable. Stylish decor, high-speed Wi-Fi, a smart TV and a sparkling bathroom create the perfect balance of relaxation and sophistication.",
    amenities: ["Full-size bed", "Air Conditioning", "Free high-speed Wi-Fi", "Smart TV", "Work Desk", "Mini Fridge", "In-room Safe", "Daily Housekeeping"],
    images: [
      "/images/rooms/gilgal-studio-1.webp", "/images/rooms/gilgal-studio-2.webp",
      "/images/rooms/gilgal-studio-3.webp", "/images/rooms/gilgal-studio-4.webp",
      "/images/rooms/gilgal-studio-5.webp", "/images/rooms/gilgal-studio-6.webp",
    ],
    videoUrl: "https://www.youtube.com/watch?v=1o20gbxmpdE",
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tier: "Deluxe",
    beds: 1,
    baths: 1,
    size: 36,
    guests: 2,
    pricePerNight: 75000,
    priceUsd: 100,
    available: true,
    blurb:
      "Refined comfort with rich interiors, silky linens and panoramic skyline views.",
    description:
      "Welcome to a world of refined comfort. The Deluxe Room is thoughtfully designed with rich interiors, silky-soft linens, elegant furnishings, a smart entertainment system, a rainfall shower and premium amenities. Wake up to breathtaking views and sink into cloud-like bedding for a stay that feels effortless.",
    amenities: ["Queen-size bed", "Air Conditioning", "Free high-speed Wi-Fi", "Smart TV", "Mini Bar", "Rainfall Shower", "Work Desk", "Coffee & Tea Maker"],
    images: [
      "/images/rooms/deluxe-1.webp", "/images/rooms/deluxe-2.webp", "/images/rooms/deluxe-3.webp", "/images/rooms/deluxe-4.webp",
      "/images/rooms/deluxe-studio-1.webp", "/images/rooms/deluxe-studio-2.webp",
      "/images/rooms/deluxe-studio-3.webp", "/images/rooms/deluxe-studio-4.webp",
    ],
    videoUrl: "https://www.youtube.com/watch?v=eaw82IygAiw",
  },
  {
    slug: "executive-room",
    name: "Executive Room",
    tier: "Executive",
    beds: 1,
    baths: 1,
    size: 45,
    guests: 2,
    pricePerNight: 100000,
    priceUsd: 125,
    available: true,
    blurb:
      "A lavish room with a plush king bed and an executive workspace for business stays.",
    description:
      "Indulge in the ultimate blend of luxury, elegance and comfort. The Executive Room features a plush king-sized bed, a dedicated workspace, a marble-finished bathroom and curated furnishings. Soft ambient lighting creates a warm, inviting sanctuary for relaxation, romance or business.",
    amenities: ["King-size bed", "Executive Workspace", "Air Conditioning", "24-hour Room Service", "Free high-speed Wi-Fi", "Large Smart TV", "Mini Bar", "Concierge Assistance"],
    images: [
      "/images/rooms/executive-1.webp", "/images/rooms/executive-2.webp", "/images/rooms/executive-3.webp",
      "/images/rooms/executive-suite-1.webp", "/images/rooms/executive-suite-2.webp",
      "/images/rooms/executive-suite-3.webp", "/images/rooms/executive-suite-4.webp",
    ],
    videoUrl: "https://www.youtube.com/watch?v=uDZ61qMJpeU",
  },
  {
    slug: "double-bed-suite",
    name: "Double Bed Suite",
    tier: "Suite",
    beds: 2,
    baths: 1,
    size: 50,
    guests: 3,
    pricePerNight: 100000,
    available: true,
    blurb:
      "A spacious suite with twin double beds, perfect for friends, colleagues or a small family.",
    description:
      "The Double Bed Suite offers generous space with twin double beds, a comfortable seating area and a marble bathroom. Ideal for friends travelling together, colleagues or a small family who want room to spread out without compromising on style.",
    amenities: ["Two double beds", "Air Conditioning", "Free high-speed Wi-Fi", "Smart TV", "Seating Area", "Mini Bar", "Work Desk", "Room Service"],
    images: [
      "/images/rooms/double-suite-1.webp", "/images/rooms/double-suite-2.webp",
      "/images/rooms/double-suite-3.webp", "/images/rooms/double-suite-4.webp",
      "/images/rooms/double-suite-5.webp",
    ],
  },
  {
    slug: "presidential-suite",
    name: "Presidential Suite",
    tier: "Presidential",
    beds: 2,
    baths: 2,
    size: 120,
    guests: 4,
    pricePerNight: 150000,
    priceUsd: 175,
    available: false,
    oceanView: true,
    blurb:
      "A realm of prestige, expansive living, a private lounge and panoramic ocean views.",
    description:
      "Enter a realm of prestige and breathtaking luxury. The Presidential Suite offers expansive living spaces with exquisite decor, a majestic king-sized bedroom, a luxurious marble bathroom, an elegant dining area, a private lounge and panoramic ocean views. Personalised room service and exclusive amenities elevate every moment into a royal experience.",
    amenities: ["Grand master bedroom", "Private living room", "Formal dining area", "Panoramic Ocean View", "Marble bathroom & tub", "Private Office", "Kitchenette", "High-speed Wi-Fi"],
    images: [
      "/images/rooms/presidential-1.webp", "/images/rooms/presidential-2.webp",
      "/images/rooms/presidential-3.webp", "/images/rooms/presidential-4.webp",
      "/images/rooms/presidential-5.webp",
      "/images/rooms/presidential-suite-1.webp", "/images/rooms/presidential-suite-2.webp",
      "/images/rooms/presidential-suite-3.webp",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dCrRSovCAjo",
  },
  {
    slug: "ocean-view-2br",
    name: "2-Bedroom Ocean View",
    tier: "Two Bedroom",
    beds: 2,
    baths: 1,
    size: 110,
    guests: 4,
    pricePerNight: 175000,
    available: true,
    oceanView: true,
    blurb:
      "A full two-bedroom apartment with a living and dining area and sweeping ocean views.",
    description:
      "A complete two-bedroom apartment with a spacious living and dining area, two marble bathrooms and floor-to-ceiling windows framing sweeping views of the Atlantic. A proper kitchen, generous storage and considered lighting make this the natural choice for families and extended stays.",
    amenities: ["Two bedrooms", "Two bathrooms", "Living & dining area", "Panoramic Ocean View", "Full Kitchen", "Air Conditioning", "Smart TVs", "Free high-speed Wi-Fi"],
    images: [
      "/images/rooms/ocean-2br-1.webp", "/images/rooms/ocean-2br-2.webp",
      "/images/rooms/ocean-2br-3.webp", "/images/rooms/ocean-2br-4.webp",
      "/images/rooms/ocean-2br-5.webp",
    ],
  },
  {
    slug: "xlarge-2br",
    name: "X-Large 2-Bedroom Apartment",
    tier: "Two Bedroom",
    beds: 2,
    baths: 2,
    size: 150,
    guests: 8,
    pricePerNight: 200000,
    available: true,
    oceanView: true,
    blurb:
      "Our largest residence, an expansive two-bedroom apartment for the most generous of stays.",
    description:
      "The X-Large 2-Bedroom Apartment is our most generous residence. An expansive open-plan living and dining space wraps around two en-suite bedrooms, with a full kitchen, a private balcony and uninterrupted views across Limbe to the ocean. It comes with three comfortable sofa beds and sleeps up to eight guests, ideal for large families and groups who want space without compromise.",
    amenities: ["Two en-suite bathrooms", "Three sofa beds, sleeps 8", "Expansive living & dining", "Private Balcony", "Full Kitchen", "Ocean View", "Smart TVs", "Concierge Service"],
    images: [
      "/images/rooms/xl-2br-1.webp", "/images/rooms/xl-2br-2.webp",
      "/images/rooms/xl-2br-3.webp", "/images/rooms/xl-2br-4.webp",
      "/images/rooms/xl-2br-5.webp",
    ],
  },
];

export const roomFr: Record<string, { blurb: string; description: string }> = {
  "gilgal-studio": {
    blurb:
      "Un studio lumineux et intelligent pour les voyageurs en solo et les couples en quête de calme et de praticité.",
    description:
      "Le Studio Gilgal allie luxe moderne et hospitalité chaleureuse. Un lit double confortable, une climatisation rafraîchissante et des vues à couper le souffle rendent chaque matin inoubliable. Une décoration élégante, le Wi-Fi haut débit, une Smart TV et une salle de bain étincelante créent l'équilibre parfait entre détente et raffinement.",
  },
  "deluxe-room": {
    blurb:
      "Un confort raffiné aux intérieurs riches, au linge soyeux et aux vues panoramiques sur la ville.",
    description:
      "Bienvenue dans un univers de confort raffiné. La Chambre Deluxe a été pensée avec des intérieurs riches, un linge d'une douceur soyeuse, un mobilier élégant, un système de divertissement connecté, une douche à effet pluie et des équipements premium. Réveillez-vous face à des vues magnifiques et laissez-vous envelopper par une literie moelleuse, pour un séjour tout en légèreté.",
  },
  "executive-room": {
    blurb:
      "Une chambre somptueuse avec un grand lit king et un espace de travail exécutif pour les séjours d'affaires.",
    description:
      "Savourez le mariage ultime du luxe, de l'élégance et du confort. La Chambre Exécutive offre un généreux lit king, un espace de travail dédié, une salle de bain en marbre et un mobilier soigneusement sélectionné. Un éclairage d'ambiance feutré en fait un havre chaleureux, idéal pour la détente, le romantisme ou les affaires.",
  },
  "double-bed-suite": {
    blurb:
      "Une suite spacieuse avec deux lits doubles, parfaite pour des amis, des collègues ou une petite famille.",
    description:
      "La Suite à Lits Doubles offre un espace généreux avec deux lits doubles, un coin salon confortable et une salle de bain en marbre. Idéale pour des amis qui voyagent ensemble, des collègues ou une petite famille qui souhaitent de l'espace sans renoncer au style.",
  },
  "presidential-suite": {
    blurb:
      "Un royaume de prestige : vastes espaces de vie, salon privé et vue panoramique sur l'océan.",
    description:
      "Entrez dans un royaume de prestige et de luxe à couper le souffle. La Suite Présidentielle déploie de vastes espaces de vie à la décoration exquise, une majestueuse chambre avec lit king, une luxueuse salle de bain en marbre, un élégant coin repas, un salon privé et une vue panoramique sur l'océan. Un service en chambre personnalisé et des prestations exclusives transforment chaque instant en une expérience royale.",
  },
  "ocean-view-2br": {
    blurb:
      "Un véritable appartement deux chambres avec salon, salle à manger et vues imprenables sur l'océan.",
    description:
      "Un appartement deux chambres complet, avec un vaste espace salon et salle à manger, deux salles de bain en marbre et des baies vitrées du sol au plafond encadrant des vues imprenables sur l'Atlantique. Une véritable cuisine, de nombreux rangements et un éclairage soigné en font le choix naturel pour les familles et les longs séjours.",
  },
  "xlarge-2br": {
    blurb:
      "Notre plus grande résidence : un vaste appartement deux chambres pour les séjours les plus généreux.",
    description:
      "Le Grand Appartement 2 Chambres est notre résidence la plus spacieuse. Un immense espace de vie ouvert salon-salle à manger entoure deux chambres avec salle de bain privative, complété par une cuisine équipée, un balcon privé et une vue dégagée sur Limbe jusqu'à l'océan. Il dispose de trois canapés-lits confortables et accueille jusqu'à huit personnes, idéal pour les grandes familles et les groupes qui veulent de l'espace sans compromis.",
  },
};

export function roomBlurb(r: Room, lang: string): string {
  return lang === "fr" ? roomFr[r.slug]?.blurb ?? r.blurb : r.blurb;
}
export function roomDescription(r: Room, lang: string): string {
  return lang === "fr" ? roomFr[r.slug]?.description ?? r.description : r.description;
}
export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
