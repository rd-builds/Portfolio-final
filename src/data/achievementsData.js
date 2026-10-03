// ─── Centralized Achievements & Detail Pages Data ─────────────────
// Easily modify, add, or replace text, badges, and image paths here.

export const mainCategories = [
  {
    id: "hackathons",
    title: "HACKATHONS & PROJECT SHOWCASES",
    route: "/hackathons",
    isClickable: true,
    badge: "4 ENTRIES",
    image: "/images/achievements/hackathons.jpg",
    description: "High-pressure builds, sleepless nights, rapid prototypes, and competitive engineering solutions.",
    gradient: "linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)",
  },
  {
    id: "certifications",
    title: "CERTIFICATIONS",
    route: "/certifications",
    isClickable: true,
    badge: "2 CERTIFICATES",
    image: "/images/achievements/certifications.jpg",
    description: "Official cloud, AI, and engineering credentials accredited by Microsoft and leading platforms.",
    gradient: "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 50%, #a78bfa 100%)",
  },
  {
    id: "open-source",
    title: "OPEN SOURCE",
    route: null,
    isClickable: false,
    badge: "IN PROGRESS",
    image: "/images/achievements/open-source.jpg",
    description: "Open source contributions, repository tooling, and public development initiatives.",
    gradient: "linear-gradient(135deg, #bae6fd 0%, #93c5fd 50%, #60a5fa 100%)",
  },
  {
    id: "club-roles",
    title: "CLUB ROLES",
    route: "/club-roles",
    isClickable: true,
    badge: "2 ROLES",
    image: "/images/achievements/club-roles.jpg",
    description: "Student leadership, technical chapters, and campus innovation societies.",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)",
  },
];

// ─── Hackathons & Project Showcases (Exactly 4 Cards) ─────────────
export const hackathonsData = [
  {
    id: "merge-conflict-2025",
    number: "01",
    title: "Merge Conflict 2025",
    subtitle: "IIT Roorkee Flagship Hackathon",
    achievement: "3rd Place in open innovation",
    timeline: "2025",
    venue: "Devfolio • IIT Roorkee",
    description:
      "Secured 3rd Place in the Open Track at Merge Conflict 2025, the flagship hackathon of IIT Roorkee. As part of Team Creative Coders, developed a complete AI-powered system featuring a RAG pipeline, Python backend orchestration, and a 3D lip-synced AI avatar, delivering an end-to-end solution under intense time constraints.",
    tags: ["AI / RAG", "Python", "3D Avatar", "FastAPI"],
    // Replace these image paths with your actual images anytime
    image1: "/images/hackathons/merge-conflict-1.jpg",
    image2: "/images/hackathons/merge-conflict-2.jpg",
    image1Label: "System Demo & UI Flow",
    image2Label: "Award / Result Verification",
  },
  {
    id: "makeathon-2025",
    number: "02",
    title: "Makeathon 2025",
    subtitle: "TIET Annual Hackathon",
    achievement: "Top 10 / 100+ Teams",
    timeline: "2025",
    venue: "Thapar Institute of Engineering and Technology",
    description:
      "Ranked among the Top 10 teams out of 100+ teams at Makeathon 2025, TIET, where I collaborated on building a scalable solution through rapid ideation, system design, and development in a fast-paced innovation environment.",
    tags: ["React.js", "Node.js", "Full Stack", "System Design"],
    image1: "/images/hackathons/makeathon-1.jpg",
    image2: "/images/hackathons/makeathon-2.jpg",
    image1Label: "Prototype Dashboard",
    image2Label: "Team Presentation & Pitch",
  },
  {
    id: "ai-research-analyzer-showcase",
    number: "03",
    title: "AI Research Analyzer Showcase",
    subtitle: "Technical Showcase & Demo",
    achievement: "Featured Project Showcase",
    timeline: "2025",
    venue: "Chitkara University",
    description:
      "Demonstrated an autonomous AI Research Analyzer that parses, extracts key findings, and generates visual summaries from dense multi-page academic papers using state-of-the-art NLP models and custom summarization heuristics.",
    tags: ["Python", "NLP", "Document AI", "Streamlit"],
    image1: "/images/hackathons/showcase-1.jpg",
    image2: "/images/hackathons/showcase-2.jpg",
    image1Label: "Extraction Pipeline UI",
    image2Label: "Structured Output View",
  },
  {
    id: "brand-website-generator-sprint",
    number: "04",
    title: "Brand Website Generator Sprint",
    subtitle: "Rapid Prototyping Build",
    achievement: "Finalist Prototype",
    timeline: "2024",
    venue: "Innovation Lab Showcase",
    description:
      "Built an intelligent automated brand website generation tool from scratch within 36 hours. Users provide business goals and style keywords, and the engine dynamically outputs responsive styled layouts with semantic components.",
    tags: ["React", "Tailwind CSS", "Node.js", "UI Engine"],
    image1: "/images/hackathons/brandgen-1.jpg",
    image2: "/images/hackathons/brandgen-2.jpg",
    image1Label: "Interactive Configurator",
    image2Label: "Generated Website Layout",
  },
];

// ─── Certifications Data (2 Cards) ────────────────────────────────
export const certificationsData = [
  {
    id: "azure-ai-fundamentals",
    number: "01",
    title: "Microsoft Certified: Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    achievement: "Official Certification",
    timeline: "2024",
    venue: "Microsoft Learn / Pearson VUE",
    description:
      "Demonstrated foundational knowledge of machine learning (ML) and artificial intelligence (AI) concepts and related Microsoft Azure services, computer vision, natural language processing, and conversational AI workloads.",
    tags: ["Azure AI", "Machine Learning", "Computer Vision", "NLP"],
    image1: "/images/certifications/azure-ai-900.jpg",
    image2: "/images/certifications/azure-ai-badge.jpg",
    image1Label: "Official Certificate (AI-900)",
    image2Label: "Microsoft Certified Badge",
  },
  {
    id: "azure-fundamentals",
    number: "02",
    title: "Microsoft Certified: Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    achievement: "Official Certification",
    timeline: "2024",
    venue: "Microsoft Learn / Pearson VUE",
    description:
      "Validated core cloud concepts, security, privacy, compliance, and foundational knowledge of cloud services including Azure architecture, management, governance, and cloud computing pricing models.",
    tags: ["Cloud Computing", "Azure Architecture", "Security & Governance"],
    image1: "/images/certifications/azure-az-900.jpg",
    image2: "/images/certifications/azure-az-badge.jpg",
    image1Label: "Official Certificate (AZ-900)",
    image2Label: "Microsoft Certified Badge",
  },
];

// ─── Club Roles Data (Exactly 2 Cards) ────────────────────────────
export const clubRolesData = [
  {
    id: "ai-future-tech-society",
    number: "01",
    organization: "AI & Future Technologies Society",
    role: "Technical Core Member",
    achievement: "Core Member",
    timeline: "2024 – Present",
    venue: "Chitkara University",
    description:
      "Active member of the core technical committee organizing AI workshops, hands-on coding sessions, and peer learning initiatives on emerging technology, computer vision, and modern web application development.",
    responsibilities:
      "Assisting peers with foundational programming, coordinating hackathon participation groups, and conducting hands-on sessions on AI tools.",
    tags: ["Technical Mentorship", "AI Workshops", "Community Building"],
    image1: "/images/club-roles/ai-club-1.jpg",
    image2: "/images/club-roles/ai-club-2.jpg",
    image1Label: "Technical Workshop Session",
    image2Label: "Team Collaboration & Events",
  },
  {
    id: "web-dev-innovation-cell",
    number: "02",
    organization: "Developer & Innovation Student Chapter",
    role: "Web Development Contributor",
    achievement: "Active Contributor",
    timeline: "2024 – Present",
    venue: "Chitkara University",
    description:
      "Collaborated on campus event portals and web interfaces, helping build performant frontend solutions and participating in student tech showcases across departments.",
    responsibilities:
      "Developed responsive event landing pages, maintained chapter repositories, and helped streamline onboarding for new tech enthusiasts.",
    tags: ["Frontend Dev", "Event Platforms", "Student Chapter"],
    image1: "/images/club-roles/web-dev-1.jpg",
    image2: "/images/club-roles/web-dev-2.jpg",
    image1Label: "Campus Event Portal Build",
    image2Label: "Student Showcase Demo",
  },
];
