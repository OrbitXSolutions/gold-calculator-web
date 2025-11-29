import React from "react";
import Link from "next/link";
import { BlogDto } from "../../types/blog";
import { Badge } from "./Badge";
import { estimateReadMinutes, formatDate } from "../../lib/api";

interface BlogCardProps {
  blog: BlogDto;
}

export function BlogCard({ blog }: BlogCardProps) {
  const readMinutes = estimateReadMinutes(blog.content);
  return (
    <article className="group border border-transparent hover:border-yellow-300 transition-colors rounded-xl bg-white shadow-sm hover:shadow-md p-5 flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {blog.categories.slice(0, 2).map((c) => (
            <Badge key={c} variant="category">{c}</Badge>
          ))}
          {blog.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="tag">{t}</Badge>
          ))}
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-yellow-700">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <div className="text-xs text-gray-500 flex items-center gap-3">
          <span>{formatDate(blog.publishedUtc || blog.createdUtc)}</span>
          <span>· {readMinutes} min read</span>
          <span>· By {blog.authorDisplayName}</span>
        </div>
      </header>
      {blog.summary && (
        <p className="text-sm text-gray-700 line-clamp-4">{blog.summary}</p>
      )}
      <footer className="mt-auto">
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-yellow-700 hover:text-yellow-800"
        >
          Read Article →
        </Link>
      </footer>
    </article>
  );
}
