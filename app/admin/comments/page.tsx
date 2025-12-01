"use client";
import React from "react";
import { listComments, formatDate, deleteComment, updateComment } from "../../../lib/api";
import { CommentDto } from "../../../types/blog";

export default function AdminCommentsPage() {
  const [blogId, setBlogId] = React.useState("");
  const [comments, setComments] = React.useState<CommentDto[]>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(20);
  const [totalCount, setTotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editContent, setEditContent] = React.useState("");

  async function load(resetPage = false) {
    setLoading(true); setError(null);
    try {
      const targetPage = resetPage ? 1 : page;
      const paged = await listComments({ page: targetPage, pageSize, blogId: blogId || undefined });
      setComments(paged.items);
      setTotalCount(paged.totalCount);
      if (resetPage) setPage(1);
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

  function startEdit(c: CommentDto) {
    setEditingId(c.id);
    setEditContent(c.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditContent("");
  }

  async function saveEdit() {
    if (!editingId) return;
    try {
      const updated = await updateComment(editingId, editContent);
      setComments(list => list.map(c => c.id === updated.id ? updated : c));
      cancelEdit();
    } catch (err: any) {
      alert(err.message || "Failed to update comment");
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function go(delta: number) {
    setPage(p => Math.max(1, Math.min(totalPages, p + delta)));
  }

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // initial load
  React.useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Comments Moderation</h1>
      <div className="flex items-end gap-3">
        <div className="flex flex-col flex-1 max-w-xs">
          <label className="text-xs font-medium mb-1">Filter by Blog Id (GUID)</label>
          <input value={blogId} onChange={e => setBlogId(e.target.value)} placeholder="Optional Blog GUID" className="rounded border px-3 py-2 text-sm" />
        </div>
        <button onClick={() => load(true)} className="rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2">Apply Filter</button>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span>Page {page} / {totalPages}</span>
          <button disabled={!canPrev} onClick={() => go(-1)} className="px-2 py-1 rounded border disabled:opacity-40">Prev</button>
          <button disabled={!canNext} onClick={() => go(1)} className="px-2 py-1 rounded border disabled:opacity-40">Next</button>
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!loading && comments.length > 0 && (
        <table className="w-full text-sm border bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Email</th>
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
                <td className="p-2 border text-xs w-40 truncate" title={String((c as any)?.authorEmail || "")}>{String((c as any)?.authorEmail || "")}</td>
                <td className="p-2 border whitespace-pre-line align-top max-w-md">
                  {editingId === c.id ? (
                    <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full rounded border px-2 py-1 text-xs h-32" />
                  ) : (
                    c.content
                  )}
                </td>
                <td className="p-2 border text-xs">{formatDate(c.createdUtc)}</td>
                <td className="p-2 border text-xs">{c.isDeleted ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  {editingId === c.id ? (
                    <div className="flex flex-col gap-1">
                      <button onClick={saveEdit} className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs">Save</button>
                      <button onClick={cancelEdit} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <button onClick={() => startEdit(c)} className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs">Edit</button>
                      <button onClick={() => remove(c.id, false)} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs">Soft Delete</button>
                      <button onClick={() => remove(c.id, true)} className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs">Hard Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && comments.length === 0 && <p className="text-sm text-gray-500">No comments found.</p>}
    </div>
  );
}
