import React from "react";
import { getTags } from "../../../lib/api";
import { TagForm } from "../../../components/admin/TagForm";

export const revalidate = 60;

export default async function AdminTagsPage() {
  const tags = await getTags();
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Tags</h1>
        <TagForm onSaved={() => { /* client refresh omitted */ }} />
      </div>
      <div className="rounded border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Slug</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-2 border font-medium">{t.name}</td>
                <td className="p-2 border text-xs text-gray-600">{t.slug}</td>
              </tr>
            ))}
            {tags.length === 0 && <tr><td colSpan={2} className="p-4 text-center text-gray-500">No tags.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
