import { ProductsAdminList } from "@/components/admin/ProductsAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminProductsPage() {
  return (
    <>
      <AdminPageHeader
        title="Sản phẩm"
        description="Quản lý danh mục sản phẩm cá tra hiển thị trên website (tiếng Việt & tiếng Anh)."
        action={{ href: "/admin/products/new", label: "Thêm sản phẩm" }}
      />
      <ProductsAdminList />
    </>
  );
}
