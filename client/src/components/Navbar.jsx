// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/revedelegance.png";
import Logout from "../components/Logout";
import updatedCard from'../components/Products/Products'
const Navbar = ({ loggedUser }) => {
  const auctualTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(auctualTheme || "light");

//    const card= updatedCard=()=>{

//    }
  
// console.log(card)
  

  const element = document.documentElement;
  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
  ];

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        break;
      case "light":
        element.classList.remove("dark");
        break;
      default:
        "light";
        break;
    }
  }, [theme]);

  return (
    <nav
      className={`flex items-center justify-between h-20 pl-20 pr-20 sticky top-0 z-20 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="logo ">
        <Link to={"/"}>
          <img className="w-20" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex ">
        <form className=" rounded-full  ">
          <div className="  flex items-center gap-6">
            {theme === "dark" ? (
              <input
                type="text"
                className="text-input  bg-slate-800  text-left px-4 py-2  rounded-3xl  focus:border-blue-500"
                placeholder="Search Product"
              />
            ) : (
              <input
                type="text"
                className="text-input  text-left px-4 py-2  rounded-3xl  focus:border-blue-500"
                placeholder="Search Product"
              />
            )}
            <button>
              <svg
                className="w-[25px] h-[25px]  dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.6"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            {loggedUser ? (
              <>
                <h2 className="font-bold">{loggedUser.username} </h2>
                <Logout />
                {loggedUser.role === "admin" ? (
                  <Link to={"/admin"}>
                    <a className="flex items-center hover:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </a>
                  </Link>
                ) : (
                  <>
                    <Link
                      className="hover:text-gray-200 relative  p-3 text-sm font-medium text-center"
                      to={"/product/favorite"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {/* <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"></div> */}
                    </Link>
                    <Link to={"/product/cart"}>
                      <button className="relative inline-flex items-center p-3 text-sm font-medium text-center ">
                        <svg
                          className="w-[30px] h-[30px]  dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        {/* <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-1 -end-1 dark:border-gray-900">
                        
                        </div> */}
                      </button>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <h3 className="font-bold  ">Sign Up </h3>
                </Link>
                <Link to={"/login"}>
                  <h3 className="font-bold   mr-5">Sign In</h3>
                </Link>
              </>
            )}
          </div>
        </form>
        <div className="duration-100 rounded ml-3">
          {options?.map((opt) => (
            <button
              onClick={() => setTheme(opt.text)}
              key={opt.text}
              className={`  w-8 h-8 leading-9 text-xl rounded-full m-1 ${
                theme === opt.text && "text-sky-600"
              }`}
            >
              <ion-icon name={opt.icon}></ion-icon>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
