import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  return (
    <label className="search-wrap" htmlFor="product-search">
      <FiSearch />
      <input
        id="product-search"
        type="text"
        placeholder="Search products: laptop, smartphone, headphones..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};

export default SearchBar;
