export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  projectSlug?: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "ICNA Relief",
    title: "Full-Stack Engineer",
    location: "Remote",
    period: "Mar 2026 – Present",
    projectSlug: "icna-health-fair",
    bullets: [
      "Architected a Laravel 12 health fair operations platform unifying client search, registration, and multi-station clinical screenings (blood pressure, lipids, glucose/A1c, anemia) into a single volunteer workflow that syncs to Salesforce in real time during live community health events.",
      "Engineered a resilient Salesforce Apex REST integration using OAuth 2.0 client credentials with cached token lifecycle management, automatic 401 recovery, and configurable HTTP retries.",
      "Containerized production deployment with multi-stage Docker builds (PHP 8.3-FPM, Nginx, MySQL 8.4, Traefik + Let's Encrypt) for reliable HTTPS hosting in the field.",
    ],
  },
  {
    company: "Al Madina School of Richmond",
    title: "Full-Stack Engineer",
    location: "Hybrid · Midlothian, VA",
    period: "Nov 2025 – Mar 2026",
    projectSlug: "almadina-auction",
    bullets: [
      "Architected a high-concurrency bidding engine using row-level serialization (SELECT … FOR UPDATE) to guarantee zero race conditions during high-frequency bidding wars, eliminating double-spending risks.",
      "Engineered a hybrid search system combining relational filtering with AI-powered vector similarity search (pgvector + ImageBind embeddings) for semantic discovery of visually similar artworks.",
      "Built an end-to-end type-safe RPC layer with Hono and oRPC, achieving 100% type safety across the stack and eliminating runtime data validation errors.",
    ],
  },
  {
    company: "Ilham",
    title: "AI Intern",
    location: "Glen Allen, VA",
    period: "May 2025 – Present",
    bullets: [
      "Engineered and deployed AI text-to-speech processing pipelines, identifying optimal voice synthesis models and configuring them for production — a 70% improvement in audio generation speed and 50% less manual configuration time.",
      "Spearheaded integration and deployment of custom-trained TTS models onto Microsoft Azure, enabling scalable voice services with 99.9% uptime and supporting expansion into multilingual voice use cases.",
      "Reduced inference latency by 40% through model selection and infrastructure optimization, and replaced weekly manual model uploads with automated CI/CD deployment.",
    ],
  },
  {
    company: "Penta",
    title: "AI Engineer",
    location: "Midlothian, VA",
    period: "Jan 2025 – May 2025",
    projectSlug: "legalrag",
    bullets: [
      "Architected a secure, high-throughput RAG system and analyzed failure modes such as hallucination and context poisoning, implementing retrieval constraints and chunking strategies that improved factual consistency.",
      "Designed and evaluated context selection pipelines for a conversational AI agent, experimenting with embedding retrieval and ranking methods to cut incorrect or low-confidence responses by 30%.",
      "Engineered a scalable API layer for concurrent LLM interactions, stress-testing behavior under adversarial and malformed inputs to ensure stable, context-aware dialogue under high load.",
    ],
  },
  {
    company: "Virginia Commonwealth University",
    title: "AI Research — Digital Forensics",
    location: "Richmond, VA",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Investigated machine learning for anomaly detection in digital forensic data, evaluating model performance under noisy and adversarial conditions.",
      "Developed and tested ML pipelines for automated forensic analysis, analyzing trade-offs between detection accuracy and false positives in high-stakes cybersecurity contexts.",
      "Explored computer vision and NLP for forensic intelligence, studying how model outputs could be manipulated by crafted inputs and the implications for AI trustworthiness.",
    ],
  },
];

export const education = {
  school: "Virginia Commonwealth University",
  degree: "BS, Computer Science",
  graduation: "Dec 2027",
  location: "Richmond, VA",
};
