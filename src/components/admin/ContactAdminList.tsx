"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import type { ContactMessage } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminEmptyState } from "./ui/AdminEmptyState";
import { AdminLoading } from "./ui/AdminLoading";

export function ContactAdminList() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getContactMessages()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Xóa tin nhắn này?")) return;
    await adminApi.deleteContactMessage(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (loading) return <AdminLoading />;
  if (error) return <AdminAlert>{error}</AdminAlert>;

  if (items.length === 0) {
    return (
      <AdminEmptyState
        title="Chưa có tin nhắn liên hệ"
        description="Tin nhắn từ form liên hệ trên website sẽ hiển thị tại đây."
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="admin-contact-card">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-gray-900">
                  {item.fullName}
                </h2>
                {item.newsletter && (
                  <span className="admin-badge">Newsletter</span>
                )}
              </div>
              <div className="admin-contact-meta">
                <a href={`mailto:${item.email}`} className="hover:text-hh-blue">
                  {item.email}
                </a>
                <span aria-hidden>·</span>
                <a href={`tel:${item.phone}`} className="hover:text-hh-blue">
                  {item.phone}
                </a>
                <span aria-hidden>·</span>
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </time>
              </div>
              {item.address && (
                <p className="mt-2 text-sm text-gray-600">{item.address}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="admin-btn-danger shrink-0"
            >
              Xóa
            </button>
          </div>
          <p className="admin-contact-message">{item.message}</p>
        </article>
      ))}
    </div>
  );
}
