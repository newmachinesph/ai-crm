"use client";

import Sidebar from "./sidebar";
import { Bell, Search } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

export default function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-[240px] transition-all duration-300">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                placeholder="Search leads, campaigns, messages..."
                className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-lg text-sm w-80 focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                {currentUser.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">{currentUser.name}</div>
                <div className="text-secondary text-xs">{currentUser.plan} Plan</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page header */}
        <div className="px-8 pt-6 pb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-secondary text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>

        {/* Page content */}
        <div className="px-8 pb-8">{children}</div>
      </main>
    </div>
  );
}
