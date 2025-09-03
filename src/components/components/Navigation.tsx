"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";
import { useTheme } from "@/contexts/ThemeContext";
const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container flex items-center justify-between">
      <Link href={"../"}>
        <div className="flex items-center gap-2">
          <img src="/film.png" alt="" className="w-5 h-5" />

          <p className="text-[#4338CA] text-[16px] font-bold">Movie Z</p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <GenreDropdown />
        <SearchInput />
      </div>
      <Button 
        className={`flex items-center justify-center px-4 py-2 transition-colors ${
          theme === "light" 
            ? "bg-white hover:bg-gray-100" 
            : "bg-gray-800 hover:bg-gray-700"
        }`}
        onClick={toggleTheme}
      >
        <img 
          src="/moon.png" 
          alt={theme === "light" ? "Dark mode" : "Light mode"} 
          className={`w-4 h-4 transition-transform ${
            theme === "dark" ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
};
export default Navigation;
