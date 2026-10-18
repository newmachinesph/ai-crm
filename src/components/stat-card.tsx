"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  prefix = "",
}: {
  label: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  prefix?: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-secondary font-medium">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {prefix}{typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {change >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-danger" />
          )}
          <span
            className={`text-xs font-medium ${
              change >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-secondary ml-1">vs last week</span>
        </div>
      )}
    </div>
  );
}
