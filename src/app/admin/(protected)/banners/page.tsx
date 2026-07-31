import { BannersAdminList } from "@/components/admin/BannersAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminBannersPage() {
  return (
    <>
      <AdminPageHeader
        title="Banner"
        description="Quản lý slide banner trang chủ (ảnh, tiêu đề, badges)."
        action={{ href: "/admin/banners/new", label: "Thêm banner" }}
      />
      <BannersAdminList />
    </>
  );
}
