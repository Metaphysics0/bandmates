import { PREMIUM_SEARCH_FILTERS } from "../data/consts";
import { IDropdownListOption } from "../types/types";
import SortByFilter from "./inputs/SortByFilter";
import { SortByFilterProvider } from "./inputs/SortByFilterProvider";

export default function SearchSection() {
  return (
    <div className="flex justify-between mb-4 p-5 pt-7">
      <div className="flex w-full sm:justify-between">
        <button className="btn-submit">Filters</button>
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
      <SortByFilterProvider>
        <div className="w-56">
          <SortByFilter options={sortByFilterOptions} />
        </div>
      </SortByFilterProvider>
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
