"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken } from "@/lib/api/auth";
import { adminApi } from "@/lib/api/client";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { IconFish } from "@/components/admin/ui/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      const result = await adminApi.login(username, password);
      setAdminToken(result.accessToken);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <section className="admin-login-brand">
        <span className="admin-login-brand-pattern" aria-hidden />
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <IconFish className="h-8 w-8" />
          </div>
          <h1 className="mt-8 max-w-sm text-3xl font-bold leading-tight">
            Hải Hương Seafood
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/80">
            Hệ thống quản trị nội dung website — sản phẩm, tin tức và tin nhắn
            liên hệ.
          </p>
        </div>
        <p className="relative text-sm text-white/50">
          CHẤT LƯỢNG CỦA CHÚNG TÔI — AN TOÀN CỦA BẠN
        </p>
      </section>

      <section className="admin-login-panel">
        <div className="admin-login-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-hh-blue">
            CMS Admin
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="mt-1 text-sm text-gray-500">
            Nhập thông tin tài khoản quản trị để tiếp tục.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="admin-field">
              <span className="admin-label">Tên đăng nhập</span>
              <input
                name="username"
                required
                autoComplete="username"
                defaultValue="admin"
                className="admin-input"
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Mật khẩu</span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="admin-input"
              />
            </label>

            {error && <AdminAlert>{error}</AdminAlert>}

            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary w-full py-3"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
