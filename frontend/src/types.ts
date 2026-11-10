export type Sport = "Skate" | "Corrida" | "Patins" | "Basquete";
export type Page = "explore" | "favorites" | "details" | "cart" | "account";
export type AuthMode = "login" | "register" | "forgot";
export type User = { id: string; name: string; email: string };

export type Place = {
  id: number;
  name: string;
  sport: Sport;
  city: string;
  distance: string;
  rating: number;
  lat: number;
  lng: number;
  address: string;
  description: string;
  openingHours: string;
  features: string[];
};

export type Product = {
  id: number;
  name: string;
  detail: string;
  price: number;
  emoji: string;
  sports: Sport[];
};