"use client";
import React from "react";
import { getCategories, deleteCategory } from "../../../lib/api";
import { CategoryForm } from "../../../components/admin/CategoryForm";
import { CategoryDto } from "../../../types/blog";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<CategoryDto[]>([]);
  const [editing, setEditing] = React.useState<CategoryDto | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = React.useState<Date | null>(null);

  async function load() {
    setLoading(true); setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
      setLastFetchedAt(new Date());
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally { setLoading(false); }
  }

  React.useEffect(() => { load(); }, []);

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Categories</h1>
          <p className="text-xs text-gray-500">Manage content taxonomies. Client-side fetch so you can see network request.</p>
        </div>
        <button onClick={load} disabled={loading} className="rounded bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2">
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <div className="max-w-sm">
        <CategoryForm
          category={editing}
          onSaved={(c) => {
            setEditing(null);
            // merge or reload
            setCategories(prev => {
              const exists = prev.some(p => p.id === c.id);
              if (exists) return prev.map(p => p.id === c.id ? c : p);
              return [c, ...prev];
            });
          }}
          onCancelEdit={() => setEditing(null)}
        />
      </div>
      {error && <div className="rounded border border-red-300 bg-red-50 px-4 py-2 text-xs text-red-700">{error}</div>}
      <div className="rounded border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && categories.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2 border font-medium">{c.name}</td>
                <td className="p-2 border text-xs text-gray-600">{c.slug}</td>
                <td className="p-2 border text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(c)}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                    >Edit</button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete category "${c.name}"?`)) return;
                        try {
                          await deleteCategory(c.id);
                          setCategories(prev => prev.filter(p => p.id !== c.id));
                          if (editing?.id === c.id) setEditing(null);
                        } catch (err: any) {
                          alert(err.message || 'Delete failed');
                        }
                      }}
                      className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && categories.length === 0 && (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500">No categories.</td></tr>
            )}
            {loading && (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500">Loading...</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {lastFetchedAt && (
        <p className="text-[10px] text-gray-400">Fetched at {lastFetchedAt.toLocaleTimeString()}</p>
      )}
    </div>
  );
}
