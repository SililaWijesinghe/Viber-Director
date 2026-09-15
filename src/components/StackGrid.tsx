import React from 'react';
import { TOOLS } from '../data';
import { ToolItem } from '../types';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function StackGrid() {
  const groupedTools = TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, ToolItem[]>);

  const categories = Object.keys(groupedTools).sort((a, b) => {
    const order = ['Google AI', 'AI Model', 'Agent', 'IDE', 'Frontend', 'Backend', 'Deployment'];
    return (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) - (order.indexOf(b) !== -1 ? order.indexOf(b) : 99);
  });

  return (
    <div className="flex flex-col gap-6" id="tools-stack-grid">
      {categories.map((category, idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="relative liquid-glass-dark rounded-3xl p-5 lg:p-6 transition-all group overflow-hidden"
        >
          {/* Glass edge highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs lg:text-sm font-sans font-bold tracking-widest text-cyan-100 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {category}
            </h4>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {groupedTools[category].map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all cursor-pointer relative group/item"
                data-cursor="interactive"
              >
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-20 transition-opacity blur-xl pointer-events-none"
                  style={{ backgroundColor: tool.color }}
                />
                <div className="w-10 h-10 mb-3 flex items-center justify-center relative z-10">
                  <BrandLogoIcon name={tool.iconName} color={tool.color} />
                </div>
                <span className="text-[11px] lg:text-xs font-sans font-semibold text-gray-300 text-center relative z-10">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
          <defs>
            <linearGradient id="cursor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]">
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
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
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 animate-spin-slow filter drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]" style={{ animationDuration: '15s' }}>
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke={color} strokeWidth="5" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill={color} />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          <polygon points="50,15 90,85 10,85" fill="#FFFFFF" />
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
          <path
            d="M20 65 L48 10 L48 45 L80 35 L52 90 L52 55 Z"
            fill="#10B981"
          />
        </svg>
      );
    case 'google-ai-studio':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(66,133,244,0.3)]">
          <defs>
            <linearGradient id="g-studio" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#8A3FFC" />
            </linearGradient>
          </defs>
          <rect x="20" y="20" width="60" height="60" rx="15" fill="none" stroke="url(#g-studio)" strokeWidth="6" />
          <path d="M40 35 L65 50 L40 65 Z" fill="url(#g-studio)" />
        </svg>
      );
    case 'google-gemini':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(142,36,170,0.3)]">
          <defs>
            <linearGradient id="g-gemini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A73E8" />
              <stop offset="50%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
          </defs>
          <path
            d="M50 10 C50 40 40 50 10 50 C40 50 50 60 50 90 C50 60 60 50 90 50 C60 50 50 40 50 10 Z"
            fill="url(#g-gemini)"
          />
        </svg>
      );
    case 'google-stitch':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(15,157,88,0.3)]">
          <path d="M30 70 L70 30 M20 50 L80 50 M50 20 L50 80" stroke="#0F9D58" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 8" />
          <circle cx="30" cy="70" r="6" fill="#0F9D58" />
          <circle cx="70" cy="30" r="6" fill="#0F9D58" />
          <circle cx="20" cy="50" r="6" fill="#0F9D58" />
          <circle cx="80" cy="50" r="6" fill="#0F9D58" />
          <circle cx="50" cy="20" r="6" fill="#0F9D58" />
          <circle cx="50" cy="80" r="6" fill="#0F9D58" />
        </svg>
      );
    case 'google-flow':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(219,68,55,0.3)]">
          <path d="M20 50 Q 35 20, 50 50 T 80 50" fill="none" stroke="#DB4437" strokeWidth="8" strokeLinecap="round" />
          <circle cx="20" cy="50" r="8" fill="#F4B400" />
          <circle cx="50" cy="50" r="8" fill="#4285F4" />
          <circle cx="80" cy="50" r="8" fill="#0F9D58" />
        </svg>
      );
    case 'nano-banana':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 lg:w-10 lg:h-10 filter drop-shadow-[0_0_8px_rgba(244,180,0,0.3)]">
          <path d="M25 20 Q 30 80, 80 75 Q 60 95, 20 60 Z" fill="#F4B400" />
          <path d="M25 20 Q 15 40, 20 60" fill="none" stroke="#F9A825" strokeWidth="4" />
          <circle cx="25" cy="20" r="3" fill="#3E2723" />
          <circle cx="80" cy="75" r="3" fill="#3E2723" />
        </svg>
      );
    default:
      return (
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-cyan-900/40 flex items-center justify-center border border-cyan-500/20 text-white font-mono text-[10px]">
          SYS
        </div>
      );
  }
}
