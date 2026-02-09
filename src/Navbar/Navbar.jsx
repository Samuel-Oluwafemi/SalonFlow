import { useState } from "react";
import { Menu, X, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 bg-transparent border-b border-white/30 md:border-white/20 
     backdrop-blur-md md:backdrop-blur-md w-full z-50 py-6 px-6 md:py-5 md:px-15"
    >
      <div className="flex items-center justify-between">
        {/* Logo Left */}
        <main
          data-aos="fade-right"
          // set the classname to hide when open is true and show when open is false
          className={`flex gap-1 text-2xl md:text-2xl cursor-pointer font-playfair font-bold text-black`}
        >
          <div className="mt-4"></div>
          <Link to="/">
          <div className="flex">
          <Boxes className="size-8 text-purple-600" /> SalonFlow
          </div>
          </Link>
        </main>

        {/* Navs middle */}
        <div className="hidden md:block">
        <ul
          data-aos="fade-left"
          className="hidden md:flex space-x-10 text-black text-md font-semibold gap-4"
        >
          <a href="#home">
            <li className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500">
              Home
            </li>
          </a>
          <a href="#services">
            <li className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500">
              Services
            </li>
          </a>
          <a href="#reviews">
            <li className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500">
              Reviews
            </li>
          </a>
          <a href="#contact">
            <li className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500">
              Contact
            </li>
          </a>
        </ul>
        </div>  

        {/* Navs right */}
        <a
          href=""
          target="_blank"
          className="hidden md:block border-b-2 bg-gray-100 border-purple-600 text-black px-4 py-3 
          rounded-lg font-semibold hover:text-white hover:bg-purple-700 transition duration-300 cursor-pointer
          " 
        >
          Book a Demo
        </a>

        <button
          onClick={() => setOpen(!open)}
          data-aos="fade-left"
          className="md:hidden cursor-pointer font-bold text-purple-600"
        >
          {!open ? <Menu /> : <X />}
        </button>
      </div>
      {open && (
        <div
          data-aos="fade-up"
          className="md:hidden bg-black/80 rounded-lg p-4 flex flex-col text-bold 
          text-md text-white gap-8 items-center mt-8 md:mt-3"
        >
          <a href="#home" className="cursor-pointer hover:text-fuchsia-500">
            Home
          </a>
          <a href="#services" className="cursor-pointer hover:text-fuchsia-500">
            Services
          </a>
          <a
            href="#packages"
            className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500"
          >
            Packages
          </a>
          <a
            href="#reviews"
            className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="cursor-pointer hover:text-fuchsia-500 active:fuchsia-500"
          >
            Contact
          </a>
          <a
            href="https://wa.me/+2348103251749"
            target="_blank"
            className="cursor-pointer inline bg-fuchsia-700 w-full text-center rounded-full 
            py-3 px-2 hover:bg-gradient-to-r from-white to-fuchsia-700 hover:text-black
            hover:border-white hover:shadow-2xl"
          >
            Book a Demo
          </a>
        </div>
      )}
    </nav>
  );
}
