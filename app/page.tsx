"use client";
import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { ICPSection } from "./components/ICPSection";
import { ScriptsSection } from "./components/ScriptsSection";
import { TasksSection } from "./components/TasksSection";
import { DashboardSection } from "./components/DashboardSection";

const NAV = [
  { key: "inicio", label: "Inicio" },
  { key: "icp", label: "ICP & Flujo" },
  { key: "scripts", label: "Scripts" },
  { key: "tareas", label: "Tareas" },
  { key: "dashboard", label: "Dashboard" },
];

export default function Home() {
  const [active, setActive] = useState("inicio");
  const [monthlySales, setMonthlySales] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--rb-bg)" }}>
      {/* TOP NAV */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--rb-surface)", borderColor: "var(--rb-border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-bold px-2 py-1 rounded"
              style={{ background: "var(--rb-accent)", color: "#fff" }}
            >
              NM
            </div>
            <span className="font-bold text-sm hidden sm:block">
              Playbook Comercial Neomech
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className="px-3 py-1.5 rounded text-sm font-medium transition-all"
                style={{
                  background: active === n.key ? "var(--rb-accent)" : "transparent",
                  color: active === n.key ? "#fff" : "var(--rb-muted)",
                }}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded"
            style={{ background: "var(--rb-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-2"
            style={{ borderColor: "var(--rb-border)", background: "var(--rb-surface)" }}
          >
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => { setActive(n.key); setMobileOpen(false); }}
                className="w-full text-left px-3 py-2 rounded text-sm font-medium transition-all block"
                style={{
                  background: active === n.key ? "var(--rb-secondary)" : "transparent",
                  color: active === n.key ? "var(--rb-accent)" : "var(--rb-text)",
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {active === "inicio" && (
          <HeroSection
            monthlySales={monthlySales}
            onNavigate={setActive}
          />
        )}
        {active === "icp" && <ICPSection />}
        {active === "scripts" && <ScriptsSection />}
        {active === "tareas" && <TasksSection />}
        {active === "dashboard" && (
          <DashboardSection onSalesUpdate={setMonthlySales} />
        )}
      </main>

      {/* FOOTER */}
      <footer
        className="border-t mt-12 py-4 text-center text-xs"
        style={{ borderColor: "var(--rb-border)", color: "var(--rb-muted)" }}
      >
        Neomech Playbook Comercial — Sistema operativo para llegar a $5M en 90 días
      </footer>
    </div>
  );
}