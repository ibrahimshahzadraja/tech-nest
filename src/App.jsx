import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { products } from "./data/products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

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
    const [order, setOrder] = useState(() => readStorage("technest-last-order", null));
    const [toast, setToast] = useState("");
    const [loadState, setLoadState] = useState("loading");
    const location = useLocation();
    useEffect(() => {
        localStorage.setItem("technest-cart", JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        localStorage.setItem("technest-compare", JSON.stringify(compared));
    }, [compared]);
    useEffect(() => {
        if (order) localStorage.setItem("technest-last-order", JSON.stringify(order));
    }, [order]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);
    useEffect(() => {
        let active = true;
        const timer = setTimeout(() => {
            if (active) setLoadState("ready");
        }, 350);
        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, []);
    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
    function notify(message) {
        setToast(message);
        window.setTimeout(() => setToast(""), 2400);
    }
    function addToCart(product) {
        if (!product.stock) {
            notify("This phone is currently out of stock.");
            return;
        }
        setCart((old) => {
            const existing = old.find((item) => item.id === product.id);
            if (existing) {
                const quantity = existing.quantity + 1;
                if (quantity > Math.min(5, product.stock)) {
                    notify(`Maximum available quantity is ${Math.min(5, product.stock)}.`);
                    return old;
                }
                return old.map((item) => (item.id === product.id ? { ...item, quantity } : item));
            }
            return [...old, { ...product, quantity: 1 }];
        });
        notify(`${product.name} added to your bag.`);
    }
    function updateCart(id, quantity) {
        if (quantity < 1) return;
        const product = products.find((p) => p.id === id);
        if (!product) return;
        const max = Math.min(5, product.stock);
        if (quantity > max) {
            notify(`You can add up to ${max} unit(s).`);
            return;
        }
        setCart((old) => old.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
    function removeCart(id) {
        setCart((old) => old.filter((item) => item.id !== id));
        notify("Item removed from your bag.");
    }
    function toggleCompare(id) {
        setCompared((old) => {
            if (old.includes(id)) return old.filter((x) => x !== id);
            if (old.length >= 3) {
                notify("You can compare up to three phones.");
                return old;
            }
            return [...old, id];
        });
    }
    function completeOrder(nextOrder) {
        setOrder(nextOrder);
        setCart([]);
    }
    return (
        <>
            <Header cartCount={cartCount} compareCount={compared.length} />
            {loadState === "loading" ? (
                <main className="container loading-state">
                    <div className="loader"></div>
                    <p>Preparing your phone catalogue…</p>
                </main>
            ) : loadState === "error" ? (
                <main className="container page-section">
                    <div className="empty-state">
                        <div className="empty-icon">!</div>
                        <h2>We couldn't load the catalogue</h2>
                        <p>Your selections are safe. Check your connection or retry.</p>
                        <button
                            className="button button-dark"
                            onClick={() => {
                                setLoadState("loading");
                                window.setTimeout(() => setLoadState("ready"), 350);
                            }}
                        >
                            Try again
                        </button>
                    </div>
                </main>
            ) : (
                <Routes>
                    <Route path="/" element={<Home compared={compared} onCompare={toggleCompare} onAdd={addToCart} />} />
                    <Route
                        path="/shop"
                        element={
                            <Shop compared={compared} onCompare={toggleCompare} onAdd={addToCart} onSimulateFailure={() => setLoadState("error")} />
                        }
                    />
                    <Route path="/product/:id" element={<ProductDetails onAdd={addToCart} compared={compared} onCompare={toggleCompare} />} />
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
            )}
            <Footer />
            {toast && (
                <div className="toast" role="status">
                    {toast}
                </div>
            )}
        </>
    );
}