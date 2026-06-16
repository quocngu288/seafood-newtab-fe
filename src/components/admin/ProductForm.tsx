"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/client";
import type { AdminProduct, ProductTranslationFields } from "@/lib/api/types";
import { formatVndPrice, parseVndInput } from "@/lib/product-media";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminImageUpload } from "./ui/AdminImageUpload";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";

const emptyTranslation = (): ProductTranslationFields => ({
  name: "",
  description: "",
  size: "",
  price: "—",
  priceVnd: 0,
  date: "",
});

type ProductFormProps = {
  initial?: AdminProduct;
};

export function ProductForm({ initial }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [thumbnailKey, setThumbnailKey] = useState(initial?.thumbnailKey ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [vi, setVi] = useState(
    initial?.translations.vi ?? emptyTranslation(),
  );
  const [en, setEn] = useState(
    initial?.translations.en ?? emptyTranslation(),
  );
  const [priceInput, setPriceInput] = useState<string>(() => {
    const vnd = initial?.translations.vi?.priceVnd ?? 0;
    return vnd > 0 ? String(vnd) : "";
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const data = locale === "vi" ? vi : en;
  const setData = locale === "vi" ? setVi : setEn;

  const priceVnd = parseVndInput(priceInput);

  function syncPriceToLocales(vnd: number) {
    setVi((prev) => ({ ...prev, priceVnd: vnd, price: formatVndPrice(vnd, "vi") }));
    setEn((prev) => ({ ...prev, priceVnd: vnd, price: formatVndPrice(vnd, "en") }));
  }

  function handlePriceChange(value: string) {
    setPriceInput(value);
    syncPriceToLocales(parseVndInput(value));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!thumbnailKey) {
      setError("Vui lòng tải lên ảnh sản phẩm");
      setLoading(false);
      return;
    }

    const payload = {
      thumbnailKey,
      sortOrder,
      vi: {
        name: vi.name,
        description: vi.description,
        size: vi.size,
        priceVnd,
        date: vi.date,
      },
      en: {
        name: en.name,
        description: en.description,
        size: en.size,
        priceVnd,
        date: en.date,
      },
    };

    try {
      if (isEdit && initial) {
        await adminApi.updateProduct(initial.id, payload);
      } else {
        await adminApi.createProduct(payload);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
      setLoading(false);
    }
  }

  const update = (key: keyof ProductTranslationFields, value: string) =>
    setData({ ...data, [key]: value });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin chung</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminImageUpload
            label="Ảnh sản phẩm"
            thumbnailKey={thumbnailKey}
            thumbnailUrl={thumbnailUrl}
            onChange={(key, url) => {
              setThumbnailKey(key);
              setThumbnailUrl(url);
            }}
            uploadFile={adminApi.uploadProductImage}
          />
          <div className="space-y-4">
            <label className="admin-field">
              <span className="admin-label">Giá bán (VNĐ)</span>
              <input
                type="text"
                inputMode="numeric"
                className="admin-input"
                value={priceInput}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="VD: 92000"
              />
              <span className="admin-field-hint">
                Hiển thị: {formatVndPrice(priceVnd, "vi")} /{" "}
                {formatVndPrice(priceVnd, "en")}
              </span>
            </label>
            <label className="admin-field">
              <span className="admin-label">Thứ tự hiển thị</span>
              <input
                type="number"
                className="admin-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
              <span className="admin-field-hint">Số nhỏ hơn sẽ hiển thị trước</span>
            </label>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card-section-title">Nội dung đa ngôn ngữ</p>
        <AdminLocaleTabs active={locale} onChange={setLocale} />

        <div className="grid gap-4">
          <label className="admin-field">
            <span className="admin-label">Tên sản phẩm</span>
            <input
              className="admin-input"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Mô tả / Quy cách</span>
            <textarea
              className="admin-textarea"
              rows={4}
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              required
            />
          </label>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span className="admin-label">Size</span>
              <input
                className="admin-input"
                value={data.size}
                onChange={(e) => update("size", e.target.value)}
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Ngày cập nhật</span>
              <input
                className="admin-input"
                value={data.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="VD: 06 May"
              />
            </label>
          </div>
        </div>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminFormActions
        submitLabel={isEdit ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
        loading={loading}
        onCancel={() => router.back()}
      />
    </form>
  );
}
