"use client";

import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Zap,
  Mail,
  Clock,
  MessageSquare,
  Phone,
  GitBranch,
  Trash2,
  GripVertical,
  ChevronDown,
} from "lucide-react";

type Step = {
  id: string;
  type: "email" | "wait" | "sms" | "call" | "condition";
  label: string;
  config: string;
};

const stepTypes = [
  { type: "email", label: "Send Email", icon: Mail, color: "bg-blue-100 text-blue-600" },
  { type: "wait", label: "Wait / Delay", icon: Clock, color: "bg-yellow-100 text-yellow-600" },
  { type: "sms", label: "Send SMS", icon: MessageSquare, color: "bg-cyan-100 text-cyan-600" },
  { type: "call", label: "Make Call", icon: Phone, color: "bg-green-100 text-green-600" },
  { type: "condition", label: "If/Else Branch", icon: GitBranch, color: "bg-purple-100 text-purple-600" },
];

export default function NewAutomationPage() {
  const [steps, setSteps] = useState<Step[]>([
    { id: "s1", type: "email", label: "Welcome Email", config: "Send cold outreach template" },
    { id: "s2", type: "wait", label: "Wait 3 Days", config: "Wait for 3 days" },
    { id: "s3", type: "condition", label: "Check: Opened Email?", config: "If email was opened" },
    { id: "s4", type: "email", label: "Follow-up Email", config: "Send follow-up template" },
    { id: "s5", type: "wait", label: "Wait 2 Days", config: "Wait for 2 days" },
    { id: "s6", type: "sms", label: "SMS Reminder", config: "Send SMS nudge" },
  ]);

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const addStep = (type: string) => {
    const stepType = stepTypes.find((s) => s.type === type);
    if (!stepType) return;
    setSteps([
      ...steps,
      {
        id: `s${Date.now()}`,
        type: type as Step["type"],
        label: stepType.label,
        config: "",
      },
    ]);
  };

  return (
    <DashboardLayout
      title="New Automation"
      subtitle="Build a multi-step outreach workflow"
      actions={
        <Link
          href="/automations"
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow config */}
        <div className="lg:col-span-2 space-y-4">
          {/* Name + Trigger */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Automation name
                </label>
                <input
                  type="text"
                  defaultValue="New Lead Welcome Sequence"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Trigger
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
                  <option>Lead Created</option>
                  <option>No Reply (3 days)</option>
                  <option>Deal Status Changed</option>
                  <option>No Activity (30 days)</option>
                  <option>Meeting Scheduled</option>
                  <option>Form Submitted</option>
                </select>
                <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-secondary pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Workflow steps */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Workflow Steps</h3>

            {/* Trigger node */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 p-3 rounded-lg border-2 border-primary bg-primary-light">
                <p className="text-sm font-medium text-primary">Trigger: Lead Created</p>
              </div>
            </div>

            {/* Steps */}
            {steps.map((step, index) => {
              const stepType = stepTypes.find((s) => s.type === step.type);
              if (!stepType) return null;
              const Icon = stepType.icon;

              return (
                <div key={step.id}>
                  {/* Connector line */}
                  <div className="flex items-center ml-5 my-1">
                    <div className="w-0.5 h-6 bg-border" />
                  </div>
                  {/* Step */}
                  <div className="flex items-center gap-3 group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stepType.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 cursor-grab" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Step {index + 1}: {step.label}
                            </p>
                            {step.config && (
                              <p className="text-xs text-secondary">{step.config}</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeStep(step.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add step connector */}
            <div className="flex items-center ml-5 my-1">
              <div className="w-0.5 h-6 bg-border" />
            </div>

            {/* Add step button */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <Plus className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {stepTypes.map((st) => (
                  <button
                    key={st.type}
                    onClick={() => addStep(st.type)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <st.icon className="w-3.5 h-3.5" />
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar: Settings */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Run for
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm appearance-none">
                  <option>All leads matching trigger</option>
                  <option>Leads with specific tags</option>
                  <option>Leads from specific source</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Max emails per day
                </label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Stop automation when
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm appearance-none">
                  <option>Lead replies</option>
                  <option>Lead books meeting</option>
                  <option>All steps completed</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" defaultChecked id="bizHours" className="w-4 h-4 rounded border-border text-primary" />
                <label htmlFor="bizHours" className="text-sm text-foreground">
                  Only run during business hours
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Save Draft
            </button>
            <button className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors">
              Activate
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
