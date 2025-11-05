/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import CitySearch from "./city-search";
import { useRouter } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-2xl py-2 flex items-center justify-between">
      <div
        className="ml-10 flex items-center gap-3 cursor-pointer group"
        onClick={() => router.push("/")}
      >
        <img
          src="https://img.icons8.com/?size=80&id=WxUOcmhwLbCY&format=png"
          className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
          alt="Klima logo"
        />

        <h1
          className="text-5xl font-extrabold tracking-tight transition-all duration-300 
                 bg-gradient-to-r from-black via-blue-600/50 to-cyan-400 
                 dark:from-white dark:via-blue-300 dark:to-cyan-200
                 bg-clip-text text-transparent drop-shadow-md 
                 group-hover:tracking-wider group-hover:drop-shadow-xl"
        >
          Klima
        </h1>
      </div>

      <div className="mr-10 flex items-center gap-4">
        <CitySearch />
        <button
          className="
            group relative p-3 rounded-full
            bg-white/10 backdrop-blur-lg
            shadow-md shadow-black/10
            hover:shadow-xl hover:shadow-black/20
            hover:scale-110 active:scale-95
            transition-all duration-300 ease-out
            text-gray-700 dark:text-yellow-300
            dark:bg-black/30 dark:shadow-white/5 cursor-pointer
          "
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {!mounted ? null : isDark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
