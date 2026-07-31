import { FieldForm } from "@/components/admin/FieldForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function NewFieldPage() {
  return (
    <>
      <AdminPageHeader
        title="Thêm lĩnh vực"
        description="Tạo mục lĩnh vực mới với nội dung tiếng Việt và tiếng Anh."
      />
      <FieldForm />
    </>
  );
}
