import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { CartContext } from "./cartContext";
import { getTax } from "../utils/helpers";

const CART_STORAGE_KEY = "amaton_cart";
const WISHLIST_STORAGE_KEY = "amaton_wishlist";

const parseStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => parseStorage(CART_STORAGE_KEY, []));
  const [wishlistItems, setWishlistItems] = useState(() =>
    parseStorage(WISHLIST_STORAGE_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id: uuidv4(), product, quantity: 1 }];
    });

    toast.success("Added to cart");
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info("Removed from cart");
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.product.id === productId);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);

      if (exists) {
        toast.info("Removed from wishlist");
        return prev.filter((item) => item.product.id !== product.id);
      }

      toast.success("Saved to wishlist");
      return [...prev, { id: uuidv4(), product }];
    });
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const tax = useMemo(() => getTax(subtotal), [subtotal]);

  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    wishlistItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    subtotal,
    tax,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
