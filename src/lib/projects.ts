export type DiagramNode = {
  title: string;
  detail?: string;
};

export type DiagramLayer = {
  label?: string;
  nodes: DiagramNode[];
  /** Text shown on the connector arrow leading into this layer */
  edge?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  period: string;
  context: string;
  featured: boolean;
  links: { label: string; href: string }[];
  metrics: { value: string; label: string }[];
  stack: string[];
  problem: string[];
  diagram: { title: string; layers: DiagramLayer[] };
  decisions: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
};

const allProjects: Project[] = [
  {
    slug: "s3ntinel",
    name: "S3ntinel",
    tagline:
      "Real-time AWS infrastructure monitoring platform processing 10,000+ EC2 metrics per minute.",
    summary:
      "A multi-tenant observability platform that streams CPU, memory, network, and disk metrics from EC2 fleets over WebSockets, with sub-second alert latency and automated CloudWatch Agent rollout via AWS SSM.",
    period: "2025",
    context: "Personal project",
    featured: false,
    links: [],
    metrics: [
      { value: "10,000+", label: "metrics / minute" },
      { value: "<1s", label: "alert latency" },
      { value: "99.9%", label: "data accuracy" },
    ],
    stack: [
      "Go",
      "WebSockets",
      "AWS SDK",
      "CloudWatch Agent",
      "AWS SSM",
      "Time-series DB",
      "Next.js",
      "TypeScript",
    ],
    problem: [
      "Teams running EC2 fleets usually monitor them through the CloudWatch console: slow to navigate, scoped to one account, and not built for watching many instances at once. Getting a live, fleet-wide view — and getting alerted within seconds when something degrades — means stitching together dashboards, alarms, and per-instance agent setup by hand.",
      "S3ntinel solves this as a single multi-tenant platform: organizations connect their AWS accounts, agents are deployed automatically, and metrics stream into a live dashboard in real time instead of on a polling delay.",
    ],
    diagram: {
      title: "Metrics pipeline",
      layers: [
        {
          label: "AWS account (per tenant)",
          nodes: [
            { title: "EC2 fleet", detail: "CloudWatch Agent on each instance" },
            { title: "AWS SSM", detail: "automated agent deployment" },
          ],
        },
        {
          edge: "CPU / memory / network / disk",
          nodes: [
            {
              title: "Ingestion service",
              detail: "Go · AWS SDK · per-tenant collectors",
            },
          ],
        },
        {
          edge: "writes + fan-out",
          nodes: [
            {
              title: "Time-series database",
              detail: "retention + downsampling",
            },
            { title: "Alert evaluator", detail: "threshold rules, sub-second" },
          ],
        },
        {
          edge: "WebSocket push",
          nodes: [
            {
              title: "Live dashboard",
              detail: "Next.js · streaming charts per instance",
            },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "WebSockets instead of polling",
        body: "Dashboards that poll every 30–60 seconds are fine for capacity planning but useless for incident response. Persistent WebSocket connections let the server push each metric batch the moment it lands, which is what makes sub-second alert delivery possible. The trade-off is connection lifecycle management — heartbeats, reconnection with backoff, and resubscribing to the right tenant streams — which I built into the protocol from the start.",
      },
      {
        title: "A time-series database, not Postgres",
        body: "At 10,000+ data points per minute, a row-per-point relational schema bloats fast and aggregate queries (p95 CPU over 6 hours across 40 instances) get expensive. A purpose-built time-series store gives cheap appends, native downsampling, and time-bucketed queries — the access pattern is always 'metric × instance × time range', so the storage engine should be built around exactly that.",
      },
      {
        title: "AWS SSM for agent rollout",
        body: "Asking users to SSH into every instance and install the CloudWatch Agent kills onboarding. SSM Run Command lets the platform push agent installation and configuration to an entire fleet without inbound network access or key management. Onboarding a new organization becomes: connect the account, pick instances, done.",
      },
      {
        title: "Multi-tenant from day one",
        body: "Tenancy is enforced at the ingestion boundary — every metric is tagged with its organization at write time, and WebSocket subscriptions are scoped server-side so a client can only ever receive streams for its own tenant. Retrofitting isolation onto a single-tenant design later is far harder than building it in.",
      },
    ],
    challenges: [
      {
        title: "Fan-out under sustained load",
        body: "Pushing 10,000+ points per minute to many concurrent dashboard connections naively means every write triggers N socket sends. I batched outbound messages per connection on a short flush interval and moved serialization out of the hot path, so a burst of metrics becomes one frame per client per tick instead of hundreds. Slow clients get bounded buffers — if a consumer can't keep up, it drops to a snapshot-and-resume rather than back-pressuring the whole pipeline.",
      },
      {
        title: "Keeping alerts under one second",
        body: "Alert evaluation initially sat behind the database write, which put storage latency in the critical path. Splitting the pipeline so the evaluator consumes the ingest stream directly — in parallel with persistence — cut alert latency to sub-second consistently, because an alert no longer waits for a disk write to complete.",
      },
      {
        title: "Agent configuration drift",
        body: "With agents deployed across many instances, configs drift: an instance gets re-imaged, an agent dies silently, a region gets missed. Treating SSM as the reconciliation mechanism — periodically asserting desired agent state rather than installing once and hoping — is what got data accuracy to 99.9% instead of slowly decaying as fleets changed.",
      },
    ],
  },
  {
    slug: "almadina-auction",
    name: "Al Madina Silent Art Auction",
    tagline:
      "Production charity auction platform with concurrency-safe bidding, anti-sniping, Stripe payments, and AI-powered artwork discovery.",
    summary:
      "A full-stack auction system built for a real fundraiser at Al Madina School of Richmond — live bidding with PostgreSQL row-level locking, automated auction lifecycle jobs, pgvector similarity search, and a complete admin operations dashboard.",
    period: "Nov 2025 – Mar 2026",
    context: "Al Madina School of Richmond",
    featured: true,
    links: [{ label: "Live site", href: "https://almadina-auction.online" }],
    metrics: [
      { value: "0", label: "race conditions in production bidding" },
      { value: "100%", label: "type safety, DB to UI" },
      { value: "1024-dim", label: "image embeddings for discovery" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Hono",
      "oRPC",
      "Drizzle",
      "PostgreSQL",
      "pgvector",
      "Stripe",
      "Bun",
      "Turborepo",
      "Docker",
      "Cloudflare R2",
    ],
    problem: [
      "Al Madina School of Richmond runs a silent art auction as a real fundraiser — live bidders, real money, a hard event deadline. Off-the-shelf auction tools couldn't handle the combination they needed: anonymous public bidding, anti-sniping, Stripe payments, post-auction sales for unsold pieces, and pickup scheduling, all manageable by non-technical staff.",
      "The hard part isn't the CRUD around artworks. It's correctness under concurrency: two people bidding on the same piece in the same second must never corrupt state, accept an invalid amount, or double-assign a winner.",
    ],
    diagram: {
      title: "System architecture",
      layers: [
        {
          label: "Turborepo monorepo · Bun",
          nodes: [
            { title: "Next.js 16 web", detail: "React 19 + React Compiler" },
            { title: "Hono API server", detail: "oRPC · end-to-end types" },
          ],
        },
        {
          edge: "type-safe RPC · Zod on every boundary",
          nodes: [
            {
              title: "PostgreSQL",
              detail: "Drizzle ORM · row-level locking · pgvector",
            },
            { title: "Cloudflare R2", detail: "artwork images · avatars" },
          ],
        },
        {
          edge: "webhooks + cron (bearer-secured)",
          nodes: [
            { title: "Stripe", detail: "Payment Intents · receipts" },
            {
              title: "Lifecycle jobs",
              detail: "status sweep · winner sweep · self-healing",
            },
            {
              title: "Replicate ImageBind",
              detail: "1024-dim embeddings on upload",
            },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Row-level locking for bids",
        body: "Every bid runs inside a transaction that takes SELECT … FOR UPDATE on the artwork row, making each artwork a serialization point. Two simultaneous bids are forced into a strict order: the second one re-reads the post-commit state and is validated against the actual current high bid. This eliminates double-spend and invalid-amount races at the database layer instead of hoping application logic catches them.",
      },
      {
        title: "oRPC + Drizzle for end-to-end type safety",
        body: "A change to an API input type propagates through server, client, and UI with compile-time errors — no manually maintained API types, no drift. On a solo project with a hard deadline, this is a velocity decision as much as a safety one: entire classes of runtime validation bugs simply can't ship.",
      },
      {
        title: "pgvector inside Postgres, not a separate vector DB",
        body: "Artwork uploads generate a 1024-dimensional ImageBind embedding via Replicate, stored in the same Postgres database that holds the auction data. 'Similar artworks' is one cosine-distance query joined against normal relational filters. For a catalog of hundreds of pieces, a dedicated vector database would have added an operational dependency for zero benefit.",
      },
      {
        title: "Cron jobs over real-time schedulers",
        body: "Auction lifecycle (scheduled → live → closed, winner assignment) runs on idempotent cron sweeps that log to a job_runs audit table, including a self-healing pass that catches zombie auctions. Idempotent sweeps are boring and recoverable: if a run fails, the next one fixes it. An in-process timer that fires exactly once is the opposite.",
      },
      {
        title: "Privacy enforced at the data layer",
        body: "Public users see anonymized bids ('Bidder #42'); admins see full identity. The API shapes the response per procedure tier (public / protected / admin) so the anonymity guarantee doesn't depend on the UI remembering to hide a field.",
      },
    ],
    challenges: [
      {
        title: "Anti-sniping that can't be gamed",
        body: "Last-second sniping ruins silent auctions. Bids inside a configurable window (default 90 seconds) extend the auction end time — but extensions had to be monotonic, only ever moving the end time forward. The subtle bug class here is two near-simultaneous late bids computing extensions from different observed end times; because extension happens inside the same row-locked transaction as the bid itself, the second bid always sees the first one's extension.",
      },
      {
        title: "Payments meeting the real world",
        body: "Stripe webhooks arrive out of order, retry, and occasionally duplicate. The fulfillment handler verifies signatures, treats events idempotently, and marks artworks paid with receipt URLs only on confirmed payment. Winner-only payment pages enforce access control server-side — a URL leak can't let someone else pay for (or claim) a piece.",
      },
      {
        title: "An admin suite for non-engineers",
        body: "The school staff running the event aren't developers. The admin dashboard had to cover the entire operation — live revenue stats, artwork scheduling, drag-and-drop image ordering, bidder management, payment tracking, pickup appointments with enforced business rules (Mon–Thu, 9–11 AM, paid winners only). Building operational tooling people actually use ended up being as much work as the auction engine, and as important.",
      },
      {
        title: "Profile queries without N+1",
        body: "Bidder profiles aggregate active bids with live winning/outbid status, watchlists, wins, payment state, and appointments. Done naively this is a dozen queries per profile. CTEs and LATERAL joins collapse it into a small number of round trips, which kept profile loads fast even during the event-night traffic spike.",
      },
    ],
  },
  {
    slug: "aissistant",
    name: "AISSISTANT — Local Voice AI",
    tagline:
      "On-device voice assistant with a fine-tuned neural TTS model and a multimodal OCR → LLM → TTS pipeline. No external APIs.",
    summary:
      "A privacy-first voice assistant that runs LLM inference and custom text-to-speech entirely locally — built to prove that a useful multimodal assistant doesn't need to ship your data to a cloud API.",
    period: "Apr 2025 – Jul 2025",
    context: "Personal project",
    featured: false,
    links: [],
    metrics: [
      { value: "100%", label: "on-device, zero external APIs" },
      { value: "OCR→LLM→TTS", label: "multimodal pipeline" },
      { value: "Fine-tuned", label: "custom neural TTS voice" },
    ],
    stack: [
      "Python",
      "PyTorch",
      "Local LLM inference",
      "Neural TTS",
      "Fine-tuning",
      "OCR",
      "Audio processing",
    ],
    problem: [
      "Voice assistants are surveillance devices by default: audio, screen content, and queries get shipped to someone else's servers. For sensitive contexts — reading private documents aloud, asking questions about personal data — that's disqualifying.",
      "AISSISTANT runs the entire loop locally: it can see (OCR over screen content or documents), reason (local LLM inference), and speak (a fine-tuned neural TTS model), with nothing leaving the machine. The engineering challenge is doing all three at usable latency on consumer hardware.",
    ],
    diagram: {
      title: "Multimodal pipeline",
      layers: [
        {
          label: "Input",
          nodes: [
            { title: "Voice input", detail: "local speech capture" },
            { title: "Screen / document", detail: "OCR extraction" },
          ],
        },
        {
          edge: "normalized text context",
          nodes: [
            {
              title: "Local LLM inference",
              detail: "on-device · no API calls",
            },
          ],
        },
        {
          edge: "response text",
          nodes: [
            {
              title: "Fine-tuned neural TTS",
              detail: "custom voice · streaming audio synthesis",
            },
          ],
        },
        {
          edge: "audio out",
          nodes: [{ title: "Playback", detail: "low-latency audio pipeline" }],
        },
      ],
    },
    decisions: [
      {
        title: "Fully local, even where cloud would be easier",
        body: "Every component — speech, OCR, LLM, TTS — was chosen or built to run on-device. This forces real engineering trade-offs (model size vs. quality vs. latency) that calling an API hides from you, and it makes the privacy guarantee absolute rather than a policy promise.",
      },
      {
        title: "Fine-tuning TTS instead of using a stock voice",
        body: "Stock open-source TTS voices are serviceable but generic, and they fall apart on unusual phonetic input. Fine-tuning a neural TTS model gave control over voice identity and let me directly target the failure cases I was seeing — at the cost of owning the training loop, dataset preparation, and evaluation myself.",
      },
      {
        title: "OCR as the second modality, not a camera feed",
        body: "The most useful 'vision' for a desktop assistant is reading what's on screen or in a document — OCR text is compact, feeds directly into LLM context, and is dramatically cheaper than running a vision model locally. It was the highest-value multimodal capability per unit of compute.",
      },
    ],
    challenges: [
      {
        title: "TTS inference latency",
        body: "Inference latency became the bottleneck as I pushed for natural-sounding output — a multi-second wait before the assistant starts speaking destroys the conversational feel. I cut perceived latency by chunking synthesis at phrase boundaries and streaming audio as it was generated, so playback starts while the rest of the response is still being synthesized, and by profiling the synthesis path to keep the model warm between turns.",
      },
      {
        title: "Robustness at phonetic edge cases",
        body: "Fine-tuned TTS models behave well on text resembling their training distribution and badly elsewhere: abbreviations, code identifiers, mixed-language fragments, numbers. I built an evaluation set specifically from these edge cases and iterated on text normalization ahead of the model — fixing input representation turned out to be more effective per hour invested than more fine-tuning epochs.",
      },
      {
        title: "Noisy, ambiguous multimodal input",
        body: "OCR output from real screens is messy — broken line ordering, UI chrome mixed into content, partial words. Feeding it raw into the LLM produced confidently wrong answers. The fix was a cleanup-and-structure pass between OCR and the LLM, plus prompting that makes the model acknowledge unreadable regions instead of hallucinating over them.",
      },
      {
        title: "Thinking about misuse",
        body: "A voice-cloning-capable TTS pipeline has obvious spoofing risks. I evaluated output consistency across speakers and inputs partly to understand how easily the system could be misused, which shaped what I built — voice identity stays a local artifact, not a hosted service anyone can hit.",
      },
    ],
  },
  {
    slug: "legalrag",
    name: "LegalRAG",
    tagline:
      "Agentic RAG platform for legal research — a LangChain tool-calling agent with streaming answers, source citations, and full tool observability.",
    summary:
      "A legal intelligence chat platform where an autonomous agent decides when to search a vector database of legal documents, grounds its answers in retrieved passages, and streams every tool call and citation to the UI in real time.",
    period: "Jan 2025 – May 2025",
    context: "Built during an AI engineering internship",
    featured: true,
    links: [],
    metrics: [
      { value: "60%+", label: "faster document review" },
      { value: "30%", label: "fewer low-confidence responses" },
      { value: "75%", label: "less manual lookup time" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "LangChain",
      "Gemini 2.5 Flash",
      "Weaviate",
      "PostgreSQL",
      "Drizzle",
      "Better Auth",
    ],
    problem: [
      "Legal research is retrieval-heavy and precision-critical: attorneys and paralegals spend hours locating the right clause, precedent, or definition across large document sets, and a confidently wrong answer is worse than no answer.",
      "LegalRAG turns that workflow into a conversation — but one where every answer is auditable. The agent searches a legal document database on its own judgment, and the UI shows exactly which tools ran and which passages (document, page, paragraph) grounded each response.",
    ],
    diagram: {
      title: "Agentic retrieval flow",
      layers: [
        {
          nodes: [
            {
              title: "Chat UI",
              detail: "streaming render · tool usage panel · citations",
            },
          ],
        },
        {
          edge: "POST /api/llm · custom JSON event stream",
          nodes: [
            {
              title: "LangChain agent",
              detail: "Gemini 2.5 Flash · AgentExecutor",
            },
          ],
        },
        {
          edge: "legal_document_search (agent-invoked)",
          nodes: [
            {
              title: "Weaviate",
              detail: "hybrid vector + BM25 · Legal_Files collection",
            },
            {
              title: "PostgreSQL",
              detail: "chat history · auth · Drizzle ORM",
            },
          ],
        },
        {
          edge: "passages + metadata (doc · page · paragraph)",
          nodes: [
            {
              title: "Grounded answer",
              detail: "streamed output + sources + tool steps",
            },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "An agent, not a fixed RAG pipeline",
        body: "A hardwired embed-retrieve-prompt chain searches on every message, even when the user is asking a follow-up that needs no retrieval. A LangChain tool-calling agent decides when to invoke legal_document_search based on conversation context — fewer wasted searches, better multi-turn behavior, and the architecture extends naturally to additional tools.",
      },
      {
        title: "Hybrid retrieval in Weaviate",
        body: "Legal language is exact-match-sensitive — section numbers, defined terms, party names — which pure vector similarity handles poorly, while pure keyword search misses paraphrased concepts. Hybrid vector + BM25 retrieval over the structured legal corpus covers both, with each result carrying document, page, and paragraph metadata so citations are precise enough to verify.",
      },
      {
        title: "A custom streaming protocol",
        body: "The /api/llm route streams a typed JSON event stream over a ReadableStream — output events for generated text, sources events for intermediate tool steps. The client parses it incrementally with TextDecoder. This is what makes the tool-observability UI possible: the frontend learns about a search the moment the agent starts it, not after the answer finishes.",
      },
      {
        title: "Observability as a product feature",
        body: "In a legal context, 'trust me' is not an answer. The ToolUsageDisplay shows every tool call with live status (pending → running → completed → error), inputs, outputs, and timing, and the Sources panel quotes the exact retrieved text. Explainability was designed in, not bolted on.",
      },
      {
        title: "Production auth and persistence from the start",
        body: "Better Auth with PostgreSQL and Drizzle: email/password with verification, GitHub OAuth, password reset, server-side session checks. Chat history is persisted to Postgres, so research sessions survive across devices and time — table stakes for a tool professionals would actually rely on.",
      },
    ],
    challenges: [
      {
        title: "Hallucination and context poisoning",
        body: "Early versions would blend retrieved passages with the model's prior beliefs, producing fluent answers that cited nothing. I analyzed failure modes — hallucination on sparse retrievals, context poisoning when an irrelevant chunk dominated the window — and implemented retrieval constraints and chunking strategies that measurably improved factual consistency on ambiguous queries.",
      },
      {
        title: "Relevance vs. noise in context selection",
        body: "Stuffing more chunks into context felt safer but degraded answers: the model anchored on marginal passages. Experimenting with embedding retrieval strategies and ranking methods to optimize the relevance/noise trade-off cut incorrect or low-confidence responses by about 30%.",
      },
      {
        title: "Streaming two channels through one response",
        body: "Interleaving token output and tool-step events in a single HTTP stream meant designing framing the client can parse incrementally without ever seeing a torn message. Getting buffering, flush timing, and error propagation right — an agent error mid-stream has to surface in the UI, not silently truncate the answer — took real protocol work.",
      },
      {
        title: "Concurrency under load",
        body: "The API layer had to hold up under concurrent LLM interactions and adversarial or malformed inputs. Stress-testing surfaced issues like unbounded streams on abandoned requests and prompt-shaped inputs in document text; hardening against them is what made the system stable under high load rather than just demo-stable.",
      },
    ],
  },
  {
    slug: "icna-health-fair",
    name: "ICNA Relief Health Fair Portal",
    tagline:
      "Tablet-first volunteer portal for community health fairs — Salesforce as the single source of truth, zero patient data stored locally.",
    summary:
      "A production Laravel application that lets rotating volunteers register patients and record clinical screenings at seven stations, writing everything to Salesforce through a resilient Apex REST integration.",
    period: "Mar 2026 – Present",
    context: "ICNA Relief · Full-Stack Engineer",
    featured: true,
    links: [],
    metrics: [
      { value: "0", label: "PHI records stored locally" },
      { value: "7", label: "clinical screening stations" },
      { value: "OAuth 2.0", label: "resilient Salesforce integration" },
    ],
    stack: [
      "Laravel 12",
      "PHP 8.3",
      "Salesforce Apex REST",
      "OAuth 2.0",
      "Tailwind CSS 4",
      "MySQL",
      "Docker",
      "Traefik",
      "GitHub Actions",
    ],
    problem: [
      "ICNA Relief runs community health fairs where volunteers need to move fast: register attendees, capture vitals, and log screenings — blood pressure, glucose, anemia, lipid panel, HbA1c, and more — on shared tablets, often with spotty Wi-Fi and a different volunteer at the station every hour.",
      "All of that data has to land in Salesforce reliably, because Salesforce is the organization's system of record. Asking rotating volunteers to work directly in Salesforce was a non-starter, so this portal is the thin, purpose-built layer in front of it.",
    ],
    diagram: {
      title: "Zero-PHI-local architecture",
      layers: [
        {
          label: "In the field",
          nodes: [
            {
              title: "Shared tablets",
              detail: "OTP auth · localStorage ↔ session sync",
            },
          ],
        },
        {
          edge: "registration · vitals · 7 screening stations",
          nodes: [
            {
              title: "Laravel 12 portal",
              detail: "session state only — no patient data stored",
            },
          ],
        },
        {
          edge: "OAuth 2.0 client credentials · retries · 401 recovery",
          nodes: [
            {
              title: "Salesforce Apex REST",
              detail: "single source of truth for all clinical data",
            },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Store no patient data, anywhere",
        body: "The portal deliberately keeps no local database of clients or health results — Laravel holds only session state (selected fair, cached search results, auth). For a healthcare-adjacent system this is the strongest possible privacy posture: there is no second copy of PHI to secure, audit, or migrate, and Salesforce remains the unambiguous system of record.",
      },
      {
        title: "A real integration layer, not an HTTP wrapper",
        body: "The Salesforce client implements OAuth 2.0 client credentials with cached tokens and TTL management, automatic refresh on 401s, configurable retries with backoff for transient failures, and structured error parsing. Field conditions — flaky Wi-Fi, long days, token expiry mid-event — were the design assumption, not an edge case.",
      },
      {
        title: "Validation mirroring Salesforce schemas",
        body: "Form validation reproduces Salesforce field rules client-side — height as feet.inches (5.08 for 5'8\"), age and weight bounds, picklist values — so bad data is rejected at the tablet instead of bouncing off the API mid-rush. The ClientStationData layer also normalizes Salesforce's inconsistent field naming into stable form defaults.",
      },
      {
        title: "Auth shaped around how volunteers work",
        body: "Email OTP restricted to the org domain, rate limiting on OTP endpoints, optional HTTP Basic Auth for shared station devices with timing-safe comparison, and a feature flag for throwaway test deploys that displays a visible 'Auth disabled' badge. Session regeneration after OTP verification. Practical security for shared devices, with tests covering the auth flag, OTP bypass, and Basic Auth behavior.",
      },
    ],
    challenges: [
      {
        title: "Shared-tablet handoff",
        body: "Volunteers hand tablets to each other constantly, and losing the selected health fair on every handoff meant re-navigation at the worst moment. The fix: persist event selection in localStorage and sync it back into the Laravel session on page load, so context survives across volunteers, page reloads, and session churn.",
      },
      {
        title: "Instant feedback without a second round-trip",
        body: "After a successful Salesforce save, volunteers need to see the new reading immediately — but re-fetching from Salesforce adds seconds when people are queued at a station. A SyncsClientSession concern merges the just-saved values into session state, so the UI reflects new data instantly while Salesforce remains the source of truth.",
      },
      {
        title: "Schema bridging across naming conventions",
        body: "The same blood pressure value might arrive as Systolic_Blood_Pressure__c, bloodPressureSystolic, or nested under results.bloodPressure depending on the endpoint. Normalizing this mess into consistent form defaults is unglamorous work, but it's exactly the work that makes an enterprise integration hold up in production.",
      },
      {
        title: "Production deployment for field operations",
        body: "Multi-stage Docker builds (PHP 8.3-FPM, Nginx), images pushed to GHCR, GitHub Actions CI/CD with SSH deploys of immutable SHA-tagged images, Traefik with Let's Encrypt for HTTPS, migrations on container start, health checks at /up. A health fair can't wait on a broken deploy — the pipeline had to be boring and repeatable.",
      },
    ],
  },
];

const order = [
  "icna-health-fair",
  "almadina-auction",
  "legalrag",
  "s3ntinel",
  "aissistant",
];

export const projects = [...allProjects].sort(
  (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
