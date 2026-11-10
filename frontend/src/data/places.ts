import type { Place, Product } from "../types";

export const places: Place[] = [
  {
    id: 1, name: "Pista de Skate Vila Bocaina", sport: "Skate", city: "Mauá - SP", distance: "450 m", rating: 4.8,
    lat: -23.6677, lng: -46.4615, address: "R. Antônio Dina, 120 - Vila Bocaina, Mauá - SP",
    description: "Pista pública ao ar livre, com obstáculos para diferentes níveis e espaço para praticar com a comunidade local.",
    openingHours: "Todos os dias, das 6h às 22h", features: ["Acesso gratuito", "Área ao ar livre", "Pista para iniciantes e avançados"],
  },
  {
    id: 2, name: "Parque Linear do Guapituba", sport: "Corrida", city: "Mauá - SP", distance: "1,2 km", rating: 4.5,
    lat: -23.674, lng: -46.47, address: "Parque Linear do Guapituba, Mauá - SP",
    description: "Área verde com percurso para corrida e caminhada, cercada por vegetação e conectada ao parque.",
    openingHours: "Todos os dias, das 6h às 20h", features: ["Pista para corrida e caminhada", "Área arborizada", "Acesso gratuito"],
  },
  {
    id: 3, name: "Academia Fight Club Mauá", sport: "Patins", city: "Mauá - SP", distance: "1,8 km", rating: 4.9,
    lat: -23.659, lng: -46.455, address: "Centro, Mauá - SP",
    description: "Espaço esportivo na região central, com área ampla para atividades e prática recreativa de patins.",
    openingHours: "Segunda a sábado, das 7h às 21h", features: ["Área coberta", "Aulas e atividades em grupo", "Consulte disponibilidade"],
  },
  {
    id: 4, name: "Quadra Poliesportiva Central", sport: "Basquete", city: "Mauá - SP", distance: "2,1 km", rating: 4.2,
    lat: -23.665, lng: -46.448, address: "Centro, Mauá - SP",
    description: "Quadra de uso comunitário no centro de Mauá, indicada para partidas e treinos de basquete.",
    openingHours: "Todos os dias, das 8h às 21h", features: ["Quadra aberta", "Uso comunitário", "Leve sua própria bola"],
  },
];

export const products: Product[] = [
  { id: 1, name: "Rodas 101A", detail: "Skate · Kit com 4", price: 89.9, emoji: "🛞", sports: ["Skate"] },
  { id: 2, name: "Capacete Esportivo", detail: "Proteção · Preto", price: 129.9, emoji: "⛑️", sports: ["Skate", "Patins"] },
  { id: 3, name: "Rolamentos Cerâmica", detail: "Manutenção · 8 un.", price: 69.9, emoji: "⚙️", sports: ["Skate", "Patins"] },
  { id: 4, name: "Chave Multiuso", detail: "Acessório", price: 49.9, emoji: "🔧", sports: ["Skate", "Patins"] },
  { id: 5, name: "Garrafa Esportiva", detail: "Corrida · 700 ml", price: 39.9, emoji: "💧", sports: ["Corrida"] },
  { id: 6, name: "Bola de Basquete", detail: "Basquete · Tamanho oficial", price: 119.9, emoji: "🏀", sports: ["Basquete"] },
];

export const sportIcon = (sport: Place["sport"]) =>
  ({ Skate: "🛹", Corrida: "🏃", Patins: "🛼", Basquete: "🏀" })[sport];

export const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });