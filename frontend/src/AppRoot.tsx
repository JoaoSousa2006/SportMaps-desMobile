import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { PlaceDetailsPage } from "./pages/PlaceDetailsPage";
import { places, products } from "./data/places";
import type { Page, Place, Sport } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("explore");
  const [previousPage, setPreviousPage] = useState<"explore" | "favorites">("explore");
  const [sport, setSport] = useState<Sport | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place>(places[0]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("sportmaps-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 2 });
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    localStorage.setItem("sportmaps-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredPlaces = useMemo(
    () =>
      places.filter(
        (place) =>
          (sport === "Todos" || place.sport === sport) &&
          `${place.name} ${place.city} ${place.sport}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [sport, query]
  );
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id]
    );
  };

  const navigate = (nextPage: Page) => setPage(nextPage);
  const openPlaceDetails = (place: Place) => {
    if (page === "explore" || page === "favorites") setPreviousPage(page);
    setSelectedPlace(place);
    setPage("details");
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + delta),
    }));
  };

  const submitAuth = (name: string, nextEmail: string) => {
    setUser(name.trim() || nextEmail.split("@")[0] || "Usuário");
    setEmail(nextEmail);
    navigate("explore");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate("explore")}>
          <span className="brand-mark">⌖</span> SPORT-MAPS
        </button>
        <div className="search-wrap">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              navigate("explore");
            }}
            placeholder="Buscar endereço, bairro ou cidade..."
          />
        </div>
        <nav className="desktop-nav">
          <button className={page === "explore" ? "nav-active" : ""} onClick={() => navigate("explore")}>Explorar</button>
          <button className={page === "favorites" ? "nav-active" : ""} onClick={() => navigate("favorites")}>
            Favoritos <span className="nav-count">{favorites.length}</span>
          </button>
          <button className={page === "cart" ? "nav-active" : ""} onClick={() => navigate("cart")}>
            Carrinho <span className="nav-count">{count}</span>
          </button>
          <button className={`user-pill ${page === "account" ? "nav-active" : ""}`} onClick={() => navigate("account")}>
            <span className="avatar">{user ? user[0].toUpperCase() : "U"}</span>
            {user || "Entrar"}
          </button>
        </nav>
      </header>

      {page === "explore" && (
        <ExplorePage
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectPlace={setSelectedPlace}
          onOpenDetails={openPlaceDetails}
          onSportChange={setSport}
          sport={sport}
          onClearFilters={() => {
            setQuery("");
            setSport("Todos");
            setSelectedPlace(places[0]);
          }}
        />
      )}

      {page === "favorites" && (
        <FavoritesPage
          places={filteredPlaces.filter((place) => favorites.includes(place.id))}
          selectedPlace={selectedPlace}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectPlace={setSelectedPlace}
          onOpenDetails={openPlaceDetails}
          onSportChange={setSport}
          sport={sport}
          onClearFilters={() => {
            setQuery("");
            setSport("Todos");
            setSelectedPlace(places[0]);
          }}
        />
      )}

      {page === "details" && selectedPlace && (
        <PlaceDetailsPage
          place={selectedPlace}
          products={products.filter((product) => product.sports.includes(selectedPlace.sport))}
          cart={cart}
          onAddToCart={(productId) => changeQuantity(productId, 1)}
          onBack={() => navigate(previousPage)}
        />
      )}
      {page === "cart" && (
        <CartPage
          products={products}
          cart={cart}
          onQuantityChange={changeQuantity}
          onRemove={(id) => setCart((current) => ({ ...current, [id]: 0 }))}
          onContinue={() => navigate("explore")}
        />
      )}
      {page === "account" && (
        <AccountPage
          user={user}
          email={email}
          onSubmit={submitAuth}
          onSignOut={() => {
            setUser(null);
            setEmail("");
          }}
          onExplore={() => navigate("explore")}
        />
      )}

      <nav className="mobile-nav">
        <button className={page === "explore" ? "active" : ""} onClick={() => navigate("explore")}>⌖<span>Explorar</span></button>
        <button className={page === "favorites" ? "active" : ""} onClick={() => navigate("favorites")}>♡<span>Favoritos</span></button>
        <button className={page === "cart" ? "active" : ""} onClick={() => navigate("cart")}>🛒<span>Carrinho {count > 0 ? `(${count})` : ""}</span></button>
        <button className={page === "account" ? "active" : ""} onClick={() => navigate("account")}>♙<span>Perfil</span></button>
      </nav>
    </div>
  );
}