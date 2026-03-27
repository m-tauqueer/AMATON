import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import ProductGrid from "../components/ProductGrid";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const products = wishlistItems.map((item) => item.product);

  return (
    <div className="container page-block">
      <div className="section-heading">
        <h1>Wishlist</h1>
        <p>{products.length} saved items</p>
      </div>

      {!products.length ? (
        <div className="empty-state">
          <FiHeart size={30} />
          <h3>Your wishlist is empty</h3>
          <p>Save products you want to come back to later.</p>
          <Link className="cta-link" to="/products">
            Browse products
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Wishlist;
