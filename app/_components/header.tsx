/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-2xl py-2 flex items-center justify-between">
      <div className="ml-10">
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-black dark:text-white">K</span>lima
        </h1>
      </div>

      <div className="mr-10">
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
