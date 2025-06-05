"use client";
import Footer from "@/components/components/Footer";
import MovieSection from "@/components/components/MovieSection";
import Navigation from "@/components/components/Navigation";
import { useState } from "react";
const Upcoming = () => {
  const [bottom, setBottom] = useState(0);
  const [page, setPage] = useState(1);
  const handlePrevious = () => {
    if (page !== 1) {
      if (bottom === 0) {
        setBottom(10);
        setPage(page - 1);
      } else {
        setBottom(bottom - 10);
      }
    } else if (bottom === 10) setBottom(0);
  };
  const handleNext = () => {
    if (bottom === 10) {
      setPage(page);
      setBottom(0);
    } else setBottom(bottom + 10);
  };
  return (
    <div>
      <div className="flex flex-col items-center mt-2.5">
        <Navigation></Navigation>

        <section className="flex flex-col mt-8 gap-13 ">
          <MovieSection
            title="Upcoming"
            bottom={bottom}
            route="upcoming"
            page={page}
          ></MovieSection>
        </section>
        <div className="container flex justify-end gap-2 px-5">
          <button
            className="gap-2 px-4 py-2 cursor-pointer"
            onClick={() => {
              handlePrevious();
            }}
          >
            Previous
          </button>
          <button
            className="p-2.5 cursor-pointer"
            onClick={() => {
              setBottom(0);
            }}
          >
            1
          </button>
          <button
            className="p-2.5 cursor-pointer"
            onClick={() => {
              setBottom(10);
            }}
          >
            2
          </button>
          <button
            className="gap-2 px-4 py-2 cursor-pointer"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </button>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Upcoming;
