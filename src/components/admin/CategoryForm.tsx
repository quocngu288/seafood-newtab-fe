"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/client";
import type { AdminProductCategory } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";

type CategoryFormProps = {
  initial?: AdminProductCategory;
};

export function CategoryForm({ initial }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [key, setKey] = useState(initial?.key ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [nameVi, setNameVi] = useState(initial?.translations.vi?.name ?? "");
  const [nameEn, setNameEn] = useState(initial?.translations.en?.name ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const name = locale === "vi" ? nameVi : nameEn;
  const setName = locale === "vi" ? setNameVi : setNameEn;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      key: key.trim() || undefined,
      sortOrder,
      vi: { name: nameVi },
      en: { name: nameEn },
    };

    try {
      if (isEdit && initial) {
        await adminApi.updateProductCategory(initial.id, {
          sortOrder,
          vi: { name: nameVi },
          en: { name: nameEn },
        });
      } else {
        await adminApi.createProductCategory(payload);
      }
      router.push("/admin/product-categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin loại sản phẩm</p>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="admin-field">
            <span className="admin-label">Key (slug)</span>
            <input
              className="admin-input"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="VD: shrimp, whole-fish"
              disabled={isEdit}
            />
            <span className="admin-field-hint">
              {isEdit
                ? "Key không đổi sau khi tạo (sản phẩm đang dùng key này)."
                : "Để trống sẽ tự tạo từ tên tiếng Anh."}
            </span>
          </label>

          <label className="admin-field">
            <span className="admin-label">Thứ tự tab</span>
            <input
              type="number"
              className="admin-input"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
            <span className="admin-field-hint">Số nhỏ hơn hiển thị trước trên website</span>
          </label>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card-section-title">Tên hiển thị</p>
        <AdminLocaleTabs active={locale} onChange={setLocale} />
        <label className="admin-field">
          <span className="admin-label">Tên loại ({locale.toUpperCase()})</span>
          <input
            className="admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminFormActions
        submitLabel={isEdit ? "Cập nhật loại" : "Tạo loại mới"}
        loading={loading}
        onCancel={() => router.back()}
      />
    </form>
  );
}
