// ============================================================
// Mock data for the OutreachAI MVP frontend
// ============================================================

export const currentUser = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex@outreachai.io",
  avatar: null,
  role: "admin" as const,
  plan: "Pro",
};

// ---------- Leads / CRM ----------
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  source: string;
  value: number;
  lastContact: string;
  tags: string[];
};

export const leads: Lead[] = [
  { id: "l1", name: "Sarah Chen", email: "sarah@techcorp.io", phone: "+1 555-0101", company: "TechCorp", title: "VP of Sales", status: "qualified", source: "LinkedIn", value: 12000, lastContact: "2026-02-05", tags: ["enterprise", "hot"] },
  { id: "l2", name: "James Miller", email: "james@growthco.com", phone: "+1 555-0102", company: "GrowthCo", title: "CEO", status: "proposal", source: "Referral", value: 8500, lastContact: "2026-02-04", tags: ["startup", "hot"] },
  { id: "l3", name: "Maria Garcia", email: "maria@innovate.io", phone: "+1 555-0103", company: "Innovate Inc", title: "Marketing Director", status: "contacted", source: "Cold Email", value: 5000, lastContact: "2026-02-03", tags: ["mid-market"] },
  { id: "l4", name: "David Kim", email: "david@scalable.dev", phone: "+1 555-0104", company: "Scalable Dev", title: "CTO", status: "new", source: "Website", value: 15000, lastContact: "2026-02-06", tags: ["enterprise", "technical"] },
  { id: "l5", name: "Emma Wilson", email: "emma@brandly.com", phone: "+1 555-0105", company: "Brandly", title: "Head of Growth", status: "won", source: "LinkedIn", value: 9200, lastContact: "2026-01-28", tags: ["agency"] },
  { id: "l6", name: "Ryan Patel", email: "ryan@nexus.ai", phone: "+1 555-0106", company: "Nexus AI", title: "Founder", status: "contacted", source: "Cold Email", value: 20000, lastContact: "2026-02-02", tags: ["enterprise", "ai"] },
  { id: "l7", name: "Lisa Thompson", email: "lisa@cloudbase.io", phone: "+1 555-0107", company: "CloudBase", title: "Sales Manager", status: "new", source: "Webinar", value: 3500, lastContact: "2026-02-06", tags: ["smb"] },
  { id: "l8", name: "Michael Brown", email: "michael@finsmart.com", phone: "+1 555-0108", company: "FinSmart", title: "Director of Ops", status: "lost", source: "Referral", value: 7000, lastContact: "2026-01-20", tags: ["finance"] },
  { id: "l9", name: "Anna Lee", email: "anna@retailpro.com", phone: "+1 555-0109", company: "RetailPro", title: "CMO", status: "qualified", source: "Conference", value: 11000, lastContact: "2026-02-01", tags: ["retail", "hot"] },
  { id: "l10", name: "Chris Johnson", email: "chris@devstack.io", phone: "+1 555-0110", company: "DevStack", title: "Engineering Lead", status: "proposal", source: "LinkedIn", value: 6500, lastContact: "2026-02-05", tags: ["technical"] },
];

// ---------- Pipeline Stages ----------
export const pipelineStages = [
  { id: "new", label: "New Leads", color: "#6366f1", leads: leads.filter(l => l.status === "new") },
  { id: "contacted", label: "Contacted", color: "#06b6d4", leads: leads.filter(l => l.status === "contacted") },
  { id: "qualified", label: "Qualified", color: "#f59e0b", leads: leads.filter(l => l.status === "qualified") },
  { id: "proposal", label: "Proposal", color: "#8b5cf6", leads: leads.filter(l => l.status === "proposal") },
  { id: "won", label: "Won", color: "#10b981", leads: leads.filter(l => l.status === "won") },
  { id: "lost", label: "Lost", color: "#ef4444", leads: leads.filter(l => l.status === "lost") },
];

// ---------- Email Campaigns ----------
export type EmailCampaign = {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  createdAt: string;
};

export const emailCampaigns: EmailCampaign[] = [
  { id: "ec1", name: "Q1 Enterprise Outreach", status: "active", sent: 1240, opened: 456, clicked: 89, replied: 34, createdAt: "2026-01-15" },
  { id: "ec2", name: "Product Launch - AI Suite", status: "active", sent: 890, opened: 312, clicked: 67, replied: 21, createdAt: "2026-01-22" },
  { id: "ec3", name: "Re-engagement Series", status: "paused", sent: 560, opened: 178, clicked: 32, replied: 11, createdAt: "2026-01-10" },
  { id: "ec4", name: "Partner Network Intro", status: "draft", sent: 0, opened: 0, clicked: 0, replied: 0, createdAt: "2026-02-03" },
  { id: "ec5", name: "Holiday Follow-up", status: "completed", sent: 2100, opened: 840, clicked: 210, replied: 67, createdAt: "2025-12-20" },
];

// ---------- SMS / Voice Campaigns ----------
export type SmsCampaign = {
  id: string;
  name: string;
  type: "sms" | "voice";
  status: "draft" | "active" | "completed";
  sent: number;
  delivered: number;
  responded: number;
  createdAt: string;
};

export const smsCampaigns: SmsCampaign[] = [
  { id: "sc1", name: "Appointment Reminder", type: "sms", status: "active", sent: 320, delivered: 315, responded: 89, createdAt: "2026-02-01" },
  { id: "sc2", name: "Follow-up Calls", type: "voice", status: "active", sent: 150, delivered: 142, responded: 45, createdAt: "2026-01-28" },
  { id: "sc3", name: "Promo Alert", type: "sms", status: "completed", sent: 890, delivered: 875, responded: 234, createdAt: "2026-01-15" },
  { id: "sc4", name: "Feedback Survey", type: "voice", status: "draft", sent: 0, delivered: 0, responded: 0, createdAt: "2026-02-05" },
];

// ---------- Automations ----------
export type Automation = {
  id: string;
  name: string;
  trigger: string;
  steps: number;
  status: "active" | "paused" | "draft";
  lastRun: string | null;
  runsTotal: number;
};

export const automations: Automation[] = [
  { id: "a1", name: "New Lead Welcome Sequence", trigger: "Lead Created", steps: 5, status: "active", lastRun: "2026-02-06 14:30", runsTotal: 342 },
  { id: "a2", name: "Follow-up After No Reply", trigger: "No Reply (3 days)", steps: 3, status: "active", lastRun: "2026-02-06 09:15", runsTotal: 189 },
  { id: "a3", name: "Deal Won Onboarding", trigger: "Deal Status → Won", steps: 7, status: "active", lastRun: "2026-02-05 16:45", runsTotal: 56 },
  { id: "a4", name: "Cold Lead Re-engagement", trigger: "No Activity (30 days)", steps: 4, status: "paused", lastRun: "2026-01-20 11:00", runsTotal: 78 },
  { id: "a5", name: "Meeting Booked Confirmation", trigger: "Meeting Scheduled", steps: 2, status: "active", lastRun: "2026-02-06 10:00", runsTotal: 421 },
];

// ---------- Meetings ----------
export type Meeting = {
  id: string;
  title: string;
  with: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "phone" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
};

export const meetings: Meeting[] = [
  { id: "m1", title: "Product Demo", with: "Sarah Chen", company: "TechCorp", date: "2026-02-07", time: "10:00 AM", duration: "30 min", type: "video", status: "upcoming" },
  { id: "m2", title: "Proposal Review", with: "James Miller", company: "GrowthCo", date: "2026-02-07", time: "2:00 PM", duration: "45 min", type: "video", status: "upcoming" },
  { id: "m3", title: "Partnership Call", with: "Ryan Patel", company: "Nexus AI", date: "2026-02-08", time: "11:00 AM", duration: "30 min", type: "phone", status: "upcoming" },
  { id: "m4", title: "Onboarding Session", with: "Emma Wilson", company: "Brandly", date: "2026-02-06", time: "3:00 PM", duration: "60 min", type: "video", status: "completed" },
  { id: "m5", title: "Strategy Sync", with: "Anna Lee", company: "RetailPro", date: "2026-02-10", time: "9:00 AM", duration: "30 min", type: "video", status: "upcoming" },
  { id: "m6", title: "Intro Call", with: "David Kim", company: "Scalable Dev", date: "2026-02-05", time: "1:00 PM", duration: "30 min", type: "phone", status: "completed" },
];

// ---------- Dashboard Stats ----------
export const dashboardStats = {
  totalLeads: 1247,
  leadsThisWeek: 38,
  leadsGrowth: 12.5,
  emailsSent: 4890,
  emailsThisWeek: 320,
  openRate: 36.8,
  meetingsBooked: 156,
  meetingsThisWeek: 12,
  meetingsGrowth: 8.3,
  revenue: 142500,
  revenueGrowth: 18.2,
  conversionRate: 24.6,
};

export const revenueChart = [
  { month: "Sep", revenue: 8200 },
  { month: "Oct", revenue: 11400 },
  { month: "Nov", revenue: 9800 },
  { month: "Dec", revenue: 14200 },
  { month: "Jan", revenue: 16800 },
  { month: "Feb", revenue: 19500 },
];

export const leadsChart = [
  { month: "Sep", leads: 89 },
  { month: "Oct", leads: 124 },
  { month: "Nov", leads: 108 },
  { month: "Dec", leads: 156 },
  { month: "Jan", leads: 198 },
  { month: "Feb", leads: 247 },
];

export const outreachChart = [
  { day: "Mon", emails: 86, sms: 24, calls: 12 },
  { day: "Tue", emails: 94, sms: 31, calls: 18 },
  { day: "Wed", emails: 72, sms: 19, calls: 9 },
  { day: "Thu", emails: 108, sms: 42, calls: 22 },
  { day: "Fri", emails: 91, sms: 28, calls: 15 },
  { day: "Sat", emails: 34, sms: 8, calls: 3 },
  { day: "Sun", emails: 12, sms: 4, calls: 1 },
];

// ---------- Activities ----------
export type Activity = {
  id: string;
  type: "email" | "call" | "meeting" | "note" | "deal" | "lead";
  description: string;
  time: string;
};

export const recentActivities: Activity[] = [
  { id: "act1", type: "email", description: "Email sent to Sarah Chen — Product Demo Follow-up", time: "5 min ago" },
  { id: "act2", type: "lead", description: "New lead captured — David Kim from Scalable Dev", time: "22 min ago" },
  { id: "act3", type: "meeting", description: "Meeting completed with Emma Wilson — Onboarding", time: "1 hr ago" },
  { id: "act4", type: "deal", description: "Deal moved to Proposal — Chris Johnson ($6,500)", time: "2 hrs ago" },
  { id: "act5", type: "call", description: "Outbound call to Ryan Patel — Nexus AI", time: "3 hrs ago" },
  { id: "act6", type: "note", description: "Note added to Maria Garcia — Interested in Enterprise plan", time: "4 hrs ago" },
  { id: "act7", type: "email", description: "Auto follow-up sent to 12 leads — Q1 Outreach", time: "5 hrs ago" },
  { id: "act8", type: "lead", description: "3 leads imported from LinkedIn CSV", time: "6 hrs ago" },
];

// ---------- Billing / Plans ----------
export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    period: "month",
    features: ["500 leads", "1,000 emails/mo", "100 SMS/mo", "Basic AI writer", "1 user"],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    period: "month",
    features: ["5,000 leads", "10,000 emails/mo", "1,000 SMS/mo", "Advanced AI writer", "5 users", "Automations", "Calendar sync"],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "month",
    features: ["Unlimited leads", "50,000 emails/mo", "5,000 SMS/mo", "Custom AI models", "Unlimited users", "Advanced automations", "API access", "Priority support"],
    recommended: false,
  },
];

export const invoices = [
  { id: "inv1", date: "2026-02-01", amount: 79, status: "paid", plan: "Pro" },
  { id: "inv2", date: "2026-01-01", amount: 79, status: "paid", plan: "Pro" },
  { id: "inv3", date: "2025-12-01", amount: 79, status: "paid", plan: "Pro" },
  { id: "inv4", date: "2025-11-01", amount: 29, status: "paid", plan: "Starter" },
];

// ---------- Admin ----------
export const adminUsers = [
  { id: "u1", name: "Alex Morgan", email: "alex@outreachai.io", role: "admin", status: "active", lastLogin: "2026-02-07 09:14" },
  { id: "u2", name: "Jordan Lee", email: "jordan@outreachai.io", role: "manager", status: "active", lastLogin: "2026-02-06 17:45" },
  { id: "u3", name: "Sam Rivera", email: "sam@outreachai.io", role: "member", status: "active", lastLogin: "2026-02-07 08:30" },
  { id: "u4", name: "Taylor Brooks", email: "taylor@outreachai.io", role: "member", status: "invited", lastLogin: "—" },
];

// ---------- AI Writer Templates ----------
export const aiTemplates = [
  { id: "t1", name: "Cold Outreach Email", description: "First-touch email to a new prospect", category: "email" },
  { id: "t2", name: "Follow-up Email", description: "Follow up after no reply", category: "email" },
  { id: "t3", name: "Meeting Request", description: "Ask for a call or demo", category: "email" },
  { id: "t4", name: "LinkedIn Connection", description: "Personalized connection message", category: "social" },
  { id: "t5", name: "SMS Follow-up", description: "Quick text after a call or email", category: "sms" },
  { id: "t6", name: "Proposal Summary", description: "Summarize a proposal or offer", category: "email" },
  { id: "t7", name: "Re-engagement", description: "Reconnect with dormant leads", category: "email" },
  { id: "t8", name: "Thank You Note", description: "Post-meeting thank you", category: "email" },
];
