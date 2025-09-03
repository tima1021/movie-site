"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";


const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};

type SearchResponse = {
  results: Movie[];
};

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.trim().length < 2) {
        setSuggestions([]);
        setIsDropdownOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&language=en-US&page=1`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data: SearchResponse = await response.json();
        setSuggestions(data.results.slice(0, 5)); // Show only first 5 results
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setIsDropdownOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    setSearchValue(movie.title);
    setIsDropdownOpen(false);
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSearch}>
        <div className="w-full flex px-3 items-center gap-[10px] border border-[#E4E4E7] rounded-[8px]">
          <img src="/search.png" alt="" className="w-4 h-4" />
          <Input
            ref={inputRef}
            className="border-0"
            placeholder="Search movies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              if (suggestions.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
          />
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {isDropdownOpen && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Searching...
            </div>
          ) : (
            <div className="py-1">
              {suggestions.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <img src="/star.png" alt="star" className="w-3 h-3" />
                      <span className="text-xs text-gray-600">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                      {movie.release_date && (
                        <span className="text-xs text-gray-500">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {searchValue.trim() && (
                <div className="border-t border-gray-200">
                  <div
                    className="px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer"
                    onClick={handleSearch}
                  >
                    Search for &quot;{searchValue}&quot;
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
