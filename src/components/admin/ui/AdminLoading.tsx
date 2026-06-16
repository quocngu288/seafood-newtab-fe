export function AdminLoading({ label = "Đang tải dữ liệu..." }: { label?: string }) {
  return (
    <div className="admin-loading" role="status" aria-live="polite">
      <span className="admin-spinner" aria-hidden />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
