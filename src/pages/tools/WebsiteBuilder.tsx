import { useState } from "react";
import { Globe } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateWebsite } from "@/lib/toolGenerators";

const STYLES = ["Minimal", "Bold", "Dark", "Neon"];
const NICHES = ["Tech", "Lifestyle", "Fitness", "Finance", "Education", "Gaming", "Beauty", "Business", "Food", "Art"];

export default function WebsiteBuilder() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("Tech");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("Dark");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 600));
    setSections([{ tab: "Page Copy", content: generateWebsite(name, niche, bio, style) }]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Website Builder"
      description="Full creator portfolio copy, structure, and CTAs — ready to paste into any builder."
      gradient="from-emerald-400 to-green-500"
      iconElement={<Globe size={18} className="text-black" />}
      canGenerate={name.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Website Copy"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setName(""); setBio(""); }}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-emerald-400/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Niche</label>
            <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
              {NICHES.map(n => (
                <button key={n} onClick={() => setNiche(n)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${niche === n ? "bg-emerald-400/15 border-emerald-400/30 text-emerald-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Short Bio (optional)</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="e.g. I help tech creators build 100K audiences through strategic content..."
            rows={2}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Site Style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map(s => (
              <button key={s} onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${style === s ? "bg-emerald-400/15 border-emerald-400/30 text-emerald-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
