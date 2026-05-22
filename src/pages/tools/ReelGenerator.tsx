import { useState } from "react";
import { Video } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateReel, generateReelCaption } from "@/lib/toolGenerators";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts"];
const DURATIONS = ["15s", "30s", "60s"];

export default function ReelGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [duration, setDuration] = useState("30s");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1300 + Math.random() * 700));
    setSections([
      { tab: "Script", content: generateReel(topic, platform, duration) },
      { tab: "Caption", content: generateReelCaption(topic, platform) },
    ]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Reel Generator"
      description="Auto-generate short-form reel scripts optimized for TikTok, Reels & Shorts."
      gradient="from-secondary to-purple-400"
      iconElement={<Video size={18} className="text-black" />}
      canGenerate={topic.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Reel Script"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTopic(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Reel Topic</label>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. 3 productivity hacks for content creators..."
            className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-secondary/40 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Platform</label>
            <div className="flex flex-col gap-2">
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left ${platform === p ? "bg-secondary/15 border-secondary/30 text-secondary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Duration</label>
            <div className="flex flex-col gap-2">
              {DURATIONS.map(d => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${duration === d ? "bg-secondary/15 border-secondary/30 text-secondary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
