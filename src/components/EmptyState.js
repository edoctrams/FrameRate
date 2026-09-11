import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref = "/",
  secondaryAction,
}) {
  return (
    <div className="fr-panel mt-16 rounded-lg p-12 text-center">
      <span className="fr-label">Frame Rate</span>
      <h2 className="mt-5 text-2xl font-bold text-[#EEEEEE]">{title}</h2>
      <p className="mt-3 text-[#92979D]">{description}</p>

      {actionLabel && (
        <Link
          href={actionHref}
          className="fr-button mt-6 inline-flex"
        >
          {actionLabel}
        </Link>
      )}

      {secondaryAction}
    </div>
  );
}
