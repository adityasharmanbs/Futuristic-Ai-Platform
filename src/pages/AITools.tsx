import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { useLocation } from "wouter";
import {
  Wand2, Video, Image, Globe, MessageSquare, TrendingUp,
  Scissors, Activity, Mic, Calendar, ArrowRight, Sparkles, Star,
} from "lucide-react";

const tools = [
  {
    icon: Wand2,
    name: "AI Writing Studio",
    desc: "Generate viral articles, Twitter/X threads, newsletters, and long-form blog content with a single prompt.",
    category: "Writing",
    color: "from-primary to-cyan-300",
    glow: "rgba(0,212,255,0.25)",
    badge: "Most Popular",
    route: "/tools/writing",
  },
  {
    icon: Video,
    name: "Reel Generator",
    desc: "Auto-cut and edit short-form reels optimized for TikTok, Instagram, and YouTube Shorts.",
    category: "Video",
    color: "from-secondary to-purple-400",
    glow: "rgba(139,92,246,0.25)",
    badge: "New",
    route: "/tools/reel",
  },
  {
    icon: Image,
    name: "Thumbnail Maker",
    desc: "Eye-catching, click-worthy thumbnails that multiply your CTR using your brand style.",
    category: "Design",
    color: "from-pink-400 to-rose-500",
    glow: "rgba(244,114,182,0.25)",
    badge: null,
    route: "/tools/thumbnail",
  },
  {
    icon: Globe,
    name: "Website Builder",
    desc: "Launch a stunning creator portfolio or landing page in under 60 seconds — no code required.",
    category: "Web",
    color: "from-emerald-400 to-green-500",
    glow: "rgba(52,211,153,0.25)",
    badge: null,
    route: "/tools/website",
  },
  {
    icon: MessageSquare,
    name: "Caption Generator",
    desc: "Platform-native captions that drive engagement, formatted perfectly for each social network.",
    category: "Writing",
    color: "from-sky-400 to-blue-500",
    glow: "rgba(56,189,248,0.25)",
    badge: null,
    route: "/tools/caption",
  },
  {
    icon: TrendingUp,
    name: "Viral Hooks Generator",
    desc: "Stop-the-scroll opening lines powered by real-time trend analysis and pattern recognition.",
    category: "Writing",
    color: "from-orange-400 to-amber-500",
    glow: "rgba(251,146,60,0.25)",
    badge: "Trending",
    route: "/tools/hooks",
  },
  {
    icon: Scissors,
    name: "AI Video Editor",
    desc: "Auto-trim, add captions, enhance audio, and export in any format using AI-powered editing.",
    category: "Video",
    color: "from-secondary to-indigo-400",
    glow: "rgba(139,92,246,0.25)",
    badge: null,
    route: "/tools/video-editor",
  },
  {
    icon: Activity,
    name: "Script Generator",
    desc: "Conversion-ready scripts for YouTube videos, podcast episodes, and TikToks in any niche.",
    category: "Writing",
    color: "from-primary to-teal-400",
    glow: "rgba(0,212,255,0.25)",
    badge: null,
    route: "/tools/script",
  },
  {
    icon: Mic,
    name: "AI Podcast Generator",
    desc: "Full podcast episodes complete with show notes, chapter markers, and auto-transcription.",
    category: "Audio",
    color: "from-red-400 to-rose-500",
    glow: "rgba(248,113,113,0.25)",
    badge: null,
    route: "/tools/podcast",
  },
  {
    icon: Calendar,
    name: "Social Media Planner",
    desc: "Generate a 30-day content calendar in 30 seconds, tailored to your niche and goals.",
    category: "Planning",
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(250,204,21,0.25)",
    badge: null,
    route: "/tools/planner",
  },
];

const categories = ["All", "Writing", "Video", "Design", "Web", "Audio", "Planning"];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AITools() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [, navigate] = useLocation();

  const filtered = activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  return (
    <AppLayout>
      <div className="space-y-7">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-black text-foreground tracking-tight">AI Tools</h1>
          <p className="text-sm text-muted-foreground mt-0.5">10 powerful AI tools to supercharge your creative output.</p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              data-testid={`filter-${cat.toLowerCase()}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-primary/15 border-primary/30 text-primary shadow-[0_0_12px_rgba(0,212,255,0.2)]"
                  : "bg-card/50 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {filtered.map(({ icon: Icon, name, desc, color, glow, badge, route }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{
                y: -6,
                boxShadow: `0 8px 40px ${glow}`,
                borderColor: `${glow.replace("0.25", "0.4")}`,
              }}
              data-testid={`tool-card-${name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => navigate(route)}
              className="group relative p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-border transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent pointer-events-none" />

              {badge && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                  <Star size={8} className="fill-primary" />
                  {badge}
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                <Icon size={22} className="text-black" />
              </div>

              <h3 className="text-base font-bold text-foreground mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>

              <motion.button
                data-testid={`button-launch-${name.toLowerCase().replace(/\s+/g, "-")}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={e => { e.stopPropagation(); navigate(route); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${color} text-black text-xs font-bold shadow-md opacity-90 group-hover:opacity-100 transition-all`}
              >
                <Sparkles size={12} />
                Launch Tool
                <ArrowRight size={12} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}
