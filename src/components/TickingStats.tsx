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
      className="bg-[#06060c]/60 border border-white/5 rounded-xl p-5 hover:border-cyan-500/10 transition-all group overflow-hidden relative flex flex-col justify-between h-32 glow-cyan"
      id={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Corner targeting reticles */}
      <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-cyan-500/40" />
      <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/40" />
      <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-500/40" />
      <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-cyan-500/40" />

      <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
        // TELEMETRY_NODE
      </span>

      <div className="my-auto">
        <div className="text-2xl md:text-3xl font-black font-display text-white tracking-tight flex items-baseline">
          {prefix && <span className="text-violet-500 mr-0.5">{prefix}</span>}
          <span>{formattedValue}</span>
          {suffix && <span className="text-cyan-400 text-lg ml-0.5">{suffix}</span>}
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-t border-white/5 pt-2">
        <span className="uppercase">{label}</span>
        <span className="text-cyan-500/50">ACTIVE</span>
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
