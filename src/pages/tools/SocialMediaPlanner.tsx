import { useState } from "react";
import { Calendar } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generatePlanner, generatePlannerCalendar } from "@/lib/toolGenerators";

const ALL_PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter/X", "LinkedIn", "Facebook", "Pinterest"];
const FREQUENCIES = ["Daily", "5×/week", "3×/week", "2×/week"];
const NICHES = ["Tech", "Lifestyle", "Fitness", "Finance", "Education", "Gaming", "Beauty", "Business", "Food", "Travel", "Art", "Parenting"];

export default function SocialMediaPlanner() {
  const [niche, setNiche] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["Instagram", "TikTok"]);
  const [frequency, setFrequency] = useState("3×/week");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));
    const ni = niche || "content creation";
    setSections([
      { tab: "30-Day Plan", content: generatePlanner(ni, platforms, frequency) },
      { tab: "Calendar", content: generatePlannerCalendar(ni, frequency) },
    ]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Social Media Planner"
      description="Generate a 30-day content calendar tailored to your niche, platforms, and goals."
      gradient="from-yellow-400 to-orange-500"
      iconElement={<Calendar size={18} className="text-black" />}
      canGenerate={platforms.length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate 30-Day Plan"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setNiche(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Your Niche</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {NICHES.map(n => (
              <button key={n} onClick={() => setNiche(n)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${niche === n ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                {n}
              </button>
            ))}
          </div>
          <input
            value={niche}
            onChange={e => setNiche(e.target.value)}
            placeholder="Or type your niche..."
            className="w-full px-4 py-2.5 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-yellow-400/40 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Platforms</label>
            <div className="flex flex-col gap-1.5">
              {ALL_PLATFORMS.map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer group">
                  <div onClick={() => togglePlatform(p)}
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${platforms.includes(p) ? "bg-yellow-400 border-yellow-400" : "border-border bg-card/50 group-hover:border-yellow-400/40"}`}>
                    {platforms.includes(p) && <span className="text-black text-[9px] font-black">✓</span>}
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Post Frequency</label>
            <div className="flex flex-col gap-2">
              {FREQUENCIES.map(f => (
                <button key={f} onClick={() => setFrequency(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${frequency === f ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
