"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAdminToken } from "@/lib/api/auth";
import { adminApi } from "@/lib/api/client";
import { AdminShell } from "./AdminShell";
import { AdminLoading } from "./ui/AdminLoading";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    adminApi
      .me()
      .then((user) => {
        setUsername(user.username);
        setReady(true);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="admin-shell">
        <div className="admin-main">
          <div className="admin-content">
            <AdminLoading label="Đang xác thực phiên đăng nhập..." />
          </div>
        </div>
      </div>
    );
  }

  return <AdminShell username={username}>{children}</AdminShell>;
}
