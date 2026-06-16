import Link from "next/link";
import { IconPlus } from "./icons";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    href: string;
    label: string;
  };
};

export function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="admin-page-header">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {description && <p className="admin-page-desc">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="admin-btn-primary shrink-0">
          <IconPlus />
          {action.label}
        </Link>
      )}
    </div>
  );
}
