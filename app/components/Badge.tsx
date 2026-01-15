import { textSizes } from "../lib/typography";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "primary" | "muted" | "danger";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  primary: "bg-purple-50 text-purple-800",
  muted: "bg-zinc-100 text-zinc-700",
  danger: "bg-red-50 text-red-700",
};

export function Badge({ children, tone = "primary" }: BadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-semibold uppercase tracking-wide ${textSizes.xs} ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
