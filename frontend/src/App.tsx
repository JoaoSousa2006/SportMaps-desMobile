
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

type Sport = "Skate" | "Corrida" | "Patins" | "Basquete";
type Page = "explore" | "favorites" | "cart" | "account";
type AuthMode = "login" | "register" | "forgot";

type Place = {
  id: number;
  name: string;
  sport: Sport;
  city: string;
  distance: string;
  rating: number;
  lat: number;
  lng: number;
  address: string;
};

type Product = {
  id: number;
  name: string;
  detail: string;
  price: number;
  emoji: string;
};

const places: Place[] = [
  {
    id: 1,
    name: "Pista de Skate Vila Bocaina",
    sport: "Skate",
    city: "Mauá - SP",
    distance: "450 m",
    rating: 4.8,
    lat: -23.6677,
    lng: -46.4615,
    address: "R. Antônio Dina, 120 - Vila Bocaina, Mauá - SP",
  },
  {
    id: 2,
    name: "Parque Linear do Guapituba",
    sport: "Corrida",
    city: "Mauá - SP",
    distance: "1,2 km",
    rating: 4.5,
    lat: -23.674,
    lng: -46.47,
    address: "Parque Linear do Guapituba, Mauá - SP",
  },
  {
    id: 3,
    name: "Academia Fight Club Mauá",
    sport: "Patins",
    city: "Mauá - SP",
    distance: "1,8 km",
    rating: 4.9,
    lat: -23.659,
    lng: -46.455,
    address: "Centro, Mauá - SP",
  },
  {
    id: 4,
    name: "Quadra Poliesportiva Central",
    sport: "Basquete",
    city: "Mauá - SP",
    distance: "2,1 km",
    rating: 4.2,
    lat: -23.665,
    lng: -46.448,
    address: "Centro, Mauá - SP",
  },
];

const products: Product[] = [
  { id: 1, name: "Rodas 101A", detail: "Skate · Kit com 4", price: 89.9, emoji: "🛞" },
  { id: 2, name: "Capacete Skate", detail: "Proteção · Preto", price: 129.9, emoji: "⛑️" },
  { id: 3, name: "Rolamentos Cerâmica", detail: "Manutenção · 8 un.", price: 69.9, emoji: "⚙️" },
  { id: 4, name: "Chave Multiuso", detail: "Acessório", price: 49.9, emoji: "🔧" },
];

const sportIcon = (sport: Sport) =>
  ({ Skate: "🛹", Corrida: "🏃", Patins: "🛼", Basquete: "🏀" })[sport];

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function FlyToPlace({ place }: { place: Place | null }) {
  const map = useMap();

  useEffect(() => {
    if (place) map.flyTo([place.lat, place.lng], 15, { duration: 0.8 });
  }, [map, place]);

  return null;
}

function MapView({
  selected,
  onSelect,
  filtered,
}: {
  selected: Place | null;
  onSelect: (place: Place) => void;
  filtered: Place[];
}) {
  return (
    <MapContainer
      center={[-23.6677, -46.4615]}
      zoom={13}
      scrollWheelZoom
      className="map"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />

      <FlyToPlace place={selected} />

      {filtered.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          eventHandlers={{ click: () => onSelect(place) }}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.sport} · ⭐ {place.rating}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("explore");
  const [sport, setSport] = useState<Sport | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Place | null>(places[0]);
  const [viewList, setViewList] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("sportmaps-favorites") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("sportmaps-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id]
    );
  };

  const favoritePlaces = places.filter((place) =>
    favorites.includes(place.id)
  );

  const [cart, setCart] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 2,
  });

  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const filtered = useMemo(
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
  const displayedPlaces =
    page === "favorites" ? favoritePlaces : filtered;

  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const total = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0
  );

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + delta),
    }));
  };

  const navigate = (nextPage: Page) => setPage(nextPage);

  function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authMode === "forgot") {
      alert("Recuperação demonstrativa. Backend ainda não conectado.");
      return;
    }

    setUser(name.trim() || email.split("@")[0] || "Usuário");
    navigate("explore");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className={page === "favorites" ? "active" : ""}
          onClick={() => navigate("favorites")}
        >
          ♡<span>Favoritos</span>
          SPORT-MAPS
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
          <button
            className={page === "explore" ? "nav-active" : ""}
            onClick={() => navigate("explore")}
          >
            Explorar
          </button>

          <button
            className={page === "favorites" ? "nav-active" : ""}
            onClick={() => navigate("favorites")}
          >
            Favoritos
            <span className="nav-count">{favorites.length}</span>
          </button>

          <button
            className={page === "cart" ? "nav-active" : ""}
            onClick={() => navigate("cart")}
          >
            Carrinho <span className="nav-count">{count}</span>
          </button>

          <button
            className={`user-pill ${page === "account" ? "nav-active" : ""}`}
            onClick={() => navigate("account")}
          >
            <span className="avatar">{user ? user[0].toUpperCase() : "U"}</span>
            {user || "Entrar"}
          </button>
        </nav>
      </header>

      {(page === "explore" || page === "favorites") && (
        <main className="workspace">
          <aside className="sidebar">
            <div className="section-head">
              <div>
                <small>ENCONTRE SEU ESPAÇO</small>
                <h2>Escolha sua modalidade</h2>
              </div>
              <span className="live-dot">● AO VIVO</span>
            </div>

            <div className="sport-filters">
              {(["Todos", "Skate", "Corrida", "Patins", "Basquete"] as const).map(
                (item) => (
                  <button
                    key={item}
                    className={`sport-chip ${sport === item ? "selected" : ""}`}
                    onClick={() => setSport(item)}
                  >
                    {item !== "Todos" && sportIcon(item)} {item}
                  </button>
                )
              )}
            </div>

            <div className="list-heading">
              <div>
                <h3>{page === "favorites" ? "Seus favoritos" : "Locais próximos"}</h3>
                <p>
                  {displayedPlaces.length}{" "}
                  {page === "favorites" ? "favoritos" : "espaços encontrados"}
                </p>              </div>
              <button
                className="text-button"
                onClick={() => setViewList(!viewList)}
              >
                {viewList ? "Ver mapa" : "Ver em lista"} ↗
              </button>
            </div>

            <div className="place-list">
              {displayedPlaces.map((place) => (
                <button
                  key={place.id}
                  className={`place-card ${selected?.id === place.id ? "chosen" : ""
                    }`}
                  onClick={() => setSelected(place)}
                >
                  <div className={`place-thumb thumb-${place.sport.toLowerCase()}`}>
                    {sportIcon(place.sport)}
                  </div>

                  <div className="place-copy">
                    <span className="place-tag">{place.sport}</span>
                    <strong>{place.name}</strong>
                    <small>⌖ {place.distance} · {place.city}</small>
                    <span className="rating">★ {place.rating.toFixed(1)}</span>
                  </div>

                  <button
                    className={`favorite-btn ${favorites.includes(place.id) ? "favorited" : ""
                      }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(place.id);
                    }}
                    title="Favoritar local"
                  >
                    {favorites.includes(place.id) ? "★" : "☆"}
                  </button>
                </button>
              ))}

              {!filtered.length && (
                <div className="empty">Nenhum local encontrado.</div>
              )}
            </div>

            <div className="sidebar-foot">
              <span>◉ Dados demonstrativos</span>
              <span>SPORT-MAPS © 2026</span>
            </div>
          </aside>

          <section className="map-area">
            <MapView
              selected={selected}
              onSelect={setSelected}
              filtered={filtered}
            />

            <div className="map-overlay map-top">
              <span className="map-status">
                <i /> Mapa ativo
              </span>
              <button
                onClick={() => {
                  setQuery("");
                  setSport("Todos");
                  setSelected(null);
                }}
              >
                ↺ Limpar filtros
              </button>
            </div>

            {selected && (
              <div className="selected-place">
                <div className="selected-icon">{sportIcon(selected.sport)}</div>
                <div className="selected-info">
                  <span>
                    {selected.sport} · <b>★ {selected.rating}</b>
                  </span>
                  <strong>{selected.name}</strong>
                  <small>{selected.address}</small>
                </div>
                <button
                  className="route-btn"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`,
                      "_blank"
                    )
                  }
                >
                  ↗ Rotas
                </button>
              </div>
            )}

            <div className="map-credit">© OpenStreetMap contributors</div>
          </section>
        </main>
      )}

      {page === "cart" && (
        <main className="content-page">
          <div className="page-title">
            <div>
              <small>SUA SACOLA</small>
              <h1>
                Carrinho <span>{count} itens</span>
              </h1>
            </div>
            <button className="back-btn" onClick={() => navigate("explore")}>
              ← Continuar explorando
            </button>
          </div>

          {count === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>
              <h2>Seu carrinho está vazio</h2>
              <p>Explore os produtos e adicione o que precisar.</p>
              <button className="primary-btn" onClick={() => navigate("explore")}>
                Explorar locais
              </button>
            </div>
          ) : (
            <div className="cart-grid">
              <section className="cart-items">
                {products
                  .filter((product) => cart[product.id] > 0)
                  .map((product) => (
                    <article className="cart-item" key={product.id}>
                      <div className="product-art">{product.emoji}</div>

                      <div className="product-description">
                        <span>SPORT-MAPS STORE</span>
                        <h3>{product.name}</h3>
                        <p>{product.detail}</p>
                        <strong>{money(product.price)}</strong>
                      </div>

                      <div className="quantity">
                        <button onClick={() => changeQuantity(product.id, -1)}>
                          −
                        </button>
                        <b>{cart[product.id]}</b>
                        <button onClick={() => changeQuantity(product.id, 1)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        title="Remover"
                        onClick={() =>
                          setCart((current) => ({ ...current, [product.id]: 0 }))
                        }
                      >
                        ×
                      </button>
                    </article>
                  ))}
              </section>

              <aside className="summary">
                <h2>Resumo do pedido</h2>
                <div>
                  <span>Subtotal ({count} itens)</span>
                  <b>{money(total)}</b>
                </div>
                <div>
                  <span>Entrega</span>
                  <b className="free">A calcular</b>
                </div>
                <hr />
                <div className="summary-total">
                  <span>Total</span>
                  <strong>{money(total)}</strong>
                </div>
                <button
                  className="primary-btn"
                  onClick={() =>
                    alert("Checkout será conectado ao backend posteriormente.")
                  }
                >
                  Finalizar compra →
                </button>
                <small>🔒 Checkout demonstrativo, sem cobrança.</small>
              </aside>
            </div>
          )}
        </main>
      )}

      {page === "account" && (
        <main className="account-page">
          <section className="auth-card">
            <div className="auth-logo">⌖</div>
            <small>SPORT-MAPS ACCOUNT</small>

            <h1>
              {user
                ? `Olá, ${user}!`
                : authMode === "login"
                  ? "Bem-vindo de volta"
                  : authMode === "register"
                    ? "Criar conta"
                    : "Recuperar senha"}
            </h1>

            <p>
              {user
                ? "Sua conta está conectada neste navegador."
                : authMode === "login"
                  ? "Entre para salvar seus locais favoritos."
                  : authMode === "register"
                    ? "Crie sua conta para aproveitar o SPORT-MAPS."
                    : "Informe seu e-mail para receber instruções."}
            </p>

            {user ? (
              <>
                <div className="profile-box">
                  <div className="avatar large">{user[0].toUpperCase()}</div>
                  <strong>{user}</strong>
                  <span>{email || "Conta local demonstrativa"}</span>
                </div>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setUser(null);
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Sair da conta
                </button>
              </>
            ) : (
              <form onSubmit={submitAuth}>
                {authMode === "register" && (
                  <label>
                    Nome
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seu nome"
                    />
                  </label>
                )}

                <label>
                  E-mail
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="voce@email.com"
                  />
                </label>

                {authMode !== "forgot" && (
                  <label>
                    Senha
                    <input
                      required
                      type="password"
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </label>
                )}

                {authMode === "login" && (
                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() => setAuthMode("forgot")}
                  >
                    Esqueci minha senha
                  </button>
                )}

                <button className="primary-btn" type="submit">
                  {authMode === "login"
                    ? "Entrar"
                    : authMode === "register"
                      ? "Criar conta"
                      : "Enviar instruções"}
                </button>
              </form>
            )}

            <div className="auth-switch">
              {!user &&
                (authMode === "login" ? (
                  <>
                    Não tem conta?{" "}
                    <button onClick={() => setAuthMode("register")}>
                      Criar conta grátis
                    </button>
                  </>
                ) : (
                  <button onClick={() => setAuthMode("login")}>
                    Voltar para login
                  </button>
                ))}
            </div>

            <button
              className="back-btn auth-back"
              onClick={() => navigate("explore")}
            >
              ← Voltar para explorar
            </button>
          </section>
        </main>
      )}

      <nav className="mobile-nav">
        <button
          className={page === "explore" ? "active" : ""}
          onClick={() => navigate("explore")}
        >
          ⌖<span>Explorar</span>
        </button>
        <button onClick={() => navigate("explore")}>
          ♡<span>Favoritos</span>
        </button>
        <button
          className={page === "cart" ? "active" : ""}
          onClick={() => navigate("cart")}
        >
          🛒<span>Carrinho {count > 0 ? `(${count})` : ""}</span>
        </button>
        <button
          className={page === "account" ? "active" : ""}
          onClick={() => navigate("account")}
        >
          ♙<span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}
