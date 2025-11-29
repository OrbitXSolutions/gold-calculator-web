"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/tags", label: "Tags" },
  { href: "/admin/comments", label: "Comments" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
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
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
