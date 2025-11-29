"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "./AdminNav";

interface AdminShellProps { children: React.ReactNode }

// Simple auth guard: redirect to /admin/login if no token
function useAuthGuard() {
  const router = useRouter();
  React.useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) router.replace("/admin/login");
  }, [router]);
}

export function AdminShell({ children }: AdminShellProps) {
  useAuthGuard();
  return (
    <div className="min-h-[80vh] flex">
      <aside className="w-56 border-r border-gray-200 bg-white p-4 flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-500">Manage content</p>
        </div>
        <AdminNav />
        <button
          onClick={() => { localStorage.removeItem("auth_token"); location.href = "/admin/login"; }}
          className="mt-auto text-xs text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
