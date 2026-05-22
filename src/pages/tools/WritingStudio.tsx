import { useState } from "react";
import { Wand2 } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateWritingStudio } from "@/lib/toolGenerators";

const FORMATS = ["Blog Post", "Twitter Thread", "Newsletter", "LinkedIn Post"];
const TONES = ["Casual", "Professional", "Inspirational", "Bold"];

export default function WritingStudio() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("Blog Post");
  const [tone, setTone] = useState("Casual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const main = generateWritingStudio(topic, format, tone);
    setSections([{ tab: format, content: main }]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="AI Writing Studio"
      description="Generate viral articles, threads, newsletters, and long-form content."
      gradient="from-primary to-cyan-300"
      iconElement={<Wand2 size={18} className="text-black" />}
      canGenerate={topic.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Content"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setTopic(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Topic or Idea</label>
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. How to build a personal brand as a content creator in 2025..."
            rows={4}
            className="w-full bg-background/50 border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
            style={{ borderColor: "hsl(240 15% 15%)" }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(0,212,255,0.12)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "hsl(240 15% 15%)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Format</label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${format === f ? "bg-primary/15 border-primary/30 text-primary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Tone</label>
            <div className="flex flex-wrap gap-2">
              {TONES.map(t => (
                <button key={t} onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${tone === t ? "bg-primary/15 border-primary/30 text-primary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground/40">{topic.length} / 500</div>
      </div>
    </ToolShell>
  );
}
