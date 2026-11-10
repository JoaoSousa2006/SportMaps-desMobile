import { money, sportIcon } from "../data/places";
import type { Place, Product } from "../types";

export function PlaceDetailsPage({ place, products, cart, onAddToCart, onBack }: {
  place: Place;
  products: Product[];
  cart: Record<number, number>;
  onAddToCart: (productId: number) => void;
  onBack: () => void;
}) {
  return (
    <main className="content-page details-page">
      <div className="page-title"><div><small>DETALHES DO LOCAL</small><h1>{place.name}</h1></div><button className="back-btn" onClick={onBack}>← Voltar aos locais</button></div>
      <div className="details-grid">
        <section className="place-details">
          <div className={`details-banner thumb-${place.sport.toLowerCase()}`}><span>{sportIcon(place.sport)}</span><span className="place-tag">{place.sport}</span></div>
          <div className="details-body">
            <div className="details-rating">★ {place.rating.toFixed(1)} <span>· {place.distance} de você</span></div>
            <p>{place.description}</p>
            <dl className="place-facts">
              <div><dt>Endereço</dt><dd>{place.address}</dd></div>
              <div><dt>Horário</dt><dd>{place.openingHours}</dd></div>
              <div><dt>O que encontrar</dt><dd>{place.features.join(" · ")}</dd></div>
            </dl>
            <a className="route-link" href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`} target="_blank" rel="noreferrer">↗ Abrir rota no Google Maps</a>
          </div>
        </section>
        <section className="detail-products">
          <div className="products-heading"><div><small>SPORT-MAPS STORE</small><h2>Equipamentos para sua prática</h2></div></div>
          {products.map((product) => (
            <article className="detail-product" key={product.id}>
              <div className="product-art">{product.emoji}</div>
              <div className="detail-product-copy"><strong>{product.name}</strong><small>{product.detail}</small><b>{money(product.price)}</b></div>
              <button className="add-product-btn" onClick={() => onAddToCart(product.id)} aria-label={`Adicionar ${product.name} ao carrinho`}>
                {cart[product.id] > 0 ? `+ ${cart[product.id]}` : "+"}
              </button>
            </article>
          ))}
          {!products.length && <p className="empty">Nenhum produto disponível para esta modalidade.</p>}
        </section>
      </div>
    </main>
  );
}