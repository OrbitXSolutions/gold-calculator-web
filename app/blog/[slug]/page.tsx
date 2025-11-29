import React from "react";
import { getBlogBySlug } from "../../../lib/api";
import { MarkdownRenderer } from "../../../components/blog/MarkdownRenderer";
import { Badge } from "../../../components/blog/Badge";
import { CommentForm } from "../../../components/blog/CommentForm";
import { CommentList } from "../../../components/blog/CommentList";
import { estimateReadMinutes, formatDate } from "../../../lib/api";

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const blog = await getBlogBySlug(params.slug);
    return {
      title: blog.title + " | Gold Knowledge Hub",
      description: blog.summary || blog.title,
    };
  } catch {
    return { title: "Article | Gold Knowledge Hub" };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await getBlogBySlug(params.slug);
  const readMinutes = estimateReadMinutes(blog.content);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-3xl mx-auto">
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.categories.map((c) => (
            <Badge key={c} variant="category">{c}</Badge>
          ))}
          {blog.tags.map((t) => (
            <Badge key={t} variant="tag">{t}</Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>By {blog.authorDisplayName}</span>
          <span>{formatDate(blog.publishedUtc || blog.createdUtc)}</span>
          <span>{readMinutes} min read</span>
        </div>
        {blog.summary && (
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-2xl">{blog.summary}</p>
        )}
      </header>

      <MarkdownRenderer content={blog.content} className="prose prose-sm sm:prose lg:prose-lg max-w-none" />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">Comments</h2>
        <CommentForm blogId={blog.id} onPosted={() => { /* could refresh via client side event */ }} />
        <div className="mt-8">
          <CommentList blogId={blog.id} />
        </div>
      </section>
    </div>
  );
}
