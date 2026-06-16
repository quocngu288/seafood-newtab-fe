import { NewsAdminList } from "@/components/admin/NewsAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminNewsPage() {
  return (
    <>
      <AdminPageHeader
        title="Tin tức"
        description="Quản lý bài viết tin tức & sự kiện trên website."
        action={{ href: "/admin/news/new", label: "Thêm tin tức" }}
      />
      <NewsAdminList />
    </>
  );
}
