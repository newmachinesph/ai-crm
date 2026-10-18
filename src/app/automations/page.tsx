"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { automations } from "@/lib/mock-data";
import Link from "next/link";
import {
  Plus,
  Workflow,
  Play,
  Pause,
  MoreHorizontal,
  Zap,
  Clock,
  Hash,
} from "lucide-react";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  draft: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
};

export default function AutomationsPage() {
  const activeCount = automations.filter(a => a.status === "active").length;
  const totalRuns = automations.reduce((sum, a) => sum + a.runsTotal, 0);

  return (
    <DashboardLayout
      title="Automations"
      subtitle="Create and manage outreach automation workflows"
      actions={
        <Link
          href="/automations/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Automation
        </Link>
      }
    >
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
            <Workflow className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{automations.length}</p>
            <p className="text-sm text-secondary">Total Automations</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{activeCount}</p>
            <p className="text-sm text-secondary">Active</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
            <Hash className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalRuns.toLocaleString()}</p>
            <p className="text-sm text-secondary">Total Runs</p>
          </div>
        </div>
      </div>

      {/* Automation list */}
      <div className="space-y-3">
        {automations.map((auto) => {
          const style = statusStyles[auto.status];
          return (
            <div
              key={auto.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{auto.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-secondary">
                        <Zap className="w-3 h-3" />
                        Trigger: {auto.trigger}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-secondary">
                        <Hash className="w-3 h-3" />
                        {auto.steps} steps
                      </span>
                      {auto.lastRun && (
                        <span className="flex items-center gap-1 text-xs text-secondary">
                          <Clock className="w-3 h-3" />
                          Last run: {auto.lastRun}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <p className="text-sm font-bold text-foreground">{auto.runsTotal.toLocaleString()}</p>
                    <p className="text-xs text-secondary">runs</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {auto.status.charAt(0).toUpperCase() + auto.status.slice(1)}
                  </span>
                  {auto.status === "active" && (
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary transition-colors" title="Pause">
                      <Pause className="w-4 h-4" />
                    </button>
                  )}
                  {auto.status === "paused" && (
                    <button className="p-1.5 rounded-lg hover:bg-muted text-success transition-colors" title="Resume">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
