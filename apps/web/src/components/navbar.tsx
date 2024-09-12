"use client";
import Link from "next/link";
import { Video, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#EBEDF0] dark:border-[#1a2330]">
      <Link className="flex items-center justify-center" href="#">
        <Video className="h-6 w-6 text-[#076DDD] dark:text-[#428ECC]" />
        <span className="ml-2 font-bold text-xl text-[#076DDD] dark:text-[#428ECC]">
          MeetPro
        </span>
      </Link>
      <nav className="flex items-center space-x-4 sm:space-x-6">
        <Link
          className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:text-[#076DDD] dark:hover:text-[#428ECC]"
          href="#"
        >
          About
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC]"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
