import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const Cart = () => {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();

  return (
    <div className="container page-block">
      <div className="section-heading">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} unique products</p>
      </div>

      {!cartItems.length ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some products to see them here.</p>
          <Link className="cta-link" to="/products">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

          <aside className="summary-card">
            <h3>Order summary</h3>
            <p>
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </p>
            <p>
              <span>Tax</span>
              <strong>{formatCurrency(tax)}</strong>
            </p>
            <p className="total-line">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </p>

            <div className="summary-actions">
              <Link className="add-btn center" to="/checkout">
                Proceed to checkout
              </Link>
              <button className="ghost-btn" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
