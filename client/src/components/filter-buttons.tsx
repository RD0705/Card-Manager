import { Button } from "@/components/ui/button";
import { Users, CheckCircle, XCircle } from "lucide-react";

export type FilterStatus = "all" | "active" | "expired";

interface FilterButtonsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    expired: number;
  };
}

export function FilterButtons({ activeFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: { key: FilterStatus; label: string; icon: typeof Users; count: number }[] = [
    { key: "all", label: "Todos", icon: Users, count: counts.all },
    { key: "active", label: "Ativos", icon: CheckCircle, count: counts.active },
    { key: "expired", label: "Expirados", icon: XCircle, count: counts.expired },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, icon: Icon, count }) => (
        <Button
          key={key}
          variant={activeFilter === key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className="gap-2"
          data-testid={`button-filter-${key}`}
        >
          <Icon className="w-4 h-4" />
          {label}
          <span
            className={`
              ml-1 px-1.5 py-0.5 text-xs rounded-full
              ${activeFilter === key
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
              }
            `}
          >
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
}
