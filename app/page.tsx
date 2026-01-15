"use client";

import { useMemo, useState } from "react";
import { Callout } from "./components/Callout";
import { ResourceList } from "./components/ResourceList";
import { SearchBar } from "./components/SearchBar";
import { resources } from "./data/resources";
import {
  CategoryFilter,
  filterResources,
  getCategories,
} from "./lib/resources";
import { textSizes } from "./lib/typography";

const categories = getCategories(resources);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All categories");

  const filteredResources = useMemo(
    () =>
      filterResources(resources, {
        term: searchTerm,
        category: selectedCategory,
      }),
    [searchTerm, selectedCategory]
  );

  return (
    <main className="min-h-screen bg-[#f7f2ff] text-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-8">
        <header className="space-y-4">
          <p
            className={`${textSizes.small} font-semibold uppercase tracking-[0.2em] text-purple-800`}
          >
            Spokane community resources
          </p>
          <div className="space-y-3">
            <h1
              className={`${textSizes.heading} font-semibold leading-tight text-zinc-900`}
            >
              Find free and low-cost help in the greater Spokane area
            </h1>
            <p className={`max-w-3xl text-zinc-700 ${textSizes.lead}`}>
              Search trusted local resources for housing, food, safety, and
              support. No login required; we keep this list focused on accuracy
              and ease of use.
            </p>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onReset={() => {
              setSearchTerm("");
              setSelectedCategory("All categories");
            }}
          />
        </header>

        <ResourceList
          resources={filteredResources}
          total={resources.length}
        />

        <Callout />
      </div>
    </main>
  );
}
