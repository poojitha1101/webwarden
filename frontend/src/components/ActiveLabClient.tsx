"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  Award,
  CheckCircle2,
  Database,
  HelpCircle,
  LockOpen,
  Monitor,
  RefreshCw,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Wand2,
  XCircle,
  Zap,
} from "lucide-react";
import { CyberLabEmblem } from "@/components/CyberShell";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import type { LabItem } from "@/lib/lab-data";

type LabTab = "what" | "how" | "defense" | "forensics";

const INITIAL_LOGS = [
  {
    id: "log-1",
    tone: "muted",
    text: "[14:32:01.08] DB_ENGINE: Connection pooled from 127.0.0.1:48290",
  },
  {
    id: "log-2",
    tone: "green",
    text: "[14:32:01.12] INGEST: String parsed. Executing raw statement.",
  },
  {
    id: "log-3",
    tone: "error",
    text: "[14:32:01.15] [!] EXPLOIT: Boolean literal TRUE encountered in WHERE clause.",
  },
  {
    id: "log-4",
    tone: "volt",
    text: "[14:32:01.18] [+] PRIVILEGE_ESCALATION: UID: 0 (admin) authentication bypassed!",
  },
  {
    id: "log-5",
    tone: "cyan",
    text: "[14:32:01.21] DUMP: JWT_eyJhY2NvdW50IjoiYWRtaW4iLCJyb2xlIjoicm9vdCJ9...",
  },
];

export function ActiveLabClient({ lab }: { lab: LabItem }) {
  const [activeTab, setActiveTab] = useState<LabTab>("what");
  const [username, setUsername] = useState("admin' OR '1'='1' --");
  const [password, setPassword] = useState("••••••••••••");
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [completed, setCompleted] = useState(false);
  const [checklist, setChecklist] = useState({
    parameterized: true,
    leastPrivilege: true,
    waf: false,
  });

  const hasCommentBypass = username.includes("--") || username.includes("/*");

  function executeAttack() {
    const now = new Date().toISOString().substring(11, 22);
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        tone: hasCommentBypass ? "volt" : "cyan",
        text: hasCommentBypass
          ? `[${now}] [+] EXPLOIT FIRED: Session elevated to root. Token minted.`
          : `[${now}] [i] QUERY EXECUTED: Evaluated credentials for '${username || "NULL"}'.`,
      },
    ]);
  }

  function resetSandbox() {
    setUsername("standard_user");
    setPassword("password123");
    setCompleted(false);
    setLogs([
      {
        id: `reset-${Date.now()}`,
        tone: "muted",
        text: "[00:00:00.00] SANDBOX RESET: Target database restored to pristine state.",
      },
    ]);
  }

  const tabs: { id: LabTab; label: string }[] = [
    { id: "what", label: "01. Vector" },
    { id: "how", label: "02. Breach" },
    { id: "defense", label: "03. Patch" },
    { id: "forensics", label: "04. Triage" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Stack Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Link
              href="/labs"
              aria-label="Abort Mission / Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-primary-fixed hover:bg-surface-container active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <CyberLabEmblem />
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                ACTIVE_ROUTINE
              </span>
              <span className="font-[family-name:var(--font-display)] text-sm sm:text-base uppercase tracking-tight text-primary font-semibold truncate max-w-[180px] sm:max-w-xs">
                Live Terminal Sandbox
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 text-tertiary-fixed-dim text-[10px] font-mono bg-surface-container-high px-2.5 py-1 rounded">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
              <span>LIVE</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-container/30 via-surface-container-high to-primary-container/30 ring-1 ring-primary-fixed/50 flex items-center justify-center font-mono text-[10px] font-bold text-primary-fixed">
              K09
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-20 pb-28 flex flex-col gap-5">
        {/* Mission Meta Bar */}
        <section className="flex flex-col gap-4 bg-[#161a23]/90 border border-[#262b38] rounded-xl p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-primary-container text-on-primary-fixed font-mono text-[10px] uppercase rounded font-bold tracking-wider">
                {lab.code.replace("_", " // ")}
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                {`CVE-SIM // ${lab.vectorCode}`}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#10131a] border border-[#262b38] text-tertiary-fixed-dim font-mono text-[10px] rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed-dim" />
              </span>
              <span className="tracking-wide">SANDBOX ONLINE</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl leading-tight text-primary uppercase tracking-tight font-bold">
              {lab.slug === "sql-injection"
                ? "SQL Injection Vulnerability & Patch"
                : lab.title}
            </h1>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 flex-wrap">
              <span>Target Node:</span>
              <span className="font-mono text-secondary-fixed bg-surface-container-lowest px-1.5 py-0.5 rounded border border-[#262b38]">
                db_sandbox_core.auth_v2
              </span>
              <span>•</span>
              <span>Port: 3306 [EXPOSED]</span>
            </p>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <div className="flex justify-between items-center font-mono text-[10px] text-on-surface-variant">
              <span className="text-primary-fixed uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping" />
                {"PHASE: 02 // EXPLOIT & REMEDIATE"}
              </span>
              <span className="font-mono text-primary-fixed font-semibold">
                {completed ? "PROGRESS: 100%" : "PROGRESS: 50%"}
              </span>
            </div>
            <SegmentedProgress
              totalSegments={4}
              filledSegments={completed ? 4 : 2}
            />
          </div>
        </section>

        {/* 4 Interactive Mission Tabs */}
        <nav
          aria-label="Sandbox Stages"
          className="grid grid-cols-4 gap-1.5 p-1.5 bg-[#161a23]/90 border border-[#262b38] rounded-xl"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1.5 text-center font-mono text-[10px] sm:text-xs uppercase rounded-lg transition-all ${
                  active
                    ? "bg-[#272a32] text-primary-fixed font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-primary hover:bg-[#1d212c]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* TAB 01: VECTOR */}
        {activeTab === "what" && (
          <section className="flex flex-col gap-5">
            <div className="bg-[#161a23] border border-[#262b38] rounded-xl p-5 flex flex-col gap-4 shadow-lg">
              <div className="flex items-center gap-2 text-primary-fixed">
                <HelpCircle className="w-5 h-5" />
                <h2 className="font-[family-name:var(--font-display)] text-base uppercase tracking-tight text-primary font-bold">
                  {"01 // Anatomy of SQL Injection"}
                </h2>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                SQL Injection (SQLi) occurs when untrusted user input is
                directly concatenated into a dynamic SQL query without
                validation or parameterized separation. The database engine
                executes the attacker&apos;s syntax as system directives instead
                of literal strings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#10131a] border border-[#262b38] p-4 rounded-lg flex flex-col gap-2 hover:border-error/40 transition-colors">
                  <span className="font-mono text-[11px] text-error uppercase font-bold flex items-center gap-1.5">
                    <LockOpen className="w-4 h-4" />
                    <span>Auth Bypass</span>
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Injecting tautologies (
                    <code className="text-error font-mono">
                      &apos;1&apos;=&apos;1&apos;
                    </code>
                    ) forces SQL statements to evaluate true, granting access
                    without valid passwords.
                  </p>
                </div>

                <div className="bg-[#10131a] border border-[#262b38] p-4 rounded-lg flex flex-col gap-2 hover:border-secondary-fixed/40 transition-colors">
                  <span className="font-mono text-[11px] text-secondary-fixed uppercase font-bold flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>Data Exfiltration</span>
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Attackers link arbitrary queries using{" "}
                    <code className="text-secondary-fixed font-mono">
                      UNION SELECT
                    </code>{" "}
                    to dump tables, hashes, credit cards, or systemic salts.
                  </p>
                </div>

                <div className="bg-[#10131a] border border-[#262b38] p-4 rounded-lg flex flex-col gap-2 hover:border-primary-fixed/40 transition-colors">
                  <span className="font-mono text-[11px] text-primary-fixed uppercase font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>Remote Execution</span>
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Under elevated engine privs (e.g.{" "}
                    <code className="text-primary-fixed font-mono">
                      xp_cmdshell
                    </code>
                    ), attackers write webshells or take shell control of host
                    machines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161a23] border border-[#262b38] rounded-xl p-5 flex flex-col gap-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                  {"// EXPLOIT TOPOLOGY VISUALIZER"}
                </span>
                <span className="font-mono text-[10px] text-primary-fixed uppercase tracking-wider px-2 py-0.5 bg-primary-fixed/10 rounded border border-primary-fixed/20">
                  INTERACTIVE TRACE
                </span>
              </div>

              <div className="bg-[#10131a] border border-[#262b38] p-4 rounded-lg flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 text-xs font-mono p-3 rounded bg-[#191b23] border border-[#272a32] flex-wrap">
                  <div className="flex items-center gap-2 text-on-surface">
                    <Monitor className="w-4 h-4 text-secondary-fixed" />
                    <span className="font-sans font-medium">
                      Client Input Field
                    </span>
                  </div>
                  <span className="text-error px-2 py-0.5 bg-error-container/20 rounded border border-error/30">
                    admin&apos; OR 1=1 --
                  </span>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-primary-fixed animate-bounce" />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs font-mono bg-[#191b23] border border-[#272a32] p-3 rounded flex-wrap">
                  <div className="flex items-center gap-2 text-on-surface">
                    <ShieldAlert className="w-4 h-4 text-error" />
                    <span className="font-sans font-medium">
                      Vulnerable String Concat
                    </span>
                  </div>
                  <span className="text-on-surface-variant">
                    SELECT * WHERE user = &apos;admin&apos; ...
                  </span>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-error animate-bounce" />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs font-mono bg-error-container/20 border border-error/40 p-3 rounded flex-wrap shadow-[0_0_12px_rgba(255,180,171,0.1)]">
                  <div className="flex items-center gap-2 text-error">
                    <Database className="w-4 h-4" />
                    <span className="font-sans font-bold">
                      Database Engine Action
                    </span>
                  </div>
                  <span className="text-error font-bold tracking-wide">
                    RETURN ALL ROWS &gt; ACCESS GRANTED
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 02: BREACH */}
        {activeTab === "how" && (
          <section className="bg-surface-container-low border border-white/[0.08] rounded-xl p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-fixed" />
                <h2 className="font-[family-name:var(--font-display)] text-base uppercase text-primary font-bold">
                  Live Exploitation Terminal
                </h2>
              </div>
              <span className="font-mono text-[10px] text-tertiary-fixed-dim bg-surface-container px-2.5 py-1 rounded">
                ENV: EPHEMERAL_DB
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-white/[0.06] p-4 rounded-lg flex flex-col gap-3">
              <div className="flex justify-between items-center text-on-surface-variant font-mono text-[10px] flex-wrap gap-2">
                <span>TARGET INTERFACE: /api/v1/auth/login</span>
                <button
                  type="button"
                  onClick={() => setUsername("admin' OR '1'='1' --")}
                  className="text-primary-fixed hover:underline flex items-center gap-1"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Load Payload</span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="input-username"
                  className="font-mono text-[10px] uppercase text-on-surface-variant"
                >
                  User Parameter
                </label>
                <input
                  id="input-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username payload..."
                  className="w-full bg-surface-container px-3 py-2 rounded text-primary font-mono text-xs focus:outline-none focus:ring-1 focus:ring-secondary-container"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="input-password"
                  className="font-mono text-[10px] uppercase text-on-surface-variant"
                >
                  Password Parameter
                </label>
                <input
                  id="input-password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full bg-surface-container px-3 py-2 rounded text-on-surface-variant font-mono text-xs focus:outline-none focus:ring-1 focus:ring-secondary-container"
                />
              </div>

              <button
                type="button"
                onClick={executeAttack}
                className="w-full py-2.5 mt-1 bg-primary-container text-on-primary-fixed font-[family-name:var(--font-display)] text-sm uppercase tracking-wider rounded font-bold hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(195,244,0,0.3)]"
              >
                <Rocket className="w-4 h-4" />
                <span>Execute Query Injection</span>
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                {"// REAL-TIME AST QUERY COMPILER"}
              </span>
              <div className="bg-surface-container-lowest border border-white/[0.06] p-3 rounded font-mono text-xs text-on-surface overflow-x-auto leading-relaxed">
                <span className="text-secondary-fixed">SELECT</span> *{" "}
                <span className="text-secondary-fixed">FROM</span> accounts{" "}
                <span className="text-secondary-fixed">WHERE</span> username ={" "}
                &apos;
                <span
                  className={
                    hasCommentBypass
                      ? "text-error bg-error-container/30 px-1 rounded font-bold"
                      : "text-primary-fixed font-semibold"
                  }
                >
                  {username || "NULL"}
                </span>
                &apos;{" "}
                <span
                  className={
                    hasCommentBypass
                      ? "text-on-surface-variant line-through opacity-50"
                      : "text-on-surface-variant"
                  }
                >
                  AND password_hash =
                  &apos;8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918&apos;
                </span>
                ;
              </div>
              {hasCommentBypass && (
                <p className="text-xs text-error flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Comment marker (<code className="font-mono">--</code>)
                    nullifies all subsequent password checks.
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                {"// RDBMS LOG STREAM & SESSION STATE"}
              </span>
              <div className="bg-surface-container-lowest border border-white/[0.06] p-3.5 rounded-lg font-mono text-xs flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {logs.map((entry) => (
                  <div
                    key={entry.id}
                    className={
                      entry.tone === "error"
                        ? "text-error font-bold"
                        : entry.tone === "volt"
                          ? "text-primary-fixed font-bold"
                          : entry.tone === "green"
                            ? "text-tertiary-fixed-dim"
                            : entry.tone === "cyan"
                              ? "text-secondary-fixed"
                              : "text-on-surface-variant"
                    }
                  >
                    {entry.text}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 03: PATCH */}
        {activeTab === "defense" && (
          <section className="bg-surface-container-low border border-white/[0.08] rounded-xl p-5 flex flex-col gap-5">
            <div className="flex items-center gap-2 text-primary-fixed">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-[family-name:var(--font-display)] text-base uppercase text-primary font-bold">
                Architectural Defenses
              </h2>
            </div>
            <p className="text-sm text-on-surface leading-relaxed">
              Eliminating SQL injection requires strict separation of executable
              code from untrusted data parameters. Parameterized queries compile
              database logic prior to binding data.
            </p>

            <div className="flex flex-col gap-3">
              <div className="bg-surface-container-lowest border border-error/25 p-4 rounded-lg flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-error uppercase font-bold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>INSECURE: Dynamic String Concatenation</span>
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    python / psycopg2
                  </span>
                </div>
                <pre className="bg-surface-container p-3 rounded font-mono text-xs text-on-surface overflow-x-auto">
                  <span className="text-on-surface-variant">
                    # Flawed query construction:{"\n"}
                  </span>
                  <span className="text-error">
                    query = f&quot;SELECT * FROM users WHERE user =
                    &apos;&#123;user_input&#125;&apos;&quot;{"\n"}
                  </span>
                  <span className="text-on-surface-variant">
                    cursor.execute(query)
                  </span>
                </pre>
              </div>

              <div className="bg-surface-container-lowest border border-tertiary-fixed-dim/25 p-4 rounded-lg flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-tertiary-fixed-dim uppercase font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SECURE: Parameterized Prepared Statement</span>
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    python / psycopg2
                  </span>
                </div>
                <pre className="bg-surface-container p-3 rounded font-mono text-xs text-on-surface overflow-x-auto">
                  <span className="text-on-surface-variant">
                    # Separation of code and data structure:{"\n"}
                  </span>
                  <span className="text-tertiary-fixed-dim">
                    query = &quot;SELECT * FROM users WHERE user = %s&quot;
                    {"\n"}
                    cursor.execute(query, (user_input,))
                  </span>
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                {"// DEFENSE IN DEPTH CHECKLIST"}
              </span>
              <label className="flex items-start gap-3 p-3 bg-surface-container rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.parameterized}
                  onChange={(e) =>
                    setChecklist((prev) => ({
                      ...prev,
                      parameterized: e.target.checked,
                    }))
                  }
                  className="mt-1 accent-primary-container w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-display)] text-sm text-primary font-semibold">
                    1. Parameterized Queries / ORM
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Always use pre-compiled binding via PDO, SQLAlchemy,
                    Hibernate, or native prepared statements.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-surface-container rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.leastPrivilege}
                  onChange={(e) =>
                    setChecklist((prev) => ({
                      ...prev,
                      leastPrivilege: e.target.checked,
                    }))
                  }
                  className="mt-1 accent-primary-container w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-display)] text-sm text-primary font-semibold">
                    2. Principle of Least Privilege (PoLP)
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Configure web application database users without DROP,
                    ALTER, or administrative execution privileges.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-surface-container rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.waf}
                  onChange={(e) =>
                    setChecklist((prev) => ({
                      ...prev,
                      waf: e.target.checked,
                    }))
                  }
                  className="mt-1 accent-primary-container w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-display)] text-sm text-primary font-semibold">
                    3. Input Validation &amp; WAF Layer
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Apply strict alphanumeric allowlists; intercept automated
                    query scanners at the ingress gateway.
                  </span>
                </div>
              </label>
            </div>
          </section>
        )}

        {/* TAB 04: TRIAGE */}
        {activeTab === "forensics" && (
          <section className="bg-surface-container-low border border-white/[0.08] rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary-fixed">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="font-[family-name:var(--font-display)] text-base uppercase text-primary font-bold">
                Post-Breach Forensics &amp; Triage
              </h2>
            </div>
            <p className="text-sm text-on-surface leading-relaxed">
              Immediate containment runbook upon confirming unauthorized
              database access via exploited web inputs.
            </p>

            <div className="flex flex-col gap-3">
              <div className="bg-surface-container-lowest border border-white/[0.06] p-4 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-error font-bold">
                    STEP 01: ISOLATE &amp; KILL SESSIONS
                  </span>
                  <span className="text-on-surface-variant">SEV-1 ACTION</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Terminate all active rogue connections and lock hijacked
                  database accounts immediately:
                </p>
                <div className="bg-surface-container p-2.5 rounded font-mono text-xs text-primary-fixed overflow-x-auto">
                  SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE
                  usename = &apos;web_app_user&apos;;
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-white/[0.06] p-4 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-secondary-fixed font-bold">
                    STEP 02: ROTATE SECRETS &amp; SALT KEYS
                  </span>
                  <span className="text-on-surface-variant">
                    CREDENTIAL HYGIENE
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Invalidate all active JWT signature keys, database master
                  credentials, and third-party service tokens accessible from
                  breached tables.
                </p>
              </div>

              <div className="bg-surface-container-lowest border border-white/[0.06] p-4 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-tertiary-fixed-dim font-bold">
                    STEP 03: BINARY LOG ANALYSIS
                  </span>
                  <span className="text-on-surface-variant">
                    EVIDENCE SCOPING
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Inspect database transaction logs (WAL/binlog) to discover the
                  complete scope of modified, deleted, or exfiltrated rows.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Sticky Action Command Deck */}
      <div className="fixed bottom-0 inset-x-0 p-3.5 bg-[#10131a]/95 border-t border-[#262b38] backdrop-blur-xl z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetSandbox}
            className="py-3 px-4 bg-[#191b23] border border-[#272a32] text-on-surface font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#272a32] hover:text-white active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setCompleted(true)}
            className={`flex-1 py-3 px-4 font-[family-name:var(--font-display)] text-sm sm:text-base uppercase tracking-wider rounded-xl font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              completed
                ? "bg-tertiary-container text-on-tertiary-container shadow-[0_0_20px_rgba(107,255,131,0.35)]"
                : "bg-primary-container text-on-primary-fixed hover:brightness-110 shadow-[0_0_20px_rgba(195,244,0,0.4)]"
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{`MODULE COMPLETED // ${lab.xp} XP RECORDED`}</span>
              </>
            ) : (
              <>
                <Award className="w-5 h-5" />
                <span>{`VERIFY PATCH (+${lab.xp} XP)`}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

