"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCheck,
  Flame,
  ReceiptText,
  Terminal,
  Timer,
  Zap,
} from "lucide-react";
import { NodeTelemetryVisual } from "@/components/NodeTelemetryVisual";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { CAPABILITY_MATRIX, RECENT_EVENTS } from "@/lib/lab-data";

const ACCENT_STYLES = {
  volt: {
    text: "text-primary-fixed",
    bar: "bg-primary-fixed shadow-[0_0_6px_#c3f400]",
  },
  green: {
    text: "text-tertiary-fixed-dim",
    bar: "bg-tertiary-fixed-dim shadow-[0_0_6px_#00e55b]",
  },
  cyan: {
    text: "text-secondary-container",
    bar: "bg-secondary-container shadow-[0_0_6px_#00eefc]",
  },
  "cyan-soft": {
    text: "text-secondary-fixed",
    bar: "bg-secondary-fixed",
  },
  crimson: {
    text: "text-error",
    bar: "bg-error",
  },
} as const;

export function DashboardClient() {
  const [missionAccepted, setMissionAccepted] = useState(false);

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Top Operational Banner / Agent Welcome */}
      <section className="relative bg-surface-container-low border border-white/[0.07] p-4 md:p-5 rounded-lg overflow-hidden shadow-lg">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#c3f400]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-fixed font-semibold">
              SYS_DECK // K09-OPR
            </span>
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant tracking-wider">
            LAT: 35.68 // UTC+0
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <h1 className="font-[family-name:var(--font-display)] text-[28px] md:text-4xl leading-tight text-primary tracking-tight font-bold uppercase">
            WELCOME BACK, AGENT_K09
          </h1>
          <p className="font-mono text-xs text-secondary-container tracking-wider uppercase font-medium">
            LEVEL 07 // SENIOR ANALYST
          </p>
        </div>

        <div className="mt-3 bg-surface-container p-2.5 rounded-lg flex flex-col gap-1.5 border border-white/[0.05]">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-on-surface tracking-wider">
              XP TO LEVEL 08
            </span>
            <span className="text-primary-fixed font-bold tracking-wider">
              74% // 3,700 / 5,000 XP
            </span>
          </div>
          <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden flex gap-0.5 p-0.5">
            <div
              className="h-full bg-primary-fixed shadow-[0_0_10px_#c3f400] rounded-l"
              style={{ width: "74%" }}
            />
            <div className="h-full bg-surface-variant flex-1 rounded-r opacity-50" />
          </div>
        </div>
      </section>

      {/* Tactical Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-surface-container border border-white/[0.07] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-surface-container-high rounded-bl-lg flex items-center justify-center text-primary-fixed">
            <Zap className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {"// XP EARNED"}
          </span>
          <div className="mt-2">
            <div className="font-[family-name:var(--font-display)] text-xl text-primary font-bold tracking-tight">
              14,850
            </div>
            <span className="font-mono text-[10px] text-tertiary-fixed-dim font-bold tracking-wider">
              +350 TODAY
            </span>
          </div>
        </div>

        <div className="bg-surface-container border border-white/[0.07] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-surface-container-high rounded-bl-lg flex items-center justify-center text-secondary-container">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {"// LABS CLEARED"}
          </span>
          <div className="mt-2">
            <div className="font-[family-name:var(--font-display)] text-xl text-primary font-bold tracking-tight">
              18{" "}
              <span className="text-on-surface-variant text-sm font-normal">
                / 25
              </span>
            </div>
            <span className="font-mono text-[10px] text-secondary-container tracking-wider">
              72% COMPLETE
            </span>
          </div>
        </div>

        <div className="bg-surface-container border border-white/[0.07] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-surface-container-high rounded-bl-lg flex items-center justify-center text-tertiary-fixed-dim">
            <CheckCheck className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {"// ACCURACY RATE"}
          </span>
          <div className="mt-2">
            <div className="font-[family-name:var(--font-display)] text-xl text-primary font-bold tracking-tight">
              94.2%
            </div>
            <span className="font-mono text-[10px] text-tertiary-fixed-dim tracking-wider">
              HIGH PRECISION
            </span>
          </div>
        </div>

        <div className="bg-surface-container border border-white/[0.07] p-3 rounded-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-surface-container-high rounded-bl-lg flex items-center justify-center text-primary-fixed">
            <Flame className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {"// STREAK"}
          </span>
          <div className="mt-2">
            <div className="font-[family-name:var(--font-display)] text-xl text-primary font-bold tracking-tight">
              12 DAYS
            </div>
            <span className="font-mono text-[10px] text-primary-fixed tracking-wider">
              FIREWALL ACTIVE
            </span>
          </div>
        </div>
      </section>

      {/* Live Target & Daily Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-surface-container-high border border-white/[0.08] p-4 rounded-lg shadow-md flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-error-container text-error font-mono text-[10px] tracking-widest font-bold animate-pulse">
                [● LIVE TARGET]
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant">
                LAB_REF: NX-409
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-primary-fixed tracking-wider font-semibold">
                IN PROGRESS: SQL INJECTION DEFENSE (LAB_04)
              </span>
              <p className="text-xs text-on-surface">
                Module: Bypassing WAF &amp; Prepared Statements Sanitization
              </p>
            </div>
            <div className="flex flex-col gap-1.5 bg-surface-container-lowest p-2.5 rounded border border-white/[0.05]">
              <div className="flex justify-between items-center font-mono text-[10px]">
                <span className="text-on-surface-variant">
                  SIMULATION COMPLETION
                </span>
                <span className="text-primary-fixed font-bold">65%</span>
              </div>
              <SegmentedProgress totalSegments={5} filledSegments={3} />
            </div>
          </div>

          <Link
            href="/labs/sql-injection"
            className="w-full py-3 px-4 rounded bg-primary-container text-on-primary-fixed font-[family-name:var(--font-display)] text-base uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_16px_rgba(195,244,0,0.3)] active:scale-[0.98] transition-all"
          >
            <span>RESUME SIMULATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section className="bg-surface-container border border-white/[0.07] p-4 rounded-lg flex flex-col justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-secondary-container" />
                <span className="font-mono text-[10px] text-secondary-container tracking-widest font-bold">
                  DAILY PROTOCOL
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-bold tracking-widest">
                EXPIRES: 04:22:15
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-[family-name:var(--font-display)] text-base text-primary font-semibold">
                Intercept &amp; Sanitize Vulnerable Query String
              </h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Neutralize active parameter tampering in simulated e-commerce
                telemetry API endpoint.
              </p>
            </div>

            <div className="flex items-center justify-between bg-surface-container-lowest p-2.5 rounded border border-white/[0.05]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary-fixed" />
                <span className="font-mono text-[10px] text-on-surface tracking-wider">
                  REWARD: +150 XP
                </span>
              </div>
              <span className="font-mono text-[10px] text-secondary-fixed tracking-wider uppercase">
                BADGE: BUG BOUNTY
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMissionAccepted((prev) => !prev)}
              className={`flex-1 py-2.5 px-3 rounded active:scale-[0.98] transition-all font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 ${
                missionAccepted
                  ? "bg-primary-container text-on-primary-fixed shadow-[0_0_12px_rgba(195,244,0,0.25)]"
                  : "bg-surface-container-highest text-primary-fixed hover:bg-surface-bright"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>
                {missionAccepted
                  ? "[MISSION ENGAGED - ACTIVE]"
                  : "[ACCEPT MISSION]"}
              </span>
            </button>
            {missionAccepted && (
              <Link
                href="/labs/sql-injection"
                className="px-3 py-2.5 rounded bg-surface-container-highest border border-primary-fixed/40 text-primary-fixed font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1 hover:bg-primary-container hover:text-on-primary-fixed transition-colors"
              >
                <span>OPEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Capability Matrix & Node Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-surface-container border border-white/[0.07] p-4 rounded-lg flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
              {"// COMBAT CAPABILITY MATRIX"}
            </span>
            <span className="font-mono text-[10px] text-primary-fixed font-semibold">
              DIAGNOSTIC 07
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            {CAPABILITY_MATRIX.map((metric) => {
              const style = ACCENT_STYLES[metric.accent];
              return (
                <div key={metric.label} className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-on-surface">{metric.label}</span>
                    <span className={`${style.text} font-bold`}>
                      {metric.percent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div
                      className={`h-full ${style.bar} rounded-full`}
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-surface-container-low border border-white/[0.07] p-4 rounded-lg flex flex-col gap-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
            <span>{"NODE_TELEMETRY // LIVE VECTORS"}</span>
            <span className="text-tertiary-fixed-dim font-semibold">
              SANDBOX_ONLINE
            </span>
          </div>
          <NodeTelemetryVisual label="PORT: 8080 // PROXY ENGAGED" />
        </section>
      </div>

      {/* Recent Events Feed */}
      <section className="bg-surface-container border border-white/[0.07] p-4 rounded-lg flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ReceiptText className="w-4 h-4 text-primary-fixed" />
            <span className="font-mono text-xs text-on-surface tracking-widest font-bold uppercase">
              RECENT EVENTS
            </span>
          </div>
          <span className="font-mono text-[10px] text-tertiary-fixed-dim font-bold">
            [SYNCED]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
          {RECENT_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded bg-surface-container-low border border-white/[0.05] flex flex-col gap-1.5"
            >
              <div className="flex justify-between items-center">
                <span
                  className={
                    evt.timestamp.includes("UTC")
                      ? "text-tertiary-fixed-dim font-bold text-[10px]"
                      : "text-on-surface-variant font-bold text-[10px]"
                  }
                >
                  {evt.timestamp}
                </span>
                <span
                  className={`bg-surface-container px-1.5 py-0.5 rounded text-[10px] ${
                    evt.badgeTone === "cyan"
                      ? "text-secondary-container"
                      : "text-primary-fixed"
                  }`}
                >
                  {evt.badge}
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface leading-relaxed">
                {evt.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

