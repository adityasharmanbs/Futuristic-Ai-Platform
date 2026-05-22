import { useState } from "react";
import { Activity } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateScript } from "@/lib/toolGenerators";

const TYPES = ["YouTube", "Podcast", "TikTok"];
const LENGTHS = ["Short", "Medium", "Long"];
const LENGTH_LABELS: Record<string, string> = { Short: "5–7 min", Medium: "10–12 min", Long: "18–22 min" };

export default function ScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("YouTube");
  const [length, setLength] = useState("Medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));
    setSections([{ tab: "Full Script", content: generateScript(topic, type, length) }]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Script Generator"
      description="Conversion-ready scripts for YouTube videos, podcasts, and TikToks in any niche."
      gradient="from-primary to-teal-400"
      iconElement={<Activity size={18} className="text-black" />}
      canGenerate={topic.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Full Script"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTopic(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Script Topic</label>
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. How to build a personal brand from zero using short-form content..."
            rows={3}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
            style={{ borderColor: "hsl(240 15% 15%)" }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(0,212,255,0.12)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "hsl(240 15% 15%)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Script Type</label>
            <div className="flex flex-col gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${type === t ? "bg-primary/15 border-primary/30 text-primary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Length</label>
            <div className="flex flex-col gap-2">
              {LENGTHS.map(l => (
                <button key={l} onClick={() => setLength(l)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${length === l ? "bg-primary/15 border-primary/30 text-primary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {l} <span className="text-muted-foreground font-normal">({LENGTH_LABELS[l]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
