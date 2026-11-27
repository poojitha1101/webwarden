"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ShieldCheck,
  Star,
  Terminal,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { NodeTelemetryVisual } from "@/components/NodeTelemetryVisual";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { CHALLENGE_CATALOG } from "@/lib/lab-data";

const FILTER_CATEGORIES = [
  "[ALL]",
  "WEB CTF",
  "FORENSICS",
  "REVERSE ENG",
  "CRYPTOGRAPHY",
] as const;

type TargetFilter = (typeof FILTER_CATEGORIES)[number];

export function TargetsClient() {
  const [secondsLeft, setSecondsLeft] = useState(4 * 3600 + 18 * 60 + 28);
  const [activeFilter, setActiveFilter] = useState<TargetFilter>("[ALL]");
  const [flagInput, setFlagInput] = useState("");
  const [flagFeedback, setFlagFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const promptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formattedTimer = useMemo(() => {
    const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }, [secondsLeft]);

  const filteredChallenges = useMemo(() => {
    if (activeFilter === "[ALL]") return CHALLENGE_CATALOG;
    return CHALLENGE_CATALOG.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  function handleFlagSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = flagInput.trim();
    if (!trimmed) return;
    const matched = CHALLENGE_CATALOG.find(
      (c) => c.flag.toLowerCase() === trimmed.toLowerCase(),
    );
    if (matched) {
      setFlagFeedback({
        ok: true,
        message: `FLAG VERIFIED // ${matched.title} (+${matched.xp} XP AWARDED)`,
      });
      setFlagInput("");
    } else {
      setFlagFeedback({
        ok: false,
        message:
          "INVALID SIGNATURE // Try flag{jwt_alg_none_bypass} or deploy a target.",
      });
    }
  }

  return (
    <div className="flex flex-col w-full gap-5">
      {/* Header Hero */}
      <section className="bg-[#161a23] border border-[#262b38] p-5 rounded-xl relative overflow-hidden shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed" />
              </span>
              {"SECTOR // CTF_GRID_09"}
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-[26px] md:text-3xl leading-tight text-primary tracking-tight font-bold">
              CHALLENGES &amp; CTF
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(195,244,0,0.2)]">
              GOLD DEFENDER
            </span>
            <span className="font-mono text-xs text-secondary-container font-medium">
              #42 GLOBALLY
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#262b38]/70">
          <div className="bg-[#10131a]/60 border border-[#272b38]/50 p-3 rounded-lg flex flex-col justify-center">
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">
              SOLVE RATE
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg text-tertiary-fixed-dim font-bold">
              94.2%
            </span>
          </div>
          <div className="bg-[#10131a]/60 border border-[#272b38]/50 p-3 rounded-lg flex flex-col justify-center">
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">
              ACTIVE STREAK
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg text-primary-fixed font-bold">
              18 DAYS
            </span>
          </div>
          <div className="bg-[#10131a]/60 border border-[#272b38]/50 p-3 rounded-lg flex flex-col justify-center">
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">
              MULTIPLIER
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg text-secondary-fixed font-bold">
              x1.75
            </span>
          </div>
        </div>
      </section>

      {/* Daily Directive & Weekly Wargame */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-[#161a23] border border-[#262b38] rounded-xl p-5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/80 text-primary-fixed font-mono text-[11px] tracking-wide">
                <Zap className="w-3.5 h-3.5" />
                <span>{"DAILY DIRECTIVE // 24-B"}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-primary-fixed bg-[#10131a] border border-[#262b38] px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed" />
                </span>
                <Timer className="w-3.5 h-3.5" />
                <span className="font-semibold tracking-wider">
                  {formattedTimer}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 my-2">
              <h2 className="font-[family-name:var(--font-display)] text-xl text-primary tracking-wide font-semibold">
                PHISHING DETECTIVE
              </h2>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Analyze raw SMTP headers for spoofed SPF records, DKIM
                misalignment, and obfuscated Cyrillic homoglyph domain vectors.
              </p>
            </div>

            <div className="bg-[#0d1017] border border-[#222736] p-3 rounded-lg my-3 font-mono text-xs flex flex-col gap-1.5 overflow-x-auto">
              <div className="flex items-center justify-between text-on-surface-variant text-[10px] pb-1 border-b border-[#222736]">
                <span className="text-outline">SRC: 198.51.100.24</span>
                <span className="text-error font-medium px-2 py-0.5 rounded bg-error-container/30 border border-error/20 text-[10px]">
                  HEURISTIC: HIGH RISK
                </span>
              </div>
              <div className="truncate text-[11px] text-primary-fixed-dim pt-0.5">
                <span className="text-on-surface-variant mr-1">&gt;</span>
                Return-Path: &lt;ops@pаypаl.com&gt;{" "}
                <span className="text-[10px] text-primary-fixed bg-primary-fixed/10 px-1.5 py-0.5 rounded ml-1">
                  UNICODE_HOMOGLYPH
                </span>
              </div>
              <div className="truncate text-[11px] text-secondary">
                <span className="text-on-surface-variant mr-1">&gt;</span>
                Authentication-Results: dkim=fail (key revoked)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high/60 border border-[#2f3547] text-tertiary-fixed font-mono text-[10px]">
                <Award className="w-3.5 h-3.5" />
                <span>+150 XP</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high/60 border border-[#2f3547] text-secondary-container font-mono text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>&apos;Mail Sentry&apos;</span>
              </div>
            </div>
            <Link
              href="/labs/phishing-analysis"
              className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-fixed font-[family-name:var(--font-display)] text-xs uppercase tracking-wider font-semibold hover:brightness-110 hover:shadow-[0_0_20px_rgba(195,244,0,0.4)] active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>COMMENCE</span>
              <Terminal className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="bg-[#161a23] border border-[#262b38] rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-container" />
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-secondary-container">
                  WEEKLY WARGAME
                </span>
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant flex items-center gap-1 bg-[#10131a] px-2.5 py-1 rounded-full border border-[#262b38]">
                <Users className="w-3.5 h-3.5" />
                <span>1,420 AGENTS COMPETING</span>
              </span>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-primary font-semibold">
                CYBER CLASH: BREACH CONTAINMENT
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Week 12 Operational Arena. Multi-vector incident scenario.
              </p>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-[#2a3040]">
              <NodeTelemetryVisual label="SECTOR_STAGE: 02/03 // POOL: 12,000 XP" />
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-surface-container-lowest/95 border-t border-[#262b38]">
                <div className="bg-primary-container text-on-primary p-2 rounded flex flex-col">
                  <span className="font-mono text-[9px] uppercase font-bold">
                    STAGE 01
                  </span>
                  <span className="font-mono text-[11px] truncate font-medium">
                    Reconnaissance
                  </span>
                </div>
                <div className="bg-secondary-container text-on-secondary p-2 rounded flex flex-col ring-1 ring-secondary-container/60">
                  <span className="font-mono text-[9px] uppercase font-bold">
                    STAGE 02
                  </span>
                  <span className="font-mono text-[11px] truncate font-medium">
                    Priv Escalation
                  </span>
                </div>
                <div className="bg-[#1d222e] text-on-surface-variant p-2 rounded flex flex-col opacity-75">
                  <span className="font-mono text-[9px] uppercase">
                    STAGE 03
                  </span>
                  <span className="font-mono text-[11px] truncate font-medium">
                    Incident Resp.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
              <span>GLOBAL BREACH MITIGATION</span>
              <span className="text-tertiary-fixed-dim font-semibold">
                68% COMPLETED
              </span>
            </div>
            <SegmentedProgress
              totalSegments={10}
              filledSegments={7}
              tone="mixed"
            />
          </div>
        </section>
      </div>

      {/* Filter Bar */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-medium">
            {"TARGET MATRIX // FILTERS"}
          </span>
          <span className="font-mono text-xs text-primary-fixed-dim font-medium">
            {filteredChallenges.length} TARGETS AVAILABLE
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_CATEGORIES.map((cat) => {
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase whitespace-nowrap active:scale-95 transition-all ${
                  active
                    ? "bg-primary-container text-on-primary font-semibold shadow-[0_0_10px_rgba(195,244,0,0.2)]"
                    : "bg-[#161a23] border border-[#262b38] text-on-surface-variant hover:text-primary-fixed hover:border-[#384054]"
                }`}
              >
                {cat === "[ALL]" ? cat : `[${cat}]`}
              </button>
            );
          })}
        </div>
      </section>

      {/* Challenge Cards */}
      {filteredChallenges.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {filteredChallenges.map((item) => (
            <article
              key={item.id}
              className="bg-[#161a23] border border-[#262b38] p-5 rounded-xl flex flex-col justify-between gap-3.5 transition-all hover:border-[#384054]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant mb-1">
                      <span>{`// SIM_ID: ${item.simId}`}</span>
                      <span className="text-outline">•</span>
                      <span className="text-secondary-fixed font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg text-primary font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
                      item.difficulty === "HARD"
                        ? "bg-error-container/30 border-error/30 text-error"
                        : item.difficulty === "MEDIUM"
                          ? "bg-secondary-container/20 border-secondary-container/40 text-secondary-container"
                          : "bg-primary-container/20 border-primary-fixed/40 text-primary-fixed"
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#262b38]/60">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-primary-fixed font-mono text-xs font-semibold">
                    <Star className="w-3.5 h-3.5" />+{item.xp} XP
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {item.solvedCount} SOLVED
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFlagInput(item.flag);
                    promptRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#202534] border border-[#2e3547] text-primary-fixed hover:bg-primary-container hover:text-on-primary font-mono text-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
                >
                  <span>DEPLOY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="bg-[#161a23] border border-[#262b38] p-6 rounded-xl text-center">
          <p className="font-mono text-xs text-on-surface-variant">
            No active CTF targets in {activeFilter}. Switch filter or deploy
            from [ALL].
          </p>
        </section>
      )}

      {/* Sandbox Prompt Flag Submission */}
      <section className="bg-[#161a23] border border-[#262b38] p-5 rounded-xl flex flex-col gap-3">
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-primary-fixed font-medium">
            <Terminal className="w-4 h-4" />
            <span>SANDBOX_PROMPT</span>
          </div>
          <span className="text-tertiary-fixed-dim text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            TLS_ENCRYPTED
          </span>
        </div>

        <form
          onSubmit={handleFlagSubmit}
          className="bg-[#0d1017] border border-[#262b38] focus-within:border-primary-fixed/70 focus-within:ring-1 focus-within:ring-primary-fixed/50 p-2 rounded-lg font-mono text-on-surface flex items-center gap-2.5 transition-all"
        >
          <span className="text-primary-fixed font-bold text-xs pl-1 shrink-0">
            root@cyberlab:~#
          </span>
          <input
            ref={promptRef}
            type="text"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            placeholder="flag{solve_hash_here}"
            className="bg-transparent text-primary-fixed placeholder:text-on-surface-variant/60 focus:outline-none w-full text-xs py-1"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded bg-surface-container-high border border-[#2a3040] hover:bg-primary-container hover:text-on-primary text-primary-fixed text-xs uppercase active:scale-95 font-semibold transition-all shrink-0"
          >
            SUBMIT
          </button>
        </form>

        {flagFeedback && (
          <div
            className={`font-mono text-xs px-3 py-2 rounded border flex items-center gap-2 ${
              flagFeedback.ok
                ? "bg-tertiary-container/10 border-tertiary-fixed/40 text-tertiary-fixed"
                : "bg-error-container/20 border-error/40 text-error"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{flagFeedback.message}</span>
          </div>
        )}
      </section>
    </div>
  );
}

