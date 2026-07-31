import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminSiteSettingsPage() {
  return (
    <>
      <AdminPageHeader
        title="Thông tin liên hệ"
        description="Quản lý địa chỉ, hotline, website, logo, mạng xã hội và nhân sự sale online."
      />
      <SiteSettingsForm />
    </>
  );
}
