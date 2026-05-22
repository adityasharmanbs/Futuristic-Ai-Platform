import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Sparkles, Command } from "lucide-react";
import { NotificationsPanel } from "./NotificationsPanel";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "?";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background/70 backdrop-blur-xl sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-2.5 flex-1 max-w-sm">
        <motion.div
          animate={{ width: searchFocused ? "100%" : "100%" }}
          className="relative w-full"
        >
          <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
          <input
            data-testid="input-search"
            className="w-full pl-8 pr-16 py-2 text-sm bg-card/60 border rounded-xl text-foreground placeholder-muted-foreground/60 focus:outline-none transition-all duration-300"
            style={{
              borderColor: searchFocused ? "rgba(0,212,255,0.4)" : "hsl(240 15% 15%)",
              boxShadow: searchFocused ? "0 0 0 1px rgba(0,212,255,0.15), 0 0 20px rgba(0,212,255,0.06)" : "none",
            }}
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Command size={9} className="text-muted-foreground/40" />
            <kbd className="text-[9px] text-muted-foreground/40 font-mono">K</kbd>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {/* Upgrade button */}
        <motion.button
          data-testid="button-upgrade-pro"
          whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(0,212,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-primary to-secondary text-black shadow-[0_0_16px_rgba(0,212,255,0.2)] transition-all"
        >
          <Sparkles size={11} />
          Upgrade Pro
        </motion.button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button
            data-testid="button-notifications"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className={`relative p-2 rounded-xl transition-all ${notifOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-card"}`}
          >
            <Bell size={17} />
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_6px_rgba(0,212,255,0.9)]"
            />
          </motion.button>
          <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* Avatar */}
        <div ref={profileRef} className="relative">
          <motion.div
            data-testid="button-user-avatar"
            whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(139,92,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-xs font-black text-white cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </motion.div>
          <ProfileDropdown open={profileOpen} onClose={() => setProfileOpen(false)} />
        </div>
      </div>
    </header>
  );
}
