"use client";

import DashboardLayout from "@/components/dashboard-layout";
import StatCard from "@/components/stat-card";
import { emailCampaigns } from "@/lib/mock-data";
import {
  Plus,
  Mail,
  Send,
  Eye,
  MousePointer,
  MessageSquare,
  Play,
  Pause,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
};

export default function EmailPage() {
  const totalSent = emailCampaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalOpened = emailCampaigns.reduce((sum, c) => sum + c.opened, 0);
  const totalClicked = emailCampaigns.reduce((sum, c) => sum + c.clicked, 0);
  const totalReplied = emailCampaigns.reduce((sum, c) => sum + c.replied, 0);

  return (
    <DashboardLayout
      title="Email Outreach"
      subtitle="Manage email campaigns and track performance"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Sent" value={totalSent} icon={Send} />
        <StatCard label="Opened" value={totalOpened} icon={Eye} change={36.8} />
        <StatCard label="Clicked" value={totalClicked} icon={MousePointer} change={18.1} />
        <StatCard label="Replied" value={totalReplied} icon={MessageSquare} change={10.2} />
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {emailCampaigns.map((campaign) => {
          const style = statusStyles[campaign.status];
          const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : "0";
          const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : "0";
          const replyRate = campaign.sent > 0 ? ((campaign.replied / campaign.sent) * 100).toFixed(1) : "0";

          return (
            <div
              key={campaign.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                    <p className="text-xs text-secondary">Created {campaign.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  {campaign.status === "active" && (
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                      <Pause className="w-4 h-4" />
                    </button>
                  )}
                  {campaign.status === "paused" && (
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-success transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Metrics bar */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-secondary">Sent</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{openRate}%</p>
                  <p className="text-xs text-secondary">Open Rate</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{clickRate}%</p>
                  <p className="text-xs text-secondary">Click Rate</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{replyRate}%</p>
                  <p className="text-xs text-secondary">Reply Rate</p>
                </div>
              </div>

              {/* Progress bar */}
              {campaign.sent > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-secondary mb-1">
                    <span>Engagement funnel</span>
                    <button className="text-primary hover:underline flex items-center gap-0.5">
                      Details <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-full flex">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${(campaign.opened / campaign.sent) * 100}%` }}
                      />
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${(campaign.clicked / campaign.sent) * 100}%` }}
                      />
                      <div
                        className="bg-success h-full"
                        style={{ width: `${(campaign.replied / campaign.sent) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
