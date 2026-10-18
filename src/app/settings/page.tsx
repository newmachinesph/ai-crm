"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { currentUser } from "@/lib/mock-data";
import { Save, Upload, Globe, Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account and preferences"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-secondary" />
            Profile
          </h3>
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center text-white text-2xl font-bold">
              AM
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">{currentUser.name}</p>
              <p className="text-xs text-secondary mb-3">{currentUser.email}</p>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full name
              </label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company
              </label>
              <input
                type="text"
                defaultValue="OutreachAI"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Timezone
              </label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>US/Eastern (UTC-5)</option>
                <option>US/Central (UTC-6)</option>
                <option>US/Mountain (UTC-7)</option>
                <option>US/Pacific (UTC-8)</option>
                <option>Europe/London (UTC+0)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-secondary" />
            Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: "Email replies", desc: "Get notified when a lead replies to your email", checked: true },
              { label: "New leads", desc: "Get notified when a new lead is captured", checked: true },
              { label: "Meeting reminders", desc: "15 minutes before scheduled meetings", checked: true },
              { label: "Campaign reports", desc: "Daily digest of campaign performance", checked: false },
              { label: "Automation alerts", desc: "Get notified when an automation fails", checked: true },
              { label: "Weekly summary", desc: "Weekly performance overview email", checked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-secondary">{item.desc}</p>
                </div>
                <button
                  className={`w-10 h-6 rounded-full relative transition-colors ${
                    item.checked ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                      item.checked ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-secondary" />
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Current password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Confirm new password
                </label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-secondary">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4 text-secondary" />
            Appearance
          </h3>
          <div className="flex gap-3">
            {[
              { label: "Light", active: true },
              { label: "Dark", active: false },
              { label: "System", active: false },
            ].map((theme) => (
              <button
                key={theme.label}
                className={`flex-1 py-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                  theme.active
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border text-secondary hover:bg-muted"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
