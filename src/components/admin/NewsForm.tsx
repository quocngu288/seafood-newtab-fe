"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/client";
import type { AdminNewsArticle, NewsTranslationFields } from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminImageUpload } from "./ui/AdminImageUpload";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";
import { AdminRichTextEditor } from "./ui/AdminRichTextEditor";

const emptyTranslation = (): NewsTranslationFields => ({
  title: "",
  body: "",
  excerpt: "",
});

function pickTranslationFields(
  translation: AdminNewsArticle["translations"]["vi"] | undefined,
): NewsTranslationFields {
  if (!translation) return emptyTranslation();
  return {
    title: translation.title,
    body: translation.body,
    excerpt: translation.excerpt,
  };
}

type NewsFormProps = {
  initial?: AdminNewsArticle;
};

export function NewsForm({ initial }: NewsFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [thumbnailKey, setThumbnailKey] = useState(initial?.thumbnailKey ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [publishedAt, setPublishedAt] = useState(
    initial?.publishedAt?.slice(0, 10) ?? "",
  );
  const [vi, setVi] = useState(pickTranslationFields(initial?.translations.vi));
  const [en, setEn] = useState(pickTranslationFields(initial?.translations.en));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const data = locale === "vi" ? vi : en;
  const setData = locale === "vi" ? setVi : setEn;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!thumbnailKey) {
      setError("Vui lòng tải lên ảnh bài viết");
      setLoading(false);
      return;
    }

    const payload = {
      thumbnailKey,
      sortOrder,
      publishedAt: publishedAt || undefined,
      vi,
      en,
    };

    try {
      if (isEdit && initial) {
        await adminApi.updateNews(initial.id, payload);
      } else {
        await adminApi.createNews(payload);
      }
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
      setLoading(false);
    }
  }

  const update = (key: keyof NewsTranslationFields, value: string) =>
    setData({ ...data, [key]: value });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin bài viết</p>
        <div className="grid gap-4">
          <AdminImageUpload
            label="Ảnh bài viết"
            thumbnailKey={thumbnailKey}
            thumbnailUrl={thumbnailUrl}
            onChange={(key, url) => {
              setThumbnailKey(key);
              setThumbnailUrl(url);
            }}
            uploadFile={adminApi.uploadNewsImage}
          />

          <div className="admin-form-grid">
            <label className="admin-field">
              <span className="admin-label">Ngày đăng</span>
              <input
                type="date"
                className="admin-input"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
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
          </div>

          {isEdit && initial?.slug && (
            <p className="admin-field-hint">
              URL slug: <span className="font-mono text-gray-600">{initial.slug}</span>{" "}
              (tự cập nhật khi đổi tiêu đề tiếng Việt)
            </p>
          )}
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
            {locale === "vi" && (
              <span className="admin-field-hint">
                Slug URL được tạo tự động từ tiêu đề tiếng Việt
              </span>
            )}
          </label>
          <label className="admin-field">
            <span className="admin-label">Tóm tắt</span>
            <textarea
              className="admin-textarea"
              rows={2}
              value={data.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
            />
          </label>
          <div className="admin-field">
            <span className="admin-label">Nội dung</span>
            <AdminRichTextEditor
              value={data.body}
              onChange={(html) => update("body", html)}
            />
          </div>
        </div>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminFormActions
        submitLabel={isEdit ? "Cập nhật tin tức" : "Đăng tin tức"}
        loading={loading}
        onCancel={() => router.back()}
      />
    </form>
  );
}
