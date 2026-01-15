"use client";

import { useMemo, useState } from "react";
import type { Resource, ResourceCategory } from "./data/resources";
import { resources } from "./data/resources";

type CategoryFilter = ResourceCategory | "All categories";

const categories: CategoryFilter[] = [
  "All categories",
  ...Array.from(new Set(resources.map((resource) => resource.category))),
];

const formatVerified = (value: string | null) => {
  if (!value) return "Not yet verified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not yet verified";
  return `Verified ${date.toLocaleDateString()}`;
};

const hasWebsite = (resource: Resource) =>
  resource.website && resource.website.trim().length > 0;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All categories");

  const filteredResources = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return resources
      .filter((resource) => {
        const matchesCategory =
          selectedCategory === "All categories" ||
          resource.category === selectedCategory;

        if (!matchesCategory) return false;
        if (!term) return true;

        const haystack = [
          resource.name,
          resource.category,
          resource.address ?? "",
          resource.zip ?? "",
          resource.tags.join(" "),
          resource.eligibility,
          resource.cost,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(term);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#f7f2ff] text-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-800">
            Spokane community resources
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Find free and low-cost help in the greater Spokane area
            </h1>
            <p className="max-w-3xl text-lg text-zinc-700">
              Search trusted local resources for housing, food, safety, and
              support. No login required; we keep this list focused on accuracy
              and ease of use.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="search">
              Search resources
            </label>
            <input
              id="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, need, or zip code"
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base shadow-sm outline-none ring-purple-500/60 focus:border-purple-500 focus:ring"
            />
            <label className="sr-only" htmlFor="category">
              Filter by category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value as CategoryFilter)
              }
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base shadow-sm outline-none ring-purple-500/60 focus:border-purple-500 focus:ring sm:w-64"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All categories");
              }}
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 sm:w-auto"
            >
              Reset
            </button>
          </div>

          <p className="text-sm text-zinc-600">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </header>

        <section className="grid gap-4">
          {filteredResources.length === 0 ? (
            <div className="rounded-xl border border-dashed border-purple-200 bg-white/70 px-6 py-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-purple-800">
                No matches yet
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Try a different keyword or pick another category. You can also
                clear filters with Reset.
              </p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <article
                key={resource.id}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{resource.name}</h2>
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800">
                        {resource.category}
                      </span>
                      {resource.status === "temporarily_closed" && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                          Temporarily closed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600">
                      {resource.eligibility}
                    </p>
                    <p className="text-sm text-zinc-600">
                      Cost: {resource.cost}
                    </p>
                  </div>

                  <div className="text-sm text-zinc-600 sm:text-right">
                    <p className="font-semibold text-zinc-800">
                      {formatVerified(resource.lastVerifiedAt)}
                    </p>
                    <p className="text-xs text-zinc-500">{resource.source}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 text-sm text-zinc-700">
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Address
                      </span>
                      <span>{resource.address ?? "Not listed"}</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Phone
                      </span>
                      {resource.phone ? (
                        <a
                          className="text-purple-800 underline underline-offset-4"
                          href={`tel:${resource.phone}`}
                        >
                          {resource.phone}
                        </a>
                      ) : (
                        <span>Not listed</span>
                      )}
                    </p>
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Website
                      </span>
                      {hasWebsite(resource) ? (
                        <a
                          className="text-purple-800 underline underline-offset-4"
                          href={resource.website ?? ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit site
                        </a>
                      ) : (
                        <span>Not listed</span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-zinc-700">
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Hours
                      </span>
                      <span>{resource.hours ?? "Call to confirm"}</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Languages
                      </span>
                      <span>
                        {resource.languages.length > 0
                          ? resource.languages.join(", ")
                          : "Not listed"}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span className="min-w-[90px] font-semibold text-zinc-900">
                        Accessibility
                      </span>
                      <span>
                        {resource.accessibility ?? "Call to confirm details"}
                      </span>
                    </p>
                  </div>
                </div>

                {resource.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </section>

        <section className="rounded-xl border border-purple-100 bg-purple-50 px-5 py-6 text-sm text-purple-900 shadow-sm">
          <h3 className="text-base font-semibold">Accuracy matters</h3>
          <p className="mt-2">
            This is a community-maintained list. Verify details with providers
            and let us know if something needs an update.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              href="mailto:german@inphze.con?subject=Spokane%20Resources%20update"
            >
              Report an update
            </a>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-purple-200 bg-white px-4 py-2 font-semibold text-purple-800 opacity-70 shadow-sm"
            >
              Download printable list (coming soon)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
