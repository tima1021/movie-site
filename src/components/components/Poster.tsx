"use client";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
};

type MovieResponse = {
  results: Movie[];
};
import { useEffect, useState } from "react";
const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

const Poster = () => {
  useEffect(() => {
    fetchPosterData();
  }, []);
  const [nowPlayingData, setNowPlayingData] = useState<MovieResponse>({
    results: [],
  });
  const fetchPosterData = () => {
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setNowPlayingData(data));
  };

  return (
    <div
      className={`flex w-full h-[300px]  md:h-[400px]  lg:h-[500px] xl:h-[600px] 2xl:h-[900px] overflow-x-scroll no-scrollbar overflow-y-clip snap-x `}
    >
      {nowPlayingData?.results?.slice(0, 3).map((movie) => {
        return (
          <div
            key={movie.id}
            className={`w-full h-full bg-no-repeat bg-center my-[24px]  flex  justify-center items-center  shrink-0 relative snap-center`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              className="absolute z-0 w-full h-full "
            />
            <div className="container absolute flex flex-col gap-4 px-5">
              <div className="flex flex-col text-white w-[302px] ">
                <p className=" text-[20px]">Now Playing:</p>
                <p className="text-4xl font-bold ">{movie.title}</p>
                <div className="flex h-[48px] items-center">
                  <img
                    src="/star.png"
                    alt="star"
                    className="w-[28px] h-[28px]"
                  />
                  <div className="flex items-center">
                    <p className=" text-[18px] font-semibold">
                      {Math.floor(movie.vote_average / 0.1) / 10}
                    </p>
                    <p className=" text-[16px]">/10</p>
                  </div>
                </div>
              </div>
              <div className="w-[402px] text-white text-[16px]">
                <p>{movie.overview}</p>
              </div>
              <button className="bg-white dark:bg-gray-800 py-2 px-4 rounded-md w-fit flex items-center cursor-pointer gap-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <img src="./images/play.png" alt="" />
                <p className="text-gray-900 dark:text-gray-100 font-medium">Watch Trailer</p>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Poster;
