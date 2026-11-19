import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

export default function App() {

    const [cart, setCart] = useState(() => readStorage("technest-cart", []));
    const [compared, setCompared] = useState(() => readStorage("technest-compare", []));

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    return (
        <>
            <Header cartCount={cartCount} compareCount={compared.length} />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route
                    path="*"
                    element={
                        <main className="container page-section">
                            <div className="empty-state">
                                <h2>Page not found</h2>
                                <p>The page you're looking for doesn't exist.</p>
                                <Link className="button button-dark" to="/">
                                    Go home
                                </Link>
                            </div>
                        </main>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}
