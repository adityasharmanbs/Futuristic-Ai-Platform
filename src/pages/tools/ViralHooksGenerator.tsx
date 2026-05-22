import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateHooks } from "@/lib/toolGenerators";

const NICHES = ["Tech", "Lifestyle", "Finance", "Fitness", "Food", "Gaming", "Education", "Beauty", "Travel", "Business"];
const COUNTS = [5, 7, 10, 15];

export default function ViralHooksGenerator() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("Tech");
  const [count, setCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    setSections([{ tab: "Hooks", content: generateHooks(topic, niche, count) }]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Viral Hooks Generator"
      description="Stop-the-scroll opening lines powered by trend analysis and pattern recognition."
      gradient="from-orange-400 to-amber-500"
      iconElement={<TrendingUp size={18} className="text-black" />}
      canGenerate={topic.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel={`Generate ${count} Viral Hooks`}
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTopic(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Content Topic</label>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. smartphone photography tips, productivity systems, investing basics..."
            className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-orange-400/40 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Content Niche</label>
            <div className="flex flex-wrap gap-1.5">
              {NICHES.map(n => (
                <button key={n} onClick={() => setNiche(n)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${niche === n ? "bg-orange-400/15 border-orange-400/30 text-orange-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">How Many Hooks?</label>
            <div className="flex gap-2">
              {COUNTS.map(c => (
                <button key={c} onClick={() => setCount(c)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${count === c ? "bg-orange-400/15 border-orange-400/30 text-orange-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
