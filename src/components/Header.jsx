import { useContext } from "react";
import CreateContext from "../store/CartContext.jsx";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const { items } = useContext(CreateContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCartItems = items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant " />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}
