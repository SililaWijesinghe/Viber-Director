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
      {/* 1. INFINITE HORIZONTAL CLIENT LOGO MARQUEE */}
      <div className="relative w-full overflow-hidden py-4 bg-gradient-to-r from-transparent via-[#07070e] to-transparent border-y border-white/5">
        <div className="flex whitespace-nowrap min-w-full">
          {/* Animated scrolling track */}
          <div className="flex space-x-16 animate-marquee shrink-0 select-none">
            {CLIENT_LOGOS.map((logo, idx) => (
              <span 
                key={`logo-1-${idx}`} 
                className="text-xs font-mono font-bold tracking-[0.4em] text-gray-600 hover:text-cyan-400 transition-colors"
              >
                // {logo}
              </span>
            ))}
          </div>
          {/* Duplicated track for seamless loop */}
          <div className="flex space-x-16 animate-marquee shrink-0 select-none ml-16">
            {CLIENT_LOGOS.map((logo, idx) => (
              <span 
                key={`logo-2-${idx}`} 
                className="text-xs font-mono font-bold tracking-[0.4em] text-gray-600 hover:text-cyan-400 transition-colors"
              >
                // {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TESTIMONIAL CARDS DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-[#06060c]/40 border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-violet-500/20 transition-all glow-purple"
          >
            {/* Ambient watermarks */}
            <Quote className="absolute right-4 top-4 w-16 h-16 text-white/[0.02] pointer-events-none" />

            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans relative z-10">
              "{t.quote}"
            </p>

            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              {/* Dot avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                {t.author[0]}
              </div>
              <div className="font-mono text-xs">
                <h5 className="font-bold text-white">{t.author}</h5>
                <p className="text-gray-500 text-[10px]">
                  {t.role} <span className="text-cyan-500">@ {t.company}</span>
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
