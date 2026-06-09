import Link from "next/link";

export const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-lg font-bold text-[#001f3e] no-underline"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0068ff] text-sm font-bold text-white select-none">
      E
    </span>
    <span>Commerce</span>
  </Link>
);
