import { BannerForm } from "@/components/admin/BannerForm";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function NewBannerPage() {
  return (
    <>
      <AdminPageHeader
        title="Thêm banner"
        description="Tạo slide banner mới với nội dung tiếng Việt và tiếng Anh."
      />
      <BannerForm />
    </>
  );
}
