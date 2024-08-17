import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import cartEmptyAnimation from "./assets/cart_is_empty.json";

export default function Cart({ cart, setCart }) {
  const [price, setPrice] = useState(0);
  const [quantityMap, setQuantityMap] = useState({}); // Map to store item ID and its quantity

  const handlePrice = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemQuantity = quantityMap[item.id] || 1; // Get quantity from map or default to 1
      total += item.price * itemQuantity;
    });
    setPrice(total);
  };

  useEffect(() => {
    handlePrice(); // Calculate price on component mount and cart changes
  }, [cart, quantityMap]);

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setQuantityMap((prevMap) => ({ ...prevMap, [itemId]: undefined })); // Remove quantity from map
  };

  const handleQuantityChange = (itemId, change) => {
    setQuantityMap((prevMap) => {
      const newQuantity = Math.max(0, (prevMap[itemId] || 1) + change); // Ensure quantity is non-negative
      return { ...prevMap, [itemId]: newQuantity };
    });
  };

  return (
    <>
      {cart.length == 0 ? (
        <div className="flex justify-center items-center">
          <div className="w-[500px]flex flex-col justify-center items-center">
            <Lottie
              animationData={cartEmptyAnimation}
              loop={true}
              className="w-full"
            />
            <h1 className="text-2xl font-semibold">Cart is Empty...</h1>
          </div>
        </div>
      ) : (
        <article className="flex flex-col justify-between min-h-[500px]">
          {cart.map((item) => {
            const itemQuantity = quantityMap[item.id] || 1; // Get quantity from map or default to 1

            return (
              <div className="border-green-500 border-b-2 pb-5" key={item.id}>
                <div
                  className="flex p-5 items-center gap-10 h-auto"
                  key={item.id}
                >
                  <div className="w-32">
                    <img src={item.thumbnail} alt="" className="h-full" />
                  </div>
                  <div className="flex flex-col w-[1fr]">
                    <p className="text-2xl font-semibold max-sm:text-xl">
                      {item.title}
                    </p>
                    <div className="m-5">
                      <p className="text-5xl max-sm:text-3xl">${item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-around w-auto mt-5">
                  <button
                    className="bg-green-500 p-4 px-10 rounded-md max-sm:p-3 max-sm:px-5"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={itemQuantity === 1} // Disable if quantity is 1
                  >
                    -
                  </button>
                  <p>{itemQuantity}</p>
                  <button
                    className="bg-green-500 p-4 px-10 rounded-md max-sm:p-3 max-sm:px-5"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 p-4 rounded-md uppercase font-semibold max-sm:p-3"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="p-5 h-auto capitalize flex justify-between items-centers max-sm:flex-col max-sm:gap-5">
            <p className="font-bold text-5xl max-sm:text-2xl max-lg:text-3xl">
              <span className="font-semibold ">grand total:</span> ${price}
            </p>
            <button
              className="bg-green-400 p-2 rounded-md uppercase font-semibold hover:bg-green-500 hover:tracking-wider hover:font-bold"
              onClick={() => {
                Swal.fire({
                  icon: "success",
                  title: "Your order has been placed",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              place order
            </button>
          </div>
        </article>
      )}
    </>
  );
}
