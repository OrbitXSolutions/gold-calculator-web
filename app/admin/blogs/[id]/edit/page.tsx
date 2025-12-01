export const dynamic = "force-dynamic";
import React from "react";
import { getBlogById } from "../../../../../lib/api";
import { BlogForm } from "../../../../../components/admin/BlogForm";
import { BlogDto } from "../../../../../types/blog";

interface EditPageProps { params: { id: string } }

export default async function AdminBlogEditPage({ params }: EditPageProps) {
  const blog = await getBlogById(params.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <BlogForm mode="edit" blog={blog as BlogDto} onSaved={() => { /* revalidate could happen */ }} />
    </div>
  );
}
