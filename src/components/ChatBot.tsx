import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User, Minimize2 } from "lucide-react";

const SUGGESTIONS = [
  "Write a viral hook for my next video",
  "Analyze my content strategy",
  "Generate 10 post ideas for this week",
  "How do I grow on TikTok fast?",
];

const INITIAL_MESSAGE = {
  id: 0,
  role: "assistant" as const,
  text: "Hey! I'm your AI creator assistant. Ask me anything — content ideas, strategy advice, script help, or platform tips. What are we creating today?",
  time: "now",
};

const BOT_RESPONSES: Record<string, string> = {
  default: "Great question! Based on current trends, I'd recommend focusing on short-form vertical content with strong hooks in the first 2 seconds. Consistency beats perfection — aim for 3 posts/week minimum.",
  hook: "Here are 5 viral hook formulas:\n\n1. **The Shock Hook**: \"I lost $50K doing this wrong...\"\n2. **The Curiosity Gap**: \"Nobody talks about this iPhone trick\"\n3. **The Promise Hook**: \"In 60 seconds, you'll know how to...\"\n4. **The Controversy Hook**: \"Hot take: Posting daily is hurting your growth\"\n5. **The Story Hook**: \"3 years ago I had 0 followers. Here's what changed.\"",
  grow: "Top 3 TikTok growth strategies right now:\n\n→ Post 1-3x daily for 30 days straight\n→ Use trending audio in the first 3 days of release\n→ Reply to every comment for the first 2 hours\n\nThe algorithm rewards consistency and engagement velocity above everything else.",
  ideas: "Here are 10 content ideas for this week:\n\n1. Day-in-my-life as a creator\n2. Tools I can't live without\n3. Reacting to viral creators in your niche\n4. Before/after transformation story\n5. Controversial opinion in your niche\n6. Tutorial of your #1 skill\n7. Behind the scenes of your process\n8. Responding to a comment\n9. 30-day challenge announcement\n10. Debunking a myth in your niche",
  analyze: "To analyze your content strategy, I'd look at:\n\n✅ **Posting frequency**: Are you consistent?\n✅ **Hook quality**: Do you capture attention in 2s?\n✅ **Content pillars**: Do you have 3-5 clear topics?\n✅ **Call to action**: Are you directing your audience?\n\nShare your handle and I can give more specific advice!",
};

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
}

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("hook") || lower.includes("viral")) return BOT_RESPONSES.hook;
  if (lower.includes("tiktok") || lower.includes("grow")) return BOT_RESPONSES.grow;
  if (lower.includes("idea")) return BOT_RESPONSES.ideas;
  if (lower.includes("analyz") || lower.includes("strategy")) return BOT_RESPONSES.analyze;
  return BOT_RESPONSES.default;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async (text: string = input) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: "now" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    setTyping(false);
    const botMsg: Message = { id: Date.now() + 1, role: "assistant", text: getResponse(text), time: "now" };
    setMessages((m) => [...m, botMsg]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-5 z-50 w-[340px] md:w-[380px] rounded-2xl bg-card/95 backdrop-blur-2xl border border-border shadow-[0_0_60px_rgba(0,212,255,0.1)] overflow-hidden flex flex-col"
            style={{ height: minimized ? "auto" : 520 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_12px_rgba(0,212,255,0.4)]">
                  <Bot size={15} className="text-black" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">CreatorOS AI</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
                    <span className="text-[10px] text-muted-foreground">Online · Always here</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMinimized(!minimized)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Minimize2 size={13} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X size={13} />
                </motion.button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                        msg.role === "assistant"
                          ? "bg-gradient-to-br from-primary to-secondary text-black shadow-[0_0_8px_rgba(0,212,255,0.3)]"
                          : "bg-secondary/20 text-secondary border border-secondary/30"
                      }`}>
                        {msg.role === "assistant" ? <Bot size={10} /> : <User size={10} />}
                      </div>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.role === "assistant"
                          ? "bg-card border border-border text-foreground rounded-tl-none"
                          : "bg-primary/15 border border-primary/20 text-foreground rounded-tr-none"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {typing && (
                    <div className="flex gap-2.5 items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_8px_rgba(0,212,255,0.3)]">
                        <Bot size={10} className="text-black" />
                      </div>
                      <div className="px-3 py-2 rounded-xl rounded-tl-none bg-card border border-border flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-primary block"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => sendMessage(s)}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-colors"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-border">
                  <div className="flex gap-2 items-center">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask your AI assistant..."
                      className="flex-1 bg-background/50 border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_0_1px_rgba(0,212,255,0.1)] transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, boxShadow: "0 0 16px rgba(0,212,255,0.4)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black disabled:opacity-40 flex-shrink-0"
                    >
                      <Send size={13} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        data-testid="button-chatbot-fab"
        whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(0,212,255,0.5)" }}
        whileTap={{ scale: 0.92 }}
        onClick={() => { setOpen(!open); setMinimized(false); }}
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.35)] transition-all"
        style={{ width: 52, height: 52 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} className="text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles size={20} className="text-black" />
            </motion.div>
          )}
        </AnimatePresence>
        {pulse && !open && (
          <span className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-30" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-[8px] font-black text-white">3</span>
        )}
      </motion.button>
    </>
  );
}
