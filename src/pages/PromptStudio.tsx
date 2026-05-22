import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import {
  Sparkles, Video as Youtube, Camera as Instagram, Copy, RefreshCw, Zap, CheckCheck,
  Clock, Lightbulb, TrendingUp, Wand2, Star,
  Hash, ArrowUpRight, X, ChevronRight,
} from "lucide-react";

// ─── Dynamic Response Engine ─────────────────────────────────────────────────

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}

function extractTopic(text: string): string {
  const cleaned = text.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const stopWords = new Set([
    "a","an","the","i","my","me","for","and","or","to","of","in",
    "it","is","are","on","with","about","how","can","do","make",
    "give","write","create","generate","build","show","get",
    "what","when","where","which","who","should","would","could",
    "please","like","want","need","using","use","best","viral",
    "content","strategy","ideas","idea","tips","help","video",
    "post","channel","profile","account","brand","page",
  ]);
  const words = cleaned.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w.toLowerCase()));
  return words.slice(0, 3).join(" ") || "content creation";
}

function detectIntent(text: string): string {
  const t = text.toLowerCase();
  if (/script|video script|full script|episode script/.test(t)) return "script";
  if (/hook|opening|attention|first.?5|first.?10|intro line/.test(t)) return "hooks";
  if (/calendar|schedule|plan|week|month|30.?day/.test(t)) return "calendar";
  if (/hashtag|tag|tags/.test(t)) return "hashtags";
  if (/caption|copy|post copy/.test(t)) return "caption";
  if (/bio|profile|about me|description/.test(t)) return "bio";
  if (/trend|trending|viral topic|hot topic/.test(t)) return "trending";
  if (/grow|growth|subscriber|follower|reach|audience/.test(t)) return "growth";
  if (/title|headline|thumbnail/.test(t)) return "titles";
  if (/monetize|earn|revenue|income|sponsorship/.test(t)) return "monetize";
  if (/repurpose|multi.?platform|cross.?post/.test(t)) return "repurpose";
  if (/email|newsletter/.test(t)) return "email";
  return "general";
}

function generateDynamicResponse(prompt: string, mode: "prompt" | "youtube" | "instagram", extra: string): string {
  if (mode === "youtube") return generateYoutubeAnalysis(extra || prompt);
  if (mode === "instagram") return generateInstagramAnalysis(extra || prompt);

  const topic = extractTopic(prompt);
  const intent = detectIntent(prompt);
  const topicTitle = topic.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  switch (intent) {
    case "script":   return generateScript(topic, topicTitle);
    case "hooks":    return generateHooks(topic, topicTitle);
    case "calendar": return generateCalendar(topic, topicTitle);
    case "hashtags": return generateHashtagStrategy(topic, topicTitle);
    case "caption":  return generateCaptionPack(topic, topicTitle);
    case "bio":      return generateBio(topic, topicTitle);
    case "trending": return generateTrending(topic, topicTitle);
    case "growth":   return generateGrowth(topic, topicTitle);
    case "titles":   return generateTitles(topic, topicTitle);
    case "monetize": return generateMonetize(topic, topicTitle);
    case "repurpose": return generateRepurpose(topic, topicTitle);
    case "email":    return generateEmail(topic, topicTitle);
    default:         return generateGeneral(topic, topicTitle, prompt);
  }
}

function generateScript(topic: string, title: string): string {
  const views = fmt(rand(80, 900) * 1000);
  const retention = rand(58, 74);
  return `## Viral Video Script — ${title}

**Predicted Performance:** ${views} views · ${retention}% retention · High share probability

---

### HOOK (0–5s) — Critical Zone
> "${pick([
    `"This ${topic} secret changed everything for me..."`,
    `"Nobody talks about this ${topic} trick but it should have millions of views..."`,
    `"I spent 30 days mastering ${topic} so you don't have to. Here's everything."`,
    `"If you're into ${topic}, stop everything — this changes the game."`,
  ])}"

**Why it works:** Creates a curiosity gap. Viewer must watch to close the loop.

---

### INTRO (5–25s)
"In this video I'm going to show you exactly [core promise]. I've helped over ${fmt(rand(10, 90) * 1000)} people with this and what most of them get wrong is [common mistake]."

### MAIN CONTENT

**Segment 1 (0:25–2:00) — The Problem**
Most people approach ${topic} by [common mistake]. Here's why that doesn't work in ${new Date().getFullYear()}...

**Segment 2 (2:00–4:30) — The Framework**
Break it into 3 pillars:
→ Pillar 1: [Foundation] — explain the "why"
→ Pillar 2: [System] — the repeatable process  
→ Pillar 3: [Scale] — how to 10× the results

**Segment 3 (4:30–6:30) — Proof / Demo**
"Let me show you a real example of this working..." — screen share or case study here.

**Segment 4 (6:30–7:30) — Common Mistakes**
"Before I wrap up, these are the 3 mistakes that will kill your results..."

### CLOSE (7:30–8:00)
"If this helped, subscribe — I post every [day] about ${topic}. Drop a comment with your biggest challenge and I'll reply personally."

---

### B-Roll Suggestions
- Screen recordings of the process
- Text animations for key stats
- Reaction cut after every major point

### Thumbnail Concept
Split face: confused → confident. Bold text: **"The ${title} Secret"** | Red accent arrow

---
*Generated by CreatorOS AI · Optimized for retention*`;
}

function generateHooks(topic: string, title: string): string {
  const hooks = [
    `"I tried every ${topic} strategy for 90 days. Only 1 actually worked."`,
    `"The ${topic} tip nobody talks about (because it makes them look bad)"`,
    `"I was doing ${topic} completely wrong for 2 years. Here's what I wish I knew."`,
    `"This ${topic} trick took me from 0 to ${fmt(rand(10, 100) * 1000)} in ${rand(30, 180)} days."`,
    `"Most people quit ${topic} before they discover this. Don't be one of them."`,
    `"What if everything you know about ${topic} is backwards?"`,
    `"Unpopular opinion: the best ${topic} strategy is the one you'll actually do."`,
    `"Stop overcomplicating ${topic}. It's literally just these 3 steps."`,
    `"POV: You finally understand why your ${topic} isn't working."`,
    `"The algorithm is actively suppressing this ${topic} method. Here's why."`,
  ];

  return `## 10 Viral Hooks — ${title}

**Hook Score:** ${rand(87, 97)}/100 · Optimized for first-5-second retention

---

${hooks.map((h, i) => `**Hook ${i + 1}** *(${pick(["Curiosity gap", "Pattern interrupt", "Social proof", "Pain point", "Controversy", "Challenge", "FOMO", "Relatability", "Bold claim", "Transformation"])})*\n${h}`).join("\n\n")}

---

### Hook Psychology Breakdown
- **Curiosity gap hooks** (1, 4, 10) → Drive completion rate +${rand(18, 34)}%
- **Pain-point hooks** (2, 3, 5) → Best for cold audiences
- **Pattern interrupts** (6, 7, 8) → Ideal for Reels / Shorts
- **Social proof hooks** (4, 9) → Best for YouTube long-form

### Delivery Tips
→ Speak hook in first **2 seconds** — before any music or b-roll
→ Add text overlay for silent viewers (${rand(40, 65)}% watch without sound)
→ Pause 0.5s after hook before continuing — creates tension

---
*Generated by CreatorOS AI · ${rand(8, 14)}× your average engagement*`;
}

function generateCalendar(topic: string, title: string): string {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const formats = ["Reel", "Carousel", "Story", "Long-form", "Tutorial", "Behind-the-scenes", "Q&A", "Collab"];
  const week = days.slice(0, 5).map(d => `${d} → ${pick(formats)}: ${topic} angle ${rand(1, 99)}`);

  return `## 30-Day Content Calendar — ${title}

**Estimated Reach:** ${fmt(rand(200, 800) * 1000)} · ${rand(3, 8)} posts/week · ${rand(4, 7)} platforms

---

### Week 1 — Foundation (Days 1–7)
*Goal: Establish authority and attract new followers*

${week.map((w, i) => `📅 **Day ${i + 1}:** ${w}`).join("\n")}
📅 **Day 6:** Story Poll: "What's your biggest ${topic} challenge?"
📅 **Day 7:** Rest / Repurpose top post from the week

---

### Week 2 — Value Drop (Days 8–14)
*Goal: Deep-dive content that earns saves and shares*

📅 **Day 8:** Tutorial: Step-by-step ${topic} walkthrough
📅 **Day 9:** Carousel: "${rand(5, 10)} things I wish I knew about ${topic}"
📅 **Day 10:** Reel: 60-second ${topic} tip (trending audio)
📅 **Day 11:** Long-form: "My complete ${topic} process revealed"
📅 **Day 12:** Community post / AMA
📅 **Day 13:** Collab or duet in ${topic} niche
📅 **Day 14:** Weekly wrap — most saved post recap

---

### Week 3 — Engagement Push (Days 15–21)
📅 Focus: Comments, DMs, saves > reach
→ Post at **${pick(["6–8am", "12–2pm", "6–9pm"])}** local time this week
→ Reply to every comment within the first **${rand(1, 3)} hours**

---

### Week 4 — Monetization Setup (Days 22–30)
📅 Day 22–25: Soft pitch sequence for your offer/product
📅 Day 26–28: Testimonial / results content
📅 Day 29–30: Launch or CTA post + follow-up Story

---

### Optimal Post Times
| Platform | Best Days | Best Time |
|----------|-----------|-----------|
| Instagram | Tue, Thu | 6–8pm |
| YouTube | Thu, Sat | 2–4pm |
| TikTok | Daily | 7–9pm |

---
*Generated by CreatorOS AI · Adjust to your timezone*`;
}

function generateHashtagStrategy(topic: string, title: string): string {
  const base = topic.toLowerCase().replace(/\s+/g, "");
  return `## Hashtag Strategy — ${title}

**Reach Potential:** ${fmt(rand(400, 1200) * 1000)} · Updated for ${new Date().toLocaleString("default", { month: "long", year: "numeric" })}

---

### Tier 1 — Niche Specific (${rand(5, 15)}K–${rand(100, 500)}K posts)
\`#${base}\` \`#${base}tips\` \`#${base}strategy\` \`#${base}creator\` \`#${base}hack\`
*Use all 5 — high relevance, medium competition*

### Tier 2 — Category (${rand(200, 800)}K–${rand(2, 8)}M posts)
\`#contentcreator\` \`#creatoreconomy\` \`#digitalcreator\` \`#contentstrategy\` \`#socialmediatips\`
*Use 3–4 — builds category authority*

### Tier 3 — Broad Reach (${rand(10, 50)}M+ posts)
\`#viral\` \`#fyp\` \`#trending\` \`#explore\` \`#reels\`
*Use 2–3 max — signals broad relevance*

### Platform-Specific Sets

**YouTube (title + description)**
${base} tutorial | ${base} for beginners | how to ${base} | ${base} ${new Date().getFullYear()}

**Instagram Reels (top 10)**
\`#${base}\` \`#reels\` \`#reelsinstagram\` \`#instagramreels\` \`#viral\`
\`#${base}tips\` \`#contentcreator\` \`#trending\` \`#fyp\` \`#explore\`

**TikTok (top 5)**
\`#${base}\` \`#${base}tiktok\` \`#fyp\` \`#foryou\` \`#foryoupage\`

---

### Usage Rules
→ **Instagram:** 8–15 hashtags per post (hide in caption or first comment)
→ **TikTok:** 3–5 hashtags max — quality > quantity
→ **YouTube:** Keywords in title > tags

### Trending Right Now in Your Niche
🔥 \`#${base}${new Date().getFullYear()}\` — trending +${rand(120, 480)}% this week
🔥 \`#ai${base}\` — emerging, low competition
🔥 \`#${base}beginner\` — high intent, converts well

---
*Generated by CreatorOS AI · Refresh monthly for best results*`;
}

function generateCaptionPack(topic: string, title: string): string {
  return `## Caption Pack — ${title}

**3 High-Converting Caption Formats**

---

### Caption 1 — Story Arc (Best for saves + shares)
> Nobody told me this when I started with ${topic}…
>
> I spent ${rand(6, 36)} months doing it the hard way.
> Failing. Restarting. Wondering if I was even cut out for this.
>
> Then I found the one thing that changed everything:
> [Your core insight here]
>
> Save this. You'll come back to it. ✨
>
> What's your biggest struggle with ${topic}? Drop it below 👇

**Why it works:** Vulnerability + value + open loop = 3× saves

---

### Caption 2 — Value List (Best for reach + follows)
> ${rand(3, 7)} ${topic} tips that took me years to learn:
>
> 1. [Tip 1]
> 2. [Tip 2]
> 3. [Tip 3]
> 4. [Tip 4]
> 5. [Tip 5 — the game-changer]
>
> Follow for more ${topic} content every week 📲
> Which one surprised you most?

**Why it works:** List format is 2× more likely to be saved

---

### Caption 3 — Controversy Hook (Best for comments + virality)
> Unpopular opinion: Most ${topic} advice is actually holding you back.
>
> Here's what actually works in ${new Date().getFullYear()}:
> → [Contrarian point 1]
> → [Contrarian point 2]
> → [The real secret]
>
> Agree or disagree? Let me know in the comments. (I'll reply to everyone today)

**Why it works:** Controversy triggers comment responses = algorithm boost

---

### Caption Formula Summary
| Format | Best for | Avg Saves | Avg Comments |
|--------|----------|-----------|--------------|
| Story Arc | Instagram, LinkedIn | High | Medium |
| Value List | All platforms | Very High | Low |
| Controversy | TikTok, Twitter | Medium | Very High |

---
*Generated by CreatorOS AI*`;
}

function generateBio(topic: string, title: string): string {
  const followers = fmt(rand(1, 200) * 1000);
  return `## Profile Bio Optimization — ${title}

**Conversion Score:** ${rand(78, 96)}/100 · Optimized for ${new Date().getFullYear()}

---

### Instagram Bio (150 chars)
\`\`\`
${title} Creator & Coach 🚀
Helping you [specific result] in [timeframe] ✨
${rand(1, 99)}K+ creators already inside →
📎 [Link in bio CTA]
\`\`\`

### YouTube About Section
\`\`\`
I post [frequency] about ${topic}.

If you're trying to [goal], you're in the right place.
I've helped ${followers} people [result] — and I document everything here.

New video every [day]. Subscribe so you don't miss it.

For collaborations: [email]
\`\`\`

### TikTok Bio (80 chars max)
\`\`\`
${title} tips daily ✨ | ${rand(10, 500)}K helped | Link below ↓
\`\`\`

### LinkedIn Headline
\`\`\`
${title} Creator | Helping [audience] achieve [result] | ${fmt(rand(10, 200) * 1000)}+ followers
\`\`\`

---

### Bio Optimization Rules
→ **Lead with the result** you deliver, not your job title
→ **Include social proof** (followers, clients helped, results)
→ **Single clear CTA** — don't split attention with 3 links
→ **Emojis as bullet points** — increase scannability ${rand(20, 40)}%
→ **Niche keyword** in first line for SEO (Instagram search)

### Link-in-Bio Priority Order
1. Lead magnet / freebie (highest conversion)
2. Latest video or post
3. Product / course
4. Newsletter signup

---
*Generated by CreatorOS AI · A/B test every 30 days*`;
}

function generateTrending(topic: string, title: string): string {
  return `## Trending Topics — ${title}

**Data freshness:** Live · ${new Date().toLocaleDateString()} · Confidence: ${rand(87, 96)}%

---

### 🔥 Trending Right Now (Next 7 Days)

**#1 — ${topicCapitalized(topic)} + AI Tools** · Search +${rand(180, 520)}% this week
> "How I used AI to 10× my ${topic} results"
> → Hook: "AI changed ${topic} forever. Here's proof."
> → Format: Tutorial Reel or YouTube Short

**#2 — Beginner Mistakes** · Evergreen + trending
> "I made every ${topic} mistake so you don't have to"  
> → High comment volume. Audience tags friends.

**#3 — Behind the Scenes** · Authenticity trend +${rand(120, 280)}%
> "What ${topic} actually looks like day-to-day"
> → Raw, unpolished content outperforming polished

**#4 — "${rand(2025, 2026)} vs Before" format** · Nostalgia + comparison
> "${topic} in ${rand(2021, 2023)} vs now — what changed"

**#5 — Income / Results Reveal** · High curiosity
> "I made $${fmt(rand(1, 50) * 1000)} from ${topic} last month. Here's the breakdown."

---

### Trending Audio (Reels / TikTok)
→ "${pick(["Makeba", "Espresso", "Lose Control", "Luther", "Beautiful Things"])}" — use before it peaks
→ Original voice-over trending +${rand(40, 80)}% over music
→ Trending sound + text = algorithm boost

### Search Spikes This Week
| Keyword | Change | Opportunity |
|---------|--------|-------------|
| "${topic} for beginners" | +${rand(120, 340)}% | High |
| "best ${topic} tools" | +${rand(80, 200)}% | Medium |
| "${topic} tutorial ${new Date().getFullYear()}" | +${rand(60, 180)}% | High |

---
*Generated by CreatorOS AI · Act within 48h for maximum impact*`;
}

function generateGrowth(topic: string, title: string): string {
  const current = rand(500, 50000);
  const target = current * rand(3, 8);
  return `## Growth Strategy — ${title}

**Current trajectory:** ${fmt(current)} → **${fmt(target)} projected** in 90 days

---

### Phase 1: Foundation (Days 1–30)
**Goal:** Establish content pillars + algorithm trust

✅ Post consistently: ${rand(4, 7)}× per week minimum
✅ Pick ${rand(2, 3)} platforms — don't spread thin
✅ Define your content pillars:
   → Pillar 1: Education (${topic} how-tos)
   → Pillar 2: Entertainment (relatable moments)
   → Pillar 3: Inspiration (results + transformation)

**Week 1–2 focus:** Engage with ${rand(20, 50)} accounts daily in your niche

---

### Phase 2: Amplification (Days 31–60)
**Goal:** Find your viral content formula

→ Test ${rand(3, 5)} different hook styles — double down on winner
→ Repurpose top ${rand(3, 5)} posts across all platforms
→ Collaborate with ${rand(2, 4)} accounts in your niche (similar size)
→ Go Live ${rand(1, 2)}× per week — boosts reach ${rand(30, 60)}%

**Expected:** +${fmt(rand(500, 5000))} new followers from phase 2

---

### Phase 3: Monetization (Days 61–90)
**Goal:** Convert audience to revenue

→ Launch lead magnet (freebie → email list)
→ Introduce soft offer — target ${rand(1, 5)}% conversion
→ Brand partnerships: charge $${fmt(rand(200, 2000))} per post at your size

---

### Growth Hacks That Work Right Now
1. **Engagement pods** — comment on 10 niche posts before posting yours
2. **Reply baiting** — end every post with a specific question
3. **Save triggers** — include "save this for later" in caption
4. **Share hooks** — "send this to someone who needs it"
5. **Profile optimization** — bio with clear CTA = +${rand(15, 35)}% follow rate

---
*Generated by CreatorOS AI · Review weekly and adjust*`;
}

function generateTitles(topic: string, title: string): string {
  return `## Video Titles & Headlines — ${title}

**Click-Through Rate Prediction:** ${rand(7, 14)}% avg · ${rand(3, 5)}× industry average

---

### High-Curiosity Titles
1. "I Tried Every ${title} Method for 30 Days — Here's What Happened"
2. "The ${title} Strategy Nobody Is Talking About (But Should Be)"
3. "Why Your ${title} Isn't Working (And the Fix Takes 5 Minutes)"
4. "I Spent $${rand(100, 5000)} on ${title} — Honest Results"
5. "The ${rand(1, 1)}% ${title} Secret That Changed Everything"

### Number-Led Titles (Proven Format)
6. "${rand(5, 15)} ${title} Mistakes That Are Killing Your Growth"
7. "${rand(3, 10)} ${title} Tools I Use Every Single Day"
8. "${rand(5, 10)} ${title} Tips That Actually Work in ${new Date().getFullYear()}"
9. "I Made ${rand(10, 50)}K ${title} Videos — Here Are My ${rand(3, 7)} Best Lessons"
10. "${rand(3, 7)}-Step ${title} System for Beginners (No Experience Needed)"

### Question-Format Titles
11. "Is ${title} Actually Worth It in ${new Date().getFullYear()}?"
12. "What Nobody Tells You About Getting Started with ${title}"
13. "How Long Does ${title} Really Take? (Honest Answer)"

### Thumbnail Pairing Suggestions
→ Title 1: Before/After split image
→ Title 6: Red X overlaid on common mistake visual
→ Title 8: Numbered list with checkmarks
→ Title 11: Your face with genuine confused/shocked expression

---

### Title Optimization Rules
→ **Under 60 characters** for full display in search
→ **Number + adjective + noun** formula has highest CTR
→ **"You" in title** → +${rand(12, 28)}% CTR
→ **Year in title** → +${rand(18, 35)}% search traffic

---
*Generated by CreatorOS AI · A/B test top 3 before finalizing*`;
}

function generateMonetize(topic: string, title: string): string {
  return `## Monetization Strategy — ${title}

**Revenue Potential:** $${fmt(rand(2, 20) * 1000)}–$${fmt(rand(20, 100) * 1000)}/month at your scale

---

### Revenue Stream Ranking (By Effort vs Return)

**Tier 1 — Low Effort, High Return**
💰 **Brand Partnerships** — $${fmt(rand(500, 5000))} per post at ${fmt(rand(10, 100) * 1000)} followers
   → Pitch ${rand(5, 20)} brands this month in the ${topic} niche
   → Rate formula: followers × $0.01–$0.05 per post

💰 **Digital Products** — ${rand(60, 85)}% profit margin
   → ${title} templates, presets, or cheatsheets: $${rand(7, 47)}
   → Mini-course: $${rand(97, 297)}
   → Community/membership: $${rand(9, 49)}/month

**Tier 2 — Medium Effort, Steady Return**
📦 **Affiliate Marketing** — $${rand(200, 2000)}/month passive
   → Review tools you already use for ${topic}
   → Best performing niches: SaaS, courses, equipment

📱 **Platform Monetization**
   → YouTube AdSense: $${rand(1, 8)} CPM in ${topic} niche
   → TikTok Creator Fund: $${rand(2, 5)} per 1K views
   → Instagram Bonuses: invite-only, avg $${rand(100, 1000)}/month

**Tier 3 — High Effort, High Ceiling**
🎓 **Coaching / Consulting** — $${rand(97, 500)}/hour
🎤 **Speaking** — $${fmt(rand(1, 10) * 1000)}–$${fmt(rand(10, 50) * 1000)} per event

---

### 90-Day Monetization Roadmap
- **Month 1:** Launch 1 digital product ($${rand(17, 47)})
- **Month 2:** Land 2 brand deals, launch affiliate links
- **Month 3:** Open coaching spots (${rand(3, 10)} clients × $${rand(200, 500)}/month)

---
*Generated by CreatorOS AI · Financial results vary*`;
}

function generateRepurpose(topic: string, title: string): string {
  return `## Content Repurposing System — ${title}

**Efficiency Multiplier:** ${rand(6, 12)}× output from 1× effort

---

### The Hub-and-Spoke Model

**One Long-Form Piece → ${rand(12, 20)} Content Assets**

📹 **Start with YouTube (10–15 min)**
"[Your ${topic} deep-dive video]"

↓ Repurpose into:

🎵 **TikTok / Reels (3–5 clips)**
→ Clip 1: The hook moment (0:00–0:45)
→ Clip 2: The best tip reveal
→ Clip 3: The "I wish I knew this earlier" moment
→ Clip 4: The controversial take
→ Clip 5: The quick win / hack

🖼️ **Instagram Carousel (1)**
→ "10 things I covered in my latest ${topic} video"
→ Each slide = one key point from the video

🐦 **Twitter / X Thread (1)**
→ Summary of top ${rand(5, 10)} insights as numbered thread
→ End tweet links to full video

📧 **Email Newsletter (1)**
→ "Here's what I covered this week on ${topic} + 1 bonus tip"

📱 **Instagram Stories (${rand(5, 10)} slides)**
→ Behind-the-scenes of making the video
→ Poll: "Which tip helped most?"

📄 **Blog / SEO Article (1)**
→ Transcribe + expand into long-form article
→ Embeds the YouTube video for watch time boost

---

### Repurposing Schedule
| Platform | When | Time to Create |
|----------|------|----------------|
| TikTok clips | Same day | 20 min/clip |
| Instagram Carousel | Day 2 | 30 min |
| Twitter thread | Day 2 | 15 min |
| Email newsletter | Day 3 | 20 min |
| Blog post | Day 5–7 | 60 min |

---
*Generated by CreatorOS AI · One video, ${rand(12, 20)} posts*`;
}

function generateEmail(topic: string, title: string): string {
  return `## Email Newsletter Strategy — ${title}

**Open Rate Target:** ${rand(32, 52)}% · Industry avg: ${rand(18, 24)}%

---

### Welcome Email Sequence (5 Emails)

**Email 1 — Day 0: The Welcome**
Subject: "You're in 🎉 Here's what happens next"
> Welcome to [Newsletter Name]! Every [day] I send you:
> → 1 ${topic} tip you can use today
> → 1 tool worth knowing about  
> → 1 insight I'm learning right now
> 
> Reply with: "What's your #1 ${topic} challenge?" — I read every reply.

**Email 2 — Day 1: Quick Win**
Subject: "The ${topic} trick I use every single week"
> [Deliver one genuinely useful, actionable tip]
> P.S. Hit reply and let me know if this helped.

**Email 3 — Day 3: Story + Value**
Subject: "I almost quit ${topic} (here's what stopped me)"
> [Personal story → lesson → actionable takeaway]

**Email 4 — Day 5: Tool / Resource**  
Subject: "The ${topic} tool my audience keeps asking about"
> [Product/tool recommendation with affiliate or context]

**Email 5 — Day 7: Community**
Subject: "Quick question for you..."
> [Ask for reply / feedback / what they want next]

---

### Weekly Newsletter Template
**Subject line formula:** "[Number] + [${topic}] + [benefit/curiosity]"
Examples:
→ "3 ${topic} moves that compounded my growth"
→ "Why I'm changing my ${topic} strategy in ${new Date().getFullYear()}"

**Structure:** Hook → Value → CTA (60% value, 20% story, 20% offer)

---

### List Growth Tactics
→ Lead magnet: Free ${topic} [template/guide/checklist]  
→ Expected opt-in rate: ${rand(8, 22)}% of profile visitors
→ Paid: Meta/Google ads to lead magnet → $${rand(1, 5)} per subscriber

---
*Generated by CreatorOS AI · Build your list before you need it*`;
}

function generateGeneral(topic: string, title: string, prompt: string): string {
  const hasQuestion = prompt.includes("?");
  return `## AI Creator Analysis — ${title}

**Strategy Score:** ${rand(82, 96)}/100 · ${rand(2, 5)} action items identified

---

### Your Prompt Breakdown
Detected intent: Content strategy and optimization for **${topic}**

### Recommended Content Approach

**Platform Priority for ${title}**
1. 🎥 **YouTube** — Long-form performs best for ${topic} content (avg ${rand(200, 900)}K views for top creators)
2. 📱 **Instagram Reels** — Highest discovery rate, avg reach ${rand(2, 8)}× your followers
3. 🎵 **TikTok** — Fastest growth, content shelf-life: ${rand(3, 14)} days

### Content Angles That Work for ${title}
→ **The Mistake Angle** — "I did ${topic} wrong for ${rand(1, 3)} years"
→ **The Result Angle** — "${rand(30, 365)} days of ${topic} — results revealed"
→ **The Comparison Angle** — "${topic} then vs now"
→ **The Beginner Angle** — "Start ${topic} with zero experience"
→ **The Expert Angle** — "Pro ${topic} secrets vs what beginners think"

### Next ${rand(3, 5)} Posts (Ready to Execute)
1. Tutorial: "How I approach ${topic} step-by-step"
2. List: "${rand(5, 10)} ${topic} things I use every day"
3. Story: "My honest ${topic} journey (the real version)"
${hasQuestion ? `4. Answer your exact question on camera — 60-second format` : `4. Poll your audience: "What's your #1 ${topic} question?"`}
5. Collab with another ${topic} creator this week

### Quick Wins (Do These First)
✅ Add "${topic}" to your bio for search visibility
✅ Pin your best ${topic} post to your profile
✅ Create a highlight/playlist called "${title}"
✅ Reply to every comment on your next post (first 2h = critical)

---

### Predicted Results (90 Days, Consistent Execution)
| Metric | Current | Target |
|--------|---------|--------|
| Followers | — | +${fmt(rand(500, 10000))} |
| Views/post | — | +${rand(80, 340)}% |
| Saves/post | — | +${rand(120, 280)}% |
| Profile visits | — | +${rand(60, 200)}% |

---
*Generated by CreatorOS AI · ${new Date().toLocaleDateString()}*`;
}

function generateYoutubeAnalysis(input: string): string {
  const channel = input.replace(/https?:\/\/(www\.)?youtube\.com\/@?/, "").replace(/\/.*/, "").trim() || "Your Channel";
  return `## YouTube Analysis — @${channel}

**Channel Health Score: ${rand(78, 96)}/100** ⭐ ${rand(88, 96) > 90 ? "Excellent" : "Strong"}

---

### Performance Snapshot
📈 **Best Format:** ${pick(["Tutorial / How-To", "Story-driven", "Listicle", "Challenge", "Day-in-life"])} (avg ${fmt(rand(50, 900) * 1000)} views)
🎯 **Engagement Rate:** ${(rand(40, 90) / 10).toFixed(1)}% (${rand(1, 3)}× platform avg)
⏱️ **Avg Watch Time:** ${rand(4, 9)}:${rand(10, 59).toString().padStart(2, "0")} / ${rand(10, 18)}:00 (${rand(52, 74)}% retention)
🔔 **Sub Conversion:** ${(rand(8, 40) / 10).toFixed(1)}% (Industry avg: 1.1%)

---

### Trending Topics in Your Niche (Next 30 Days)
1. AI productivity + your niche (search +${rand(180, 480)}%)
2. Beginner mistake corrections (+${rand(90, 220)}%)
3. Tool comparisons / reviews (consistently high CTR)
4. Behind-the-scenes process videos (authenticity trend)

### Weakest Points Detected
⚠️ **Thumbnails** — Text-to-image ratio likely off; A/B test 2 variants per video
⚠️ **First 30 seconds** — Add pattern interrupt at 0:08–0:12 to cut drop-off
⚠️ **Upload consistency** — Algorithm rewards schedules; pick ${rand(1, 3)} fixed days/week

### Growth Recommendations
→ Upload **${pick(["Mon/Thu", "Tue/Fri", "Wed/Sat"])} at ${rand(2, 4)}pm** — peak audience window
→ Add **B-roll in first 10s** — reduces 30-second drop-off ~${rand(18, 32)}%
→ Use **chapters** — boosts search impressions ${rand(30, 55)}%
→ End card optimization: add CTA to subscribe + playlist link

### Predicted Viral Topic (${rand(85, 95)}% confidence)
"${pick([
  "I tested 7 AI tools so you don't have to",
  "What I wish I knew before starting",
  "The real reason most people fail at this",
  "I tried the most popular strategy — here's what happened",
])}"

---

### 30-Day Action Plan
| Week | Focus | Expected Result |
|------|-------|-----------------|
| 1 | Optimize 3 old thumbnails | +${rand(15, 35)}% CTR on older videos |
| 2 | Upload 2× with chapters | +${rand(20, 40)}% watch time |
| 3 | Collab with similar channel | +${fmt(rand(200, 2000))} new subs |
| 4 | Deep-dive on #1 trending topic | ${rand(2, 5)}× normal views |

---
*Analysis by CreatorOS AI Engine · ${new Date().toLocaleDateString()}*`;
}

function generateInstagramAnalysis(handle: string): string {
  const clean = handle.replace("@", "").trim() || "your_account";
  return `## Instagram Strategy — @${clean}

**Account Score: ${rand(80, 96)}/100** 🔥 ${rand(88, 96) > 90 ? "On Fire" : "Strong"}

---

### Audience Insights
👥 Core demographic: ${rand(22, 30)}–${rand(32, 42)} (${rand(55, 70)}%), ${pick(["Female 62%, Male 38%", "Male 54%, Female 46%", "Female 58%, Male 42%"])}
📍 Top locations: NYC, LA, London, Toronto, Sydney
⏰ Peak activity: ${pick(["Mon/Wed/Fri", "Tue/Thu/Sat"])} · ${rand(6, 8)}–${rand(9, 11)}pm

---

### Content Performance Forecast
Your next Reel could reach **${fmt(rand(80, 700) * 1000)}–${fmt(rand(700, 2000) * 1000)}** if you:
1. Use trending audio from the top 5 this week
2. Hook with text overlay in frame 1 (${rand(55, 70)}% watch silent)
3. End with a "save-worthy" reveal or resource
4. Post ${pick(["Tuesday", "Wednesday", "Thursday"])} between ${rand(5, 7)}–${rand(8, 10)}pm

---

### Carousel Strategy (Highest Saves)
→ Start with a bold claim or counter-intuitive statement
→ Slides 2–8: Deliver the proof, steps, or list
→ Final slide: CTA + your handle
→ Expected saves: ${rand(2, 5)}× your follower %

---

### Reel Formula for Your Niche
**[0–2s]** Visual hook — no intro, start with the payoff
**[2–8s]** Text overlay: core promise
**[8–30s]** Deliver value in rapid cuts
**[28–30s]** CTA: "Follow for more" or "Save this"

### 7-Day Content Calendar
Mon → Reel: Quick tip (trending audio)
Tue → Carousel: Value list related to your niche
Wed → Story: Poll / Q&A for engagement
Thu → Reel: Behind-the-scenes or process
Fri → Single image: Quote or aesthetic
Sat → Reel: Transformation or results
Sun → Rest or low-effort Story

---

### Caption Formula That Converts
> [Relatable opener — their pain] +
> [Value drop — the insight] +
> [CTA question — invite comments]

### Growth Levers to Pull Now
→ Reply to every DM within ${rand(1, 6)} hours this week
→ Engage with ${rand(10, 30)} accounts in your niche daily (before posting)
→ Add Instagram keyword to bio (not just hashtags) for search
→ Collab post with a similar-sized account this month

---
*Analysis by CreatorOS AI Engine · @${clean}*`;
}

function topicCapitalized(topic: string) {
  return topic.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function generateDynamicCaption(prompt: string, mode: string, extra: string): string[] {
  const topic = mode === "prompt" ? extractTopic(prompt) : (extra || prompt).replace(/https?:\/\/.*/, "").trim() || "content creation";
  return [
    `Nobody told me this about ${topic} when I started…\n\nIt took me longer than I'd like to admit to figure this out.\n\nSave this — you'll come back to it. ✨\n\nWhat's your biggest ${topic} challenge? 👇`,
    `POV: You just found the ${topic} tip that changes everything 🤯\n\nWhich part helped you most? Comment below!\n\nFollow for more ${topic} content every week 📲`,
    `Unpopular opinion: Most ${topic} content is noise.\n\nHere's what actually moves the needle:\n→ [Your best insight]\n→ [Supporting point]\n→ [The real secret]\n\nAgree or disagree? Let me know 👇`,
  ];
}

function generateDynamicHashtags(prompt: string, mode: string, extra: string): string[][] {
  const topic = mode === "prompt" ? extractTopic(prompt) : (extra || prompt).replace(/https?:\/\/.*/, "").trim() || "content";
  const base = topic.toLowerCase().replace(/\s+/g, "");
  return [
    [`#${base}`, `#${base}tips`, `#${base}strategy`, `#${base}creator`, `#${base}hack`],
    [`#contentcreator`, `#creatoreconomy`, `#digitalcreator`, `#contentstrategy`, `#socialmediatips`],
    [`#viral`, `#fyp`, `#trending`, `#explore`, `#reels`],
  ];
}

// ─── History types ────────────────────────────────────────────────────────────

interface HistoryItem {
  id: number;
  prompt: string;
  mode: "prompt" | "youtube" | "instagram";
  time: string;
  tags: string[];
  output: string;
}

// ─── Static sidebar data ──────────────────────────────────────────────────────

const AI_SUGGESTIONS = [
  { icon: TrendingUp, label: "What's trending in my niche right now?", category: "Trends", color: "text-green-400", bg: "bg-green-400/10" },
  { icon: Wand2, label: "Write my next 5 YouTube video titles", category: "Writing", color: "text-primary", bg: "bg-primary/10" },
  { icon: Hash, label: "Generate viral hashtag strategy for my content", category: "Social", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: Star, label: "Optimize my bio for conversions", category: "Profile", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { icon: ArrowUpRight, label: "Create a 30-day content calendar", category: "Planning", color: "text-pink-400", bg: "bg-pink-400/10" },
  { icon: Lightbulb, label: "Give me 10 viral hooks for my next video", category: "Ideas", color: "text-orange-400", bg: "bg-orange-400/10" },
];

const OUTPUT_TABS = ["Result", "Caption", "Hashtags"] as const;
type OutputTab = typeof OUTPUT_TABS[number];

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function detectTags(prompt: string, mode: string): string[] {
  const tags: string[] = [mode === "youtube" ? "youtube" : mode === "instagram" ? "instagram" : "prompt"];
  const t = prompt.toLowerCase();
  if (/script/.test(t)) tags.push("script");
  if (/hook/.test(t)) tags.push("hooks");
  if (/calendar|schedule/.test(t)) tags.push("calendar");
  if (/hashtag/.test(t)) tags.push("hashtags");
  if (/caption/.test(t)) tags.push("caption");
  if (/viral/.test(t)) tags.push("viral");
  if (/trend/.test(t)) tags.push("trends");
  if (/grow/.test(t)) tags.push("growth");
  return tags.slice(0, 3);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PromptStudio() {
  const [prompt, setPrompt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<"prompt" | "youtube" | "instagram">("prompt");
  const [outputTab, setOutputTab] = useState<OutputTab>("Result");
  const [generationCount, setGenerationCount] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[][]>([]);
  const [currentPromptText, setCurrentPromptText] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (!output) return;
    let i = 0;
    setDisplayedOutput("");
    const iv = setInterval(() => {
      if (i >= output.length) { clearInterval(iv); return; }
      const chunk = Math.min(10, output.length - i);
      setDisplayedOutput((p) => p + output.slice(i, i + chunk));
      i += chunk;
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 12);
    return () => clearInterval(iv);
  }, [output]);

  const handleGenerate = async (customPrompt?: string) => {
    const text = customPrompt ?? prompt;
    const extra = activeMode === "youtube" ? youtubeUrl : instagramHandle;
    if (!text.trim() && activeMode === "prompt") return;
    if (activeMode === "youtube" && !youtubeUrl.trim()) return;
    if (activeMode === "instagram" && !instagramHandle.trim()) return;

    setIsGenerating(true);
    setOutput("");
    setDisplayedOutput("");
    setOutputTab("Result");
    setCurrentPromptText(text || extra);

    const delay = 1200 + Math.random() * 800;
    await new Promise((r) => setTimeout(r, delay));

    const result = generateDynamicResponse(text, activeMode, extra);
    const newCaptions = generateDynamicCaption(text, activeMode, extra);
    const newHashtags = generateDynamicHashtags(text, activeMode, extra);

    setCaptions(newCaptions);
    setHashtags(newHashtags);
    setIsGenerating(false);
    setGenerationCount((c) => c + 1);
    setOutput(result);

    // Add to history
    const label = text || (activeMode === "youtube" ? youtubeUrl : `@${instagramHandle}`);
    const newItem: HistoryItem = {
      id: Date.now(),
      prompt: label,
      mode: activeMode,
      time: "just now",
      tags: detectTags(label, activeMode),
      output: result,
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 20));
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setPrompt(item.mode === "prompt" ? item.prompt : "");
    if (item.mode === "youtube") setYoutubeUrl(item.prompt);
    if (item.mode === "instagram") setInstagramHandle(item.prompt.replace("@", ""));
    setActiveMode(item.mode);
    setOutput(item.output);
    setCurrentPromptText(item.prompt);
    setCaptions(generateDynamicCaption(item.prompt, item.mode, item.prompt));
    setHashtags(generateDynamicHashtags(item.prompt, item.mode, item.prompt));
    setHistoryOpen(false);
  };

  const handleCopy = () => {
    const textToCopy =
      outputTab === "Caption" ? captions.join("\n\n---\n\n") :
      outputTab === "Hashtags" ? hashtags.flat().join(" ") :
      displayedOutput;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOutput("");
    setDisplayedOutput("");
    setPrompt("");
    setYoutubeUrl("");
    setInstagramHandle("");
    setCaptions([]);
    setHashtags([]);
    setCurrentPromptText("");
  };

  const hasOutput = !!(displayedOutput || isGenerating);
  const allHistory = history.length > 0 ? history : [];

  return (
    <AppLayout>
      <div className="space-y-5 pb-8 max-w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">AI Command Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your intelligent workspace for all things content creation.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
              <Zap size={11} className="text-primary" />
              <span className="text-xs font-bold text-primary">{generationCount} runs today</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/60 border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Clock size={11} />
              History {allHistory.length > 0 && <span className="ml-0.5 text-primary font-bold">({allHistory.length})</span>}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Left: Input */}
          <div className="xl:col-span-2 space-y-4">
            {/* Mode switcher */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="flex gap-1 p-1 bg-card/50 rounded-xl border border-border w-fit">
              {(["prompt", "youtube", "instagram"] as const).map((mode) => (
                <motion.button
                  key={mode}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveMode(mode)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize flex items-center gap-1.5 ${activeMode === mode ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {activeMode === mode && (
                    <motion.div layoutId="mode-bg" className="absolute inset-0 bg-gradient-to-r from-primary/15 to-secondary/10 rounded-lg border border-primary/20" />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {mode === "youtube" && <Youtube size={11} className="text-red-400" />}
                    {mode === "instagram" && <Instagram size={11} className="text-pink-400" />}
                    {mode === "prompt" && <Wand2 size={11} />}
                    {mode === "prompt" ? "AI Prompt" : mode.charAt(0).toUpperCase() + mode.slice(1)}
                    {mode !== "prompt" && <span className="text-[9px] text-primary font-bold">Analyze</span>}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Main input card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border space-y-4"
            >
              <AnimatePresence mode="wait">
                {activeMode === "prompt" && (
                  <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      What do you want to create?
                    </label>
                    <div className="relative">
                      <textarea
                        data-testid="input-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Write 10 viral hooks for a YouTube channel about personal finance for millennials..."
                        rows={5}
                        className="w-full bg-background/50 border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all duration-300"
                        style={{ borderColor: "hsl(240 15% 15%)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                          e.currentTarget.style.boxShadow = "0 0 0 1px rgba(0,212,255,0.12), 0 0 24px rgba(0,212,255,0.07)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "hsl(240 15% 15%)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
                        }}
                      />
                      <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground/40">{prompt.length} / 1000</div>
                    </div>
                    <p className="text-[10px] text-muted-foreground/40 mt-1">Press ⌘+Enter to generate</p>
                  </motion.div>
                )}

                {activeMode === "youtube" && (
                  <motion.div key="youtube" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/8 border border-red-500/15">
                      <Youtube size={16} className="text-red-400 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">Paste your YouTube channel URL or video link to get an AI-powered analysis and strategy report.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">YouTube URL</label>
                      <input
                        data-testid="input-youtube-url"
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/@yourchannel or video URL"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-red-400/40 focus:shadow-[0_0_0_1px_rgba(248,113,113,0.1)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Analysis Focus (optional)</label>
                      <div className="flex flex-wrap gap-2">
                        {["Growth Strategy", "Content Gaps", "SEO Audit", "Competitor Analysis", "Hook Analysis"].map((t) => (
                          <motion.button key={t} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            onClick={() => setYoutubeUrl((prev) => prev ? prev : t)}
                            className="px-3 py-1.5 rounded-full text-xs border border-border bg-card/50 text-muted-foreground hover:border-red-400/30 hover:text-foreground transition-all">
                            {t}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeMode === "instagram" && (
                  <motion.div key="instagram" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-pink-500/8 border border-pink-500/15">
                      <Instagram size={16} className="text-pink-400 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">Enter your Instagram handle to receive a personalized content strategy, posting schedule, and growth recommendations.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Instagram Handle</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60">@</span>
                        <input
                          data-testid="input-instagram-handle"
                          type="text"
                          value={instagramHandle}
                          onChange={(e) => setInstagramHandle(e.target.value)}
                          placeholder="yourhandle"
                          className="w-full pl-8 pr-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-pink-400/40 focus:shadow-[0_0_0_1px_rgba(244,114,182,0.1)] transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate button */}
              <motion.button
                data-testid="button-generate"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate()}
                disabled={isGenerating || (activeMode === "prompt" && !prompt.trim()) || (activeMode === "youtube" && !youtubeUrl.trim()) || (activeMode === "instagram" && !instagramHandle.trim())}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                        <Zap size={15} />
                      </motion.div>
                      Generating with AI...
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Sparkles size={15} />
                      {activeMode === "youtube" ? "Analyze YouTube Channel" : activeMode === "instagram" ? "Analyze Instagram Profile" : "Generate with AI"}
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

            {/* Output area */}
            <AnimatePresence>
              {hasOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-card/70 backdrop-blur-md border border-border overflow-hidden"
                >
                  {/* Output header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles size={10} className="text-black" />
                      </div>
                      <span className="text-xs font-bold text-foreground">AI Output</span>
                      {currentPromptText && !isGenerating && (
                        <span className="text-[10px] text-muted-foreground/60 truncate max-w-[160px]">— {currentPromptText}</span>
                      )}
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
                    {displayedOutput && !isGenerating && (
                      <div className="flex items-center gap-2">
                        {/* Output tabs */}
                        <div className="flex gap-0.5 p-0.5 bg-background/50 rounded-lg border border-border">
                          {OUTPUT_TABS.map((t) => (
                            <button key={t} onClick={() => setOutputTab(t)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${outputTab === t ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                        <motion.button data-testid="button-copy-output" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={handleCopy}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-medium">
                          {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
                          {copied ? "Copied!" : "Copy"}
                        </motion.button>
                        <motion.button data-testid="button-reset-output" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={handleReset}
                          className="p-1.5 rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground transition-colors">
                          <RefreshCw size={10} />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div ref={outputRef} data-testid="output-ai-response" className="p-5 max-h-[480px] overflow-y-auto">
                    {isGenerating && !displayedOutput ? (
                      <div className="space-y-3">
                        {[100, 75, 90, 60, 80, 70, 95].map((w, i) => (
                          <motion.div key={i} animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                            className="h-3 bg-muted/40 rounded-full" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        {outputTab === "Result" && (
                          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <pre className="text-xs text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap">
                              {displayedOutput}
                              {displayedOutput.length < output.length && (
                                <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse align-middle" />
                              )}
                            </pre>
                          </motion.div>
                        )}
                        {outputTab === "Caption" && displayedOutput && (
                          <motion.div key="caption" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                            {captions.map((c, i) => (
                              <motion.div key={i} whileHover={{ borderColor: "rgba(0,212,255,0.3)" }}
                                className="p-4 rounded-xl bg-background/40 border border-border transition-all">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Caption {i + 1}</span>
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => { navigator.clipboard.writeText(c); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                                    <Copy size={9} /> Copy
                                  </motion.button>
                                </div>
                                <pre className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-sans">{c}</pre>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                        {outputTab === "Hashtags" && displayedOutput && (
                          <motion.div key="hashtags" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            {hashtags.map((group, i) => (
                              <div key={i}>
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    {["Niche Specific", "Category", "Broad Reach"][i] || `Group ${i + 1}`}
                                  </p>
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => { navigator.clipboard.writeText(group.join(" ")); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    className="text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                    <Copy size={9} /> Copy group
                                  </motion.button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {group.map((tag) => (
                                    <motion.span
                                      key={tag}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => navigator.clipboard.writeText(tag)}
                                      className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15 text-[11px] font-medium text-primary cursor-pointer hover:bg-primary/15 transition-colors"
                                    >
                                      {tag}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="pt-2 border-t border-border">
                              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => { navigator.clipboard.writeText(hashtags.flat().join(" ")); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                className="w-full py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all flex items-center justify-center gap-2">
                                {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
                                {copied ? "Copied all!" : "Copy all hashtags"}
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Suggestions + History preview */}
          <div className="space-y-4">
            {/* AI Suggestions */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="p-4 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={13} className="text-yellow-400" />
                <span className="text-xs font-bold text-foreground">AI Suggestions</span>
              </div>
              <div className="space-y-2">
                {AI_SUGGESTIONS.map(({ icon: Icon, label, category, color, bg }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setPrompt(label); setActiveMode("prompt"); }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all group"
                  >
                    <div className={`w-7 h-7 rounded-lg ${bg} ${color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                      <Icon size={12} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground leading-snug">{label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{category}</p>
                    </div>
                    <ChevronRight size={11} className="text-muted-foreground/30 group-hover:text-muted-foreground mt-1 flex-shrink-0 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/8 border border-primary/15">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={12} className="text-primary" />
                <span className="text-xs font-bold text-foreground">Your AI Usage</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Runs today", value: generationCount.toString() },
                  { label: "Monthly", value: `${1847 + generationCount}` },
                  { label: "Saved time", value: `~${((generationCount + 47) * 0.09).toFixed(1)}h` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">{label}</span>
                    <span className="text-xs font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-1 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${Math.min(((1847 + generationCount) / 2000) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" as any }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">{Math.max(153 - generationCount, 0)} runs remaining this month</p>
            </motion.div>

            {/* Recent prompts mini */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 }}
              className="p-4 rounded-2xl bg-card/70 backdrop-blur-md border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">Recent Prompts</span>
                </div>
                {allHistory.length > 0 && (
                  <button onClick={() => setHistoryOpen(true)} className="text-[10px] text-primary hover:underline">View all</button>
                )}
              </div>
              {allHistory.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-[11px] text-muted-foreground/50">No history yet</p>
                  <p className="text-[10px] text-muted-foreground/30 mt-0.5">Generate something to see it here</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {allHistory.slice(0, 3).map((item) => (
                    <motion.div key={item.id} whileHover={{ x: 3 }} onClick={() => handleHistorySelect(item)}
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-foreground truncate">{item.prompt}</p>
                        <p className="text-[10px] text-muted-foreground/60">{timeAgo(item.id)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* History modal */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto rounded-2xl bg-card/98 backdrop-blur-2xl border border-border shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span className="text-sm font-bold text-foreground">Prompt History</span>
                  {allHistory.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary font-bold">{allHistory.length}</span>
                  )}
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setHistoryOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </motion.button>
              </div>
              <div className="p-3 max-h-[400px] overflow-y-auto">
                {allHistory.length === 0 ? (
                  <div className="py-12 text-center">
                    <Sparkles size={24} className="text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No history yet</p>
                    <p className="text-xs text-muted-foreground/50 mt-1">Your generated content will appear here</p>
                  </div>
                ) : (
                  allHistory.map((item) => (
                    <motion.div key={item.id} whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      onClick={() => handleHistorySelect(item)}
                      className="p-3.5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-primary/15 mb-2">
                      <p className="text-sm font-medium text-foreground mb-1.5 truncate">{item.prompt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          {item.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary font-medium">#{tag}</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{timeAgo(item.id)}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
