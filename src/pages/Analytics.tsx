import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { AppLayout } from "@/components/AppLayout";
import {
  TrendingUp, ArrowUpRight, Eye, Heart, Share2, Users,
  Crown, Flame, Calendar, ChevronDown,
} from "lucide-react";

const engagementData = [
  { week: "W1", views: 42000, likes: 3200, shares: 1100 },
  { week: "W2", views: 51000, likes: 4100, shares: 1400 },
  { week: "W3", views: 47000, likes: 3800, shares: 1250 },
  { week: "W4", views: 68000, likes: 5600, shares: 2100 },
  { week: "W5", views: 74000, likes: 6200, shares: 2400 },
  { week: "W6", views: 91000, likes: 7800, shares: 3100 },
  { week: "W7", views: 108000, likes: 9200, shares: 3900 },
  { week: "W8", views: 125000, likes: 11000, shares: 4600 },
];

const growthData = [
  { month: "Jan", followers: 88000 },
  { month: "Feb", followers: 95000 },
  { month: "Mar", followers: 103000 },
  { month: "Apr", followers: 109000 },
  { month: "May", followers: 118000 },
  { month: "Jun", followers: 128000 },
];

const platformData = [
  { name: "YouTube", value: 42, color: "#ef4444" },
  { name: "TikTok", value: 28, color: "#00d4ff" },
  { name: "Instagram", value: 18, color: "#a855f7" },
  { name: "Twitter/X", value: 8, color: "#1da1f2" },
  { name: "Other", value: 4, color: "#6b7280" },
];

const contentPerformance = [
  { type: "Short-form Video", score: 94 },
  { type: "Long-form Video", score: 78 },
  { type: "Blog / Articles", score: 62 },
  { type: "Podcast Episodes", score: 55 },
  { type: "Social Posts", score: 88 },
];

const radarData = [
  { subject: "Reach", A: 90 },
  { subject: "Engagement", A: 84 },
  { subject: "Consistency", A: 92 },
  { subject: "Conversion", A: 68 },
  { subject: "Virality", A: 78 },
  { subject: "SEO", A: 71 },
];

const topContent = [
  { title: "10 iPhone Features Nobody Uses", platform: "YouTube", views: "1.2M", change: "+340%", emoji: "📱" },
  { title: "How I Hit 100K in 90 Days", platform: "TikTok", views: "840K", change: "+210%", emoji: "🚀" },
  { title: "My Creator Setup Tour 2026", platform: "YouTube", views: "620K", change: "+155%", emoji: "💻" },
  { title: "AI Tools That 10x My Output", platform: "Instagram", views: "480K", change: "+198%", emoji: "⚡" },
];

const PERIODS = ["7 days", "30 days", "90 days", "All time"] as const;
type Period = (typeof PERIODS)[number];

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const tooltipStyle = {
  contentStyle: {
    background: "hsl(240 15% 7%)",
    border: "1px solid hsl(240 15% 15%)",
    borderRadius: 10,
    fontSize: 11,
    color: "hsl(220 20% 92%)",
  },
};

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("30 days");
  const [periodOpen, setPeriodOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Deep insights into your content performance and creator growth.
            </p>
          </div>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPeriodOpen(!periodOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 border border-border text-xs font-semibold text-foreground hover:border-primary/20 transition-all"
            >
              <Calendar size={12} className="text-primary" />
              {period}
              <ChevronDown size={11} className="text-muted-foreground" />
            </motion.button>
            <AnimatePresence>
              {periodOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  className="absolute right-0 top-full mt-1.5 w-32 rounded-xl bg-card/98 backdrop-blur-xl border border-border shadow-xl z-10 overflow-hidden"
                >
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPeriod(p); setPeriodOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors ${period === p ? "text-primary font-semibold" : "text-foreground"}`}
                    >
                      {p}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Creator Score Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          whileHover={{ boxShadow: "0 0 50px rgba(250,204,21,0.1)" }}
          className="p-5 rounded-2xl bg-gradient-to-r from-yellow-400/8 via-orange-400/5 to-yellow-400/8 border border-yellow-400/15 flex items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-[0_0_24px_rgba(250,204,21,0.3)]">
              <Crown size={24} className="text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Creator Score</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-[10px] font-bold text-yellow-400">Top 5%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground">94</span>
                <span className="text-sm text-green-400 font-bold">+3 this week</span>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-6 relative z-10">
            {[
              { label: "Reach Score", value: "90", icon: Eye },
              { label: "Engagement", value: "84", icon: Heart },
              { label: "Virality", value: "78", icon: Flame },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={13} className="text-yellow-400 mx-auto mb-1" />
                <div className="text-xl font-black text-foreground">{value}</div>
                <div className="text-[10px] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { icon: Eye, label: "Avg. Views/Post", value: "84.2K", change: "+22%", color: "text-primary", bg: "bg-primary/10", border: "border-primary/15" },
            { icon: Heart, label: "Avg. Engagement", value: "8.4%", change: "+5%", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/15" },
            { icon: Share2, label: "Avg. Shares", value: "3.1K", change: "+31%", color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/15" },
            { icon: Users, label: "New Followers/Mo", value: "+10K", change: "+18%", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/15" },
          ].map(({ icon: Icon, label, value, change, color, bg, border }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              data-testid={`metric-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="p-4 rounded-2xl bg-card/70 backdrop-blur-md border border-border hover:border-primary/15 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon size={15} />
                </div>
                <div className={`flex items-center gap-0.5 text-[11px] font-bold text-green-400 bg-green-400/10 border border-green-400/15 px-1.5 py-0.5 rounded-full`}>
                  <ArrowUpRight size={10} />
                  {change}
                </div>
              </div>
              <div className="text-2xl font-black text-foreground">{value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Engagement chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Engagement Over Time</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Views, likes & shares — last 8 weeks</p>
            </div>
            <div className="flex gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Views</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />Likes</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary inline-block" />Shares</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190 100% 50%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(190 100% 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f472b6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 15% 11%)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(220 15% 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 15% 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v]} />
              <Area type="monotone" dataKey="views" stroke="hsl(190 100% 50%)" strokeWidth={2} fill="url(#gv)" dot={false} />
              <Area type="monotone" dataKey="likes" stroke="#f472b6" strokeWidth={2} fill="url(#gl)" dot={false} />
              <Area type="monotone" dataKey="shares" stroke="hsl(270 80% 60%)" strokeWidth={2} fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom row: growth + platform + radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Follower growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Follower Growth</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Last 6 months</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-green-400 font-semibold">
                <TrendingUp size={12} />+45.5%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={growthData} barSize={20}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220 15% 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(220 15% 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => [`${(v / 1000).toFixed(1)}K`, "Followers"]} />
                <Bar dataKey="followers" radius={[4, 4, 0, 0]}>
                  {growthData.map((_, i) => (
                    <Cell key={i} fill={`hsl(${190 + i * 8} 90% 50%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Platform split */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground">Platform Split</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Audience by platform</p>
            </div>
            <div className="flex justify-center mb-3">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={platformData} dataKey="value" cx="50%" cy="50%" innerRadius={38} outerRadius={60} strokeWidth={0}>
                    {platformData.map(({ name, color }) => (
                      <Cell key={name} fill={color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5">
              {platformData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-[11px] text-muted-foreground flex-1">{name}</span>
                  <span className="text-[11px] font-bold text-foreground">{value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
          >
            <div className="mb-2">
              <h3 className="text-sm font-bold text-foreground">Creator Profile</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Skill breakdown</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={65}>
                <PolarGrid stroke="hsl(240 15% 15%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "hsl(220 15% 50%)" }} />
                <Radar name="Score" dataKey="A" stroke="hsl(190 100% 50%)" fill="hsl(190 100% 50%)" fillOpacity={0.15} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Content performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-4">Content Performance by Type</h3>
          <div className="space-y-3.5">
            {contentPerformance.map(({ type, score }, i) => (
              <div key={type} className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-36 flex-shrink-0">{type}</span>
                <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.9, ease: "easeOut" as any }}
                    className="h-full rounded-full"
                    style={{ background: `hsl(${190 - i * 14} ${90 - i * 4}% ${50 + i * 2}%)` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground w-8 text-right">{score}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top performing content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-4">Top Performing Content</h3>
          <div className="space-y-2">
            {topContent.map(({ title, platform, views, change, emoji }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.07 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-sm flex-shrink-0">
                  {emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{title}</p>
                  <p className="text-[10px] text-muted-foreground">{platform}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-foreground">{views}</p>
                  <div className="flex items-center gap-0.5 text-[10px] text-green-400 font-semibold justify-end">
                    <ArrowUpRight size={9} />{change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
