"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/comments", label: "Comments" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string>("");

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setDisplayName(parsed.displayName || parsed.userName || "");
      }
    } catch {}
  }, []);

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.replace("/admin/login");
  }

  return (
    <div className="md:block">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="md:hidden mb-4 inline-flex items-center gap-2 rounded border px-3 py-2 text-xs font-medium bg-white shadow-sm"
        aria-label="Toggle menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700">Welcome{displayName ? ',' : ''} <span className="text-yellow-600">{displayName}</span></p>
      </div>
      <hr className="border-t border-gray-200 mb-3" />
      <nav className={clsx("flex flex-col gap-1", open ? "block" : "hidden md:flex")}>        
        {links.map(l => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-yellow-500 text-white" : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="mt-2 text-left rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
