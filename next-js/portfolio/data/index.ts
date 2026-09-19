// ─── Central data exports ─────────────────────────────────────────
import personal from "./personal.json";
import projects from "./projects.json";
import experience from "./experience.json";
import skills from "./skills.json";

// ─── Experience Calculation Utility ────────────────────────────────
export const CAREER_START_DATE = "2020-11-01";

export function getYearsOfExperience(startDateStr: string = CAREER_START_DATE): number {
  const start = new Date(startDateStr);
  const now = new Date();
  const diffInYears = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(diffInYears));
}

export function getExperienceYearsLabel(startDateStr: string = CAREER_START_DATE): string {
  return `${getYearsOfExperience(startDateStr)}+`;
}

export const PERSONAL = {
  ...personal,
  stats: personal.stats.map((s) =>
    s.label.toLowerCase().includes("years") ? { ...s, value: getExperienceYearsLabel() } : s
  ),
};
export const PROJECTS = projects;
export const EXPERIENCE = experience;
export const DAG_NODES = skills.nodes;
export const DAG_EDGES = skills.edges;

// ─── Types ────────────────────────────────────────────────────────
export interface Project {
  id: string;
  featured?: boolean;
  title: string;
  tags: string[];
  status: string;
  desc: string;
  stack: string[];
  github: string;
  link: string;
}

export interface ExperienceItem {
  id: string;
  status: string;
  statusColor?: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export interface DagNode {
  id: string;
  category: string;
  label: string;
  icon: string;
  desc: string;
  skills: string[];
}

export interface DagEdge {
  from: string;
  to: string;
}

export interface PersonalData {
  name: string;
  title: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  stats: { value: string; label: string }[];
  chips: string[];
  typingTitles: string[];
}

