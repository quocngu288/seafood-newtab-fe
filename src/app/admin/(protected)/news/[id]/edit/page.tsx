"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminLoading } from "@/components/admin/ui/AdminLoading";
import { adminApi } from "@/lib/api/client";
import type { AdminNewsArticle } from "@/lib/api/types";

export default function EditNewsPage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<AdminNewsArticle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getNewsArticle(Number(params.id))
      .then(setArticle)
      .catch((err) => setError(err instanceof Error ? err.message : "Lỗi"));
  }, [params.id]);

  if (error) return <AdminAlert>{error}</AdminAlert>;
  if (!article) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={`Sửa tin tức #${article.id}`}
        description={article.translations.vi?.title ?? "Chỉnh sửa bài viết"}
      />
      <NewsForm initial={article} />
    </>
  );
}
