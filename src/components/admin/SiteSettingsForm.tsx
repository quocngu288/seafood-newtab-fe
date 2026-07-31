"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import type {
  AdminSiteSettings,
  SiteSettingsTranslationFields,
} from "@/lib/api/types";
import { AdminAlert } from "./ui/AdminAlert";
import { AdminFormActions } from "./ui/AdminFormActions";
import { AdminImageUpload } from "./ui/AdminImageUpload";
import { AdminLoading } from "./ui/AdminLoading";
import { AdminLocaleTabs } from "./ui/AdminLocaleTabs";

const emptyTranslation = (): SiteSettingsTranslationFields => ({
  address: "",
  hotline: "",
  mapTitle: "",
  contactLabel: "",
  saleOnline: "",
  companyName: "",
  tagline: "",
  logoAlt: "",
  floatingCallLabel: "",
});

type SalesRow = AdminSiteSettings["sales"][number];

export function SiteSettingsForm() {
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [floatingCallPhone, setFloatingCallPhone] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [logoKey, setLogoKey] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sales, setSales] = useState<SalesRow[]>([]);
  const [vi, setVi] = useState(emptyTranslation());
  const [en, setEn] = useState(emptyTranslation());

  useEffect(() => {
    adminApi
      .getSiteSettings()
      .then((data) => {
        setEmail(data.email);
        setWebsite(data.website);
        setFacebookUrl(data.facebookUrl);
        setLinkedinUrl(data.linkedinUrl);
        setXUrl(data.xUrl);
        setFloatingCallPhone(data.floatingCallPhone);
        setMapEmbedUrl(data.mapEmbedUrl);
        setLogoKey(data.logoKey);
        setLogoUrl(data.logoUrl);
        setSales(data.sales);
        setVi({ ...emptyTranslation(), ...data.translations.vi });
        setEn({ ...emptyTranslation(), ...data.translations.en });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu"),
      )
      .finally(() => setLoading(false));
  }, []);

  const data = locale === "vi" ? vi : en;
  const setData = locale === "vi" ? setVi : setEn;

  function updateTranslation(
    key: keyof SiteSettingsTranslationFields,
    value: string,
  ) {
    setData({ ...data, [key]: value });
  }

  function updateSales(index: number, patch: Partial<SalesRow>) {
    setSales((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function addSales() {
    setSales((prev) => [
      ...prev,
      { name: "", phone: "", viTitle: "", enTitle: "" },
    ]);
  }

  function removeSales(index: number) {
    setSales((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await adminApi.updateSiteSettings({
        email,
        website,
        facebookUrl,
        linkedinUrl,
        xUrl,
        floatingCallPhone,
        mapEmbedUrl,
        logoKey,
        sales,
        vi,
        en,
      });
      setSuccess("Đã lưu thông tin liên hệ");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminLoading />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card">
        <p className="admin-card-section-title">Thông tin chung</p>
        <div className="grid gap-4">
          <AdminImageUpload
            label="Logo (tuỳ chọn)"
            thumbnailKey={logoKey}
            thumbnailUrl={logoUrl}
            onChange={(key, url) => {
              setLogoKey(key);
              setLogoUrl(url);
            }}
            uploadFile={adminApi.uploadSiteLogo}
          />

          <div className="admin-form-grid">
            <label className="admin-field">
              <span className="admin-label">Email</span>
              <input
                className="admin-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Website</span>
              <input
                className="admin-input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Hotline (nút gọi nổi)</span>
              <input
                className="admin-input"
                value={floatingCallPhone}
                onChange={(e) => setFloatingCallPhone(e.target.value)}
                placeholder="+84909496999"
              />
            </label>
          </div>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span className="admin-label">Facebook URL</span>
              <input
                className="admin-input"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">LinkedIn URL</span>
              <input
                className="admin-input"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">X (Twitter) URL</span>
              <input
                className="admin-input"
                value={xUrl}
                onChange={(e) => setXUrl(e.target.value)}
              />
            </label>
          </div>

          <label className="admin-field">
            <span className="admin-label">Google Maps embed URL</span>
            <textarea
              className="admin-textarea"
              rows={3}
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card-section-title">Nội dung đa ngôn ngữ</p>
        <AdminLocaleTabs active={locale} onChange={setLocale} />

        <div className="grid gap-4">
          <label className="admin-field">
            <span className="admin-label">Tên công ty (header)</span>
            <input
              className="admin-input"
              value={data.companyName}
              onChange={(e) => updateTranslation("companyName", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Slogan / tagline</span>
            <input
              className="admin-input"
              value={data.tagline}
              onChange={(e) => updateTranslation("tagline", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Alt logo</span>
            <input
              className="admin-input"
              value={data.logoAlt}
              onChange={(e) => updateTranslation("logoAlt", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Nhãn Contact (footer)</span>
            <input
              className="admin-input"
              value={data.contactLabel}
              onChange={(e) =>
                updateTranslation("contactLabel", e.target.value)
              }
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Địa chỉ</span>
            <textarea
              className="admin-textarea"
              rows={2}
              value={data.address}
              onChange={(e) => updateTranslation("address", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Hotline (dòng hiển thị)</span>
            <input
              className="admin-input"
              value={data.hotline}
              onChange={(e) => updateTranslation("hotline", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Tiêu đề bản đồ</span>
            <input
              className="admin-input"
              value={data.mapTitle}
              onChange={(e) => updateTranslation("mapTitle", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Sale online (trang liên hệ)</span>
            <input
              className="admin-input"
              value={data.saleOnline}
              onChange={(e) => updateTranslation("saleOnline", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Nhãn nút gọi nổi</span>
            <input
              className="admin-input"
              value={data.floatingCallLabel}
              onChange={(e) =>
                updateTranslation("floatingCallLabel", e.target.value)
              }
            />
          </label>
        </div>
      </div>

      <div className="admin-card">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="admin-card-section-title !mb-0">Sale online / nhân sự</p>
          <button type="button" className="admin-btn-secondary" onClick={addSales}>
            Thêm người
          </button>
        </div>

        {sales.length === 0 ? (
          <p className="text-sm text-gray-500">
            Chưa có nhân sự — thêm để hiện ở sidebar trang Liên hệ.
          </p>
        ) : (
          <div className="space-y-4">
            {sales.map((row, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span className="admin-label">Tên</span>
                    <input
                      className="admin-input"
                      value={row.name}
                      onChange={(e) =>
                        updateSales(index, { name: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-label">Số điện thoại</span>
                    <input
                      className="admin-input"
                      value={row.phone}
                      onChange={(e) =>
                        updateSales(index, { phone: e.target.value })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-label">Chức danh VI</span>
                    <input
                      className="admin-input"
                      value={row.viTitle}
                      onChange={(e) =>
                        updateSales(index, { viTitle: e.target.value })
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-label">Chức danh EN</span>
                    <input
                      className="admin-input"
                      value={row.enTitle}
                      onChange={(e) =>
                        updateSales(index, { enTitle: e.target.value })
                      }
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="admin-btn-danger w-fit"
                  onClick={() => removeSales(index)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </div>
      )}

      <AdminFormActions submitLabel="Lưu thông tin" loading={saving} />
    </form>
  );
}
