import { Link, NavLink } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

const Header = () => {
  const { cartCount, wishlistItems } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand-mark" aria-label="Go to homepage">
          <FiShoppingBag />
          <span>Amaton</span>
        </Link>

        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>

        <div className="nav-icons">
          <Link className="icon-link" to="/wishlist" aria-label="Wishlist">
            <FiHeart />
            {wishlistItems.length > 0 && (
              <span className="count-pill">{wishlistItems.length}</span>
            )}
          </Link>
          <Link className="icon-link" to="/cart" aria-label="Shopping cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="count-pill">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
