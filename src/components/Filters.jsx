const PRICE_OPTIONS = ["all", "0-100", "100-500", "500-1000", "1000+"];

const Filters = ({
  categories,
  category,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) => {
  return (
    <aside className="filters-panel" aria-label="Product filters">
      <div>
        <h3>Category</h3>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Price</h3>
        <select value={priceRange} onChange={(event) => onPriceChange(event.target.value)}>
          {PRICE_OPTIONS.map((range) => (
            <option key={range} value={range}>
              {range === "all" ? "Any price" : `$${range}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Sort by</h3>
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
    </aside>
  );
};

export default Filters;
