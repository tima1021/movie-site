import Poster from "@/components/components/Poster";
import MovieSection from "@/components/components/MovieSection";

import Footer from "@/components/components/Footer";
import Navigation from "@/components/components/Navigation";

export default function Home() {
  const data = [
    { title: "Upcoming", bottom: 0, route: "upcoming" },
    { title: "Popular", bottom: 0, route: "popular" },
    { title: "TopRated", bottom: 0, route: "top_rated" },
  ];
  return (
    <div>
      <div className="flex items-center w-screen h-[59px] justify-center px-4">
        <Navigation />
      </div>
      <Poster />
      <section className="flex flex-col items-center mt-8 gap-13 ">
        {data.map((section) => {
          return (
            <MovieSection
              key={section.title}
              title={section.title}
              bottom={section.bottom}
              route={section.route}
              page={1}
            ></MovieSection>
          );
        })}
      </section>
      <Footer />
    </div>
  );
}
