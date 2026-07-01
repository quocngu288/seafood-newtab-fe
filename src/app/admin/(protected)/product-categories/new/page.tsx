import { CategoryForm } from "@/components/admin/CategoryForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function NewProductCategoryPage() {
  return (
    <>
      <AdminPageHeader
        title="Thêm loại sản phẩm"
        description="Tạo tab mới trên trang Sản phẩm."
      />
      <CategoryForm />
    </>
  );
}
