"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import type { AdminProduct } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminEmptyState } from "./ui/AdminEmptyState";
import { AdminLoading } from "./ui/AdminLoading";

export function ProductsAdminList() {
  const router = useRouter();
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getProducts()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Xóa sản phẩm này?")) return;
    await adminApi.deleteProduct(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    router.refresh();
  }

  if (loading) return <AdminLoading />;
  if (error) return <AdminAlert>{error}</AdminAlert>;

  if (items.length === 0) {
    return (
      <AdminEmptyState
        title="Chưa có sản phẩm nào"
        description="Bấm Thêm sản phẩm để tạo mục đầu tiên trong danh mục."
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
              <th>Tên (VI)</th>
              <th>Giá</th>
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
                <td className="font-medium text-gray-900">
                  {item.translations.vi?.name ?? "—"}
                </td>
                <td>{item.translations.vi?.price ?? "—"}</td>
                <td>{item.sortOrder}</td>
                <td>
                  <div className="admin-action-group">
                    <Link
                      href={`/admin/products/${item.id}/edit`}
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
