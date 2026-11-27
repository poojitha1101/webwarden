"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Fingerprint,
  Key,
  KeyRound,
  Lock,
  LockOpen,
  Mail,
  Play,
  RefreshCw,
  RotateCcw,
  Router,
  SlidersHorizontal,
  Terminal,
  Timer,
  X,
} from "lucide-react";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { LAB_CATALOG, type LabItem } from "@/lib/lab-data";

const CATEGORY_PILLS = [
  { id: "all", label: "[ALL LABS]" },
  { id: "web", label: "WEB SECURITY" },
  { id: "network", label: "NETWORK DEFENSE" },
  { id: "crypto", label: "CRYPTOGRAPHY" },
  { id: "human", label: "HUMAN FACTOR" },
] as const;

type CategoryFilter = (typeof CATEGORY_PILLS)[number]["id"];

function renderDifficultyGlyphs(difficulty: LabItem["difficulty"]) {
  if (difficulty === "EASY") {
    return <span className="text-tertiary-fixed">✦✧✧</span>;
  }
  if (difficulty === "MED") {
    return <span className="text-primary-fixed">✦✦✧</span>;
  }
  if (difficulty === "HARD") {
    return <span className="text-error">✦✦✦</span>;
  }
  return <span className="text-error">✦✦✦✦</span>;
}

function renderLabSubtitleIcon(slug: string) {
  switch (slug) {
    case "phishing-analysis":
      return <Mail className="w-3.5 h-3.5" />;
    case "password-hash-cracking":
      return <KeyRound className="w-3.5 h-3.5" />;
    case "network-packet-inspection":
      return <Router className="w-3.5 h-3.5" />;
    case "cryptography-ciphers":
      return <Key className="w-3.5 h-3.5" />;
    default:
      return <Terminal className="w-3.5 h-3.5" />;
  }
}

export function LabsCatalogClient() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastLab, setToastLab] = useState<string | null>(null);

  const filteredLabs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LAB_CATALOG.filter((lab) => {
      const catMatch =
        activeCategory === "all" || lab.category === activeCategory;
      const textMatch =
        q === "" ||
        lab.title.toLowerCase().includes(q) ||
        lab.subtitle.toLowerCase().includes(q) ||
        lab.vectorCode.toLowerCase().includes(q) ||
        lab.tags.some((t) => t.toLowerCase().includes(q));
      return catMatch && textMatch;
    });
  }, [activeCategory, searchQuery]);

  function handleLaunchLab(lab: LabItem) {
    if (lab.status === "locked") return;
    setToastLab(lab.title);
    setTimeout(() => {
      setToastLab(null);
      router.push(`/labs/${lab.slug}`);
    }, 600);
  }

  function resetFilters() {
    setActiveCategory("all");
    setSearchQuery("");
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header Manifest */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-fixed bg-surface-container-high px-2 py-0.5 rounded font-semibold">
              SIM_CATALOG // 0x4F
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant">
              {"// VECTORS: ACTIVE"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-secondary-container">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span>HUD: ONLINE</span>
          </div>
        </div>

        <div className="flex flex-col mt-1">
          <h1 className="font-[family-name:var(--font-display)] text-[28px] md:text-4xl uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <span>CYBER_SIMS</span>
            <span className="text-primary-fixed text-xl md:text-2xl">
              {"//01"}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl">
            Execute isolated sandboxes, dissect zero-day vectors, and deploy
            defensive counter-measures in calibrated environments.
          </p>
        </div>
      </section>

      {/* Search & Category Pills */}
      <section className="flex flex-col gap-2">
        <div className="relative flex items-center bg-surface-container-low border border-white/[0.07] rounded-lg shadow-sm focus-within:border-secondary-container/60 focus-within:bg-surface-container transition-all">
          <span className="font-mono text-[11px] text-primary-fixed pl-3 select-none shrink-0">
            root@sim:~#
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CVE, vector, protocol..."
            className="w-full bg-transparent py-2.5 px-2 text-on-surface placeholder:text-on-surface-variant/50 font-mono text-xs focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear Search"
              onClick={() => setSearchQuery("")}
              className="pr-3 text-on-surface-variant hover:text-primary-fixed transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_PILLS.map((pill) => {
            const active = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveCategory(pill.id)}
                className={`shrink-0 px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase transition-all ${
                  active
                    ? "bg-primary-fixed text-on-primary-fixed font-semibold shadow-[0_0_10px_rgba(195,244,0,0.2)]"
                    : "bg-surface-container-high text-on-surface hover:text-primary-fixed"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Operational Status Bar Strip */}
      <div className="flex items-center justify-between bg-surface-container-lowest border border-white/[0.06] px-3 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary-fixed" />
          <span className="font-mono text-[10px] uppercase text-on-surface-variant">
            SANDBOX POOL:
          </span>
          <span className="font-mono text-[10px] text-primary font-bold">
            {filteredLabs.length} LOADED
          </span>
        </div>
        <span className="font-mono text-[10px] text-tertiary-fixed-dim">
          DEPLOYABLE: 4/5
        </span>
      </div>

      {/* Labs Grid / Stack */}
      {filteredLabs.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLabs.map((lab) => {
            const isLocked = lab.status === "locked";
            return (
              <article
                key={lab.id}
                className={`flex flex-col justify-between rounded-lg p-3.5 relative overflow-hidden transition-all shadow-md border ${
                  isLocked
                    ? "bg-surface-container-low/70 border-white/[0.05] opacity-85"
                    : "bg-surface-container-low border-white/[0.08] hover:border-primary-fixed/40"
                }`}
              >
                <div>
                  {/* Top Tactical Metatags Bar */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 bg-surface-container-high/40 -mx-3.5 -mt-3.5 px-3.5 pt-3 border-b border-white/[0.05]">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <span
                        className={`font-bold tracking-widest ${
                          lab.status === "in_progress"
                            ? "text-primary-fixed"
                            : lab.status === "completed"
                              ? "text-tertiary-fixed"
                              : lab.status === "locked"
                                ? "text-on-surface-variant"
                                : "text-secondary-container"
                        }`}
                      >
                        {lab.code}
                      </span>
                      <span className="text-on-surface-variant/80">
                        {"// "}
                        {lab.vectorCode}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                        lab.status === "in_progress"
                          ? "bg-surface-container-highest text-primary-fixed"
                          : lab.status === "completed"
                            ? "bg-surface-container-highest text-tertiary-fixed"
                            : lab.status === "locked"
                              ? "bg-surface-container text-error"
                              : "bg-surface-container-highest text-secondary-container"
                      }`}
                    >
                      {lab.status === "in_progress" && (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>IN PROGRESS [{lab.progressPercent}%]</span>
                        </>
                      )}
                      {lab.status === "completed" && (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>COMPLETED ✓</span>
                        </>
                      )}
                      {lab.status === "unlocked" && (
                        <>
                          <LockOpen className="w-3 h-3" />
                          <span>UNLOCKED</span>
                        </>
                      )}
                      {lab.status === "locked" && (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>{lab.lockRequirement}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Core Spec Info */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-[family-name:var(--font-display)] text-lg text-primary font-semibold">
                        {lab.title}
                      </h2>
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded font-mono text-[10px] font-semibold tracking-wider ${
                          isLocked
                            ? "bg-surface-container text-on-surface-variant"
                            : lab.status === "completed"
                              ? "bg-surface-container text-tertiary-fixed-dim"
                              : "bg-primary-container/20 text-primary-fixed"
                        }`}
                      >
                        +{lab.xp} XP
                      </span>
                    </div>
                    <p
                      className={`font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 ${
                        isLocked
                          ? "text-on-surface-variant"
                          : "text-secondary-fixed-dim"
                      }`}
                    >
                      {renderLabSubtitleIcon(lab.slug)}
                      <span>{lab.subtitle}</span>
                    </p>
                  </div>

                  {/* Card-Specific Telemetry Box */}
                  {lab.nodesTotal && lab.nodesCompleted !== undefined && (
                    <div className="flex flex-col gap-1.5 my-3 bg-surface-container-lowest p-2.5 rounded border border-white/[0.05]">
                      <div className="flex justify-between items-center font-mono text-[10px] text-on-surface-variant">
                        <span>RUN_COMPLETION</span>
                        <span className="text-primary-fixed font-bold">
                          {lab.nodesCompleted}/{lab.nodesTotal} NODES
                        </span>
                      </div>
                      <SegmentedProgress totalSegments={10} filledSegments={7} />
                    </div>
                  )}

                  {lab.authStatus && lab.accuracyRate && (
                    <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-surface-container-lowest rounded border border-white/[0.05]">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          AUTH_STATUS:
                        </span>
                        <span className="font-mono text-[11px] text-tertiary-fixed font-semibold">
                          {lab.authStatus}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          ACCURACY_RATE:
                        </span>
                        <span className="font-mono text-[11px] text-primary font-semibold">
                          {lab.accuracyRate}
                        </span>
                      </div>
                    </div>
                  )}

                  {lab.sampleHash && (
                    <div className="my-3 p-2.5 bg-surface-container-lowest rounded border border-white/[0.05] flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        SAMPLE_TARGET_HASH:
                      </span>
                      <code className="font-mono text-xs text-secondary-fixed-dim truncate select-all bg-surface-container-high/60 px-2 py-1 rounded">
                        {lab.sampleHash}
                      </code>
                    </div>
                  )}

                  {lab.lockDeficit && (
                    <div className="my-3 p-2.5 bg-surface-container-lowest/80 rounded border border-white/[0.05] flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        {lab.lockDeficit}
                      </span>
                      <span className="font-mono text-[10px] text-primary-fixed underline">
                        LEVEL UP
                      </span>
                    </div>
                  )}

                  {lab.curveInfo && (
                    <div className="my-3 p-2.5 bg-surface-container-lowest rounded border border-white/[0.05] flex items-center justify-between font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Fingerprint className="w-4 h-4 text-secondary-container" />
                        <span>{lab.curveInfo}</span>
                      </div>
                      <span className="text-tertiary-fixed-dim">
                        ECDH SIM VALID
                      </span>
                    </div>
                  )}

                  {/* Module Chips */}
                  <div
                    className={`flex flex-wrap gap-1.5 mb-3 ${isLocked ? "opacity-60" : ""}`}
                  >
                    {lab.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase bg-surface-container px-2 py-0.5 rounded text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metric & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      {renderDifficultyGlyphs(lab.difficulty)}
                      <span>{lab.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{lab.duration}</span>
                    </div>
                  </div>

                  {isLocked ? (
                    <button
                      type="button"
                      disabled
                      className="flex items-center gap-1.5 bg-surface-container text-on-surface-variant/50 px-3.5 py-1.5 rounded font-[family-name:var(--font-display)] text-xs uppercase tracking-wider font-semibold cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>LOCKED</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleLaunchLab(lab)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-[family-name:var(--font-display)] text-xs uppercase tracking-wider font-bold active:scale-95 transition-all ${
                        lab.status === "in_progress"
                          ? "bg-primary-fixed text-on-primary-fixed shadow-[0_0_12px_rgba(195,244,0,0.3)] hover:brightness-110"
                          : "bg-surface-container-high hover:bg-primary-fixed text-primary hover:text-on-primary-fixed"
                      }`}
                    >
                      {lab.status === "completed" && (
                        <RotateCcw className="w-3.5 h-3.5" />
                      )}
                      <span>{lab.actionLabel}</span>
                      {lab.status === "in_progress" && (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                      {lab.status === "unlocked" && (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center py-10 px-4 text-center bg-surface-container-low border border-white/[0.07] rounded-lg">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-fixed mb-3">
            <Terminal className="w-6 h-6" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-lg text-primary uppercase font-bold">
            NULL_VECTOR_RETURNED
          </span>
          <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
            No simulator protocols match the entered search query. Adjust
            keywords or re-initialize filter buffer.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded bg-primary-fixed text-on-primary-fixed font-mono text-xs uppercase tracking-wider font-semibold"
          >
            RESET CATALOG
          </button>
        </section>
      )}

      {/* Simulation Progression Footer Banner */}
      <section className="flex flex-col bg-surface-container-low border border-white/[0.07] rounded-lg p-4 shadow-lg mt-1 gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_#c3f400]" />
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
              SIMULATION PROGRESSION
            </span>
          </div>
          <span className="font-mono text-xs text-primary-fixed font-bold">
            2/5 COMPLETE
          </span>
        </div>
        <SegmentedProgress totalSegments={5} filledSegments={2} tone="green" />
        <div className="flex items-center justify-between text-on-surface-variant font-mono text-[11px] pt-1">
          <span className="flex items-center gap-1.5 text-on-surface">
            <Award className="w-4 h-4 text-primary-fixed" />
            <span>Next: Red Team Sandbox Unlock</span>
          </span>
          <span className="text-primary-fixed underline">ROADMAP</span>
        </div>
      </section>

      {/* Toast Overlay */}
      {toastLab && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 max-w-md mx-auto z-50 bg-surface-container-highest border border-primary-fixed/40 text-on-surface p-3.5 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.8)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-primary-fixed font-bold">
                ALLOCATING LAB POD
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Spawning sandbox for: {toastLab}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary-fixed font-mono text-xs font-semibold">
            <span>READY</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
}

