const CategoryTabs = ({ categories, selectedCategory, onChange }) => {
  const tabItems = ["all", ...categories];

  return (
    <div className="category-tabs" role="tablist" aria-label="Filter by category tabs">
      {tabItems.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={selectedCategory === category}
          className={selectedCategory === category ? "tab active" : "tab"}
          onClick={() => onChange(category)}
        >
          {category === "all" ? "All Products" : category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
