import type { Resource } from "../data/resources";
import { textSizes } from "../lib/typography";
import { ResourceCard } from "./ResourceCard";

type ResourceListProps = {
  resources: Resource[];
  total: number;
};

export function ResourceList({ resources, total }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-purple-200 bg-white/70 px-6 py-10 text-center shadow-sm">
        <p className="font-semibold text-purple-800">No matches yet</p>
        <p className={`${textSizes.small} mt-2 text-zinc-600`}>
          Try a different keyword or pick another category. You can also clear
          filters with Reset.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <p className={`${textSizes.small} text-zinc-600`}>
        Showing {resources.length} of {total} resources
      </p>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
