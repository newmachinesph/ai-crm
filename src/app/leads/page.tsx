"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { leads } from "@/lib/mock-data";
import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  ChevronDown,
} from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-cyan-100 text-cyan-700",
  qualified: "bg-yellow-100 text-yellow-700",
  proposal: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      title="Leads / CRM"
      subtitle={`${leads.length} total leads in your pipeline`}
      actions={
        <>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href="/leads/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </Link>
        </>
      }
    >
      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search leads by name, company, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Lead
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Company
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Source
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Value
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Last Contact
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Tags
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-medium">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{lead.name}</p>
                        <p className="text-xs text-secondary">{lead.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-secondary" />
                      <span className="text-sm text-foreground">{lead.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{lead.source}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                    ${lead.value.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary">{lead.lastContact}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {lead.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-muted rounded text-xs text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-secondary text-sm">
            No leads match your search criteria.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
