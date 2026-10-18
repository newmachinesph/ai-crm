"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { plans, invoices, currentUser } from "@/lib/mock-data";
import {
  Check,
  CreditCard,
  Download,
  Star,
} from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout
      title="Billing"
      subtitle="Manage your subscription and payment methods"
    >
      {/* Current plan */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-lg">Current Plan: {currentUser.plan}</h3>
            <p className="text-sm text-secondary mt-1">
              Your next billing date is <strong>March 1, 2026</strong>. You will be charged <strong>$79.00</strong>.
            </p>
          </div>
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-card rounded-xl border-2 p-6 relative transition-shadow hover:shadow-md ${
              plan.recommended ? "border-primary" : "border-border"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  <Star className="w-3 h-3" /> Recommended
                </span>
              </div>
            )}
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-secondary text-sm">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                plan.name === currentUser.plan
                  ? "bg-muted text-secondary cursor-default"
                  : plan.recommended
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              {plan.name === currentUser.plan ? "Current Plan" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-xs text-secondary">Expires 12/2027</p>
            </div>
          </div>
          <button className="mt-3 text-sm text-primary font-medium hover:underline">
            Update payment method
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Usage This Month</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Leads</span>
                <span className="text-foreground font-medium">1,247 / 5,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "24.9%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Emails</span>
                <span className="text-foreground font-medium">4,890 / 10,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "48.9%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">SMS</span>
                <span className="text-foreground font-medium">320 / 1,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "32%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice history */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Invoice History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Plan</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-secondary uppercase">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-secondary uppercase">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3 text-sm text-foreground">{inv.date}</td>
                <td className="px-5 py-3 text-sm text-foreground">{inv.plan}</td>
                <td className="px-5 py-3 text-sm font-medium text-foreground">${inv.amount}.00</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 capitalize">
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
