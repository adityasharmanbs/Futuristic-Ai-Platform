import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  time?: string;
  unread?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ open, onClose }: Props) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const items: NotificationItem[] = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          title: data.title || "Notification",
          body: data.body || data.desc || "",
          time: data.time || "",
          unread: data.unread ?? false,
        };
      });
      setNotifications(items);
    });

    return () => unsub();
  }, [user]);

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
                {notifications.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">{notifications.filter(n => n.unread).length} new</span>
                )}
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
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">No notifications yet</div>
              ) : (
                notifications.map(({ id, title, body, time, unread }) => (
                  <motion.div
                    key={id}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className={`flex gap-3 px-4 py-3.5 border-b border-border/50 cursor-pointer transition-colors ${unread ? "bg-primary/[0.03]" : ""}`}>
                    <div className={`w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Bell size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs font-semibold ${unread ? "text-foreground" : "text-muted-foreground"}`}>{title}</p>
                        {unread && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1 shadow-[0_0_4px_rgba(0,212,255,0.8)]" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{body}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">{time}</p>
                    </div>
                  </motion.div>
                ))
              )}
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
