import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Product from "./Product";
import { useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddTocart = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      Swal.fire({
        icon: "warning",
        title: "Already added to Cart",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    setCart([...cart, item]);
  };

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/product/:title"
          element={<Product handleAddToCart={handleAddTocart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
