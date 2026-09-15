import React from 'react';
import { TESTIMONIALS } from '../data';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

const CLIENT_LOGOS = [
  'AETHER.CORE', 'SYNTHETICA', 'LOVABLE.AI', 'NEON.ORBIT', 'VERCEL.EDGE', 'COGNITIVE.LABS', 'VIBE.ENGINE'
];

export default function SocialProofMarquee() {
  return (
    <div className="space-y-10" id="social-proof-section">
      {/* 1. INFINITE HORIZONTAL CLIENT LOGO MARQUEE WITH EDGE FADES */}
      <div className="relative w-full overflow-hidden py-5 liquid-glass-dark !border-x-0 !border-y rounded-3xl ">
        {/* Left & Right gradient masks for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05050a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05050a] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap min-w-full">
          {/* Animated scrolling track */}
          <div className="flex space-x-16 animate-marquee shrink-0 select-none items-center">
            {CLIENT_LOGOS.map((logo, idx) => (
              <span 
                key={`logo-1-${idx}`} 
                className="text-xs font-mono font-bold tracking-[0.35em] text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                <span>{logo}</span>
              </span>
            ))}
          </div>
          {/* Duplicated track for seamless loop */}
          <div className="flex space-x-16 animate-marquee shrink-0 select-none ml-16 items-center">
            {CLIENT_LOGOS.map((logo, idx) => (
              <span 
                key={`logo-2-${idx}`} 
                className="text-xs font-mono font-bold tracking-[0.35em] text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                <span>{logo}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TESTIMONIAL CARDS DISPLAY WITH LIQUID GLASS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="liquid-glass-dark rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between hover:border-violet-500/40 hover:bg-white/[0.05] transition-all "
          >
            {/* iPhone Glass Specular Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <div className="absolute top-[1px] left-4 right-4 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
            
            {/* Ambient watermarks */}
            <Quote className="absolute right-5 top-5 w-16 h-16 text-white/[0.03] pointer-events-none" />

            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 font-sans relative z-10">
              "{t.quote}"
            </p>

            <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
              {/* Dot avatar with gradient border */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-violet-950/50">
                {t.author[0]}
              </div>
              <div className="font-mono text-xs">
                <h5 className="font-bold text-white text-sm">{t.author}</h5>
                <p className="text-gray-400 text-xs">
                  {t.role} <span className="text-cyan-400 font-semibold">@ {t.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom marquee scroll helper CSS in tag */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
