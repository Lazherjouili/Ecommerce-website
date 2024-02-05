import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import chart from '../assets/Chart.png'
import user from '../assets/User.png'
const SideBar = () => {

  const [open, setOpen] = useState(true);

  return (
    <div className="flex sticky top-20 ">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >


        <div className="flex gap-x-4 items-center">
          <img onClick={() => setOpen(!open)}
            src={logo}
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"

              }`}
          />

          <h1
            className={` origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">


          <Link to={'/admin'}>
            <li className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4" >
              <img src={chart} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Products
              </span>
            </li>
          </Link>
          <Link to={'/admin/users'} >
            <li className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4" >
              <img src={user} />
              {/* <svg class="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> */}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Users
              </span>
            </li>
          </Link>

        </ul>
      </div>

    </div>
  )
}

export default SideBar
