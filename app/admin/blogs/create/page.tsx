"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "../../../../components/admin/BlogForm";
import { BlogDto } from "../../../../types/blog";

export default function AdminBlogCreatePage() {
  const router = useRouter();
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Create Blog</h1>
      <BlogForm mode="create" onSaved={(b: BlogDto) => router.replace(`/admin/blogs/${b.id}/edit`)} />
    </div>
  );
}
