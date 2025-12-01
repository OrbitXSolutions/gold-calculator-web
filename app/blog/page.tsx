import React from "react";
import { getBlogs } from "../../lib/api";
import { BlogCard } from "../../components/blog/BlogCard";
import { SearchBar } from "../../components/blog/SearchBar";
import { Pagination } from "../../components/blog/Pagination";
import { BlogListQuery } from "../../types/blog";

export const revalidate = 30; // ISR for list page

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function parseQuery(sp: BlogPageProps["searchParams"]): BlogListQuery {
  const pageRaw = sp.page;
  const pageSizeRaw = sp.pageSize;
  const search = typeof sp.search === "string" ? sp.search : undefined;
  const page = pageRaw ? parseInt(String(pageRaw), 10) || 1 : 1;
  const pageSize = pageSizeRaw ? parseInt(String(pageSizeRaw), 10) || 9 : 9;
  return { page, pageSize, search, publishedOnly: true };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = parseQuery(searchParams);
  const paged = await getBlogs(query);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Gold Knowledge Hub</h1>
          <p className="text-gray-600 max-w-2xl text-sm">Educational articles to help you make informed decisions about gold purchases.</p>
        </div>
        <SearchBar />
      </div>

      {query.search && (
        <p className="text-sm text-gray-500 mb-4">Showing results for <span className="font-medium">“{query.search}”</span></p>
      )}

      {paged.items.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500">No articles available right now. Please check back later.</div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paged.items.map((b) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Pagination page={paged.page} totalPages={paged.totalPages ?? 1} />
      </div>
    </div>
  );
}
