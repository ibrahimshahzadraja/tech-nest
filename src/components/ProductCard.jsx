import { Link } from "react-router-dom";
import "../styles/product-card.css";
export default function ProductCard({ product, compared, onCompare, onAdd }) {
    return (
        <article className="product-card">
            <div className="product-image-wrap">
                <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x500/f1f5f9/334155?text=Phone";
                        }}
                    />
                </Link>
                {product.featured && <span className="tag">Popular</span>}
                {product.stock === 0 && <span className="stock-tag">Out of stock</span>}
                <label className="compare-check">
                    <input type="checkbox" checked={compared} onChange={() => onCompare(product.id)} aria-label={`Compare ${product.name}`} /> Compare
                </label>
            </div>
            <div className="product-info">
                <div className="muted small">
                    {product.brand} · {product.ram} RAM · {product.storage}
                </div>
                <Link to={`/product/${product.id}`} className="product-name">
                    {product.name}
                </Link>
                <p className="description">{product.description}</p>
                <div className="rating">
                    ★ {product.rating} <span>({product.reviews} reviews)</span>
                </div>
                <div className="price-line">
                    <strong>{formatPrice(product.price)}</strong>
                    {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                </div>
                <div className="card-actions">
                    <Link className="button button-light" to={`/product/${product.id}`}>
                        View details
                    </Link>
                    <button className="button button-dark" disabled={!product.stock} onClick={() => onAdd(product)}>
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}
export function formatPrice(value) {
    return `Rs. ${Number(value).toLocaleString("en-PK")}`;
}