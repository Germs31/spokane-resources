import { textSizes } from "../lib/typography";

export function Callout() {
  return (
    <section className="rounded-xl border border-purple-100 bg-purple-50 px-5 py-6 text-sm text-purple-900 shadow-sm">
      <h3 className="text-base font-semibold">Accuracy matters</h3>
      <p className={`${textSizes.small} mt-2`}>
        This is a community-maintained list. Verify details with providers and
        let us know if something needs an update.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          className="inline-flex items-center justify-center rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          href="mailto:hello@example.org?subject=Spokane%20Resources%20update"
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
  );
}
