import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
export default function Home({ compared, onCompare, onAdd }) {
    const featured = products.filter((p) => p.featured).concat(products.filter((p) => !p.featured).slice(0, 2));
    return (
        <>
            <section className="hero">
                <div className="container hero-grid">
                    <div className="hero-copy">
                        <span className="eyebrow">THE SMARTER WAY TO SHOP</span>
                        <h1>
                            Find the phone
                            <br />
                            <em>that fits your life.</em>
                        </h1>
                        <p>Explore trusted picks, compare the details that matter, and make a confident choice.</p>
                        <div className="hero-actions">
                            <Link to="/shop" className="button button-accent">
                                Explore phones <span>→</span>
                            </Link>
                            <Link to="/compare" className="text-link">
                                Compare models
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div>
                                <strong>12+</strong>
                                <span>Phone options</span>
                            </div>
                            <div>
                                <strong>3</strong>
                                <span>At-a-glance comparison</span>
                            </div>
                            <div>
                                <strong>100%</strong>
                                <span>Clear pricing</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-orbit orbit-one"></div>
                        <div className="hero-orbit orbit-two"></div>
                        <div className="hero-phone">
                            <div className="phone-camera"></div>
                            <div className="phone-glow"></div>
                            <span>
                                TECH
                                <br />
                                NEST
                            </span>
                        </div>
                        <div className="float-card">
                            <span className="float-icon">✦</span>
                            <div>
                                <strong>Choose confidently</strong>
                                <small>Specs side by side</small>
                            </div>
                        </div>
                        <div className="float-price">
                            <small>Great picks from</small>
                            <strong>Rs. 59,999</strong>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container trust-strip">
                <div>✓ Clear specifications</div>
                <div>✓ Easy comparison</div>
                <div>✓ Transparent delivery</div>
                <div>✓ Secure checkout</div>
            </section>
            <section className="section container">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">HAND-PICKED FOR YOU</span>
                        <h2>Popular right now</h2>
                        <p>Explore customer favourites and compare what matters.</p>
                    </div>
                    <Link className="text-link" to="/shop">
                        View all phones →
                    </Link>
                </div>
                <div className="product-grid">
                    {featured.map((p) => (
                        <ProductCard key={p.id} product={p} compared={compared.includes(p.id)} onCompare={onCompare} onAdd={onAdd} />
                    ))}
                </div>
            </section>
            <section className="compare-banner container">
                <div>
                    <span className="eyebrow">MAKE THE RIGHT CALL</span>
                    <h2>Two phones. One clear choice.</h2>
                    <p>Put specifications, storage, camera and battery side by side.</p>
                </div>
                <Link to="/compare" className="button button-dark">
                    Start comparing →
                </Link>
            </section>
        </>
    );
}
