import { useState } from "react";
import { Mic } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generatePodcast } from "@/lib/toolGenerators";

const FORMATS = ["Solo Episode", "Interview", "Co-hosted", "Panel", "Story-driven"];
const DURATIONS = ["20 min", "30 min", "45 min", "60 min", "90 min"];

export default function PodcastGenerator() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("Solo Episode");
  const [duration, setDuration] = useState("30 min");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 700));
    setSections([{ tab: "Episode Pack", content: generatePodcast(topic, format, duration) }]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="AI Podcast Generator"
      description="Full episodes with show notes, chapter markers, intro/outro scripts and checklists."
      gradient="from-red-400 to-rose-500"
      iconElement={<Mic size={18} className="text-black" />}
      canGenerate={topic.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Episode Pack"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTopic(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Episode Topic</label>
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. How to monetize a podcast with under 1000 listeners..."
            rows={3}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
            style={{ borderColor: "hsl(240 15% 15%)" }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(248,113,113,0.12)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "hsl(240 15% 15%)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Episode Format</label>
            <div className="flex flex-col gap-2">
              {FORMATS.map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left ${format === f ? "bg-red-400/15 border-red-400/30 text-red-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Episode Length</label>
            <div className="flex flex-col gap-2">
              {DURATIONS.map(d => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${duration === d ? "bg-red-400/15 border-red-400/30 text-red-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
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
