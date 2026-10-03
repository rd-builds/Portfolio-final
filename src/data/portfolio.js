import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaJava,
} from "react-icons/fa";
import { SiC, SiCplusplus, SiMysql, SiNumpy, SiPandas, SiOpencv } from "react-icons/si";
import { VscVscode, VscAzure } from "react-icons/vsc";
import { BsEye, BsChatDots, BsCpu } from "react-icons/bs";

// ─── Personal Info ───────────────────────────────────────────
export const personal = {
  name: "RIYA DUGGAL",
  firstName: "Riya",
  tagline: "AI EXPLORER • WEB DEVELOPER • PROBLEM SOLVER",
  statement: `I turn "what if?" into "let's build it."`,
  university: "Chitkara University",
  program: "CSE (AI & Future Tech) Student",
  email: "riyaduggal09@gmail.com",
  resumePath: "/resume.pdf",
  profileImage: "/img.jpeg",
};

// ─── Navigation ──────────────────────────────────────────────
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ─── About ───────────────────────────────────────────────────
export const aboutParagraphs = [
  "I'm a Computer Science student specializing in AI & Future Technologies at Chitkara University, fascinated by the process of turning complex ideas into working products. I’m drawn to challenges that push me beyond what I already know, whether that means exploring an unfamiliar technology, solving a practical problem, or building something from scratch. For me, the exciting part isn't just learning how technology works — it's discovering what I can create with it.",
  "Right now I'm focused on web development with React.js and Node.js, and exploring how AI can live inside real products — through Vision, NLP, and Chatbots. I care about building things that feel good to use and genuinely solve problems.",
  "Beyond code, I spend time in hackathons and startup spaces, learning from people who are actually shipping things. Every project teaches me something new — and honestly, that's exactly how I like it.",
];

// ─── Stats ───────────────────────────────────────────────────
export const stats = [
  { value: "9.44", label: "CGPA", sub: "(1st Year)" },
  { value: "4+", label: "Projects", sub: "Built" },
  { value: "10+", label: "Technologies", sub: "Explored" },
  { value: "2nd", label: "Year", sub: "Student" },
];

// ─── Projects ────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    number: "01",
    title: "Brand Website Generator",
    description:
      "Generates modern, responsive brand websites automatically from user inputs.",
    stack: ["React", "Node.js"],
    github: "https://github.com/rd-builds/brand-website-generator.git",
    image: "/1.png",
    accent: "#F3E8FF", // lavender
    accentDark: "#A855F7",
  },
  {
    id: 2,
    number: "02",
    title: "Repo Explainer",
    description:
      "Analyzes GitHub repositories and explains code structure using AI.",
    stack: ["AI", "NLP"],
    github: "https://github.com/rd-builds/repo-explainer.git",
    image: "/3.png",
    accent: "#DBEAFE", // blue
    accentDark: "#3B82F6",
  },
  {
    id: 3,
    number: "03",
    title: "EcoRoute AI",
    description:
      "It is an AI efficiency layer that helps users optimize prompts, reduce unnecessary token usage, choose suitable AI models, and understand the relative efficiency of their AI usage.",
    stack: ["JavaScript", "Python"],
    github: "https://github.com/rd-builds/EcoRoute-project.git",
    image: "/2.png",
    accent: "#D1FAE5", // mint
    accentDark: "#10B981",
  },
  {
    id: 4,
    number: "04",
    title: "AI Research Analyzer",
    description:
      "Extracts key insights and summaries from research papers using AI.",
    stack: ["Python", "AI"],
    github: "https://github.com/rd-builds/AI-Research-Analyzer.git",
    image: "/4.png", // placeholder
    accent: "#FEF3C7", // yellow
    accentDark: "#F59E0B",
  },
];

// ─── Technologies ────────────────────────────────────────────
export const technologies = [
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "SQL", icon: SiMysql, color: "#336791" },
  { name: "React.js", icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "Azure AI", icon: VscAzure, color: "#0078D4" },
  { name: "NLP", icon: BsCpu, color: "#EC4899" },
  { name: "Vision", icon: SiOpencv, color: "#5C3EE8" },
  { name: "Chatbots", icon: BsChatDots, color: "#14B8A6" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#181717" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
];

// ─── Achievements ────────────────────────────────────────────
export const achievements = [
  {
    id: 1,
    title: "Microsoft Azure AI Fundamentals",
    type: "Certificate",
    icon: "🏅",
    detail:
      "Earned the Azure AI Fundamentals (AI-900) certification, demonstrating knowledge of AI workloads, machine learning principles, and Azure AI services.",
  },
  {
    id: 2,
    title: "Microsoft Azure Fundamentals",
    type: "Certificate",
    icon: "🏅",
    detail:
      "Achieved the Azure Fundamentals (AZ-900) certification covering cloud concepts, core Azure services, and Azure governance.",
  },
  {
    id: 3,
    title: "Hackathons & Technical Events",
    type: "Participation",
    icon: "🚀",
    detail:
      "Actively participated in multiple hackathons and tech events, building prototypes, collaborating with teams, and presenting innovative solutions.",
  },
  {
    id: 4,
    title: "Technical Showcases / Project Presentations",
    type: "Projects",
    icon: "💡",
    detail:
      "Presented technical projects at university showcases, receiving positive feedback for innovative problem-solving and clean implementation.",
  },
];

// ─── Social Links ────────────────────────────────────────────
export const socials = {
  github: "https://github.com/rd-builds",
  linkedin: "https://www.linkedin.com/in/riyaduggal/",
  kaggle: "https://www.kaggle.com/riyaduggal",
  codeforces: "https://codeforces.com/profile/rduggal09",
};
