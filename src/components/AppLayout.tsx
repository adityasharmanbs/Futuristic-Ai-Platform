import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { ChatBot } from "./ChatBot";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Ambient orbs */}
        <div className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] pointer-events-none -z-10 orb-float-1" />
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none -z-10 orb-float-2" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(190 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== "undefined" ? window.location.pathname : ""}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" as any }}
              className="h-full max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ChatBot />

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 15px) scale(0.97); }
          66% { transform: translate(20px, -25px) scale(1.04); }
        }
        .orb-float-1 { animation: orbFloat1 12s ease-in-out infinite; }
        .orb-float-2 { animation: orbFloat2 15s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
