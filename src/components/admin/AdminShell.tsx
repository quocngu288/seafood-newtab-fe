"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { clearAdminToken } from "@/lib/api/auth";
import {
  IconDashboard,
  IconExternal,
  IconFish,
  IconLogout,
  IconMail,
  IconMenu,
  IconNews,
  IconProducts,
} from "./ui/icons";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true, icon: IconDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: IconProducts },
  {
    href: "/admin/product-categories",
    label: "Loại SP",
    icon: IconProducts,
  },
  { href: "/admin/news", label: "Tin tức", icon: IconNews },
  { href: "/admin/contact", label: "Liên hệ", icon: IconMail },
] as const;

export function AdminShell({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function logout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div className="admin-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Đóng menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${sidebarOpen ? "" : "is-closed"}`}
        aria-label="Điều hướng CMS"
      >
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-icon">
            <IconFish className="h-6 w-6" />
          </div>
          <div>
            <p className="admin-sidebar-brand-title">Hải Hương</p>
            <p className="admin-sidebar-brand-sub">CMS Admin</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {NAV.map((item) => {
            const active = isActive(
              item.href,
              "exact" in item ? item.exact : false,
            );
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`admin-sidebar-link ${active ? "is-active" : ""}`}
              >
                <Icon className="h-5 w-5 shrink-0 opacity-90" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link
            href="/vi"
            target="_blank"
            className="admin-sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <IconExternal />
            Xem website
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="admin-btn-ghost lg:hidden"
              aria-label="Mở menu"
              onClick={() => setSidebarOpen(true)}
            >
              <IconMenu />
            </button>
            <div className="admin-topbar-user">
              <p className="admin-topbar-name">{username}</p>
              <p className="admin-topbar-role">Quản trị viên</p>
            </div>
          </div>

          <button type="button" onClick={logout} className="admin-btn-secondary">
            <IconLogout />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
