export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);

export const normalizeSearch = (value) => value.trim().toLowerCase();

export const inPriceRange = (price, range) => {
  if (!range || range === "all") {
    return true;
  }

  if (range === "1000+") {
    return price >= 1000;
  }

  const [min, max] = range.split("-").map(Number);
  return price >= min && price < max;
};

export const filterProducts = (products, filters) => {
  const { search, category, priceRange } = filters;
  const normalizedSearch = normalizeSearch(search || "");

  return products.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.title.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      !category || category === "all" || product.category === category;
    const matchesPrice = inPriceRange(product.price, priceRange);

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  if (sortBy === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }

  if (sortBy === "newest") {
    sorted.sort((a, b) => b.id - a.id);
  }

  return sorted;
};

export const getFeaturedProducts = (products, count = 6) =>
  [...products]
    .sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
    .slice(0, count);

export const getTax = (subtotal, taxRate = 0.08) => subtotal * taxRate;
