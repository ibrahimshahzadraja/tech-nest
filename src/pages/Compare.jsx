import { Link } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../components/ProductCard";
import "../styles/compare.css";
export default function Compare({ compared, onCompare }) {
    const chosen = products.filter((p) => compared.includes(p.id));
    const fields = [
        ["Price", (p) => formatPrice(p.price)],
        ["Brand", (p) => p.brand],
        ["RAM", (p) => p.ram],
        ["Storage", (p) => p.storage],
        ["Display", (p) => p.screen],
        ["Camera", (p) => p.camera],
        ["Battery", (p) => p.battery],
        ["Processor", (p) => p.chipset],
        ["Availability", (p) => (p.stock ? `${p.stock} in stock` : "Out of stock")],
        ["Rating", (p) => `★ ${p.rating} (${p.reviews})`],
    ];
    return (
        <main className="container page-section">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">SIDE-BY-SIDE VIEW</span>
                    <h1>Compare phones.</h1>
                    <p>Compare up to three models before making your choice.</p>
                </div>
                <Link to="/shop" className="button button-light">
                    Browse phones
                </Link>
            </div>
            {chosen.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">⇄</div>
                    <h2>Your comparison is empty</h2>
                    <p>Choose up to three phones from the shop to compare their specifications here.</p>
                    <Link className="button button-dark" to="/shop">
                        Find phones to compare
                    </Link>
                </div>
            ) : (
                <>
                    <div className="compare-topline">
                        <span>{chosen.length} of 3 phones selected</span>
                        <button className="clear-button" onClick={() => chosen.forEach((p) => onCompare(p.id))}>
                            Clear comparison
                        </button>
                    </div>
                    <div className="comparison-scroll">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Specifications</th>
                                    {chosen.map((p) => (
                                        <th key={p.id}>
                                            <img src={p.image} alt="" />
                                            <strong>{p.name}</strong>
                                            <span>{p.brand}</span>
                                            <button className="remove-link" onClick={() => onCompare(p.id)}>
                                                Remove ×
                                            </button>
                                        </th>
                                    ))}
                                    {chosen.length < 3 && (
                                        <th className="add-column">
                                            <Link to="/shop">+ Add another phone</Link>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map(([label, fn]) => (
                                    <tr key={label}>
                                        <th>{label}</th>
                                        {chosen.map((p) => (
                                            <td key={p.id}>{fn(p)}</td>
                                        ))}
                                        {chosen.length < 3 && <td>—</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="muted small comparison-tip">Tip: compare the features that matter most to your everyday use.</p>
                </>
            )}
        </main>
    );
}
