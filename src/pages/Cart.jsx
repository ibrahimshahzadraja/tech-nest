import { Link } from "react-router-dom";
import { formatPrice } from "../components/ProductCard";
import { calculateOrder, validateQuantity, MAX_PER_ORDER } from "../utils/businessRules";
import "../styles/cart.css";
export default function Cart({ cart, onUpdate, onRemove }) {
    const subtotal = cart.reduce((s, item) => s + item.price * item.quantity, 0);
    const totals = calculateOrder(subtotal);
    return (
        <main className="container page-section">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">YOUR SELECTION</span>
                    <h1>Shopping bag.</h1>
                    <p>Review your phones and quantities before checkout.</p>
                </div>
                <Link className="text-link" to="/shop">
                    ← Continue shopping
                </Link>
            </div>
            {!cart.length ? (
                <div className="empty-state">
                    <div className="empty-icon">⌑</div>
                    <h2>Your bag is empty</h2>
                    <p>Find a phone you love and add it to your bag.</p>
                    <Link className="button button-dark" to="/shop">
                        Explore phones
                    </Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <section className="cart-items">
                        {cart.map((item) => (
                            <article className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-info">
                                    <span className="muted small">{item.brand}</span>
                                    <h3>{item.name}</h3>
                                    <strong>{formatPrice(item.price)}</strong>
                                    <button className="remove-link" onClick={() => onRemove(item.id)}>
                                        Remove
                                    </button>
                                </div>
                                <div className="quantity-control">
                                    <button
                                        aria-label="Decrease quantity"
                                        onClick={() => onUpdate(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        aria-label="Increase quantity"
                                        onClick={() => {
                                            const next = validateQuantity(item.quantity + 1, item.stock);
                                            if (next.valid) onUpdate(item.id, item.quantity + 1);
                                            else window.alert(next.message);
                                        }}
                                        disabled={item.quantity >= Math.min(MAX_PER_ORDER, item.stock)}
                                    >
                                        +
                                    </button>
                                </div>
                                <strong className="line-total">{formatPrice(item.price * item.quantity)}</strong>
                            </article>
                        ))}
                    </section>
                    <aside className="order-summary">
                        <h2>Order summary</h2>
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <strong>{formatPrice(totals.subtotal)}</strong>
                        </div>
                        <div className="summary-line">
                            <span>Delivery</span>
                            <strong>{totals.delivery ? formatPrice(totals.delivery) : "FREE"}</strong>
                        </div>
                        {totals.delivery > 0 && <p className="delivery-hint">Add {formatPrice(200000 - subtotal)} more for free delivery.</p>}
                        <div className="summary-total">
                            <span>Total</span>
                            <strong>{formatPrice(totals.total)}</strong>
                        </div>
                        <Link className="button button-dark button-full" to="/checkout">
                            Continue to checkout →
                        </Link>
                        <p className="muted tiny">Only Cash on Delivery Available.</p>
                    </aside>
                </div>
            )}
        </main>
    );
}
