type AdminFormActionsProps = {
  submitLabel: string;
  loading?: boolean;
  onCancel?: () => void;
};

export function AdminFormActions({
  submitLabel,
  loading = false,
  onCancel,
}: AdminFormActionsProps) {
  return (
    <div className="admin-form-actions">
      <button type="submit" disabled={loading} className="admin-btn-primary">
        {loading ? "Đang lưu..." : submitLabel}
      </button>
      {onCancel ? (
        <button type="button" onClick={onCancel} className="admin-btn-secondary">
          Hủy
        </button>
      ) : null}
    </div>
  );
}
