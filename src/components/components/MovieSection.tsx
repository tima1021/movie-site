"use client";
import Card from "./Card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Movie1 = {
  title: string;
  bottom: number;
  route: string;
  page?: number;
  id: number;
};
type Movie2 = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
};

type MovieResponse = {
  results: Movie2[];
};

const MovieSection = ({ title, bottom, route, page }: Movie1) => {
  const [movies, setMovies] = useState<MovieResponse>({ results: [] });
  useEffect(() => {
    fetchMovies();
  }, [page]);

  const url = `https://api.themoviedb.org/3/movie/${route}?language=en-US&page=${page}`;

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
  const fetchMovies = () => {
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  return (
    <div className="container flex flex-col items-center gap-8 px-5 ">
      <div className="container flex items-center justify-between ">
        <p className="text-2xl font-semibold ">{title}</p>
        <Link href={`movies/${route}`}>
          <button className="flex items-center gap-2 px-4 py-2 cursor-pointer ">
            <p>See more</p>
            <ArrowRight />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 auto-rows-auto">
        {movies?.results?.slice(bottom, bottom + 10).map((movie) => {
          {
            return (
              <Card
                key={movie.id}
                title={movie.title}
                voteAverage={movie.vote_average}
                imageUrl={movie.poster_path}
                id={movie.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default MovieSection;
