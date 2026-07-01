import { CategoriesAdminList } from "@/components/admin/CategoriesAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminProductCategoriesPage() {
  return (
    <>
      <AdminPageHeader
        title="Loại sản phẩm"
        description="Quản lý các tab phân loại trên trang Sản phẩm (Fillets, Whole Fish, …)."
        action={{ href: "/admin/product-categories/new", label: "Thêm loại" }}
      />
      <CategoriesAdminList />
    </>
  );
}
