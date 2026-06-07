import { useState } from "react";
import { Menu, X, Boxes, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 bg-transparent backdrop-filter
     backdrop-blur-md w-full z-50 py-6 px-6 md:py-5 md:px-15"
    >
      <div className="flex items-center justify-between rounded-full ">
        {/* Logo Left */}
        <main
          // set the classname to hide when open is true and show when open is false
          className={`flex gap-1 text-2xl md:text-2xl cursor-pointer font-playfair font-bold text-black`}
        >
          <div className="mt-4"></div>
          <Link to={user ? "/" : "/dashboard"}>
            <div className="flex">
              <Boxes className="size-8 text-purple-600" /> SalonFlow
            </div>
          </Link>
        </main>

        {/* Navs middle */}
        <div className="hidden md:block">
          <ul className="hidden md:flex space-x-10 text-black text-md font-semibold gap-4">
            {!user && (
              <>
                <Link to="/">
                  <li className="cursor-pointer hover:text-purple-600 active:fuchsia-500">
                    Home
                  </li>
                </Link>
                <Link to={"/services"}>
                  <li className="cursor-pointer hover:text-purple-600 active:fuchsia-500">
                    Services
                  </li>
                </Link>
                <a href="#reviews">
                  <li className="cursor-pointer hover:text-purple-600 active:fuchsia-500">
                    Reviews
                  </li>
                </a>
              </>
            )}
            {user?.role === "admin" && (
              <Link to="/dashboard">
                <li className="cursor-pointer hover:text-purple-600 active:fuchsia-500">
                  Dashboard
                </li>
              </Link>
            )}
          </ul>
        </div>
        {/* Navs right - Get Started & Logout */}
        <div className="flex items-center gap-2 md:gap-3">
          {!user && (
            <Link
              to={"/services"}
              className="hidden md:block border-b-2 bg-gray-100 border-purple-600 text-black px-4 py-3 
            rounded-lg font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer
            "
            >
              Get Started
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            data-aos="fade-left"
            className="md:hidden cursor-pointer font-bold text-purple-600"
          >
            {!open ? <Menu /> : <X />}
          </button>

          {/* Logout Button - appears on all screens */}
          {/* Combine RBAC + onLogout */}
          {user?.role === "admin" && onLogout && (
            <button
              onClick={onLogout}
              data-aos="fade-left"
              className="flex items-center gap-1 md:gap-2 cursor-pointer text-purple-600 
              hover:text-purple-700 transition duration-300"
            >
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <LogOut size={20} />
                <span className="text-xs md:text-sm font-semibold">
                  Sign out
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
      {open && (
        <ul
          data-aos="fade-up"
          className="md:hidden bg-black/80 rounded-lg p-4 flex flex-col text-bold 
          text-md text-white gap-8 items-center mt-8 md:mt-3"
        >
          {!user && (
            <>
              <Link to="/">
                <li
                  href="#home"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer hover:text-purple-500"
                >
                  Home
                </li>
              </Link>
              <Link to={"/services"}>
                <li
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer hover:text-purple-500"
                >
                  Services
                </li>
              </Link>
              <li
                href="#reviews"
                onClick={() => setOpen(false)}
                className="cursor-pointer hover:text-purple-500 active:purple-500"
              >
                Reviews
              </li>
            </>
          )}
          {user && (
          <Link to="/login">
            <li
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-purple-500 active:purple-500"
            >
              Dashboard
            </li>
          </Link>
          )}

          {!user && (
            <Link
              to={"/services"}
              onClick={() => setOpen(false)}
              className="cursor-pointer inline bg-purple-700 w-full text-center rounded-full 
            py-3 px-2 hover:bg-gradient-to-r from-white to-fuchsia-700 hover:text-black
            hover:border-white hover:shadow-2xl"
            >
              Get Started
            </Link>
          )}
        </ul>
      )}
    </nav>
  );
}
