import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Tổng quan nội dung website Hải Hương Seafood. Chọn mục bên trái hoặc thao tác nhanh bên dưới."
      />
      <DashboardStats />
    </>
  );
}
