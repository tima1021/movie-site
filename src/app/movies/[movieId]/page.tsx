import Navigation from "@/components/components/Navigation";
import StaffInfo from "@/components/components/StaffInfo";
import { Badge } from "@/components/ui/badge";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

type SimiliarMovie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
};
type MovieResponse = {
  results: SimiliarMovie[];
};
export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const responser = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const datas = await responser.json();
  console.log(datas);

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await response.json();
  console.log(data);
  const SimiliarMovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const SimiliarMovies: MovieResponse = await SimiliarMovieResponse.json();
  console.log(SimiliarMovies);

  return (
    <div className="flex flex-col items-center w-screen">
      <Navigation />
      <div className="container flex flex-col items-start gap-6 mt-[52px]">
        <div className="container flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[36px] font-bold">{data.title}</p>
            <p>
              {data.release_date} <span>{}</span> <span>{data.runtime}min</span>
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="text-[12px] font-medium">Rating</p>
            <div className="flex items-start gap-1 h-[48px]">
              <img src="../star.png" alt="" className="w-7 h-7" />
              <div className="flex flex-col">
                {data.vote_average}/10
                <p>{data.vote_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container h-[428px] flex items-center gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
            alt=""
            className="w-1/3 h-[420px] "
          />
          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt=""
            className="w-2/3 h-[428px]"
          ></img>
        </div>
      </div>
      <div className="container flex flex-col gap-5 mt-8">
        <div className="flex gap-2.5">
          {data?.genres?.map((genre) => {
            return (
              <Badge
                className="bg-white text-black rounded-full border border-solid border-[#E4E4E7] px-2.5 py-0.5"
                key={genre.id}
              >
                {genre.name}
              </Badge>
            );
          })}
        </div>
        <div className="flex text-[16px] font-normal">{data.overview}</div>
        <StaffInfo job="Director" role="Director" castdata={datas} />
        <StaffInfo job="Writer" role="Writers" castdata={datas} />
        <StaffInfo role="Stars" castdata={datas} type="cast" />
      </div>
      <div className="container flex flex-col items-start gap-8 mt-8">
        <div className="flex items-start justify-between w-full">
          <p className="text-[24px] font-semibold">More like this</p>
          <button className="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer h-9">
            <p className="text-14px] font-medium">See more</p>
            <img src="../right.png" alt="" className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-5 ">{/* {SimiliarMovies.} */}</div>
      </div>
    </div>
  );
}
