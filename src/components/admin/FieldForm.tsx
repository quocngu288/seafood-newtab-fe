"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/client";
import type { AdminFieldItem, FieldTranslationFields } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminImageUpload } from "./ui/AdminImageUpload";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";

const emptyTranslation = (): FieldTranslationFields => ({
  title: "",
  cta: "",
  imageAlt: "",
});

function pickTranslation(
  translation: AdminFieldItem["translations"]["vi"] | undefined,
): FieldTranslationFields {
  if (!translation) return emptyTranslation();
  return {
    title: translation.title,
    cta: translation.cta,
    imageAlt: translation.imageAlt,
  };
}

type FieldFormProps = {
  initial?: AdminFieldItem;
};

export function FieldForm({ initial }: FieldFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [key, setKey] = useState(initial?.key ?? "");
  const [imageKey, setImageKey] = useState(initial?.imageKey ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [href, setHref] = useState(initial?.href ?? "/about");
  const [icon, setIcon] = useState(initial?.icon ?? "farming");
  const [reverse, setReverse] = useState(initial?.reverse ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [active, setActive] = useState(initial?.active ?? true);
  const [vi, setVi] = useState(pickTranslation(initial?.translations.vi));
  const [en, setEn] = useState(pickTranslation(initial?.translations.en));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const data = locale === "vi" ? vi : en;
  const setData = locale === "vi" ? setVi : setEn;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!imageKey) {
      setError("Vui lòng tải lên ảnh lĩnh vực");
      setLoading(false);
      return;
    }

    const payload = {
      key: key.trim() || undefined,
      imageKey,
      href,
      icon,
      reverse,
      sortOrder,
      active,
      vi,
      en,
    };

    try {
      if (isEdit && initial) {
        await adminApi.updateField(initial.id, payload);
      } else {
        await adminApi.createField(payload);
      }
      router.push("/admin/fields");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
      setLoading(false);
    }
  }

  const update = (field: keyof FieldTranslationFields, value: string) =>
    setData({ ...data, [field]: value });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin lĩnh vực</p>
        <div className="grid gap-4">
          <AdminImageUpload
            label="Ảnh lĩnh vực"
            thumbnailKey={imageKey}
            thumbnailUrl={imageUrl}
            onChange={(nextKey, url) => {
              setImageKey(nextKey);
              setImageUrl(url);
            }}
            uploadFile={adminApi.uploadFieldImage}
          />

          <div className="admin-form-grid">
            <label className="admin-field">
              <span className="admin-label">Key (slug)</span>
              <input
                className="admin-input"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="farming"
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Link CTA</span>
              <input
                className="admin-input"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="/about"
                required
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Icon</span>
              <select
                className="admin-input"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                <option value="farming">Nuôi trồng</option>
                <option value="processing">Chế biến</option>
                <option value="export">Xuất khẩu</option>
              </select>
            </label>
            <label className="admin-field">
              <span className="admin-label">Thứ tự</span>
              <input
                type="number"
                className="admin-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </label>
            <label className="admin-field flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={reverse}
                onChange={(e) => setReverse(e.target.checked)}
              />
              <span className="admin-label !mb-0">Đảo ảnh sang phải</span>
            </label>
            <label className="admin-field flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <span className="admin-label !mb-0">Hiển thị trên website</span>
            </label>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card-section-title">Nội dung đa ngôn ngữ</p>
        <AdminLocaleTabs active={locale} onChange={setLocale} />

        <div className="grid gap-4">
          <label className="admin-field">
            <span className="admin-label">Tiêu đề</span>
            <input
              className="admin-input"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Nút CTA</span>
            <input
              className="admin-input"
              value={data.cta}
              onChange={(e) => update("cta", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Alt ảnh</span>
            <input
              className="admin-input"
              value={data.imageAlt}
              onChange={(e) => update("imageAlt", e.target.value)}
            />
          </label>
        </div>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminFormActions
        submitLabel={isEdit ? "Cập nhật lĩnh vực" : "Thêm lĩnh vực"}
        loading={loading}
        onCancel={() => router.back()}
      />
    </form>
  );
}
