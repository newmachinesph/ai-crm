"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { aiTemplates } from "@/lib/mock-data";
import { useState } from "react";
import {
  Sparkles,
  Copy,
  RefreshCw,
  Send,
  Wand2,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
} from "lucide-react";

const toneOptions = ["Professional", "Casual", "Friendly", "Urgent", "Persuasive"];

const sampleOutput = `Hi Sarah,

I came across TechCorp's recent expansion into AI-driven analytics and was genuinely impressed by the direction your team is taking.

At OutreachAI, we've helped companies like yours increase their outbound conversion rates by 3x through AI-powered personalization — without adding headcount to your sales team.

I'd love to share a quick 15-minute demo showing exactly how this could work for TechCorp. Would Tuesday or Wednesday this week work for a brief call?

Looking forward to connecting,
Alex Morgan
OutreachAI`;

export default function AIWriterPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(aiTemplates[0]);
  const [tone, setTone] = useState("Professional");
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setOutput("");
    setGenerated(false);

    // Simulate AI generation with typing effect
    let i = 0;
    const interval = setInterval(() => {
      setOutput(sampleOutput.slice(0, i));
      i += 3;
      if (i > sampleOutput.length) {
        clearInterval(interval);
        setOutput(sampleOutput);
        setGenerating(false);
        setGenerated(true);
      }
    }, 10);
  };

  return (
    <DashboardLayout
      title="AI Writer"
      subtitle="Generate personalized outreach messages with AI"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Template selector */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3">Templates</h3>
            <div className="space-y-1.5">
              {aiTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTemplate.id === template.id
                      ? "bg-primary-light border border-primary/20"
                      : "hover:bg-muted border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedTemplate.id === template.id ? "bg-primary text-white" : "bg-muted text-secondary"
                    }`}>
                      {template.category === "email" ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{template.name}</p>
                      <p className="text-xs text-secondary">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Input form */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">
              Configure: {selectedTemplate.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Recipient name
                </label>
                <input
                  type="text"
                  defaultValue="Sarah Chen"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  defaultValue="TechCorp"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Key context / talking points
                </label>
                <textarea
                  rows={3}
                  defaultValue="Recent expansion into AI analytics. Interested in scaling outbound without adding headcount."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your value prop
                </label>
                <textarea
                  rows={2}
                  defaultValue="AI-powered outreach platform that increases conversion rates by 3x"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Tone
                </label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    {toneOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Output
              </h3>
              {generated && (
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-secondary hover:text-foreground transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {!output && !generating ? (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-secondary">
                    Configure your message and click <strong>Generate</strong> to
                    see AI-crafted copy here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <div className="bg-muted rounded-lg p-4 text-sm text-foreground whitespace-pre-line leading-relaxed min-h-[300px]">
                  {output}
                  {generating && (
                    <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse-dot" />
                  )}
                </div>
              </div>
            )}

            {generated && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleGenerate}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                  <Send className="w-3.5 h-3.5" />
                  Use in Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
