import { NewsForm } from "@/components/admin/NewsForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function NewNewsPage() {
  return (
    <>
      <AdminPageHeader
        title="Thêm tin tức"
        description="Soạn bài viết mới với nội dung tiếng Việt và tiếng Anh."
      />
      <NewsForm />
    </>
  );
}
