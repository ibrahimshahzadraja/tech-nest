import { Link, NavLink } from "react-router-dom";
import "../styles/header.css";
export default function Header({ cartCount, compareCount }) {
    return (
        <header className="header">
            <div className="container nav-wrap">
                <Link to="/" className="logo">
                    <span className="logo-mark">T</span> Tech<span>Nest</span>
                </Link>
                <nav className="nav-links">
                    <NavLink to="/shop">Shop phones</NavLink>
                    <NavLink to="/compare">
                        Compare <small>{compareCount}</small>
                    </NavLink>
                </nav>
                <div className="nav-actions">
                    <Link className="cart-link" to="/cart" aria-label={`Cart with ${cartCount} items`}>
                        <span className="material-symbols-outlined">shopping_cart</span>Cart <span className="cart-count">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
