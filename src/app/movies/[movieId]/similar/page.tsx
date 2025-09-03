import Navigation from "@/components/components/Navigation";
import Footer from "@/components/components/Footer";
import Link from "next/link";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

type SimilarMovie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
};

type MovieResponse = {
  results: SimilarMovie[];
  total_pages: number;
  total_results: number;
};

export default async function SimilarMoviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ movieId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { movieId } = await params;
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page);
  
  // Fetch the main movie details for the title
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const movieData = await movieResponse.json();

  // Fetch similar movies with pagination
  const similarMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${currentPage}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const similarMovies: MovieResponse = await similarMoviesResponse.json();
  
  // Calculate pagination - only 2 pages with 10 movies each (20 total)
  const totalPages = 2;
  const moviesPerPage = 10;

  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Navigation />
      
      <div className="container flex flex-col gap-6 mt-[52px] px-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Similar Movies</h1>
            <p className="text-gray-600 mt-2">
              Movies similar to "{movieData.title}"
            </p>
          </div>
          <Link 
            href={`/movies/${movieId}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Movie
          </Link>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          Found {similarMovies.total_results} similar movies
        </div>

        {/* Movies Grid - 5 columns, 2 rows = 10 movies per page */}
        <div className="grid grid-cols-5 gap-6 w-full">
          {similarMovies.results?.slice(0, 10).map((movie) => (
            <Link 
              key={movie.id} 
              href={`/movies/${movie.id}`}
              className="flex flex-col gap-3 group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1">
                  <img src="/star.png" alt="star" className="w-4 h-4" />
                  <span className="text-sm text-gray-600">{movie.vote_average.toFixed(1)}/10</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination - moved to right bottom corner */}
        <div className="flex items-center justify-end gap-3 mt-8">
          {/* Previous Button */}
          {currentPage > 1 ? (
            <Link 
              href={`/movies/${movieId}/similar?page=${currentPage - 1}`}
              className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              &lt; Previous
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed font-medium">
              &lt; Previous
            </span>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            <Link
              href={`/movies/${movieId}/similar?page=1`}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                1 === currentPage
                  ? 'bg-blue-600 text-white rounded'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              1
            </Link>
            <Link
              href={`/movies/${movieId}/similar?page=2`}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                2 === currentPage
                  ? 'bg-blue-600 text-white rounded'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              2
            </Link>
          </div>

          {/* Next Button */}
          {currentPage < totalPages ? (
            <Link 
              href={`/movies/${movieId}/similar?page=${currentPage + 1}`}
              className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              Next &gt;
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed font-medium">
              Next &gt;
            </span>
          )}
        </div>

        {/* No results message */}
        {similarMovies.results?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No similar movies found.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
