import { ProductForm } from "@/components/admin/ProductForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function NewProductPage() {
  return (
    <>
      <AdminPageHeader
        title="Thêm sản phẩm"
        description="Điền thông tin sản phẩm cho cả hai ngôn ngữ Việt và Anh."
      />
      <ProductForm />
    </>
  );
}
