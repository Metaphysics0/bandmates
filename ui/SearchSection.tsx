import { PREMIUM_SEARCH_FILTERS } from "../data/consts";
import { IDropdownListOption } from "../types/types";
import SortByFilter from "./inputs/SortByFilter";
import { SortByFilterProvider } from "./inputs/SortByFilterProvider";

export default function SearchSection() {
  return (
    <div className="p-5 pt-7">
      <div className="flex justify-between mb-4">
        <div className="sm:flex sm:w-full sm:justify-between">
          <button className="bg-red-500 hover:bg-red-400 text-white font-semibold p-2 rounded-lg shadow-md mr-3 transition duration-75">
            Filters
          </button>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search or Filter"
            className="rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
          />
        </div>
        <div className="sm:hidden">
          <SortByFilterProvider>
            <div className="w-56">
              <SortByFilter options={sortByFilterOptions} />
            </div>
          </SortByFilterProvider>
        </div>
      </div>
      {/* PREMIUM FILTERS */}
      <div className="sm:hidden">
        {PREMIUM_SEARCH_FILTERS.map((filter, idx) => (
          <button
            key={idx}
            className={`p-2 cursor-cell border-slate-300 border-2 border-dashed rounded-full bg-white opacity-50 hover:opacity-100 ${
              idx !== 0 ? "mx-2" : ""
            }`}
          >
            <span className="font-bold">{filter}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const sortByFilterOptions: IDropdownListOption[] = [
  {
    value: "Popular ⭐️",
  },
  {
    value: "Trending 🔥",
  },
  {
    value: "Similar taste 🤝",
  },
  {
    value: "Opposite taste 🥴",
  },
  {
    value: "Specialized 🎯",
  },
  {
    value: "Diverse 🍱",
  },
];
