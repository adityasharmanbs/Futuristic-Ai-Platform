import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  User, Settings, Crown, BarChart3, HelpCircle,
  LogOut, Star, Zap, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: User, label: "View Profile", href: "#", color: "text-foreground" },
  { icon: BarChart3, label: "My Analytics", href: "/analytics", color: "text-primary" },
  { icon: Settings, label: "Account Settings", href: "#", color: "text-foreground" },
  { icon: HelpCircle, label: "Help & Support", href: "#", color: "text-foreground" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ open, onClose }: Props) {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Creator";
  const email = user?.email || "";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleLogout() {
    onClose();
    await logout();
    navigate("/login");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-full right-0 mt-2 w-[260px] rounded-2xl bg-card/98 backdrop-blur-2xl border border-border shadow-[0_8px_60px_rgba(0,0,0,0.4)] z-50 overflow-hidden"
          >
            {/* Profile header */}
            <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      className="w-10 h-10 rounded-xl object-cover shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]">
                      {initials}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-card shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{email}</p>
                </div>
              </div>

              {/* Pro badge */}
              <div className="mt-3 flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-1.5">
                  <Crown size={11} className="text-primary" />
                  <span className="text-[11px] font-bold text-primary">PRO Plan</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={9} className="text-yellow-400" />
                  <span className="text-[10px] text-muted-foreground">1,847 / 2,000 runs</span>
                </div>
              </div>

              {/* Usage bar */}
              <div className="mt-2 h-1 bg-muted/40 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "92%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">153 AI runs remaining this month</p>
            </div>

            {/* Creator score */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-foreground">Creator Score</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-foreground">94</span>
                <span className="text-[10px] text-green-400 font-medium">+3 this week</span>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              {menuItems.map(({ icon: Icon, label, href, color }) => (
                <Link key={label} href={href} onClick={onClose}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className={color} />
                      <span className="text-xs font-medium text-foreground">{label}</span>
                    </div>
                    <ChevronRight size={11} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="p-2 border-t border-border">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors group"
              >
                <LogOut size={14} className="text-destructive" />
                <span className="text-xs font-medium text-destructive">Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
