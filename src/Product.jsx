import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import loadingAnimation from "./assets/loading_animation.json";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import downArrowIMG from "./assets/arrow_downward.svg";

export default function Product({ handleAddToCart }) {
  const { id } = useParams();
  const location = useLocation();
  const url = `https://fakestoreapi.com/products`;
  const [itemsData, setItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setItemsData(location.state.item);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-32"
          />
        </div>
      ) : (
        <div className="">
          <div
            className="grid grid-cols-2 h-auto max-sm:grid-cols-1"
            key={itemsData.id}
          >
            <div className="flex justify-center items-center">
              <img src={itemsData.thumbnail} alt="" className="h-[450px]" />
            </div>
            <div className="p-5">
              <div className="max-sm:p-5 max-lg:p-5">
                <h1 className="font-bold tracking-wide text-3xl">
                  {itemsData.title}
                </h1>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="ml-2">{itemsData.rating} / 5</span>
                </div>
                <h1 className="text-3xl mt-4 flex items-center gap-3">
                  <span className="capitalize font-semibold">price: </span> $
                  {itemsData.price}
                  <p className="capitalize font-bold text-green-600 flex justify-center items-center">
                    <img src={downArrowIMG} alt="" />
                    {itemsData.discountPercentage}%
                  </p>
                </h1>
                <p className="text-red-400">
                  Hurry, Only {itemsData.stock} left
                </p>
                <ul className="list-disc mt-4 text-lg">
                  <li>
                    <span className="capitalize font-bold">warranty</span>:
                    {itemsData.warrantyInformation}
                  </li>
                  <li>
                    <span className="capitalize font-bold">retun policy</span>:{" "}
                    {itemsData.returnPolicy}
                  </li>
                  <li>
                    <span className="capitalize font-bold">
                      shipping information
                    </span>
                    : {itemsData.shippingInformation}
                  </li>
                  <li className="capitalize">
                    <span className="font-bold">dimensions</span>: <br />
                    <span className="font-semibold">heigth:</span>{" "}
                    {itemsData.dimensions?.height},{" "}
                    <span className="font-semibold">width:</span>{" "}
                    {itemsData.dimensions?.width},{" "}
                    <span className="font-semibold">depth:</span>{" "}
                    {itemsData.dimensions?.depth}
                  </li>
                  <li className="text-lg">
                    <span className="capitalize font-bold">description</span>:{" "}
                    {itemsData.description}
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center mt-20 gap-4">
                <button
                  className="bg-green-400 w-full p-2 rounded-md uppercase font-semibold hover:bg-green-500 hover:tracking-wider hover:font-bold"
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Your order has been placed",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }}
                >
                  buy now
                </button>
                <button
                  className="bg-green-400 w-full p-2 rounded-md uppercase font-semibold hover:bg-green-500 hover:tracking-wider hover:font-bold"
                  onClick={() => handleAddToCart(itemsData)}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
