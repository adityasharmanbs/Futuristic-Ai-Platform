import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, AreaChart, Area } from "recharts";
import { AppLayout } from "@/components/AppLayout";
import {
  Eye, Users, Zap, DollarSign, TrendingUp, ArrowUpRight,
  Wand2, Video, Image, MessageSquare, Activity, Scissors,
  Crown, Sparkles, Clock, Star, ChevronRight, Flame,
  Globe, Mic, Calendar, BarChart3, LayoutDashboard, Rocket,
} from "lucide-react";

const followersData = [
  { day: "Mon", v: 124200 }, { day: "Tue", v: 124800 }, { day: "Wed", v: 125900 },
  { day: "Thu", v: 126400 }, { day: "Fri", v: 127100 }, { day: "Sat", v: 127800 }, { day: "Sun", v: 128000 },
];
const revenueData = [
  { mo: "Jan", v: 6200 }, { mo: "Feb", v: 7100 }, { mo: "Mar", v: 6800 }, { mo: "Apr", v: 8400 },
  { mo: "May", v: 9200 }, { mo: "Jun", v: 10100 }, { mo: "Jul", v: 12400 },
];
const aiUsageData = [
  { tool: "Writing", runs: 420 }, { tool: "Reels", runs: 310 }, { tool: "Thumbs", runs: 280 },
  { tool: "Scripts", runs: 240 }, { tool: "Captions", runs: 210 },
];
const engagementData = [
  { d: "M", v: 4.1 }, { d: "T", v: 5.2 }, { d: "W", v: 4.8 }, { d: "T", v: 6.1 },
  { d: "F", v: 7.4 }, { d: "S", v: 8.2 }, { d: "S", v: 7.9 },
];

const trendingCreators = [
  { name: "Maya Chen", handle: "@mayacreates", avatar: "MC", followers: "1.2M", growth: "+18%", niche: "Tech", score: 98, color: "from-primary to-cyan-300" },
  { name: "Jordan Park", handle: "@jordanpark", avatar: "JP", followers: "800K", growth: "+24%", niche: "Lifestyle", score: 94, color: "from-secondary to-purple-400" },
  { name: "Sofia Martinez", handle: "@sofiam", avatar: "SM", followers: "520K", growth: "+31%", niche: "Fashion", score: 91, color: "from-pink-400 to-rose-500" },
  { name: "Kai Thompson", handle: "@kaibuilds", avatar: "KT", followers: "340K", growth: "+47%", niche: "Dev", score: 87, color: "from-emerald-400 to-teal-500" },
];

const recentActivity = [
  { icon: Wand2, label: "AI Writing Studio completed", sub: "Blog post: 5 monetization strategies", time: "2m ago", color: "text-primary", glow: "rgba(0,212,255,0.3)" },
  { icon: Image, label: "Thumbnail generated", sub: "YouTube: How I grew to 100K", time: "18m ago", color: "text-secondary", glow: "rgba(139,92,246,0.3)" },
  { icon: Video, label: "Reel created successfully", sub: "15s vertical clip — 1.2M views", time: "1h ago", color: "text-green-400", glow: "rgba(74,222,128,0.3)" },
  { icon: Users, label: "Follower milestone reached", sub: "Crossed 128K on Instagram", time: "3h ago", color: "text-yellow-400", glow: "rgba(250,204,21,0.3)" },
  { icon: Activity, label: "Script generated", sub: "Podcast episode #47 draft", time: "5h ago", color: "text-primary", glow: "rgba(0,212,255,0.3)" },
  { icon: Scissors, label: "Video auto-edited", sub: "45-min interview compressed", time: "8h ago", color: "text-secondary", glow: "rgba(139,92,246,0.3)" },
];

const trendingTools = [
  { name: "AI Writing Studio", icon: Wand2, usage: 92, color: "from-primary to-cyan-300" },
  { name: "Reel Generator", icon: Video, usage: 78, color: "from-secondary to-purple-400" },
  { name: "Thumbnail Maker", icon: Image, usage: 65, color: "from-green-400 to-emerald-500" },
  { name: "Script Generator", icon: Activity, usage: 54, color: "from-yellow-400 to-orange-400" },
  { name: "Caption Generator", icon: MessageSquare, usage: 41, color: "from-pink-400 to-rose-500" },
];

const aiToolsQuick = [
  { icon: Wand2, name: "Write", color: "from-primary to-cyan-300", href: "/prompt" },
  { icon: Video, name: "Reels", color: "from-secondary to-purple-400", href: "/tools" },
  { icon: Image, name: "Thumbnails", color: "from-pink-400 to-rose-500", href: "/tools" },
  { icon: Globe, name: "Website", color: "from-emerald-400 to-teal-500", href: "/tools" },
  { icon: Mic, name: "Podcast", color: "from-orange-400 to-red-400", href: "/tools" },
  { icon: Calendar, name: "Planner", color: "from-yellow-400 to-amber-500", href: "/tools" },
];

const TABS = ["Overview", "Analytics", "Trending"] as const;
type Tab = typeof TABS[number];

function CountUp({ target, format }: { target: number; format?: (v: number) => string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, { duration: 1.8, ease: "easeOut" as any, onUpdate: (v) => setDisplay(v) });
    return () => c.stop();
  }, [inView, target]);
  const fmt = format ?? ((v: number) => {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
    if (v >= 1000) return (v / 1000).toFixed(1) + "K";
    return Math.round(v).toString();
  });
  return <span ref={ref}>{fmt(display)}</span>;
}

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const tooltipStyle = {
  contentStyle: { background: "hsl(240 15% 7%)", border: "1px solid hsl(240 15% 15%)", borderRadius: 10, fontSize: 11 },
  cursor: false as const,
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Wednesday, May 21</span>
              <span className="w-1 h-1 rounded-full bg-primary shadow-[0_0_4px_rgba(0,212,255,0.9)]" />
              <span className="text-[11px] text-green-400 font-semibold">All systems online</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              Good morning, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Alex</span> 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your content is performing 34% above average today.</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/15 to-secondary/15 border border-primary/20 cursor-pointer"
          >
            <Rocket size={15} className="text-primary" />
            <div>
              <p className="text-xs font-bold text-foreground">Launch New Campaign</p>
              <p className="text-[10px] text-muted-foreground">AI-powered content blast</p>
            </div>
            <ChevronRight size={13} className="text-muted-foreground ml-1" />
          </motion.div>
        </motion.div>

        {/* Quick tool shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar"
        >
          {aiToolsQuick.map(({ icon: Icon, name, color }, i) => (
            <motion.div
              key={name}
              whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-card/60 border border-border cursor-pointer hover:border-border/80 transition-all min-w-[64px]"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                <Icon size={14} className="text-black" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: Eye, label: "Total Views", value: 2400000, change: "+18%", color: "text-primary", bg: "bg-primary/10", glow: "rgba(0,212,255,0.15)", chart: [60, 72, 68, 78, 85, 92, 100] },
            { icon: Users, label: "Followers", value: 128000, change: "+12%", color: "text-secondary", bg: "bg-secondary/10", glow: "rgba(139,92,246,0.15)", chart: [55, 60, 65, 68, 72, 78, 84] },
            { icon: Zap, label: "AI Runs Today", value: 1847, change: "+34%", color: "text-green-400", bg: "bg-green-400/10", glow: "rgba(74,222,128,0.15)", chart: [40, 55, 48, 65, 72, 80, 90] },
            { icon: DollarSign, label: "Revenue", value: 12400, change: "+9%", color: "text-yellow-400", bg: "bg-yellow-400/10", glow: "rgba(250,204,21,0.15)", chart: [62, 71, 68, 84, 92, 101, 120] },
          ].map(({ icon: Icon, label, value, change, color, bg, glow, chart }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, boxShadow: `0 12px 40px ${glow}` }}
              data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="p-4 rounded-2xl bg-card/70 backdrop-blur-md border border-border hover:border-primary/15 transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                  <Icon size={16} />
                </div>
                <div className="flex items-center gap-0.5 text-[11px] font-bold text-green-400 bg-green-400/10 border border-green-400/15 px-2 py-0.5 rounded-full">
                  <ArrowUpRight size={10} />
                  {change}
                </div>
              </div>
              <div className="text-2xl font-black text-foreground">
                <CountUp target={value} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 mb-3">{label}</div>
              <div className="h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chart.map((v, i) => ({ i, v }))}>
                    <Line type="monotone" dataKey="v" stroke={glow.replace("0.15", "0.9")} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-1 p-1 bg-card/50 rounded-xl border border-border w-fit"
        >
          {TABS.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.97 }}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-gradient-to-r from-primary/15 to-secondary/10 rounded-lg border border-primary/20"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab === "Overview" && <LayoutDashboard size={11} />}
                {tab === "Analytics" && <BarChart3 size={11} />}
                {tab === "Trending" && <Flame size={11} />}
                {tab}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "Overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <motion.div className="lg:col-span-2 p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Follower Growth</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Last 7 days</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400 font-semibold bg-green-400/10 border border-green-400/15 px-2 py-1 rounded-full">
                      <TrendingUp size={11} />+3.1%
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={followersData}>
                      <defs>
                        <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(190 100% 50%)" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="hsl(190 100% 50%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip {...tooltipStyle} formatter={(v: number) => [(v / 1000).toFixed(1) + "K", "Followers"]} />
                      <Area type="monotone" dataKey="v" stroke="hsl(190 100% 50%)" strokeWidth={2} fill="url(#gf)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-foreground">AI Tool Usage</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Runs this week</p>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={aiUsageData} barSize={16}>
                      <XAxis dataKey="tool" tick={{ fontSize: 9, fill: "hsl(220 15% 55%)" }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="runs" fill="hsl(270 80% 60%)" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Trending tools + Recent activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground">Top Tools</h3>
                    <span className="text-[11px] text-primary">This week</span>
                  </div>
                  <div className="space-y-3.5">
                    {trendingTools.map(({ name, icon: Icon, usage, color }, i) => (
                      <motion.div key={name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <Icon size={13} className="text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-foreground truncate">{name}</span>
                            <span className="text-[11px] text-muted-foreground ml-2 flex-shrink-0">{usage}%</span>
                          </div>
                          <div className="h-1 bg-muted/40 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${usage}%` }}
                              transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: "easeOut" as any }}
                              className={`h-full bg-gradient-to-r ${color} rounded-full`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                    <span className="text-[11px] text-muted-foreground">Today</span>
                  </div>
                  <div className="space-y-2.5">
                    {recentActivity.map(({ icon: Icon, label, sub, time, color, glow }) => (
                      <motion.div
                        key={label}
                        whileHover={{ x: 3 }}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-accent/50 transition-colors cursor-default"
                      >
                        <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ boxShadow: `0 0 8px ${glow}` }}>
                          <Icon size={12} className={color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{label}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{sub}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 flex-shrink-0">
                          <Clock size={8} />
                          {time}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "Analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Revenue Growth</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Last 7 months</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                      <TrendingUp size={11} />+100% YTD
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(250 204 21 / 1)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(250 204 21 / 1)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="mo" tick={{ fontSize: 10, fill: "hsl(220 15% 55%)" }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipStyle} formatter={(v: number) => [`$${(v / 1000).toFixed(1)}K`, "Revenue"]} />
                      <Area type="monotone" dataKey="v" stroke="#facc15" strokeWidth={2} fill="url(#gr)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Engagement Rate</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Daily avg — this week</p>
                    </div>
                    <span className="text-sm font-black text-foreground">8.2% <span className="text-xs text-green-400">avg</span></span>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={engagementData} barSize={20}>
                      <XAxis dataKey="d" tick={{ fontSize: 10, fill: "hsl(220 15% 55%)" }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}%`, "Engagement"]} />
                      <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="hsl(190 100% 50%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Creator score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Creator Score", value: "94", sub: "+3 this week", icon: Star, color: "from-yellow-400 to-orange-400", badge: "Top 5%" },
                  { label: "Content Quality", value: "A+", sub: "Excellent consistency", icon: Sparkles, color: "from-primary to-cyan-300", badge: "Elite" },
                  { label: "Growth Velocity", value: "🚀 Fast", sub: "Faster than 89% of peers", icon: TrendingUp, color: "from-secondary to-purple-400", badge: "Viral" },
                ].map(({ label, value, sub, icon: Icon, color, badge }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4 }}
                    className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border text-center relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 pointer-events-none`} />
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <Icon size={18} className="text-black" />
                    </div>
                    <div className="text-2xl font-black text-foreground mb-1">{value}</div>
                    <div className="text-xs text-muted-foreground mb-2">{label}</div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                      {badge}
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-1.5">{sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Trending" && (
            <motion.div key="trending" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={14} className="text-orange-400" />
                <span className="text-sm font-bold text-foreground">Trending Creators This Week</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-400/10 border border-orange-400/20 text-[10px] font-bold text-orange-400">LIVE</span>
              </div>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingCreators.map(({ name, handle, avatar, followers, growth, niche, score, color }, i) => (
                  <motion.div
                    key={name}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
                    className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${color}`} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center font-black text-sm text-black shadow-lg`}>{avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-foreground">{name}</p>
                          <span className="px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary">{niche}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{handle}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-green-400 text-xs font-bold justify-end">
                          <ArrowUpRight size={11} />{growth}
                        </div>
                        <p className="text-[11px] text-muted-foreground">{followers}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-foreground">Score: {score}</span>
                      </div>
                      <div className="flex -space-x-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className={`w-4 h-4 rounded-full bg-gradient-to-br ${color} border border-background opacity-${80 - j * 10}`} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 h-1 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" as any }}
                        className={`h-full bg-gradient-to-r ${color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upgrade banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ boxShadow: "0 0 60px rgba(0,212,255,0.12)" }}
          className="p-5 rounded-2xl bg-gradient-to-r from-primary/8 via-secondary/8 to-primary/8 border border-primary/15 flex items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.2, ease: "linear" }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                style={{ left: `${i * 33}%` }}
              />
            ))}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Crown size={14} className="text-primary" />
              <span className="text-sm font-bold text-foreground">You're burning through your AI runs</span>
            </div>
            <p className="text-xs text-muted-foreground">153 runs left this month. Upgrade to Pro for unlimited generations, 4K exports, and priority AI.</p>
          </div>
          <motion.button
            data-testid="button-upgrade-banner"
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(0,212,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-black text-xs font-black relative z-10 shadow-[0_0_16px_rgba(0,212,255,0.2)]"
          >
            <Sparkles size={13} />
            Upgrade to Pro
          </motion.button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
