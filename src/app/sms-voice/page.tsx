"use client";

import DashboardLayout from "@/components/dashboard-layout";
import StatCard from "@/components/stat-card";
import { smsCampaigns } from "@/lib/mock-data";
import {
  Plus,
  MessageSquare,
  Phone,
  Send,
  CheckCircle2,
  Reply,
  Play,
  Pause,
  MoreHorizontal,
} from "lucide-react";

const typeIcons = {
  sms: MessageSquare,
  voice: Phone,
};

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
};

export default function SmsVoicePage() {
  const totalSent = smsCampaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalDelivered = smsCampaigns.reduce((sum, c) => sum + c.delivered, 0);
  const totalResponded = smsCampaigns.reduce((sum, c) => sum + c.responded, 0);

  return (
    <DashboardLayout
      title="SMS & Voice"
      subtitle="Manage SMS and voice outreach campaigns via Twilio"
      actions={
        <>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Phone className="w-4 h-4" />
            New Voice Campaign
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New SMS Campaign
          </button>
        </>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Sent" value={totalSent} icon={Send} />
        <StatCard label="Delivered" value={totalDelivered} icon={CheckCircle2} change={97.3} />
        <StatCard label="Responded" value={totalResponded} icon={Reply} change={27.1} />
      </div>

      {/* Integration status */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Twilio Integration</h3>
              <p className="text-xs text-secondary">Connected — Account SID: AC••••••7f3d</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Connected
            </span>
            <button className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {smsCampaigns.map((campaign) => {
          const Icon = typeIcons[campaign.type];
          const style = statusStyles[campaign.status];
          const deliveryRate = campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : "0";
          const responseRate = campaign.sent > 0 ? ((campaign.responded / campaign.sent) * 100).toFixed(1) : "0";

          return (
            <div
              key={campaign.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.type === "sms" ? "bg-cyan-50 text-cyan-600" : "bg-green-50 text-green-600"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-secondary uppercase">
                        {campaign.type}
                      </span>
                    </div>
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
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary transition-colors">
                      <Pause className="w-4 h-4" />
                    </button>
                  )}
                  {campaign.status === "draft" && (
                    <button className="p-1.5 rounded-lg hover:bg-muted text-success transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-secondary">Sent</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{deliveryRate}%</p>
                  <p className="text-xs text-secondary">Delivery Rate</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-foreground">{responseRate}%</p>
                  <p className="text-xs text-secondary">Response Rate</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
