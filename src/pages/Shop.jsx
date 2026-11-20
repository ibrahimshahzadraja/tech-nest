import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";
export default function Shop({ compared, onCompare, onAdd, onSimulateFailure }) {
    const [query, setQuery] = useState("");
    const [brand, setBrand] = useState("All");
    const [ram, setRam] = useState("All");
    const [maxPrice, setMaxPrice] = useState("300000");
    const [sort, setSort] = useState("featured");
    const [inStock, setInStock] = useState(false);
    const brands = ["All", ...new Set(products.map((p) => p.brand))];
    const filtered = useMemo(() => {
        let list = products.filter((p) => `${p.name} ${p.brand} ${p.description} ${p.chipset}`.toLowerCase().includes(query.toLowerCase()));
        if (brand !== "All") list = list.filter((p) => p.brand === brand);
        if (ram !== "All") list = list.filter((p) => p.ram === ram);
        list = list.filter((p) => p.price <= Number(maxPrice));
        if (inStock) list = list.filter((p) => p.stock > 0);
        if (sort === "low") list.sort((a, b) => a.price - b.price);
        if (sort === "high") list.sort((a, b) => b.price - a.price);
        if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
        return list;
    }, [query, brand, ram, maxPrice, sort, inStock]);
    const clear = () => {
        setQuery("");
        setBrand("All");
        setRam("All");
        setMaxPrice("300000");
        setSort("featured");
        setInStock(false);
    };
    return (
        <main className="container page-section">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">THE PHONE COLLECTION</span>
                    <h1>Find your next phone.</h1>
                    <p>Search, narrow down and compare all in one place.</p>
                </div>
                <span className="result-count">{filtered.length} phones</span>
            </div>
            <div className="shop-layout">
                <aside className="filter-panel">
                    <div className="filter-title">
                        <h3>Filters</h3>
                        <button className="clear-button" onClick={clear}>
                            Clear all
                        </button>
                    </div>
                    <button className="simulate-load-failure" type="button" onClick={onSimulateFailure}>
                        Simulate load failure
                    </button>
                    <label className="field-label" htmlFor="search">
                        Search phones
                    </label>
                    <input
                        id="search"
                        className="control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Name, brand, chipset..."
                    />
                    <label className="field-label" htmlFor="brand">
                        Brand
                    </label>
                    <select id="brand" className="control" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        {brands.map((b) => (
                            <option key={b}>{b}</option>
                        ))}
                    </select>
                    <label className="field-label" htmlFor="ram">
                        RAM
                    </label>
                    <select id="ram" className="control" value={ram} onChange={(e) => setRam(e.target.value)}>
                        <option>All</option>
                        <option>6 GB</option>
                        <option>8 GB</option>
                        <option>12 GB</option>
                    </select>
                    <label className="field-label" htmlFor="max-price">
                        Maximum price <strong>{Number(maxPrice).toLocaleString("en-PK")}</strong>
                    </label>
                    <input
                        id="max-price"
                        type="range"
                        min="50000"
                        max="300000"
                        step="5000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <div className="range-labels">
                        <span>Rs. 50k</span>
                        <span>Rs. 300k</span>
                    </div>
                    <label className="check-row">
                        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In-stock only
                    </label>
                    <div className="active-filters">
                        <strong>Active filters</strong>
                        <div className="chips">
                            {query && <button onClick={() => setQuery("")}>Search: {query} x</button>}
                            {brand !== "All" && <button onClick={() => setBrand("All")}>{brand} x</button>}
                            {ram !== "All" && <button onClick={() => setRam("All")}>{ram} RAM x</button>}
                            {inStock && <button onClick={() => setInStock(false)}>In stock x</button>}
                            {Number(maxPrice) < 300000 && (
                                <button onClick={() => setMaxPrice("300000")}>Under {Number(maxPrice).toLocaleString()} x</button>
                            )}
                            {!query && brand === "All" && ram === "All" && !inStock && Number(maxPrice) === 300000 && (
                                <span className="muted small">No filters applied</span>
                            )}
                        </div>
                    </div>
                </aside>
                <section className="results-area">
                    <div className="results-toolbar">
                        <span>
                            Showing <strong>{filtered.length}</strong> of {products.length} phones
                        </span>
                        <label>
                            Sort by{" "}
                            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="low">Price: low to high</option>
                                <option value="high">Price: high to low</option>
                                <option value="rating">Top rated</option>
                                <option value="name">Name: A–Z</option>
                            </select>
                        </label>
                    </div>
                    {filtered.length ? (
                        <div className="product-grid">
                            {filtered.map((p) => (
                                <ProductCard key={p.id} product={p} compared={compared.includes(p.id)} onCompare={onCompare} onAdd={onAdd} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">⌕</div>
                            <h2>No phones found</h2>
                            <p>Try a different search or remove one or more filters.</p>
                            <button className="button button-dark" onClick={clear}>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
