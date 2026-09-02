import React from 'react';
import { TOOLS } from '../data';
import { ToolItem } from '../types';
import { motion } from 'motion/react';

export default function StackGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="tools-stack-grid">
      {TOOLS.map((tool, idx) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all group overflow-hidden flex flex-col justify-between h-48 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          data-cursor="interactive"
        >
          {/* iPhone Glass Specular Highlight & Glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute top-[1px] left-3 right-3 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
          
          {/* Saturated brand corner accent */}
          <div 
            className="absolute -right-6 -top-6 w-16 h-16 rounded-full blur-2xl transition-all opacity-15 group-hover:opacity-35 pointer-events-none"
            style={{ backgroundColor: tool.color }}
          />

          {/* Logo Brand SVG Container */}
          <div className="h-16 flex items-center">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
              <BrandLogoIcon name={tool.iconName} color={tool.color} />
            </div>
          </div>

          {/* Label Monospace details */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block">
              // {tool.category}
            </span>
            <div className="flex justify-between items-end">
              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                {tool.name}
              </h4>
              <span 
                className="text-[9px] font-mono px-2 py-0.5 rounded-full border bg-black/40"
                style={{ color: tool.color, borderColor: `${tool.color}40` }}
              >
                {tool.level}
              </span>
            </div>
          </div>

          {/* Matrix style scanning line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}

// Brand logo vectors
interface LogoProps {
  name: string;
  color: string;
}

function BrandLogoIcon({ name, color }: LogoProps) {
  switch (name) {
    case 'lovable':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
          {/* Lovable heart/L vector */}
          <defs>
            <linearGradient id="lovable-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <path
            d="M50 82C50 82 12 52 12 30C12 16.5 22.5 8 35 8C42 8 47.5 12 50 15.5C52.5 12 58 8 65 8C77.5 8 88 16.5 88 30C88 52 50 82 50 82Z"
            fill="none"
            stroke="url(#lovable-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 48L50 60L62 48"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cursor':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
          <defs>
            <linearGradient id="cursor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          {/* Cursor AI sleek arrow */}
          <path
            d="M20 15L80 45L48 52L20 15Z"
            fill="url(#cursor-grad)"
          />
          <path
            d="M48 52L62 85L80 45"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'claude':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]">
          {/* Claude Anthropic custom serif icon */}
          <path
            d="M20 80 L35 25 Q38 15 50 15 Q62 15 65 25 L80 80"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M28 58 L72 58"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="50" cy="40" r="4" fill="#FFFFFF" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
          <defs>
            <linearGradient id="vite-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="vite-purple" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BD34FE" />
              <stop offset="100%" stopColor="#41175C" />
            </linearGradient>
          </defs>
          <polygon points="50,10 90,20 80,75 50,95 20,75 10,20" fill="url(#vite-purple)" />
          <polygon points="52,15 82,70 50,90 48,90 18,70 48,15" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="55,18 25,50 48,50 35,82 75,45 52,45" fill="url(#vite-yellow)" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
          {/* Tailwind waves */}
          <path
            d="M30 50 C20 62 30 75 50 75 C70 75 80 62 70 50 C80 38 70 25 50 25 C30 25 20 38 30 50 Z"
            fill="none"
            stroke={color}
            strokeWidth="6"
          />
          <path
            d="M20 42 C10 54 20 65 35 65 C55 65 65 54 55 42 C65 30 55 18 35 18 C20 18 10 30 20 42 Z"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="4"
            opacity="0.75"
          />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 animate-spin-slow filter drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]" style={{ animationDuration: '15s' }}>
          {/* React atom */}
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill={color} />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          {/* Vercel geometry */}
          <polygon points="50,15 90,85 10,85" fill="#FFFFFF" />
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
          {/* Supabase thunderbolt */}
          <path
            d="M20 65 L48 10 L48 45 L80 35 L52 90 L52 55 Z"
            fill="#10B981"
          />
        </svg>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-full bg-cyan-900/40 flex items-center justify-center border border-cyan-500/20 text-white font-mono text-xs">
          SYS
        </div>
      );
  }
}
