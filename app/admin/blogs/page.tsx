import React from "react";
import Link from "next/link";
import { getBlogs, deleteBlog, formatDate } from "../../../lib/api";
import { BlogDto } from "../../../types/blog";

export const revalidate = 15;

export default async function AdminBlogsPage({ searchParams }: { searchParams: Record<string,string|undefined> }) {
  const page = searchParams.page ? parseInt(searchParams.page,10)||1 : 1;
  const paged = await getBlogs({ page, pageSize: 20, publishedOnly: false });
  const blogs: BlogDto[] = paged.items;
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link href="/admin/blogs/create" className="rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2">New Blog</Link>
      </header>
      <table className="w-full text-sm border bg-white rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Published</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-2 border font-medium">{b.title}</td>
              <td className="p-2 border">{b.isPublished ? formatDate(b.publishedUtc||b.createdUtc) : <span className="text-xs text-gray-500">Draft</span>}</td>
              <td className="p-2 border">{formatDate(b.createdUtc)}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <Link href={`/admin/blogs/${b.id}/edit`} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs">Edit</Link>
                </div>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr><td colSpan={4} className="p-4 text-center text-gray-500">No blogs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
