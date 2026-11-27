import Link from "next/link";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";
import { CyberShell } from "@/components/CyberShell";
import { INTEL_BRIEFS } from "@/lib/lab-data";

export default function IntelPage() {
  return (
    <CyberShell>
      <div className="flex flex-col w-full gap-5">
        <section className="bg-surface-container-low border border-white/[0.08] p-5 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary-container">
              {"KNOWLEDGE_BASE // FIELD MANUAL"}
            </span>
            <span className="font-mono text-[10px] text-tertiary-fixed-dim">
              VERIFIED BRIEFS
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-primary font-bold uppercase flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-fixed" />
            <span>TACTICAL INTEL</span>
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Defensive playbooks, secure coding patterns, and protocol
            diagnostics for active WebWarden simulations.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4">
          {INTEL_BRIEFS.map((brief) => (
            <article
              key={brief.id}
              className="bg-surface-container border border-white/[0.07] p-5 rounded-xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-primary-fixed font-semibold">
                  {brief.code}
                </span>
                <span className="font-mono text-[10px] text-secondary-container">
                  {brief.category}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-lg text-primary font-semibold">
                {brief.title}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {brief.summary}
              </p>
              <div className="bg-surface-container-lowest border border-white/[0.06] p-3 rounded font-mono text-xs text-tertiary-fixed-dim overflow-x-auto flex items-center gap-2">
                <Terminal className="w-4 h-4 shrink-0 text-primary-fixed" />
                <code>{brief.snippet}</code>
              </div>
            </article>
          ))}
        </section>

        <div className="flex justify-end">
          <Link
            href="/labs/sql-injection"
            className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-fixed font-[family-name:var(--font-display)] text-xs uppercase tracking-wider font-bold flex items-center gap-2 hover:brightness-110 transition-all"
          >
            <span>LAUNCH SQLI SANDBOX</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </CyberShell>
  );
}

