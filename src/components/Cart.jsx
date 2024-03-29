import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const total = items.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  function handleCloseCart() {
    hideCart();
  }

  function handleGoToCheckout() {
    showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(total)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
