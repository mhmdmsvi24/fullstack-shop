import { SlidersHorizontal, Star } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import Dropdown from "./Dropdown";
import { useState } from "react";

export default function Filters() {
  const { data: categoriesData, error, isLoading } =
    useFetch("http://localhost:8080/api/v1/categories");

  const [showFilters, setShowFilters] = useState(false);

  const ratingsData = {
    1: <Star size={14} fill="yellow" stroke="black" strokeWidth={1} />,
    2: Array.from({ length: 2 }, (_, i) => (
      <Star key={i} size={14} fill="yellow" stroke="black" strokeWidth={1} />
    )),
    3: Array.from({ length: 3 }, (_, i) => (
      <Star key={i} size={14} fill="yellow" stroke="black" strokeWidth={1} />
    )),
    4: Array.from({ length: 4 }, (_, i) => (
      <Star key={i} size={14} fill="yellow" stroke="black" strokeWidth={1} />
    )),
    5: Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={14} fill="yellow" stroke="black" strokeWidth={1} />
    )),
  };

  if (error) return <div>Something went wrong</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* Mobile filter button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-white p-2 rounded-xl shadow"
        onClick={() => setShowFilters(true)}
      >
        <SlidersHorizontal size={24} stroke="#3c1950" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-200 w-80 p-4
          md:sticky md:top-0 md:h-screen md:flex md:flex-col
          md:translate-x-0 md:z-auto
          fixed top-0 left-0 h-full z-50
          transition-transform duration-300
          ${showFilters ? "translate-x-0" : "-translate-x-full"}
          md:block
        `}
      >
        <Dropdown filterName="Categories" filterOptions={categoriesData} />
        <Dropdown filterName="Rating" filterOptions={ratingsData} />
      </aside>

      {/* Overlay (mobile only) */}
      {showFilters && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
}
