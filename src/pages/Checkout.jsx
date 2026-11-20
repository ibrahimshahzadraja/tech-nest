import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calculateOrder, validateQuantity } from "../utils/businessRules";
import { formatPrice } from "../components/ProductCard";
import "../styles/checkout.css";
export default function Checkout({ cart, onComplete }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", city: "Islamabad" });
    const [errors, setErrors] = useState({});
    const [notice, setNotice] = useState("");
    const subtotal = cart.reduce((s, p) => s + p.price * p.quantity, 0);
    const totals = calculateOrder(subtotal);
    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setNotice("");
    };
    function submit(e) {
        e.preventDefault();
        const next = {};
        if (form.fullName.trim().length < 3) next.fullName = "Enter your full name (at least 3 characters).";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
        if (!/^[0-9+\- ]{10,15}$/.test(form.phone)) next.phone = "Enter a valid phone number (10–15 digits).";
        if (form.address.trim().length < 8) next.address = "Enter a complete delivery address.";
        if (!form.city) next.city = "Select a city.";
        for (const item of cart) {
            const result = validateQuantity(item.quantity, item.stock);
            if (!result.valid) next.cart = `${item.name}: ${result.message}`;
        }
        setErrors(next);
        if (Object.keys(next).length) {
            setNotice("Please correct the highlighted fields.");
            return;
        }
        const order = { id: `TN-${Date.now().toString().slice(-7)}`, customer: form, items: cart, totals, createdAt: new Date().toISOString() };
        onComplete(order);
        navigate("/confirmation");
    }
    if (!cart.length)
        return (
            <main className="container page-section">
                <div className="empty-state">
                    <h2>Nothing to check out</h2>
                    <p>Add a phone to your bag first.</p>
                    <Link className="button button-dark" to="/shop">
                        Browse phones
                    </Link>
                </div>
            </main>
        );
    return (
        <main className="container page-section">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">ALMOST THERE</span>
                    <h1>Checkout.</h1>
                    <p>Enter delivery details to review your order.</p>
                </div>
            </div>
            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={submit} noValidate>
                    <h2>Delivery details</h2>
                    {notice && (
                        <div className="form-notice" role="alert">
                            {notice}
                        </div>
                    )}
                    {errors.cart && (
                        <div className="form-error" role="alert">
                            {errors.cart}
                        </div>
                    )}
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="fullName">Full name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                value={form.fullName}
                                onChange={change}
                                placeholder="Your name"
                                aria-invalid={!!errors.fullName}
                            />
                            {errors.fullName && <small className="error-text">{errors.fullName}</small>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={change}
                                placeholder="you@example.com"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <small className="error-text">{errors.email}</small>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="phone">Phone number</label>
                            <input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={change}
                                placeholder="03XX XXXXXXX"
                                aria-invalid={!!errors.phone}
                            />
                            {errors.phone && <small className="error-text">{errors.phone}</small>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="city">City</label>
                            <select id="city" name="city" value={form.city} onChange={change}>
                                <option>Islamabad</option>
                                <option>Rawalpindi</option>
                                <option>Lahore</option>
                                <option>Karachi</option>
                                <option>Peshawar</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-field full-field">
                            <label htmlFor="address">Delivery address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={change}
                                rows="3"
                                placeholder="House, street, area and nearby landmark"
                                aria-invalid={!!errors.address}
                            />
                            {errors.address && <small className="error-text">{errors.address}</small>}
                        </div>
                    </div>
                    <div className="checkout-notice">Cash will be collected upon delivery.</div>
                    <button className="button button-dark button-full" type="submit">
                        Place order →
                    </button>
                </form>
                <aside className="order-summary">
                    <h2>Your order</h2>
                    {cart.map((p) => (
                        <div className="checkout-product" key={p.id}>
                            <span>
                                {p.name} × {p.quantity}
                            </span>
                            <strong>{formatPrice(p.price * p.quantity)}</strong>
                        </div>
                    ))}
                    <div className="summary-line">
                        <span>Subtotal</span>
                        <strong>{formatPrice(totals.subtotal)}</strong>
                    </div>
                    <div className="summary-line">
                        <span>Delivery</span>
                        <strong>{totals.delivery ? formatPrice(totals.delivery) : "FREE"}</strong>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <strong>{formatPrice(totals.total)}</strong>
                    </div>
                    <Link to="/cart" className="text-link">
                        Edit bag
                    </Link>
                </aside>
            </div>
        </main>
    );
}
