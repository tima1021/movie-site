"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

type Genre = {
  id: number;
  name: string;
};

const GenreDropdown = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        className="bg-white border border-[#E4E4E7] rounded-[8px] shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/chevron-down.png" alt="" className="w-4 h-4" />
        <p className="text-[14px] font-medium text-black">
          {selectedGenre ? selectedGenre.name : "Genre"}
        </p>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="py-1">
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedGenre(null);
                setIsOpen(false);
              }}
            >
              All Movies
            </Link>
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleGenreSelect(genre)}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
