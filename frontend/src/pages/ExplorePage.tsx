import { useState } from "react";
import { MapView } from "../components/MapView";
import { sportIcon } from "../data/places";
import type { Place, Sport } from "../types";

export type DiscoveryPageProps = {
  places: Place[];
  selectedPlace: Place | null;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectPlace: (place: Place) => void;
  onOpenDetails: (place: Place) => void;
  onSportChange: (sport: Sport | "Todos") => void;
  sport: Sport | "Todos";
  onClearFilters: () => void;
};

export function ExplorePage(props: DiscoveryPageProps & { isFavorites?: boolean }) {
  const [viewList, setViewList] = useState(false);
  const { places, selectedPlace, favorites, onToggleFavorite, onSelectPlace, onOpenDetails, onSportChange, sport, onClearFilters, isFavorites = false } = props;

  return (
    <main className={`workspace ${viewList ? "list-mode" : ""}`}>
      <aside className="sidebar">
        <div className="section-head"><div><small>ENCONTRE SEU ESPAÇO</small><h2>Escolha sua modalidade</h2></div><span className="live-dot">● AO VIVO</span></div>
        <div className="sport-filters">
          {(["Todos", "Skate", "Corrida", "Patins", "Basquete"] as const).map((item) => (
            <button key={item} className={`sport-chip ${sport === item ? "selected" : ""}`} onClick={() => onSportChange(item)}>
              {item !== "Todos" && sportIcon(item)} {item}
            </button>
          ))}
        </div>
        <div className="list-heading">
          <div><h3>{isFavorites ? "Seus favoritos" : "Locais próximos"}</h3><p>{places.length} {isFavorites ? "favoritos" : "espaços encontrados"}</p></div>
          <button className="text-button" onClick={() => setViewList(!viewList)}>{viewList ? "Ver mapa" : "Ver em lista"} ↗</button>
        </div>
        <div className="place-list">
          {places.map((place) => (
            <article key={place.id} className={`place-card ${selectedPlace?.id === place.id ? "chosen" : ""}`}>
              <button className="place-card-main" onClick={() => onOpenDetails(place)}>
                <div className={`place-thumb thumb-${place.sport.toLowerCase()}`}>{sportIcon(place.sport)}</div>
                <span className="place-copy"><span className="place-tag">{place.sport}</span><strong>{place.name}</strong><small>⌖ {place.distance} · {place.city}</small><span className="rating">★ {place.rating.toFixed(1)}</span></span>
              </button>
              <button
                className={`favorite-btn ${favorites.includes(place.id) ? "favorited" : ""}`}
                onClick={() => onToggleFavorite(place.id)}
                title="Favoritar local"
                aria-label={favorites.includes(place.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >{favorites.includes(place.id) ? "★" : "☆"}</button>
            </article>
          ))}
          {!places.length && <div className="empty">Nenhum local encontrado.</div>}
        </div>
        <div className="sidebar-foot"><span>◉ Dados demonstrativos</span><span>SPORT-MAPS © 2026</span></div>
      </aside>
      <section className="map-area">
        <MapView selectedPlace={selectedPlace} places={places} onOpenDetails={(place) => { onSelectPlace(place); onOpenDetails(place); }} />
        <div className="map-overlay map-top"><span className="map-status"><i /> Mapa ativo</span><button onClick={onClearFilters}>↺ Limpar filtros</button></div>
      </section>
    </main>
  );
}