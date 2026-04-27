import { Prospect, Project } from "./types";

const PROSPECTS_KEY = "neomech_prospects";
const PROJECTS_KEY = "neomech_projects";

// PROSPECTS
export function getProspects(): Prospect[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PROSPECTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProspects(prospects: Prospect[]): void {
  localStorage.setItem(PROSPECTS_KEY, JSON.stringify(prospects));
}

export function addProspect(prospect: Prospect): void {
  const prospects = getProspects();
  prospects.push(prospect);
  saveProspects(prospects);
}

export function updateProspect(updated: Prospect): void {
  const prospects = getProspects();
  const index = prospects.findIndex((p) => p.id === updated.id);
  if (index !== -1) {
    prospects[index] = updated;
    saveProspects(prospects);
  }
}

export function deleteProspect(id: string): void {
  const prospects = getProspects().filter((p) => p.id !== id);
  saveProspects(prospects);
}

// PROJECTS
export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function addProject(project: Project): void {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
}

export function updateProject(updated: Project): void {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === updated.id);
  if (index !== -1) {
    projects[index] = updated;
    saveProjects(projects);
  }
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}

// CALCULATIONS
export function getMonthlySales(projects: Project[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  return projects
    .filter((p) => {
      if (!p.closeDate || p.status !== "finalizado") return false;
      const d = new Date(p.closeDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.value, 0);
}

export function getAverageTicket(projects: Project[]): number {
  const closed = projects.filter((p) => p.status === "finalizado");
  if (closed.length === 0) return 0;
  return closed.reduce((sum, p) => sum + p.value, 0) / closed.length;
}

export function exportToJSON(data: object, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(data: object[], filename: string): void {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => JSON.stringify((row as Record<string, unknown>)[h] ?? "")).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}