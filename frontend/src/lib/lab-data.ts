export type Difficulty = "EASY" | "MED" | "HARD" | "EXPERT";

export interface LabItem {
  id: string;
  slug: string;
  code: string;
  vectorCode: string;
  title: string;
  subtitle: string;
  category: "web" | "network" | "crypto" | "human";
  xp: number;
  difficulty: Difficulty;
  duration: string;
  status: "in_progress" | "completed" | "unlocked" | "locked";
  progressPercent?: number;
  nodesCompleted?: number;
  nodesTotal?: number;
  tags: string[];
  actionLabel: string;
  sampleHash?: string;
  curveInfo?: string;
  authStatus?: string;
  accuracyRate?: string;
  lockRequirement?: string;
  lockDeficit?: string;
}

export interface ChallengeItem {
  id: string;
  simId: string;
  category: "WEB CTF" | "FORENSICS" | "REVERSE ENG" | "CRYPTOGRAPHY";
  title: string;
  difficulty: "MEDIUM" | "HARD" | "EXPERT";
  description: string;
  xp: number;
  solvedCount: number;
  flag: string;
}

export interface CapabilityMetric {
  label: string;
  percent: number;
  accent: "volt" | "green" | "cyan" | "cyan-soft" | "crimson";
}

export interface RecentEventItem {
  id: string;
  timestamp: string;
  badge: string;
  badgeTone: "volt" | "cyan" | "green";
  description: string;
}

export const LAB_CATALOG: LabItem[] = [
  {
    id: "lab-01",
    slug: "sql-injection",
    code: "LAB_01",
    vectorCode: "VEC:SQL-884",
    title: "SQL Injection (SQLi)",
    subtitle: "Database Exploitation & Auth Bypass",
    category: "web",
    xp: 350,
    difficulty: "MED",
    duration: "25m",
    status: "in_progress",
    progressPercent: 65,
    nodesCompleted: 13,
    nodesTotal: 20,
    tags: ["Error-based", "Blind SQLi", "UNION Op", "Parameterized"],
    actionLabel: "RESUME LAB",
  },
  {
    id: "lab-02",
    slug: "phishing-analysis",
    code: "LAB_02",
    vectorCode: "VEC:HUM-109",
    title: "Phishing & Header Analysis",
    subtitle: "Social Engineering & Email Spoofing",
    category: "human",
    xp: 200,
    difficulty: "EASY",
    duration: "15m",
    status: "completed",
    authStatus: "SPF / DKIM PASSED",
    accuracyRate: "100% IDENTIFIED",
    tags: ["SPF/DKIM Validation", "Punycode Spoofing", "Link Obfuscation"],
    actionLabel: "REPLAY INTEL",
  },
  {
    id: "lab-03",
    slug: "password-hash-cracking",
    code: "LAB_03",
    vectorCode: "VEC:CRY-402",
    title: "Password & Hash Cracking",
    subtitle: "Credential Stuffing & Entropy Analysis",
    category: "crypto",
    xp: 500,
    difficulty: "HARD",
    duration: "40m",
    status: "unlocked",
    sampleHash: "$2y$12$e8ZbzW1d4W...b8Q4H.01e9wK801Z",
    tags: ["Salted Hashes", "Rainbow Tables", "bcrypt", "Brute Mitigations"],
    actionLabel: "[LAUNCH LAB]",
  },
  {
    id: "lab-04",
    slug: "network-packet-inspection",
    code: "LAB_04",
    vectorCode: "VEC:NET-711",
    title: "Network Packet Inspection",
    subtitle: "Man-In-The-Middle (MITM) & Sniffing",
    category: "network",
    xp: 450,
    difficulty: "HARD",
    duration: "35m",
    status: "locked",
    lockRequirement: "LVL 08 REQUIRED",
    lockDeficit: "CLEARANCE DEFICIT: NEED +120 XP",
    tags: ["PCAP Extraction", "ARP Poisoning", "TLS Decryption"],
    actionLabel: "LOCKED",
  },
  {
    id: "lab-05",
    slug: "cryptography-ciphers",
    code: "LAB_05",
    vectorCode: "VEC:CRY-990",
    title: "Cryptography & Ciphers",
    subtitle: "Symmetric/Asymmetric & Key Exchange",
    category: "crypto",
    xp: 650,
    difficulty: "EXPERT",
    duration: "50m",
    status: "unlocked",
    curveInfo: "CURVE: Secp256k1",
    tags: ["AES-256-GCM", "RSA 4096", "Diffie-Hellman", "Nonce reuse"],
    actionLabel: "[LAUNCH LAB]",
  },
];

export const CHALLENGE_CATALOG: ChallengeItem[] = [
  {
    id: "ctf-1",
    simId: "CR-014",
    category: "CRYPTOGRAPHY",
    title: "The Salt Shaker",
    difficulty: "HARD",
    description:
      "Crack salted MD5 legacy authentication digests. Leverage dictionary mutation rules and rainbow table cross-referencing.",
    xp: 250,
    solvedCount: 342,
    flag: "flag{salted_md5_cracked}",
  },
  {
    id: "ctf-2",
    simId: "WB-882",
    category: "WEB CTF",
    title: "Token Heist",
    difficulty: "MEDIUM",
    description:
      'Find and exploit insecure JWT signing algorithms (`alg: "none"` bypass) to forge administrator credentials on the session proxy.',
    xp: 300,
    solvedCount: 789,
    flag: "flag{jwt_alg_none_bypass}",
  },
  {
    id: "ctf-3",
    simId: "FN-901",
    category: "FORENSICS",
    title: "Wiretap Protocol",
    difficulty: "EXPERT",
    description:
      "Extract administrative session tokens and TLS pre-master secrets embedded within anomalous ICMP echo request tunnels in a 4GB PCAP capture.",
    xp: 400,
    solvedCount: 118,
    flag: "flag{icmp_tunnel_exfil}",
  },
];

export const CAPABILITY_MATRIX: CapabilityMetric[] = [
  { label: "Web App Security", percent: 88, accent: "volt" },
  { label: "Social Eng / Phishing", percent: 91, accent: "green" },
  { label: "Network Defense", percent: 76, accent: "cyan" },
  { label: "Cryptography", percent: 62, accent: "cyan-soft" },
  { label: "Malware Analysis", percent: 45, accent: "crimson" },
];

export const RECENT_EVENTS: RecentEventItem[] = [
  {
    id: "evt-1",
    timestamp: "09:42:11 UTC",
    badge: "SCORE: 100",
    badgeTone: "volt",
    description:
      "Mitigated Reflected XSS attack vector on simulated authorization proxy gateway.",
  },
  {
    id: "evt-2",
    timestamp: "YESTERDAY",
    badge: "FLAG_SECURED",
    badgeTone: "cyan",
    description:
      "Phishing analysis flag: Malicious SPF mismatch detected & quarantined.",
  },
  {
    id: "evt-3",
    timestamp: "2 DAYS AGO",
    badge: "+250 XP",
    badgeTone: "volt",
    description:
      "Decrypted RSA-2048 challenge payload utilizing co-prime prime factorization attack.",
  },
];

export const INTEL_BRIEFS = [
  {
    id: "intel-sqli",
    code: "KB // OWASP-A03",
    title: "Parameterized Queries & AST Separation",
    category: "INJECTION DEFENSE",
    summary:
      "Bind untrusted input as typed parameters rather than string interpolation so the database planner compiles SQL structure before data evaluation.",
    snippet: 'cursor.execute("SELECT * FROM users WHERE email = %s", (email,))',
  },
  {
    id: "intel-jwt",
    code: "KB // AUTH-02",
    title: "JWT Algorithm Allowlisting & Key Pinning",
    category: "SESSION SECURITY",
    summary:
      "Always enforce explicit server-side signature algorithms (e.g. RS256/ES256) and reject `alg: none` or symmetric key confusion payloads.",
    snippet: 'jwt.decode(token, PUBLIC_KEY, algorithms=["RS256"])',
  },
  {
    id: "intel-email",
    code: "KB // SPF-DKIM",
    title: "Detecting Homoglyph Spoofing & Header Forgery",
    category: "EMAIL FORENSICS",
    summary:
      "Inspect Return-Path alignment, DMARC policy enforcement, and Punycode (`xn--`) transformations to flag deceptive lookalike domains.",
    snippet: "Authentication-Results: spf=fail smtp.mailfrom=xn--pypl-7qa.com",
  },
];

