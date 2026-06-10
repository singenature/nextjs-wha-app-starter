'use client';

import type { Period } from "@/lib/services/types/admin-types";
import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  period: Period;
  onChange: (period: Period) => void;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 วัน" },
  { value: "30d", label: "30 วัน" },
  { value: "90d", label: "90 วัน" },
];

export function PeriodSelector({ period, onChange }: PeriodSelectorProps) {
  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            period === p.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
