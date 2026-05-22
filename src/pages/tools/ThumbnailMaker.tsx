import { useState } from "react";
import { Image } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateThumbnail, generateThumbnailChecklist } from "@/lib/toolGenerators";

const STYLES = ["Bold", "Minimal", "Dark", "Neon", "Cinematic"];
const NICHES = ["Tech", "Lifestyle", "Finance", "Fitness", "Education", "Gaming", "Beauty", "Business", "Food", "Travel"];

export default function ThumbnailMaker() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("Bold");
  const [niche, setNiche] = useState("Tech");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1100 + Math.random() * 900));
    setSections([
      { tab: "Design Brief", content: generateThumbnail(title, style, niche) },
      { tab: "Checklist", content: generateThumbnailChecklist(style) },
    ]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Thumbnail Maker"
      description="Design briefs, copy, and composition guides for click-worthy thumbnails."
      gradient="from-pink-400 to-rose-500"
      iconElement={<Image size={18} className="text-black" />}
      canGenerate={title.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Thumbnail Brief"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTitle(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Video Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. I tested every AI tool for 30 days..."
            className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-pink-400/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Thumbnail Style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map(s => (
              <button key={s} onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${style === s ? "bg-pink-400/15 border-pink-400/30 text-pink-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Content Niche</label>
          <div className="flex flex-wrap gap-2">
            {NICHES.map(n => (
              <button key={n} onClick={() => setNiche(n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${niche === n ? "bg-pink-400/15 border-pink-400/30 text-pink-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
