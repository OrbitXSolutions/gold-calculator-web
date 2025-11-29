"use client";
import React from "react";
import { BlogCreateDto, BlogDto, BlogUpdateDto } from "../../types/blog";
import { createBlog, updateBlog, publishBlog, unpublishBlog } from "../../lib/api";

interface BlogFormProps {
  mode: "create" | "edit";
  blog?: BlogDto;
  onSaved?: (b: BlogDto) => void;
}

export function BlogForm({ mode, blog, onSaved }: BlogFormProps) {
  const [title, setTitle] = React.useState(blog?.title || "");
  const [summary, setSummary] = React.useState(blog?.summary || "");
  const [content, setContent] = React.useState(blog?.content || "");
  const [tags, setTags] = React.useState(blog?.tags.join(", ") || "");
  const [categories, setCategories] = React.useState(blog?.categories.join(", ") || "");
  const [publish, setPublish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "create") {
        const dto: BlogCreateDto = {
          title,
          summary: summary || null,
          content,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
          categories: categories.split(",").map(c => c.trim()).filter(Boolean),
          publish,
        };
        const created = await createBlog(dto);
        onSaved?.(created);
      } else if (blog) {
        const dto: BlogUpdateDto = {
          title,
          summary: summary || null,
          content,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
          categories: categories.split(",").map(c => c.trim()).filter(Boolean),
          publish: false,
          unpublish: false,
        };
        const updated = await updateBlog(blog.id, dto);
        onSaved?.(updated);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  }

  async function doPublish(next: boolean) {
    if (!blog) return;
    setLoading(true); setError(null);
    try {
      const updated = next ? await publishBlog(blog.id) : await unpublishBlog(blog.id);
      onSaved?.(updated);
    } catch (err: any) {
      setError(err.message || "Failed to toggle publish");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full rounded border px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className="w-full rounded border px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={12} required className="w-full rounded border px-3 py-2 text-sm font-mono" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categories (comma separated)</label>
          <input value={categories} onChange={e => setCategories(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" />
        </div>
      </div>
      {mode === "create" && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={publish} onChange={e => setPublish(e.target.checked)} /> Publish immediately
        </label>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex items-center gap-3 flex-wrap">
        <button disabled={loading} type="submit" className="rounded bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 text-white px-4 py-2 text-sm font-medium">
          {loading ? "Saving..." : mode === "create" ? "Create Blog" : "Save Changes"}
        </button>
        {mode === "edit" && blog && (
          <>
            {blog.isPublished ? (
              <button type="button" disabled={loading} onClick={() => doPublish(false)} className="text-sm rounded bg-gray-200 hover:bg-gray-300 px-3 py-2">
                Unpublish
              </button>
            ) : (
              <button type="button" disabled={loading} onClick={() => doPublish(true)} className="text-sm rounded bg-green-600 text-white hover:bg-green-700 px-3 py-2">
                Publish
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
}
