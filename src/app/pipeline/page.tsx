"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { pipelineStages } from "@/lib/mock-data";
import { DollarSign, Users, MoreHorizontal, Building2 } from "lucide-react";

export default function PipelinePage() {
  const totalValue = pipelineStages.reduce(
    (sum, stage) => sum + stage.leads.reduce((s, l) => s + l.value, 0),
    0
  );

  return (
    <DashboardLayout
      title="Pipeline"
      subtitle={`Total pipeline value: $${totalValue.toLocaleString()}`}
    >
      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => {
          const stageValue = stage.leads.reduce((s, l) => s + l.value, 0);
          return (
            <div
              key={stage.id}
              className="min-w-[280px] max-w-[280px] flex-shrink-0"
            >
              {/* Stage header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-sm font-semibold text-foreground">
                    {stage.label}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-muted rounded text-xs text-secondary font-medium">
                    {stage.leads.length}
                  </span>
                </div>
                <span className="text-xs text-secondary font-medium">
                  ${stageValue.toLocaleString()}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {stage.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-card rounded-lg border border-border p-3.5 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer animate-fade-in group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-medium">
                          {lead.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {lead.name}
                          </p>
                          <p className="text-xs text-secondary flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {lead.company}
                          </p>
                        </div>
                      </div>
                      <button className="p-1 rounded hover:bg-muted text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <DollarSign className="w-3.5 h-3.5 text-secondary" />
                        {lead.value.toLocaleString()}
                      </div>
                      <div className="flex gap-1">
                        {lead.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              tag === "hot"
                                ? "bg-red-100 text-red-600"
                                : "bg-muted text-secondary"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50 text-xs text-secondary">
                      <Users className="w-3 h-3" />
                      {lead.source}
                      <span className="ml-auto">{lead.lastContact}</span>
                    </div>
                  </div>
                ))}

                {stage.leads.length === 0 && (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-xs text-secondary">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
