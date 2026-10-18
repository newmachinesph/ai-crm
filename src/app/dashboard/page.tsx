"use client";

import DashboardLayout from "@/components/dashboard-layout";
import StatCard from "@/components/stat-card";
import {
  Users,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Send,
  Phone,
  Clock,
} from "lucide-react";
import {
  dashboardStats,
  revenueChart,
  leadsChart,
  outreachChart,
  recentActivities,
  meetings,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityIcons: Record<string, string> = {
  email: "bg-blue-100 text-blue-600",
  call: "bg-green-100 text-green-600",
  meeting: "bg-purple-100 text-purple-600",
  note: "bg-yellow-100 text-yellow-600",
  deal: "bg-indigo-100 text-indigo-600",
  lead: "bg-cyan-100 text-cyan-600",
};

export default function DashboardPage() {
  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming").slice(0, 3);

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, Alex. Here's your outreach overview."
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Leads"
          value={dashboardStats.totalLeads}
          change={dashboardStats.leadsGrowth}
          icon={Users}
        />
        <StatCard
          label="Emails Sent"
          value={dashboardStats.emailsSent}
          change={dashboardStats.openRate}
          icon={Mail}
        />
        <StatCard
          label="Meetings Booked"
          value={dashboardStats.meetingsBooked}
          change={dashboardStats.meetingsGrowth}
          icon={Calendar}
        />
        <StatCard
          label="Revenue"
          value={dashboardStats.revenue}
          change={dashboardStats.revenueGrowth}
          icon={DollarSign}
          prefix="$"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Revenue</h3>
              <p className="text-sm text-secondary">Last 6 months</p>
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +18.2%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueChart}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${v / 1000}k`} />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads Chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">New Leads</h3>
              <p className="text-sm text-secondary">Last 6 months</p>
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outreach Activity + Activity Feed + Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Outreach Activity */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Outreach This Week</h3>
          <p className="text-sm text-secondary mb-4">Breakdown by channel</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={outreachChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="emails" fill="#6366f1" radius={[2, 2, 0, 0]} name="Emails" />
              <Bar dataKey="sms" fill="#06b6d4" radius={[2, 2, 0, 0]} name="SMS" />
              <Bar dataKey="calls" fill="#10b981" radius={[2, 2, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Send className="w-3 h-3 text-primary" />
              <span className="text-xs text-secondary">Emails</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-accent" />
              <span className="text-xs text-secondary">SMS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-success" />
              <span className="text-xs text-secondary">Calls</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Recent Activity</h3>
          <p className="text-sm text-secondary mb-4">Latest actions across the platform</p>
          <div className="space-y-3 max-h-[260px] overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 animate-slide-in">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activityIcons[activity.type]
                  }`}
                >
                  {activity.type === "email" && <Mail className="w-3.5 h-3.5" />}
                  {activity.type === "call" && <Phone className="w-3.5 h-3.5" />}
                  {activity.type === "meeting" && <Calendar className="w-3.5 h-3.5" />}
                  {activity.type === "note" && <Clock className="w-3.5 h-3.5" />}
                  {activity.type === "deal" && <DollarSign className="w-3.5 h-3.5" />}
                  {activity.type === "lead" && <Users className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-secondary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Upcoming Meetings</h3>
          <p className="text-sm text-secondary mb-4">Your schedule for today & next</p>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{meeting.title}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium">
                    {meeting.type}
                  </span>
                </div>
                <p className="text-xs text-secondary">
                  {meeting.with} — {meeting.company}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {meeting.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {meeting.time} ({meeting.duration})
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-sm text-primary font-medium hover:underline">
            View all meetings →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
