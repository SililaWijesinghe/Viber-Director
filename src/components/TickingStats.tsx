import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatBlockProps {
  label: string;
  targetValue: number;
  suffix?: string;
  decimals?: number;
  prefix?: string;
}

function StatCounter({ label, targetValue, suffix = '', decimals = 0, prefix = '' }: StatBlockProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const current = start + easedProgress * targetValue;
      
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetValue]);

  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div 
      ref={ref}
      className="liquid-glass-dark rounded-3xl p-6 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all group overflow-hidden relative flex flex-col justify-between h-36 "
      id={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* iPhone Glass Specular Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      <div className="absolute top-[1px] left-3 right-3 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />

      {/* Corner targeting reticles */}
      <span className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-cyan-400/50 pointer-events-none" />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-cyan-400/50 pointer-events-none" />
      <span className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-cyan-400/50 pointer-events-none" />
      <span className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-cyan-400/50 pointer-events-none" />

      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono tracking-widest text-cyan-400/70 uppercase">
          // TELEMETRY_NODE
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      </div>

      <div className="my-auto py-1">
        <div className="text-3xl md:text-4xl font-black font-display text-white tracking-tight flex items-baseline drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
          {prefix && <span className="text-violet-400 mr-1 text-2xl">{prefix}</span>}
          <span>{formattedValue}</span>
          {suffix && <span className="text-cyan-400 text-xl font-bold ml-1">{suffix}</span>}
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-t border-white/5 pt-2">
        <span className="uppercase font-semibold tracking-wider text-gray-300">{label}</span>
        <span className="text-cyan-400/80 font-bold">ONLINE</span>
      </div>
    </div>
  );
}

export default function TickingStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="ticking-stats-container">
      <StatCounter label="Products Shipped" targetValue={37} suffix="+" />
      <StatCounter label="Vibe Hours" targetValue={1420} suffix="h" />
      <StatCounter label="Compilation Rate" targetValue={99.85} suffix="%" decimals={2} />
      <StatCounter label="Virtual Coffee" targetValue={12.4} suffix="K L" decimals={1} prefix="~" />
    </div>
  );
}
