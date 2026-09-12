import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="brand" aria-label="Monster Tracker home">
      <span className="brand-name">monster</span>
      <span className="brand-chip">
        <span className="brand-chip-label">tracker</span>
      </span>
    </Link>
  );
}
