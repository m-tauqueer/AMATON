import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { getProductById } from "../services/api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Unable to load product details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    return [product.image, product.image, product.image];
  }, [product]);

  useEffect(() => {
    setActiveImage(0);
  }, [product]);

  if (loading) {
    return <LoadingState message="Loading product details..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchProduct} />;
  }

  if (!product) {
    return <ErrorState message="Product not found." />;
  }

  return (
    <div className="container page-block details-page">
      <div className="details-grid">
        <div className="gallery-card">
          <img
            src={galleryImages[activeImage]}
            alt={`${product.title} ${activeImage + 1}`}
          />

          <div className="thumb-row">
            {galleryImages.map((src, index) => (
              <button
                key={`${src}-${index}`}
                className={activeImage === index ? "thumb-btn active" : "thumb-btn"}
                onClick={() => setActiveImage(index)}
              >
                <img src={src} alt={`${product.title} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="details-content">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="details-description">{product.description}</p>

          <div className="details-meta">
            <span className="price-tag large">{formatCurrency(product.price)}</span>
            <span className="rating-tag">
              <FiStar />
              {product.rating?.rate ?? "N/A"} ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <div className="details-actions">
            <button className="add-btn" onClick={() => addToCart(product)}>
              <FiShoppingCart /> Add to cart
            </button>
            <button
              className={isInWishlist(product.id) ? "ghost-btn active" : "ghost-btn"}
              onClick={() => toggleWishlist(product)}
            >
              <FiHeart /> {isInWishlist(product.id) ? "Saved" : "Add to wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
