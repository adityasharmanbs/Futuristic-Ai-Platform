import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wand2,
  Terminal,
  BarChart3,
  FolderOpen,
  Settings,
  Zap,
  Crown,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/tools", icon: Wand2, label: "AI Tools" },
  { href: "/prompt", icon: Terminal, label: "Prompt Studio" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "#", icon: FolderOpen, label: "Projects" },
  { href: "#", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        data-testid="button-mobile-menu"
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-card/80 backdrop-blur-md border border-border text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={`
          fixed md:relative z-40 md:z-auto
          w-[240px] h-full flex flex-col
          bg-sidebar/95 backdrop-blur-xl
          border-r border-sidebar-border
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.4)]">
            <Zap size={16} className="text-black" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            CreatorOS
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = location === href || (href !== "#" && location.startsWith(href) && href !== "/");
            return (
              <Link
                key={label}
                href={href}
                data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm font-medium cursor-pointer
                    transition-all duration-200 group
                    ${active
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  `}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                  )}
                  <Icon
                    size={16}
                    className={active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                  />
                  <span>{label}</span>
                  {active && <ChevronRight size={12} className="ml-auto text-primary/60" />}
                </div>
              </Link>
            );
          })}
        </nav>

        <AuthFooter />
      </motion.aside>
    </>
  );
}

function AuthFooter() {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Creator";
  const email = user?.email || "";

  return (
    <div className="p-3 border-t border-sidebar-border">
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary to-primary flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]">
          {displayName.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
          <p className="text-[10px] text-muted-foreground truncate">{email}</p>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
          <Crown size={9} className="text-primary" />
          <span className="text-[9px] font-bold text-primary">PRO</span>
        </div>
      </div>
    </div>
  );
}
