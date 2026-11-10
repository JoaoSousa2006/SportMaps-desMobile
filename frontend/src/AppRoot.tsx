import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { PlaceDetailsPage } from "./pages/PlaceDetailsPage";
import { places, products } from "./data/places";
import { apiGet, apiPost, apiPut } from "./services/api";
import type { Page, Place, Sport, User } from "./types";

type AuthResponse = { user: User; cart: Record<number, number> };
type SessionResponse = { user: User | null; cart: Record<number, number> };

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
  const [cart, setCart] = useState<Record<number, number>>({});
  const cartRef = useRef(cart);
  const cartSaveQueue = useRef<Promise<unknown>>(Promise.resolve());
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    apiGet<SessionResponse>("/auth/session")
      .then(({ user: sessionUser, cart: sessionCart }) => {
        setUser(sessionUser);
        setEmail(sessionUser?.email || "");
        cartRef.current = sessionCart;
        setCart(sessionCart);
      })
      .catch(() => {
        cartRef.current = {};
        setCart({});
      });
  }, []);

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
    const nextCart = {
      ...cartRef.current,
      [id]: Math.max(0, (cartRef.current[id] || 0) + delta),
    };
    cartRef.current = nextCart;
    setCart(nextCart);
    if (user) {
      cartSaveQueue.current = cartSaveQueue.current
        .then(() => apiPut("/cart", { cart: nextCart }))
        .catch((error: unknown) => console.error("Não foi possível salvar o carrinho:", error));
    }
  };

  const removeFromCart = (id: number) => {
    const nextCart = { ...cartRef.current, [id]: 0 };
    cartRef.current = nextCart;
    setCart(nextCart);
    if (user) {
      cartSaveQueue.current = cartSaveQueue.current
        .then(() => apiPut("/cart", { cart: nextCart }))
        .catch((error: unknown) => console.error("Não foi possível salvar o carrinho:", error));
    }
  };

  const submitAuth = async (mode: "login" | "register", name: string, nextEmail: string, password: string) => {
    await cartSaveQueue.current;
    const result = await apiPost<AuthResponse>(`/auth/${mode}`, { name, email: nextEmail, password });
    setUser(result.user);
    setEmail(result.user.email);
    cartRef.current = result.cart;
    setCart(result.cart);
    navigate("explore");
  };

  const signOut = async () => {
    try {
      await cartSaveQueue.current;
      await apiPost("/auth/logout");
    } finally {
      setUser(null);
      setEmail("");
      cartRef.current = {};
      setCart({});
    }
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
            <span className="avatar">{user ? user.name[0].toUpperCase() : "U"}</span>
            {user?.name || "Entrar"}
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
          onRemove={removeFromCart}
          onContinue={() => navigate("explore")}
        />
      )}
      {page === "account" && (
        <AccountPage
          user={user}
          email={email}
          onSubmit={submitAuth}
          onSignOut={signOut}
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