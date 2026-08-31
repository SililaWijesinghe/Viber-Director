import React, { useEffect, useState } from 'react';
import { Lock, Unlock, Eye } from 'lucide-react';

interface SectionNode {
  id: string;
  label: string;
  title: string;
}

interface ProgressRailProps {
  onUnlockSection: (sectionId: string, label: string) => void;
  onSectionChange?: (sectionId: string) => void;
}

const SECTIONS: SectionNode[] = [
  { id: 'hero', label: '01_HERO', title: 'Interface Boot' },
  { id: 'work', label: '02_WORK', title: 'System Catalog' },
  { id: 'manifesto', label: '03_MANIFESTO', title: 'Rogue Philosophy' },
  { id: 'stack', label: '04_STACK', title: 'Surgical Tools' },
  { id: 'process', label: '05_PROCESS', title: 'Ship Pipeline' },
  { id: 'contact', label: '06_CONTACT', title: 'Direct Node' },
];

export default function ProgressRail({ onUnlockSection, onSectionChange }: ProgressRailProps) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [unlockedSections, setUnlockedSections] = useState<string[]>(['hero']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(pct);

      // Track active section and unlock them
      let currentSection = 'hero';
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is in the top 40% of viewport
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = sec.id;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        if (onSectionChange) {
          onSectionChange(currentSection);
        }
        if (!unlockedSections.includes(currentSection)) {
          setUnlockedSections((prev) => [...prev, currentSection]);
          const matched = SECTIONS.find((s) => s.id === currentSection);
          if (matched) {
            onUnlockSection(currentSection, matched.title);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial trigger
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, unlockedSections, onUnlockSection, onSectionChange]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center h-[340px] font-mono select-none" id="progress-hud-rail">
      {/* Top indicator */}
      <span className="text-[8px] text-cyan-500/50 mb-3 tracking-widest uppercase">HUD_INDEX</span>

      {/* Vertical Rail Line */}
      <div className="w-1 bg-white/5 h-full rounded relative flex flex-col justify-between">
        {/* Fill level bar */}
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-600 via-cyan-400 to-cyan-500 rounded transition-all duration-100"
          style={{ height: `${scrollPercent}%` }}
        />

        {/* Nodes overlay */}
        {SECTIONS.map((sec) => {
          const isUnlocked = unlockedSections.includes(sec.id);
          const isActive = activeSection === sec.id;

          return (
            <div
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative -left-[6px] w-[16px] h-[16px] flex items-center justify-center cursor-pointer"
            >
              {/* Node bubble */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-cyan-400 border-cyan-400 scale-125 glow-cyan'
                    : isUnlocked
                    ? 'bg-violet-950 border-violet-500'
                    : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                {isActive ? (
                  <Eye className="w-1.5 h-1.5 text-black" />
                ) : isUnlocked ? (
                  <Unlock className="w-1 h-1 text-violet-400" />
                ) : (
                  <Lock className="w-1 h-1 text-gray-700" />
                )}
              </div>

              {/* Floating Hover Card Label */}
              <div className="absolute left-6 pl-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap flex flex-col bg-black/95 border border-white/10 rounded px-2.5 py-1 text-[9px] shadow-lg">
                <span className={isActive ? 'text-cyan-400 font-bold' : isUnlocked ? 'text-violet-400' : 'text-gray-600'}>
                  {sec.label}
                </span>
                <span className="text-white text-[10px] uppercase font-semibold">{sec.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom status text */}
      <span className="text-[8px] text-cyan-500/50 mt-3 tracking-widest">{Math.floor(scrollPercent)}% SECURED</span>
    </div>
  );
}
