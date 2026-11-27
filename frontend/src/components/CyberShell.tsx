"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  FlaskConical,
  Search,
  Shield,
  Swords,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: typeof Terminal;
  matchPrefixes: string[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dash", icon: Terminal, matchPrefixes: ["/"] },
  { href: "/labs", label: "Labs", icon: FlaskConical, matchPrefixes: ["/labs"] },
  {
    href: "/targets",
    label: "Targets",
    icon: Swords,
    matchPrefixes: ["/targets"],
  },
  {
    href: "/status",
    label: "Status",
    icon: TrendingUp,
    matchPrefixes: ["/status"],
  },
  {
    href: "/intel",
    label: "Intel",
    icon: BookOpen,
    matchPrefixes: ["/intel"],
  },
];

function isActiveRoute(pathname: string, item: NavItem): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }
  return item.matchPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function CyberLabEmblem() {
  return (
    <div className="w-8 h-8 rounded bg-surface-container-high border border-primary-fixed/30 flex items-center justify-center relative shrink-0 shadow-[0_0_12px_rgba(195,244,0,0.12)]">
      <Shield className="w-4 h-4 text-primary-fixed" strokeWidth={2.2} />
      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-tertiary-fixed-dim ring-2 ring-surface-container-lowest" />
    </div>
  );
}

export function CyberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [alertsOpen, setAlertsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
        <div className="max-w-5xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <CyberLabEmblem />
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold uppercase tracking-wider text-primary group-hover:text-primary-fixed transition-colors">
                    CYBER_LAB
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary-fixed text-[10px] font-mono font-semibold tracking-widest">
                    LVL.07
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-tertiary-fixed-dim text-[10px] font-mono tracking-wider">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                  <span>SECURE // 24MS</span>
                </div>
              </div>
            </Link>

            <nav
              aria-label="Primary Desktop Navigation"
              className="hidden md:flex items-center gap-1"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActiveRoute(pathname, item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                      active
                        ? "text-primary-fixed bg-surface-container-high/80 shadow-[0_0_12px_rgba(195,244,0,0.12)] font-semibold"
                        : "text-on-surface-variant hover:text-primary-fixed hover:bg-surface-container-low"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 relative">
            <Link
              href="/labs"
              aria-label="Search Labs"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-secondary-container hover:bg-surface-container active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
            </Link>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setAlertsOpen((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center relative rounded-lg bg-surface-container-low text-on-surface-variant hover:text-primary-fixed hover:bg-surface-container active:scale-95 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary-fixed shadow-[0_0_6px_#c3f400]" />
            </button>

            <div
              title="AGENT_K09 // Senior Analyst"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-container/30 via-surface-container-high to-primary-container/30 ring-1 ring-primary-fixed/50 flex items-center justify-center font-mono text-[10px] font-bold text-primary-fixed select-none"
            >
              K09
            </div>

            {alertsOpen && (
              <div className="absolute right-0 top-12 w-72 rounded-lg bg-surface-container-high border border-white/10 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-primary-fixed mb-2">
                  <span>{"// TELEMETRY ALERTS"}</span>
                  <button
                    type="button"
                    onClick={() => setAlertsOpen(false)}
                    className="text-on-surface-variant hover:text-primary"
                  >
                    CLOSE
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-surface-container-lowest border border-white/[0.06]">
                    <p className="font-mono text-[10px] text-error font-semibold">
                      LIVE TARGET // NX-409
                    </p>
                    <p className="text-on-surface mt-0.5">
                      SQL Injection Defense is at 65% completion.
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest border border-white/[0.06]">
                    <p className="font-mono text-[10px] text-secondary-container font-semibold">
                      CLEARANCE NOTICE
                    </p>
                    <p className="text-on-surface-variant mt-0.5">
                      Earn +120 XP to unlock LAB_04 Network Packet Inspection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 pt-20 pb-28 md:pb-12">
        {children}
      </main>

      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-white/[0.06] shadow-[0_-1px_16px_rgba(0,0,0,0.6)]"
      >
        <div className="flex justify-around items-center h-16 px-1">
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-all group ${
                  active
                    ? "text-primary-fixed bg-surface-container-high/60 shadow-[0_0_12px_rgba(195,244,0,0.15)]"
                    : "text-on-surface-variant hover:text-primary-fixed"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-mono text-[9px] uppercase tracking-wider mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
