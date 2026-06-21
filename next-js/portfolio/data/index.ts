// ─── Central data exports ─────────────────────────────────────────
// Edit the JSON files below to update portfolio content.
// No code changes needed — just update the JSON.
//
//  data/personal.json   → name, email, chips, stats, typing titles
//  data/projects.json   → project cards (add/remove/reorder freely)
//  data/experience.json → work history timeline
//  data/skills.json     → DAG nodes and edges

import personal from "./personal.json";
import projects from "./projects.json";
import experience from "./experience.json";
import skills from "./skills.json";

export const PERSONAL = personal;
export const PROJECTS = projects;
export const EXPERIENCE = experience;
export const DAG_NODES = skills.nodes;
export const DAG_EDGES = skills.edges;

// ─── Types ────────────────────────────────────────────────────────
export interface Project {
  id: string;
  project_status: string;
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
  statusColor: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export interface DagNode {
  id: string;
  label: string;
  x: number;
  y: number;
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
