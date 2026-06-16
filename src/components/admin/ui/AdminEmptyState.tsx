type AdminEmptyStateProps = {
  title: string;
  description?: string;
};

export function AdminEmptyState({ title, description }: AdminEmptyStateProps) {
  return (
    <div className="admin-empty">
      <p className="text-base font-medium text-gray-700">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
