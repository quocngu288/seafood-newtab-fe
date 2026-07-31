"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/client";
import type { AdminBanner, BannerTranslationFields } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminImageUpload } from "./ui/AdminImageUpload";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";

const emptyTranslation = (): BannerTranslationFields => ({
  title: "",
  badges: "",
  imageAlt: "",
});

function pickTranslation(
  translation: AdminBanner["translations"]["vi"] | undefined,
): BannerTranslationFields {
  if (!translation) return emptyTranslation();
  return {
    title: translation.title,
    badges: translation.badges,
    imageAlt: translation.imageAlt,
  };
}

type BannerFormProps = {
  initial?: AdminBanner;
};

export function BannerForm({ initial }: BannerFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [imageKey, setImageKey] = useState(initial?.imageKey ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
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
      setError("Vui lòng tải lên ảnh banner");
      setLoading(false);
      return;
    }

    const payload = {
      imageKey,
      sortOrder,
      active,
      vi,
      en,
    };

    try {
      if (isEdit && initial) {
        await adminApi.updateBanner(initial.id, payload);
      } else {
        await adminApi.createBanner(payload);
      }
      router.push("/admin/banners");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
      setLoading(false);
    }
  }

  const update = (key: keyof BannerTranslationFields, value: string) =>
    setData({ ...data, [key]: value });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin banner</p>
        <div className="grid gap-4">
          <AdminImageUpload
            label="Ảnh banner"
            thumbnailKey={imageKey}
            thumbnailUrl={imageUrl}
            onChange={(key, url) => {
              setImageKey(key);
              setImageUrl(url);
            }}
            uploadFile={adminApi.uploadBannerImage}
          />

          <div className="admin-form-grid">
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
            <textarea
              className="admin-textarea"
              rows={3}
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Badges / chứng nhận</span>
            <input
              className="admin-input"
              value={data.badges}
              onChange={(e) => update("badges", e.target.value)}
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
        submitLabel={isEdit ? "Cập nhật banner" : "Thêm banner"}
        loading={loading}
        onCancel={() => router.back()}
      />
    </form>
  );
}
