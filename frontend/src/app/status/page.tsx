import { Award, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { CyberShell } from "@/components/CyberShell";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { CAPABILITY_MATRIX, RECENT_EVENTS } from "@/lib/lab-data";

export default function StatusPage() {
  return (
    <CyberShell>
      <div className="flex flex-col w-full gap-5">
        <section className="bg-surface-container-low border border-white/[0.08] p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-fixed">
              {"TELEMETRY // AGENT_STATUS"}
            </span>
            <span className="font-mono text-[10px] text-tertiary-fixed-dim">
              RANK #42 GLOBAL
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-primary font-bold uppercase">
            OPERATIONAL STATUS &amp; PROGRESSION
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-surface-container p-3 rounded-lg border border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-primary-fixed font-mono text-[10px]">
                <Zap className="w-3.5 h-3.5" />
                <span>TOTAL XP</span>
              </div>
              <div className="font-[family-name:var(--font-display)] text-xl font-bold mt-1">
                14,850
              </div>
            </div>
            <div className="bg-surface-container p-3 rounded-lg border border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-secondary-container font-mono text-[10px]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>CLEARANCE</span>
              </div>
              <div className="font-[family-name:var(--font-display)] text-xl font-bold mt-1">
                LVL.07
              </div>
            </div>
            <div className="bg-surface-container p-3 rounded-lg border border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-tertiary-fixed-dim font-mono text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ACCURACY</span>
              </div>
              <div className="font-[family-name:var(--font-display)] text-xl font-bold mt-1">
                94.2%
              </div>
            </div>
            <div className="bg-surface-container p-3 rounded-lg border border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-primary-fixed font-mono text-[10px]">
                <Award className="w-3.5 h-3.5" />
                <span>BADGES</span>
              </div>
              <div className="font-[family-name:var(--font-display)] text-xl font-bold mt-1">
                9 / 14
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container border border-white/[0.07] p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-on-surface-variant uppercase">
              {"// LEVEL 08 CLEARANCE PROGRESS"}
            </span>
            <span className="text-primary-fixed font-bold">
              3,700 / 5,000 XP
            </span>
          </div>
          <SegmentedProgress totalSegments={10} filledSegments={7} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-surface-container border border-white/[0.07] p-5 rounded-xl flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase">
              {"// DOMAIN PROFICIENCY"}
            </span>
            {CAPABILITY_MATRIX.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between font-mono text-xs">
                  <span>{item.label}</span>
                  <span className="text-primary-fixed font-bold">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary-container rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="bg-surface-container border border-white/[0.07] p-5 rounded-xl flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase">
              {"// MISSION LOGBOOK"}
            </span>
            <div className="flex flex-col gap-2.5">
              {RECENT_EVENTS.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded bg-surface-container-low border border-white/[0.05] flex flex-col gap-1"
                >
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-tertiary-fixed-dim">
                      {evt.timestamp}
                    </span>
                    <span className="text-primary-fixed">{evt.badge}</span>
                  </div>
                  <p className="text-xs text-on-surface">{evt.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </CyberShell>
  );
}

