"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import type { AdminNewsArticle } from "@/lib/api/types";
import { resolveProductImageUrl } from "@/lib/product-media";
import { resolveThumbnail } from "@/lib/thumbnails";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminEmptyState } from "./ui/AdminEmptyState";
import { AdminLoading } from "./ui/AdminLoading";

function NewsThumbnail({ item }: { item: AdminNewsArticle }) {
  const url =
    item.thumbnailUrl ||
    resolveProductImageUrl(undefined, item.thumbnailKey);

  if (url) {
    return (
      <img
        src={url}
        alt=""
        className="h-12 w-16 rounded object-cover"
      />
    );
  }

  if (item.thumbnailKey && !item.thumbnailKey.startsWith("uploads/")) {
    const src = resolveThumbnail(item.thumbnailKey);
    return (
      <img
        src={src.src}
        alt=""
        className="h-12 w-16 rounded object-cover"
      />
    );
  }

  return <span className="text-gray-400">—</span>;
}

export function NewsAdminList() {
  const router = useRouter();
  const [items, setItems] = useState<AdminNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getNews()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Xóa bài viết này?")) return;
    await adminApi.deleteNews(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    router.refresh();
  }

  if (loading) return <AdminLoading />;
  if (error) return <AdminAlert>{error}</AdminAlert>;

  if (items.length === 0) {
    return (
      <AdminEmptyState
        title="Chưa có tin tức nào"
        description="Đăng bài viết đầu tiên cho mục tin tức & sự kiện."
      />
    );
  }

  return (
    <div className="admin-table-wrap">
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tiêu đề (VI)</th>
              <th>Slug</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="admin-badge">#{item.id}</span>
                </td>
                <td>
                  <NewsThumbnail item={item} />
                </td>
                <td className="max-w-xs font-medium text-gray-900">
                  <span className="line-clamp-2">
                    {item.translations.vi?.title ?? "—"}
                  </span>
                </td>
                <td className="max-w-[200px] truncate text-gray-500">
                  {item.slug}
                </td>
                <td>
                  <div className="admin-action-group">
                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="admin-btn-link"
                    >
                      Sửa
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="admin-btn-danger"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
