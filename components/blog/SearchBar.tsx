"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("search") || "";
  const [value, setValue] = React.useState(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set("search", value); else sp.delete("search");
    sp.delete("page"); // reset pagination on new search
    router.push(`?${sp.toString()}`);
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 w-full max-w-md">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 shadow-sm"
      >
        Search
      </button>
    </form>
  );
}
