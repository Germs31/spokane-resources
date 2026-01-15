import type { Resource } from "../data/resources";
import { formatVerified, hasWebsite } from "../lib/resources";
import { textSizes } from "../lib/typography";
import { Badge } from "./Badge";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white px-5 py-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={`font-semibold ${textSizes.lead}`}>{resource.name}</h2>
            <Badge tone="primary">{resource.category}</Badge>
            {resource.status === "temporarily_closed" && (
              <Badge tone="danger">Temporarily closed</Badge>
            )}
          </div>
          <p className={`${textSizes.small} text-zinc-600`}>
            {resource.eligibility}
          </p>
          <p className={`${textSizes.small} text-zinc-600`}>
            Cost: {resource.cost}
          </p>
        </div>

        <div className={`${textSizes.small} text-zinc-600 sm:text-right`}>
          <p className="font-semibold text-zinc-800">
            {formatVerified(resource.lastVerifiedAt)}
          </p>
          <p className="text-xs text-zinc-500">{resource.source}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={`${textSizes.small} space-y-2 text-zinc-700`}>
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

        <div className={`${textSizes.small} space-y-2 text-zinc-700`}>
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
            <Badge key={tag} tone="muted">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
