import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const schema = yup.object({
  fullName: yup.string().min(3).required("Name is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().min(8).required("Address is required"),
  city: yup.string().required("City is required"),
  zipCode: yup.string().min(4).required("ZIP code is required"),
});

const Checkout = () => {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    toast.success(`Order placed. Thanks, ${formData.fullName}!`);
    clearCart();
    reset();
  };

  return (
    <div className="container page-block">
      <div className="section-heading">
        <h1>Checkout</h1>
        <p>Complete your order in one step</p>
      </div>

      {!cartItems.length ? (
        <div className="empty-state">
          <h3>No items to checkout</h3>
          <p>Add products to cart before placing an order.</p>
          <Link className="cta-link" to="/products">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Full name
              <input type="text" {...register("fullName")} />
              {errors.fullName && <small>{errors.fullName.message}</small>}
            </label>

            <label>
              Email
              <input type="email" {...register("email")} />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label>
              Address
              <input type="text" {...register("address")} />
              {errors.address && <small>{errors.address.message}</small>}
            </label>

            <div className="form-split">
              <label>
                City
                <input type="text" {...register("city")} />
                {errors.city && <small>{errors.city.message}</small>}
              </label>

              <label>
                ZIP code
                <input type="text" {...register("zipCode")} />
                {errors.zipCode && <small>{errors.zipCode.message}</small>}
              </label>
            </div>

            <button type="submit" className="add-btn">
              Place order
            </button>
          </form>

          <aside className="summary-card">
            <h3>Checkout summary</h3>
            {cartItems.map((item) => (
              <p key={item.id}>
                <span>
                  {item.product.title.slice(0, 30)}... x {item.quantity}
                </span>
                <strong>
                  {formatCurrency(item.product.price * item.quantity)}
                </strong>
              </p>
            ))}

            <p>
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </p>
            <p>
              <span>Tax</span>
              <strong>{formatCurrency(tax)}</strong>
            </p>
            <p className="total-line">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Checkout;
