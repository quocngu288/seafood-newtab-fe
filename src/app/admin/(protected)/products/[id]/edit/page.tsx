"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminLoading } from "@/components/admin/ui/AdminLoading";
import { adminApi } from "@/lib/api/client";
import type { AdminProduct } from "@/lib/api/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getProduct(Number(params.id))
      .then(setProduct)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi"));
  }, [params.id]);

  if (error) return <AdminAlert>{error}</AdminAlert>;
  if (!product) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={`Sửa sản phẩm #${product.id}`}
        description={product.translations.vi?.name ?? "Chỉnh sửa thông tin sản phẩm"}
      />
      <ProductForm initial={product} />
    </>
  );
}
