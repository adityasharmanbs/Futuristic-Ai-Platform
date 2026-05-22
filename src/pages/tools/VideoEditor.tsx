import { useState } from "react";
import { Scissors } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateVideoEdit, generateVideoChecklist } from "@/lib/toolGenerators";

const STYLES = ["Cinematic", "Fast-paced", "Documentary", "Vlog", "Tutorial", "Minimal"];
const LENGTHS = ["1 min", "3 min", "5 min", "10 min", "15 min", "20 min"];

export default function VideoEditor() {
  const [concept, setConcept] = useState("");
  const [style, setStyle] = useState("Fast-paced");
  const [length, setLength] = useState("5 min");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1300 + Math.random() * 700));
    setSections([
      { tab: "Edit Plan", content: generateVideoEdit(concept, style, length) },
      { tab: "Export Guide", content: generateVideoChecklist() },
    ]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="AI Video Editor"
      description="Auto-generate full edit plans, shot structure, color grades, and export guides."
      gradient="from-secondary to-indigo-400"
      iconElement={<Scissors size={18} className="text-black" />}
      canGenerate={concept.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Edit Plan"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setConcept(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Video Concept</label>
          <textarea
            value={concept}
            onChange={e => setConcept(e.target.value)}
            placeholder="e.g. Day in the life of a content creator — morning routine, filming sessions, editing workflow..."
            rows={3}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
            style={{ borderColor: "hsl(240 15% 15%)" }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.12)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "hsl(240 15% 15%)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Edit Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(s => (
                <button key={s} onClick={() => setStyle(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${style === s ? "bg-secondary/15 border-secondary/30 text-secondary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Video Length</label>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map(l => (
                <button key={l} onClick={() => setLength(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${length === l ? "bg-secondary/15 border-secondary/30 text-secondary" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
