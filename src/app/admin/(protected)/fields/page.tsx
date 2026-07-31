import { FieldsAdminList } from "@/components/admin/FieldsAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminFieldsPage() {
  return (
    <>
      <AdminPageHeader
        title="Lĩnh vực"
        description="Quản lý các mục trên trang Lĩnh vực."
        action={{ href: "/admin/fields/new", label: "Thêm lĩnh vực" }}
      />
      <FieldsAdminList />
    </>
  );
}
