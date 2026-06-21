"use client";
import { Theme } from "@/hooks/useTheme";

const THEMES: { id: Theme; color: string }[] = [
  { id: "blue",  color: "#8fb2ff" },
  { id: "lilac", color: "#c4b8f8" },
  { id: "teal",  color: "#2dd4bf" },
];

export default function ThemeSwitcher({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-[200] flex gap-1.5 items-center px-2.5 py-1.5 rounded-full border border-white/[.07] backdrop-blur-xl" style={{background:"rgba(4,5,10,.88)"}}>
      {THEMES.map(t => (
        <button key={t.id} onClick={() => setTheme(t.id)}
          className={`w-[15px] h-[15px] rounded-full transition-all duration-200 border-2 ${theme === t.id ? "border-white/65 scale-125" : "border-transparent hover:border-white/65 hover:scale-125"}`}
          style={{background: t.color}} aria-label={t.id + " theme"} />
      ))}
    </div>
  );
}
