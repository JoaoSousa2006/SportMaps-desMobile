import { money } from "../data/places";
import type { Product } from "../types";

export function CartPage({ products, cart, onQuantityChange, onRemove, onContinue }: {
  products: Product[];
  cart: Record<number, number>;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onContinue: () => void;
}) {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);

  return (
    <main className="content-page">
      <div className="page-title"><div><small>SUA SACOLA</small><h1>Carrinho <span>{count} itens</span></h1></div><button className="back-btn" onClick={onContinue}>← Continuar explorando</button></div>
      {count === 0 ? (
        <div className="empty-cart"><div>🛒</div><h2>Seu carrinho está vazio</h2><p>Explore os locais e escolha seus equipamentos.</p><button className="primary-btn" onClick={onContinue}>Explorar locais</button></div>
      ) : (
        <div className="cart-grid">
          <section className="cart-items">
            {products.filter((product) => cart[product.id] > 0).map((product) => (
              <article className="cart-item" key={product.id}>
                <div className="product-art">{product.emoji}</div>
                <div className="product-description"><span>SPORT-MAPS STORE</span><h3>{product.name}</h3><p>{product.detail}</p><strong>{money(product.price)}</strong></div>
                <div className="quantity"><button onClick={() => onQuantityChange(product.id, -1)} aria-label={`Diminuir ${product.name}`}>−</button><b>{cart[product.id]}</b><button onClick={() => onQuantityChange(product.id, 1)} aria-label={`Aumentar ${product.name}`}>+</button></div>
                <button className="remove-btn" title="Remover" onClick={() => onRemove(product.id)}>×</button>
              </article>
            ))}
          </section>
          <aside className="summary">
            <h2>Resumo do pedido</h2><div><span>Subtotal ({count} itens)</span><b>{money(total)}</b></div><div><span>Entrega</span><b className="free">A calcular</b></div><hr />
            <div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div>
            <button className="primary-btn" onClick={() => alert("Checkout será conectado ao backend posteriormente.")}>Finalizar compra →</button><small>🔒 Checkout demonstrativo, sem cobrança.</small>
          </aside>
        </div>
      )}
    </main>
  );
}