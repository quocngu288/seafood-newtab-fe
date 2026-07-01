"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import type { AdminProductCategory } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminEmptyState } from "./ui/AdminEmptyState";
import { AdminLoading } from "./ui/AdminLoading";

export function CategoriesAdminList() {
  const router = useRouter();
  const [items, setItems] = useState<AdminProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getProductCategories()
      .then(setItems)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu"),
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number, key: string) {
    if (!confirm(`Xóa loại "${key}"? Chỉ xóa được khi không còn sản phẩm nào thuộc loại này.`)) {
      return;
    }

    try {
      await adminApi.deleteProductCategory(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xóa thất bại");
    }
  }

  if (loading) return <AdminLoading />;
  if (error) return <AdminAlert>{error}</AdminAlert>;

  if (items.length === 0) {
    return (
      <AdminEmptyState
        title="Chưa có loại sản phẩm"
        description="Bấm Thêm loại để tạo tab phân loại trên trang Sản phẩm."
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
              <th>Key</th>
              <th>Tên (VI)</th>
              <th>Tên (EN)</th>
              <th>Thứ tự</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="admin-badge">#{item.id}</span>
                </td>
                <td className="font-mono text-sm text-gray-600">{item.key}</td>
                <td className="font-medium text-gray-900">
                  {item.translations.vi?.name ?? "—"}
                </td>
                <td>{item.translations.en?.name ?? "—"}</td>
                <td>{item.sortOrder}</td>
                <td>
                  <div className="admin-action-group">
                    <Link
                      href={`/admin/product-categories/${item.id}/edit`}
                      className="admin-btn-link"
                    >
                      Sửa
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.key)}
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
