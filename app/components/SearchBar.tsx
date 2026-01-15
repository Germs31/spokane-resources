import type { CategoryFilter } from "../lib/resources";
import { textSizes } from "../lib/typography";

type SearchBarProps = {
  searchTerm: string;
  selectedCategory: CategoryFilter;
  categories: CategoryFilter[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onReset: () => void;
};

export function SearchBar({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onReset,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="search">
        Search resources
      </label>
      <input
        id="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, need, or zip code"
        className={`w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm outline-none ring-purple-500/60 focus:border-purple-500 focus:ring ${textSizes.body}`}
      />
      <label className="sr-only" htmlFor="category">
        Filter by category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value as CategoryFilter)}
        className={`w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm outline-none ring-purple-500/60 focus:border-purple-500 focus:ring sm:w-64 ${textSizes.body}`}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 sm:w-auto"
      >
        Reset
      </button>
    </div>
  );
}
