type MovieCard = {
  title: string;
  imageUrl: string;
  voteAverage: number;
  id: number;
};

import Link from "next/link";
const Card = ({ title, imageUrl, voteAverage, id }: MovieCard) => {
  return (
    <Link href={`movies/${id}`}>
      {" "}
      <div className="rounded-md h-fit">
        <img
          src={`https://image.tmdb.org/t/p/w300${imageUrl}`}
          alt={title}
          className=" rounded-t-md"
        />
        <div className="px-3 py-2 gap-1 flex flex-col bg-gray-100 dark:bg-gray-800 h-[96px] rounded-md">
          <div className="flex items-center gap-1">
            <img src="/star.png" alt="star" className="size-4" />
            <div className="flex items-center">
              <p className="text-gray-900 dark:text-gray-100">{Math.floor(voteAverage / 0.1) / 10}</p>
              <p className="leading-[16px] text-[12px] text-[#71717A] dark:text-gray-400">/10</p>
            </div>
          </div>
          <p className="text-gray-900 dark:text-gray-100 font-medium">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
