type AdminAlertProps = {
  variant?: "error" | "info";
  children: React.ReactNode;
};

export function AdminAlert({ variant = "error", children }: AdminAlertProps) {
  return (
    <div className={variant === "error" ? "admin-alert-error" : "admin-alert-info"}>
      {children}
    </div>
  );
}
