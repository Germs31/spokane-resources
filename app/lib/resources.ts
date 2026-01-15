import type { Resource, ResourceCategory } from "../data/resources";

export type CategoryFilter = ResourceCategory | "All categories";

export const getCategories = (items: Resource[]): CategoryFilter[] => [
  "All categories",
  ...Array.from(new Set(items.map((item) => item.category))),
];

export const formatVerified = (value: string | null) => {
  if (!value) return "Not yet verified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not yet verified";
  return `Verified ${date.toLocaleDateString()}`;
};

export const hasWebsite = (resource: Resource) =>
  Boolean(resource.website && resource.website.trim().length > 0);

export const filterResources = (
  items: Resource[],
  params: { term: string; category: CategoryFilter }
) => {
  const term = params.term.trim().toLowerCase();

  return items
    .filter((resource) => {
      const matchesCategory =
        params.category === "All categories" ||
        resource.category === params.category;

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
};
