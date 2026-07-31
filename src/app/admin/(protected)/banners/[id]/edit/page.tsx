"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BannerForm } from "@/components/admin/BannerForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminLoading } from "@/components/admin/ui/AdminLoading";
import { adminApi } from "@/lib/api/client";
import type { AdminBanner } from "@/lib/api/types";

export default function EditBannerPage() {
  const params = useParams<{ id: string }>();
  const [banner, setBanner] = useState<AdminBanner | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getBanner(Number(params.id))
      .then(setBanner)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi"));
  }, [params.id]);

  if (error) return <AdminAlert>{error}</AdminAlert>;
  if (!banner) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={`Sửa banner #${banner.id}`}
        description={banner.translations.vi?.title ?? "Chỉnh sửa banner"}
      />
      <BannerForm initial={banner} />
    </>
  );
}
