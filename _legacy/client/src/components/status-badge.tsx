import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import type { MemberStatus } from "@shared/schema";

interface StatusBadgeProps {
  status: MemberStatus;
  showIcon?: boolean;
  size?: "sm" | "default";
}

export function StatusBadge({ status, showIcon = true, size = "default" }: StatusBadgeProps) {
  const isActive = status === "ATIVO";

  return (
    <Badge
      variant="outline"
      className={`
        ${size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"}
        font-medium uppercase tracking-wide
        ${isActive 
          ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" 
          : "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
        }
      `}
      data-testid={`badge-status-${status.toLowerCase()}`}
    >
      {showIcon && (
        isActive 
          ? <CheckCircle className="w-3 h-3 mr-1" /> 
          : <XCircle className="w-3 h-3 mr-1" />
      )}
      {status}
    </Badge>
  );
}
