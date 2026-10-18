"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  Mail,
  MessageSquare,
  Workflow,
  Calendar,
  GitBranch,
  CreditCard,
  Shield,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-writer", label: "AI Writer", icon: Sparkles },
  { href: "/leads", label: "Leads / CRM", icon: Users },
  { href: "/email", label: "Email Outreach", icon: Mail },
  { href: "/sms-voice", label: "SMS & Voice", icon: MessageSquare },
  { href: "/automations", label: "Automations", icon: Workflow },
  { href: "/scheduling", label: "Scheduling", icon: Calendar },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/admin", label: "Admin", icon: Shield },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar text-sidebar-text flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-semibold text-lg tracking-tight">
            OutreachAI
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-active text-white"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2.5 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-text hover:bg-sidebar-hover hover:text-white w-full transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
