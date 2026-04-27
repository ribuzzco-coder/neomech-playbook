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
    <div className="min-h-screen" style={{ background: "#0b0b10" }}>
      {/* TOP NAV */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(11,11,16,0.92)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{
                background: "linear-gradient(135deg, #e625ff, #5b16e6)",
                color: "#fff",
                boxShadow: "0 0 12px rgba(230,37,255,0.4)",
              }}
            >
              NM
            </div>
            <span className="font-bold text-sm hidden sm:block font-heading" style={{ color: "#f5f7fa" }}>
              Playbook Comercial <span style={{ color: "#e625ff" }}>Neomech</span>
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active === n.key
                    ? "linear-gradient(135deg, rgba(230,37,255,0.2), rgba(91,22,230,0.15))"
                    : "transparent",
                  color: active === n.key ? "#e625ff" : "#98a0b3",
                  border: active === n.key ? "1px solid rgba(230,37,255,0.24)" : "1px solid transparent",
                }}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "#f5f7fa" }}
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
            className="md:hidden border-t px-4 py-3 space-y-1"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(11,11,16,0.98)" }}
          >
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => { setActive(n.key); setMobileOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium block"
                style={{
                  background: active === n.key ? "rgba(230,37,255,0.1)" : "transparent",
                  color: active === n.key ? "#e625ff" : "#c7cbd6",
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
        {active === "inicio" && <HeroSection monthlySales={monthlySales} onNavigate={setActive} />}
        {active === "icp" && <ICPSection />}
        {active === "scripts" && <ScriptsSection />}
        {active === "tareas" && <TasksSection />}
        {active === "dashboard" && <DashboardSection onSalesUpdate={setMonthlySales} />}
      </main>

      {/* FOOTER */}
      <footer
        className="border-t mt-16 py-6 text-center text-xs"
        style={{ borderColor: "rgba(255,255,255,0.06)", color: "#98a0b3" }}
      >
        <span style={{ color: "#e625ff" }}>Neomech</span> × <span style={{ color: "#98a0b3" }}>RiBuzz</span>
        {" — "}Sistema operativo para llegar a $5M en 90 días
      </footer>
    </div>
  );
}