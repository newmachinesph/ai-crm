"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { meetings } from "@/lib/mock-data";
import {
  Plus,
  Video,
  Phone,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Check,
  X,
} from "lucide-react";

const typeIcons = {
  video: { icon: Video, bg: "bg-blue-100", text: "text-blue-600" },
  phone: { icon: Phone, bg: "bg-green-100", text: "text-green-600" },
  "in-person": { icon: MapPin, bg: "bg-purple-100", text: "text-purple-600" },
};

const statusBadge = {
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

// Build a simple week calendar view
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8AM to 5PM

export default function SchedulingPage() {
  const upcoming = meetings.filter((m) => m.status === "upcoming");
  const completed = meetings.filter((m) => m.status === "completed");

  return (
    <DashboardLayout
      title="Scheduling"
      subtitle="Manage meetings and calendar integrations"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </button>
      }
    >
      {/* Integration banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Google Calendar</h3>
              <p className="text-xs text-secondary">alex@outreachai.io</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Check className="w-3 h-3" /> Connected
          </span>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Calendly</h3>
              <p className="text-xs text-secondary">outreachai.calendly.com/alex</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Check className="w-3 h-3" /> Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">This Week</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted">
                Today
              </button>
              <span className="text-sm text-secondary">Feb 3 – Feb 9, 2026</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header */}
              <div className="grid grid-cols-8 border-b border-border">
                <div className="p-2 text-xs text-secondary" />
                {weekDays.map((day, i) => (
                  <div
                    key={day}
                    className={`p-2 text-center text-xs font-medium ${
                      i === 4 ? "text-primary bg-primary-light/50 rounded-t-lg" : "text-secondary"
                    }`}
                  >
                    {day}
                    <div className={`text-lg font-bold ${i === 4 ? "text-primary" : "text-foreground"}`}>
                      {3 + i}
                    </div>
                  </div>
                ))}
              </div>
              {/* Time slots */}
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-border/50">
                  <div className="p-2 text-xs text-secondary text-right pr-3">
                    {hour > 12 ? hour - 12 : hour}{hour >= 12 ? "PM" : "AM"}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    // Place some meetings
                    const meetingHere =
                      (dayIndex === 4 && hour === 10 && "Product Demo") ||
                      (dayIndex === 4 && hour === 14 && "Proposal Review") ||
                      (dayIndex === 5 && hour === 11 && "Partnership Call") ||
                      null;
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className="p-1 min-h-[40px] border-l border-border/30"
                      >
                        {meetingHere && (
                          <div className="bg-primary text-white text-[10px] font-medium rounded px-1.5 py-1 truncate">
                            {meetingHere}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting list */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3">
              Upcoming ({upcoming.length})
            </h3>
            <div className="space-y-3">
              {upcoming.map((meeting) => {
                const t = typeIcons[meeting.type];
                const Icon = t.icon;
                return (
                  <div
                    key={meeting.id}
                    className="p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${t.bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${t.text}`} />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">{meeting.title}</h4>
                    </div>
                    <p className="text-xs text-secondary mb-1.5">
                      {meeting.with} — {meeting.company}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <Calendar className="w-3 h-3" />
                      {meeting.date}
                      <Clock className="w-3 h-3 ml-1" />
                      {meeting.time} ({meeting.duration})
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 text-xs py-1.5 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
                        Join
                      </button>
                      <button className="flex-1 text-xs py-1.5 border border-border rounded-md font-medium text-foreground hover:bg-muted transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3">
              Completed ({completed.length})
            </h3>
            <div className="space-y-2">
              {completed.map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-3 p-2 rounded-lg">
                  <div className="w-7 h-7 rounded-md bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{meeting.title}</p>
                    <p className="text-xs text-secondary">
                      {meeting.with} — {meeting.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
