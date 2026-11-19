import { Link } from "react-router-dom";
import "../styles/footer.css";
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div>
                    <Link to="/" className="logo footer-logo">
                        <span className="logo-mark">T</span> Tech<span>Nest</span>
                    </Link>
                    <p>Smarter phone shopping starts here.</p>
                </div>
                <div className="footer-note">Easy delivery process · On time delivey · Easy return plan</div>
            </div>
        </footer>
    );
}
