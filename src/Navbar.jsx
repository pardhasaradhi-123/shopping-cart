import React from "react";
import logo from "./assets/shoping_cart_named_logo.jpeg";
import { Link } from "react-router-dom";

// Import the images for the navigation items
import cartLogo from "./assets/shopping_cart_logo.svg";
import homeLogo from "./assets/home.svg";

export default function Navbar({ cart }) {
  const navItems = [
    {
      id: 0,
      name: "home",
      path: "/",
      IMG: homeLogo, // Use imported image
    },
    {
      id: 1,
      name: "cart",
      path: "/cart",
      IMG: cartLogo, // Use imported image
      cartLength: cart.length,
    },
  ];

  return (
    <div className="">
      <nav className="h-36 flex justify-around max-md:h-28 max-sm:h-20">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-full" />
        </Link>
        <div className="flex justify-center items-center gap-6">
          {navItems.map((nav) => (
            <Link
              to={nav.path}
              key={nav.id}
              className="flex justify-center items-center gap-2 uppercase tracking-wider"
            >
              <img src={nav.IMG} alt={`${nav.name} logo`} className="" />
              <p className="max-sm:hidden font-semibold text-gray-600">
                {nav.name}
              </p>
              <div className="bg-red-600 rounded-full w-5 text-white flex justify-center items-center">
                {nav.cartLength}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
