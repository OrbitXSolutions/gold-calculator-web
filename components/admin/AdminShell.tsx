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
    <div className="min-h-[80vh] flex flex-col md:flex-row">
      <aside className="md:w-60 border-b md:border-b-0 md:border-r border-gray-200 bg-white p-4 flex flex-col gap-4 sticky top-0 md:h-screen z-20">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-500">Manage content</p>
        </div>
        <AdminNav />
      </aside>
      <main className="flex-1 p-4 md:p-6 bg-gray-50">{children}</main>
    </div>
  );
}
