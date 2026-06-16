import { ContactAdminList } from "@/components/admin/ContactAdminList";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";

export default function AdminContactPage() {
  return (
    <>
      <AdminPageHeader
        title="Tin nhắn liên hệ"
        description="Các tin nhắn khách hàng gửi từ form liên hệ trên website."
      />
      <ContactAdminList />
    </>
  );
}
