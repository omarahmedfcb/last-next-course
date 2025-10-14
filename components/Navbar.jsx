"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const links = [
    { title: "Home", to: "/" },
    { title: "Todos", to: "/todos" },
    { title: "Add", to: "/add" },
    { title: "Contact", to: "/contact" },
  ];
  const path = usePathname();
  return (
    <nav className="bg-cyan-700">
      <div className="w-9/10 mx-auto flex justify-between items-center text-white">
        <h2 className="font-extrabold text-xl">NeoWear</h2>
        <ul className="flex">
          {links.map((ele) => (
            <li key={ele.title}>
              <Link
                className={`${
                  path == ele.to ? "bg-white text-cyan-700" : null
                } px-5 py-3 inline-block hover:bg-white hover:text-cyan-700 transition-colors`}
                href={ele.to}
              >
                {ele.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={"/login"}
          className="bg-white rounded-xl self-center px-2 py-1 text-cyan-700 text-lg cursor-pointer hover:shadow-lg transition-shadow"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
