import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, TrendingUp, Users, Zap, Star, ArrowUpRight, CheckCheck } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-400/10",
    title: "Your reel is trending!",
    desc: "\"iPhone hidden features\" hit 1.2M views in 24 hours",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Follower milestone",
    desc: "You just crossed 128K followers on Instagram",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    icon: Zap,
    color: "text-secondary",
    bg: "bg-secondary/10",
    title: "AI generation complete",
    desc: "Your 30-day content calendar is ready",
    time: "3h ago",
    unread: true,
  },
  {
    id: 4,
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    title: "Top Creator Badge earned",
    desc: "You're in the top 5% of creators this month",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    icon: ArrowUpRight,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    title: "Engagement spike detected",
    desc: "Your engagement rate jumped 42% this week",
    time: "2 days ago",
    unread: false,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ open, onClose }: Props) {
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
            className="absolute top-full right-0 mt-2 w-[340px] rounded-2xl bg-card/98 backdrop-blur-2xl border border-border shadow-[0_8px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,212,255,0.05)] z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-primary" />
                <span className="text-sm font-bold text-foreground">Notifications</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">3 new</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[10px] text-primary hover:underline flex items-center gap-1">
                  <CheckCheck size={10} /> Mark all read
                </button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                >
                  <X size={12} />
                </motion.button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[380px]">
              {notifications.map(({ id, icon: Icon, color, bg, title, desc, time, unread }) => (
                <motion.div
                  key={id}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className={`flex gap-3 px-4 py-3.5 border-b border-border/50 cursor-pointer transition-colors ${unread ? "bg-primary/[0.03]" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-semibold ${unread ? "text-foreground" : "text-muted-foreground"}`}>{title}</p>
                      {unread && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1 shadow-[0_0_4px_rgba(0,212,255,0.8)]" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-2.5 text-center">
              <button className="text-xs text-primary hover:underline">View all notifications</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
