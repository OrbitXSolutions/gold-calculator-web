"use client";
import React from "react";
import { getComments, formatDate, deleteComment } from "../../../lib/api";
import { CommentDto } from "../../../types/blog";

export default function AdminCommentsPage() {
  const [blogId, setBlogId] = React.useState("");
  const [comments, setComments] = React.useState<CommentDto[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    if (!blogId) return;
    setLoading(true); setError(null);
    try {
      const paged = await getComments(blogId, { page: 1, pageSize: 100 });
      setComments(paged.items);
    } catch (err: any) {
      setError(err.message || "Failed to load comments");
    } finally { setLoading(false); }
  }

  async function remove(id: string, hard: boolean) {
    try {
      await deleteComment(id, hard);
      setComments(c => c.filter(x => x.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Comments Moderation</h1>
      <div className="flex items-end gap-3">
        <div className="flex flex-col flex-1">
          <label className="text-xs font-medium mb-1">Blog Id (GUID)</label>
            <input value={blogId} onChange={e => setBlogId(e.target.value)} placeholder="Enter Blog GUID" className="rounded border px-3 py-2 text-sm" />
        </div>
        <button disabled={!blogId} onClick={load} className="rounded bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2">Load</button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!loading && comments.length > 0 && (
        <table className="w-full text-sm border bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Deleted?</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2 border font-medium w-32">{c.authorDisplayName}</td>
                <td className="p-2 border whitespace-pre-line max-w-md">{c.content}</td>
                <td className="p-2 border text-xs">{formatDate(c.createdUtc)}</td>
                <td className="p-2 border text-xs">{c.isDeleted ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => remove(c.id, false)} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs">Soft Delete</button>
                    <button onClick={() => remove(c.id, true)} className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs">Hard Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && comments.length === 0 && blogId && <p className="text-sm text-gray-500">No comments found.</p>}
    </div>
  );
}
