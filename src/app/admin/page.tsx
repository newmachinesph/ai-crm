"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { adminUsers } from "@/lib/mock-data";
import {
  Plus,
  Shield,
  Users,
  Activity,
  Settings,
  MoreHorizontal,
  Mail,
  Clock,
  Trash2,
} from "lucide-react";

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  manager: "bg-purple-100 text-purple-700",
  member: "bg-blue-100 text-blue-700",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  invited: "bg-yellow-100 text-yellow-700",
  disabled: "bg-gray-100 text-gray-700",
};

export default function AdminPage() {
  return (
    <DashboardLayout
      title="Admin Panel"
      subtitle="Manage team members, roles, and platform settings"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      }
    >
      {/* Admin quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{adminUsers.length}</p>
            <p className="text-xs text-secondary">Team Members</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {adminUsers.filter((u) => u.status === "active").length}
            </p>
            <p className="text-xs text-secondary">Active</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {adminUsers.filter((u) => u.role === "admin").length}
            </p>
            <p className="text-xs text-secondary">Admins</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
            <Mail className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {adminUsers.filter((u) => u.status === "invited").length}
            </p>
            <p className="text-xs text-secondary">Pending Invites</p>
          </div>
        </div>
      </div>

      {/* Team members table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Team Members</h3>
          <button className="text-xs text-primary font-medium hover:underline">
            Export CSV
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">User</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Role</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Last Login</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-medium">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-sm text-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    {user.lastLogin}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    {user.role !== "admin" && (
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-secondary hover:text-danger transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Platform settings cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">API Keys</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">OpenAI API Key</p>
                <p className="text-xs text-secondary font-mono">sk-••••••••••••••••3f7a</p>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">SendGrid API Key</p>
                <p className="text-xs text-secondary font-mono">SG.••••••••••••••••b29c</p>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Twilio SID</p>
                <p className="text-xs text-secondary font-mono">AC••••••••••••••••7f3d</p>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Stripe Secret Key</p>
                <p className="text-xs text-secondary font-mono">sk_live_••••••••••4d2e</p>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
            </div>
          </div>
          <button className="mt-3 text-sm text-primary font-medium hover:underline">
            Manage API keys
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">Platform Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
                <p className="text-xs text-secondary">Require 2FA for all team members</p>
              </div>
              <button className="w-10 h-6 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-secondary">Send team activity digest</p>
              </div>
              <button className="w-10 h-6 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-archive Leads</p>
                <p className="text-xs text-secondary">Archive lost leads after 90 days</p>
              </div>
              <button className="w-10 h-6 bg-muted rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Audit Logging</p>
                <p className="text-xs text-secondary">Log all user actions</p>
              </div>
              <button className="w-10 h-6 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
