"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FieldForm } from "@/components/admin/FieldForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminLoading } from "@/components/admin/ui/AdminLoading";
import { adminApi } from "@/lib/api/client";
import type { AdminFieldItem } from "@/lib/api/types";

export default function EditFieldPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<AdminFieldItem | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getField(Number(params.id))
      .then(setItem)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi"));
  }, [params.id]);

  if (error) return <AdminAlert>{error}</AdminAlert>;
  if (!item) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={`Sửa lĩnh vực #${item.id}`}
        description={item.translations.vi?.title ?? "Chỉnh sửa lĩnh vực"}
      />
      <FieldForm initial={item} />
    </>
  );
}
