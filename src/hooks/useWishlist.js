import useCart from "./useCart";

const useWishlist = () => {
  const { wishlistItems, toggleWishlist, isInWishlist } = useCart();

  return {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
  };
};

export default useWishlist;
