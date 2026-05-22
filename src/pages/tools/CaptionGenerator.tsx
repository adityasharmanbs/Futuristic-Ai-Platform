import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ToolShell, OutputSection } from "@/components/ToolShell";
import { generateCaptions, generateCaptionHashtags } from "@/lib/toolGenerators";

const TONES = ["Casual", "Professional", "Inspirational", "Humorous"];

export default function CaptionGenerator() {
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Casual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<OutputSection[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSections([]);
    await new Promise(r => setTimeout(r, 1100 + Math.random() * 700));
    setSections([
      { tab: "Captions", content: generateCaptions(description, tone) },
      { tab: "Hashtags", content: generateCaptionHashtags(description) },
    ]);
    setIsGenerating(false);
  };

  return (
    <ToolShell
      title="Caption Generator"
      description="Platform-native captions for Instagram, TikTok, YouTube, Twitter & LinkedIn."
      gradient="from-sky-400 to-blue-500"
      iconElement={<MessageSquare size={18} className="text-black" />}
      canGenerate={description.trim().length > 0}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      buttonLabel="Generate Captions"
      outputSections={sections}
      hasOutput={sections.length > 0 || isGenerating}
      onReset={() => { setSections([]); setDescription(""); }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Describe Your Post</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. A tutorial showing 5 productivity tips using Notion for content creators..."
            rows={4}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none resize-none transition-all"
            style={{ borderColor: "hsl(240 15% 15%)" }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(56,189,248,0.12)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "hsl(240 15% 15%)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Tone of Voice</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map(t => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${tone === t ? "bg-sky-400/15 border-sky-400/30 text-sky-400" : "bg-card/50 border-border text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
