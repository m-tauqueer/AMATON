import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const openDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const onCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  };

  return (
    <Motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
      onClick={openDetails}
      onKeyDown={onCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <button
        className={isInWishlist(product.id) ? "wishlist-btn active" : "wishlist-btn"}
        onClick={(event) => {
          event.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Toggle wishlist"
      >
        <FiHeart />
      </button>

      <Link
        to={`/products/${product.id}`}
        className="product-thumb-wrap"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={product.image} alt={product.title} className="product-thumb" />
      </Link>

      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>

        <div className="card-row">
          <span className="price-tag">{formatCurrency(product.price)}</span>
          <span className="rating-tag">
            <FiStar />
            {product.rating?.rate ?? "N/A"}
          </span>
        </div>

        <button
          className="add-btn"
          onClick={(event) => {
            event.stopPropagation();
            addToCart(product);
          }}
        >
          <FiShoppingCart /> Add to cart
        </button>
      </div>
    </Motion.article>
  );
};

export default ProductCard;
