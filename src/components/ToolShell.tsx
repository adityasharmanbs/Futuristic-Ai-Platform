import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft, Sparkles, Zap, Copy, CheckCheck, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

export interface OutputSection {
  tab: string;
  content: string;
}

interface ToolShellProps {
  title: string;
  description: string;
  gradient: string;
  iconElement: ReactNode;
  canGenerate: boolean;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
  buttonLabel?: string;
  outputSections: OutputSection[];
  hasOutput: boolean;
  onReset: () => void;
  children: ReactNode;
  sidePanel?: ReactNode;
}

export function ToolShell({
  title, description, gradient, iconElement,
  canGenerate, onGenerate, isGenerating,
  buttonLabel = "Generate with AI",
  outputSections, hasOutput, onReset, children, sidePanel,
}: ToolShellProps) {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const prevSectionsRef = useRef<OutputSection[]>([]);

  useEffect(() => {
    if (!outputSections.length) return;
    const same = prevSectionsRef.current === outputSections;
    if (same) return;
    prevSectionsRef.current = outputSections;
    setActiveTab(0);
    setDisplayed("");
    const text = outputSections[0]?.content ?? "";
    let i = 0;
    const iv = setInterval(() => {
      if (i >= text.length) { clearInterval(iv); return; }
      const chunk = Math.min(12, text.length - i);
      setDisplayed(p => p + text.slice(i, i + chunk));
      i += chunk;
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 11);
    return () => clearInterval(iv);
  }, [outputSections]);

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setDisplayed(outputSections[idx]?.content ?? "");
  };

  const handleCopy = () => {
    const text = activeTab === 0 ? displayed : (outputSections[activeTab]?.content ?? "");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentText = activeTab === 0 ? displayed : (outputSections[activeTab]?.content ?? "");
  const isTyping = activeTab === 0 && displayed.length < (outputSections[0]?.content.length ?? 0);

  return (
    <AppLayout>
      <div className="space-y-5 pb-8 max-w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/tools")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/60 border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
          >
            <ArrowLeft size={12} /> Back
          </motion.button>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
              {iconElement}
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground tracking-tight leading-tight">{title}</h1>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </motion.div>

        <div className={`grid grid-cols-1 ${sidePanel ? "xl:grid-cols-3" : "xl:grid-cols-1 max-w-3xl"} gap-5`}>
          <div className={sidePanel ? "xl:col-span-2" : ""}>
            {/* Input card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border space-y-4 mb-4"
            >
              {children}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onGenerate}
                disabled={isGenerating || !canGenerate}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r ${gradient} text-black font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.12)] transition-all relative overflow-hidden`}
              >
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                        <Zap size={15} />
                      </motion.div>
                      Generating…
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Sparkles size={15} />
                      {buttonLabel}
                    </motion.div>
                  )}
                </AnimatePresence>
                {isGenerating && (
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
            </motion.div>

            {/* Output card */}
            <AnimatePresence>
              {(hasOutput) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl bg-card/70 backdrop-blur-md border border-border overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Sparkles size={10} className="text-black" />
                      </div>
                      <span className="text-xs font-bold text-foreground">Output</span>
                      {isGenerating && (
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                              className="w-1 h-1 rounded-full bg-primary" />
                          ))}
                        </div>
                      )}
                    </div>
                    {!isGenerating && currentText && (
                      <div className="flex items-center gap-2">
                        {outputSections.length > 1 && (
                          <div className="flex gap-0.5 p-0.5 bg-background/50 rounded-lg border border-border">
                            {outputSections.map((s, i) => (
                              <button key={s.tab} onClick={() => handleTabChange(i)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${activeTab === i ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"}`}>
                                {s.tab}
                              </button>
                            ))}
                          </div>
                        )}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCopy}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-medium">
                          {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
                          {copied ? "Copied!" : "Copy"}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onReset}
                          className="p-1.5 rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground transition-colors">
                          <RefreshCw size={10} />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div ref={outputRef} className="p-5 max-h-[520px] overflow-y-auto">
                    {isGenerating && !displayed ? (
                      <div className="space-y-3">
                        {[100, 75, 92, 60, 82, 70, 88, 55].map((w, i) => (
                          <motion.div key={i} animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}
                            className="h-3 bg-muted/40 rounded-full" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    ) : (
                      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <pre className="text-xs text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap">
                          {currentText}
                          {isTyping && (
                            <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse align-middle" />
                          )}
                        </pre>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {sidePanel && (
            <div className="space-y-4">
              {sidePanel}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
