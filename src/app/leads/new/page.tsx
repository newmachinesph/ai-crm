"use client";

import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { ArrowLeft, Save, ChevronDown } from "lucide-react";

export default function NewLeadPage() {
  return (
    <DashboardLayout
      title="Add New Lead"
      subtitle="Create a new lead in your CRM"
      actions={
        <Link
          href="/leads"
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
      }
    >
      <div className="max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/leads";
          }}
          className="space-y-6"
        >
          {/* Personal Information */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  First name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Sarah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Last name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Chen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="sarah@techcorp.io"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="+1 555-0101"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Company Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="TechCorp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Job title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="VP of Sales"
                />
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Lead Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Status
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                </select>
                <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-secondary pointer-events-none" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Source
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
                  <option value="linkedin">LinkedIn</option>
                  <option value="cold-email">Cold Email</option>
                  <option value="referral">Referral</option>
                  <option value="website">Website</option>
                  <option value="conference">Conference</option>
                  <option value="webinar">Webinar</option>
                </select>
                <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-secondary pointer-events-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Estimated value ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="enterprise, hot"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Notes
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Any additional notes about this lead..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/leads"
              className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
