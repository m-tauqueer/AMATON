import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getFeaturedProducts } from "../utils/helpers";

const Home = () => {
  const { products, loading, error, refetchProducts } = useProducts();

  if (loading) {
    return <LoadingState message="Curating your storefront..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetchProducts} />;
  }

  const featured = getFeaturedProducts(products, 6);

  return (
    <div className="container page-block">
      <Motion.section
        className="hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="eyebrow">Shop smarter</p>
          <h1>Discover trending gear, style, and home essentials.</h1>
          <p>
            Explore products, compare prices, save favorites, and check out in
            one smooth shopping flow.
          </p>
          <Link to="/products" className="cta-link">
            Explore products
          </Link>
        </div>
      </Motion.section>

      <section>
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
};

export default Home;
