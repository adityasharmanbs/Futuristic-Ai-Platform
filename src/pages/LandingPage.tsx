import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, animate } from "framer-motion";
import {
  Zap, ArrowRight, Play, Wand2, Video, Image, Globe, MessageSquare,
  TrendingUp, Scissors, Mic, Calendar, Star, Users, Activity, Sparkles,
  ChevronRight,
} from "lucide-react";

const aiTools = [
  { icon: Wand2, name: "AI Writing Studio", desc: "Generate viral articles, threads & long-form content instantly" },
  { icon: Video, name: "Reel Generator", desc: "Auto-cut and edit reels optimized for maximum reach" },
  { icon: Image, name: "Thumbnail Maker", desc: "Eye-catching thumbnails that multiply your CTR" },
  { icon: Globe, name: "Website Builder", desc: "Launch a creator portfolio site in under 60 seconds" },
  { icon: MessageSquare, name: "Caption Generator", desc: "Platform-native captions that drive engagement" },
  { icon: TrendingUp, name: "Viral Hooks Generator", desc: "Stop-the-scroll opening lines powered by trend data" },
  { icon: Scissors, name: "AI Video Editor", desc: "Trim, caption, and enhance videos automatically" },
  { icon: Activity, name: "Script Generator", desc: "Conversion-ready scripts for any format or niche" },
  { icon: Mic, name: "AI Podcast Generator", desc: "Full podcast episodes with show notes and chapters" },
  { icon: Calendar, name: "Social Media Planner", desc: "A 30-day content calendar generated in 30 seconds" },
];

const features = [
  { icon: Zap, title: "10x Faster Creation", desc: "Go from idea to published content in minutes, not days." },
  { icon: TrendingUp, title: "Trend-Driven AI", desc: "Our AI analyzes real-time trend data to maximize reach." },
  { icon: Sparkles, title: "Multi-Platform Ready", desc: "Formats optimized for YouTube, TikTok, Instagram & more." },
  { icon: Users, title: "Built for Creators", desc: "Designed by creators who grew audiences from 0 to millions." },
  { icon: Activity, title: "Analytics Insights", desc: "Understand what's working with deep performance data." },
  { icon: Globe, title: "One Platform", desc: "Replace 8 tools with one unified creative workspace." },
];

const testimonials = [
  { name: "Maya Chen", handle: "@mayacreates", avatar: "MC", role: "1.2M YouTube", quote: "CreatorOS cut my editing time by 80%. I publish 3x more content now with better results." },
  { name: "Jordan Park", handle: "@jordanpark", avatar: "JP", role: "800K TikTok", quote: "The viral hooks generator alone paid for itself in the first week. Insane ROI." },
  { name: "Sofia Martinez", handle: "@sofiam", avatar: "SM", role: "500K Instagram", quote: "I went from burning out to loving content creation again. This tool is a game changer." },
];

const stats = [
  { value: 2000000, label: "Active Creators", suffix: "M+", divisor: 1000000 },
  { value: 500, label: "AI Generations", suffix: "M+", divisor: 1 },
  { value: 98, label: "Satisfaction Rate", suffix: "%", divisor: 1 },
  { value: 4.9, label: "App Store Rating", suffix: "★", divisor: 1, decimal: true },
];

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut" as any,
      onUpdate: (v) => setVal(decimal ? Math.round(v * 10) / 10 : Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, decimal]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.4)]">
            <Zap size={14} className="text-black" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CreatorOS</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#tools" className="hover:text-foreground transition-colors">AI Tools</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Creators</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <motion.button
              data-testid="button-get-started-nav"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-secondary text-black"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, hsl(190 100% 50% / 0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8"
          >
            <Sparkles size={12} />
            <span>10 AI-powered tools in one platform</span>
          </motion.div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-6"
          >
            {["The AI OS", "for Next-Gen", "Creators"].map((word, i) => (
              <motion.span key={i} variants={itemVariants} className="block">
                {i === 2 ? (
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-[gradient_3s_linear_infinite]">
                    {word}
                  </span>
                ) : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Write, edit, publish, and grow — all with AI tools built for the creators who refuse to slow down.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/dashboard">
              <motion.button
                data-testid="button-start-creating"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-xl bg-gradient-to-r from-primary to-secondary text-black shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all"
              >
                <Zap size={15} />
                Start Creating Free
              </motion.button>
            </Link>
            <motion.button
              data-testid="button-watch-demo"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/30 text-foreground transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Play size={9} className="text-primary ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map(({ value, label, suffix, decimal }) => (
              <motion.div key={label} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <CountUp target={value} suffix={suffix} decimal={decimal} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Why CreatorOS</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Everything you need.<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Nothing you don't.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 0 30px rgba(0,212,255,0.1)" }}
                className="p-6 rounded-2xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/20 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Tools */}
      <section id="tools" className="py-24 px-6 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">AI Tools Suite</p>
            <h2 className="text-4xl md:text-5xl font-black">
              10 tools. <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Infinite content.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {aiTools.map(({ icon: Icon, name, desc }) => (
              <motion.div
                key={name}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 0 25px rgba(139,92,246,0.15)" }}
                className="p-4 rounded-xl bg-card/50 backdrop-blur-md border border-border hover:border-secondary/30 transition-all group cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-3 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all">
                  <Icon size={16} className="text-secondary" />
                </div>
                <h3 className="text-xs font-bold text-foreground mb-1 leading-snug">{name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/tools">
              <motion.button
                data-testid="button-explore-tools"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold hover:bg-secondary/15 transition-all"
              >
                Explore All Tools <ChevronRight size={15} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Creator Stories</p>
            <h2 className="text-4xl md:text-5xl font-black">
              Trusted by creators <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">who ship.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {testimonials.map(({ name, handle, avatar, role, quote }) => (
              <motion.div
                key={name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/20 transition-all"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-black">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{handle} · {role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ready to create at the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">speed of AI?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">Join over 2 million creators. Free forever. Upgrade when you're ready.</p>
            <Link href="/dashboard">
              <motion.button
                data-testid="button-start-free-cta"
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,212,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold rounded-2xl bg-gradient-to-r from-primary to-secondary text-black shadow-[0_0_30px_rgba(0,212,255,0.2)]"
              >
                <Zap size={18} />
                Start for Free
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap size={10} className="text-black" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CreatorOS</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 CreatorOS. Built for the next generation of creators.</p>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
