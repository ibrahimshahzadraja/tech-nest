import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../components/ProductCard";
import "../styles/product-details.css";
export default function ProductDetails({ onAdd, compared, onCompare }) {
    const { id } = useParams();
    const p = products.find((item) => item.id === id);
    if (!p)
        return (
            <main className="container page-section">
                <div className="empty-state">
                    <h2>Phone not found</h2>
                    <p>This product link may be outdated or incorrect.</p>
                    <Link className="button button-dark" to="/shop">
                        Back to phones
                    </Link>
                </div>
            </main>
        );
    const specs = [
        ["Brand", p.brand],
        ["RAM", p.ram],
        ["Storage", p.storage],
        ["Display", p.screen],
        ["Rear camera", p.camera],
        ["Battery", p.battery],
        ["Processor", p.chipset],
        ["Colour", p.color],
    ];
    return (
        <main className="container page-section">
            <div className="breadcrumbs">
                <Link to="/">Home</Link> / <Link to="/shop">Phones</Link> / {p.name}
            </div>
            <div className="detail-grid">
                <div className="detail-image">
                    <img
                        src={p.image}
                        alt={p.name}
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/800x700/f1f5f9/334155?text=Phone";
                        }}
                    />
                </div>
                <div className="detail-copy">
                    <span className="eyebrow">{p.brand} SMARTPHONE</span>
                    <h1>{p.name}</h1>
                    <div className="rating">
                        ★ {p.rating} <span>({p.reviews} customer ratings)</span>
                    </div>
                    <p className="detail-description">{p.description}</p>
                    <div className="detail-price">
                        <strong>{formatPrice(p.price)}</strong>
                        {p.oldPrice && <del>{formatPrice(p.oldPrice)}</del>}
                    </div>
                    <p className={p.stock ? "stock-good" : "stock-bad"}>
                        {p.stock ? `${p.stock} units currently available` : "Currently out of stock"}
                    </p>
                    <div className="delivery-note">
                        <strong>Delivery information</strong>
                        <span>Rs. 250 standard delivery. Free delivery on orders of Rs. 200,000 or more.</span>
                    </div>
                    <div className="detail-actions">
                        <button className="button button-dark" disabled={!p.stock} onClick={() => onAdd(p)}>
                            Add to cart
                        </button>
                        <button className="button button-light" onClick={() => onCompare(p.id)}>
                            {compared.includes(p.id) ? "Remove comparison" : "Add to compare"}
                        </button>
                    </div>
                </div>
            </div>
            <section className="spec-section">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">AT A GLANCE</span>
                        <h2>Specifications</h2>
                    </div>
                </div>
                <div className="spec-table">
                    {specs.map(([k, v]) => (
                        <div className="spec-row" key={k}>
                            <span>{k}</span>
                            <strong>{v}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
