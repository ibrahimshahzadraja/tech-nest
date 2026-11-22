import { Link } from "react-router-dom";
import { formatPrice } from "../components/ProductCard";
import "../styles/confirmation.css";
export default function Confirmation({ order }) {
    if (!order)
        return (
            <main className="container page-section">
                <div className="empty-state">
                    <h2>No recent order</h2>
                    <p>Complete checkout to see your confirmation.</p>
                    <Link className="button button-dark" to="/shop">
                        Browse phones
                    </Link>
                </div>
            </main>
        );
    return (
        <main className="container page-section">
            <div className="confirmation-card">
                <div className="success-mark">✓</div>
                <span className="eyebrow">ORDER RECEIVED</span>
                <h1>You're all set.</h1>
                <p>Your order has been recorded at our system.</p>
                <div className="order-id">
                    Order reference <strong>{order.id}</strong>
                </div>
                <div className="confirmation-details">
                    <div>
                        <span>Customer</span>
                        <strong>{order.customer.fullName}</strong>
                    </div>
                    <div>
                        <span>Delivery city</span>
                        <strong>{order.customer.city}</strong>
                    </div>
                    <div>
                        <span>Items</span>
                        <strong>{order.items.reduce((s, p) => s + p.quantity, 0)}</strong>
                    </div>
                    <div>
                        <span>Order total</span>
                        <strong>{formatPrice(order.totals.total)}</strong>
                    </div>
                </div>
                <div className="confirmation-items">
                    {order.items.map((p) => (
                        <div key={p.id}>
                            <span>
                                {p.name} x {p.quantity}
                            </span>
                            <strong>{formatPrice(p.price * p.quantity)}</strong>
                        </div>
                    ))}
                </div>
                <Link to="/shop" className="button button-dark">
                    Continue shopping
                </Link>
            </div>
        </main>
    );
}
