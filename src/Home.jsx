import React, { useEffect, useState } from "react";
import loadingAnimation from "./assets/loading_animation.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import downArrowIMG from "./assets/arrow_downward.svg";

export default function Home() {
  const url = "https://dummyjson.com/products";
  const [itemsData, setItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setItemsData(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuy = (item) => {
    setTimeout(() => {
      navigate(`/product/${item.title}`, { state: { item } });
    });
  };

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
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {itemsData?.map((eachItem) => {
              return (
                <div
                  className="flex flex-col justify-center items-center gap-8 h-auto p-7 border-gray-500 border-[1px]"
                  key={eachItem.id}
                >
                  <div
                    onClick={() => {
                      handleBuy(eachItem);
                    }}
                    className="flex flex-col justify-center items-center h-auto cursor-pointer"
                  >
                    <h1 className="text-3xl font-extrabold text-center mb-3">
                      {eachItem.title}
                    </h1>
                    <img
                      src={eachItem.thumbnail}
                      alt={eachItem.title}
                      className="h-80 w-80"
                    />
                    <ul className="w-auto flex flex-col justify-between items-center mt-8 text-2xl ">
                      <div className="flex justify-center items-center gap-[2rem]">
                        <li className="font-bold">
                          <span className="font-bold capitalize">price: </span>$
                          {eachItem.price}
                        </li>
                        <li className="capitalize font-bold text-green-600 flex justify-center items-center">
                          <img src={downArrowIMG} alt="" />
                          {eachItem.discountPercentage}%
                        </li>
                      </div>
                      <li>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-lg">★</span>
                          <span className="ml-2">{eachItem.rating} / 5</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
