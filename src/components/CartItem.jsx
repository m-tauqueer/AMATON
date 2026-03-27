import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img src={item.product.image} alt={item.product.title} />

      <div className="cart-item-content">
        <h3>{item.product.title}</h3>
        <p>{formatCurrency(item.product.price)}</p>

        <div className="quantity-box">
          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
            <FiMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
            <FiPlus />
          </button>
        </div>
      </div>

      <div className="cart-actions">
        <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
        <button onClick={() => removeFromCart(item.product.id)}>
          <FiTrash2 /> Remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
