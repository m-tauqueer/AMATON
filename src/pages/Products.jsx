import { useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CategoryTabs from "../components/CategoryTabs";
import ProductGrid from "../components/ProductGrid";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { filterProducts, sortProducts } from "../utils/helpers";

const Products = () => {
  const { products, categories, loading, error, refetchProducts } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(search, 350);

  const finalProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      search: debouncedSearch,
      category,
      priceRange,
    });

    return sortProducts(filtered, sortBy);
  }, [products, debouncedSearch, category, priceRange, sortBy]);

  if (loading) {
    return <LoadingState message="Loading storefront..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetchProducts} />;
  }

  return (
    <div className="container page-block">
      <div className="section-heading">
        <h1>Products</h1>
        <p>{finalProducts.length} items found</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <CategoryTabs
        categories={categories}
        selectedCategory={category}
        onChange={setCategory}
      />

      <div className="products-layout">
        <Filters
          categories={categories}
          category={category}
          priceRange={priceRange}
          sortBy={sortBy}
          onCategoryChange={setCategory}
          onPriceChange={setPriceRange}
          onSortChange={setSortBy}
        />

        <ProductGrid products={finalProducts} />
      </div>
    </div>
  );
};

export default Products;
