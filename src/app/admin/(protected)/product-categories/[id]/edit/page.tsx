"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminLoading } from "@/components/admin/ui/AdminLoading";
import { adminApi } from "@/lib/api/client";
import type { AdminProductCategory } from "@/lib/api/types";

export default function EditProductCategoryPage() {
  const params = useParams<{ id: string }>();
  const [category, setCategory] = useState<AdminProductCategory | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getProductCategory(Number(params.id))
      .then(setCategory)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi"));
  }, [params.id]);

  if (error) return <AdminAlert>{error}</AdminAlert>;
  if (!category) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={`Sửa loại: ${category.translations.vi?.name ?? category.key}`}
        description={`Key: ${category.key}`}
      />
      <CategoryForm initial={category} />
    </>
  );
}
