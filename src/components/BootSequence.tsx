import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  const bootLogs = [
    'CONNECTING TO COGNITIVE MODEL DIRECTORY... OK',
    'PARSING DIRECTIVE: BUILD HIGH-FIDELITY SYSTEMS',
    'INTENT CAPTURED: "DIRECT CODE, DO NOT TYPING ENTIRE REPOS"',
    'LOADING VIBE-ENGINE-COGNITIVE-V12... SUCCESS',
    'SCHEDULING QUANTUM COMPILATION LAYERS...',
    'CONFIGURING PORT: 3000 // INGRESS SECURED',
    'RESOLVING ASYNC ASSETS: https://theprettyboo.lovable.app',
    'RESOLVING ASYNC ASSETS: https://sililathedesigner.lovable.app',
    'RESOLVING ASYNC ASSETS: https://premier-digital.lovable.app',
    'RESOLVING ASYNC ASSETS: https://cloud-books-app.vercel.app',
    'RESOLVING ASYNC ASSETS: https://bl-models-pvt-ltd.vercel.app',
    'RESOLVING ASYNC ASSETS: https://nimorafashion.lovable.app',
    'RESOLVING ASYNC ASSETS: https://rmfitconnect.lovable.app',
    'COMPILING TW-V4 TAILWIND DESIGN LAYERS...',
    'VIBE SYNC: ESTABLISHED // RE-INDEXING NEON ACCENTS',
    'BOOT SEQUENCE COMPLETE. WELCOME TO ETERNIVENTURES.'
  ];

  useEffect(() => {
    // Esc / Enter keys to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        triggerComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fast loading percentage ticker
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    // Dynamic log generator
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        setLogIndex((prev) => prev + 1);
      }
    }, 110);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [logIndex]);

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        triggerComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [progress]);

  const triggerComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600); // match animation duration
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          id="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#030307] text-[#22D3EE] font-mono z-50 flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden crt-effect"
          onClick={triggerComplete}
        >
          {/* Top HUD Frame Details */}
          <div className="flex justify-between items-center text-xs text-cyan-500/60 border-b border-cyan-500/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
              <span>SYSTEM: ONLINE // DIRECT_MODE_ON</span>
            </div>
            <div className="hidden sm:block">
              <span>LOC_COORDS: [37.7749, -122.4194] // UTC_TS_2031</span>
            </div>
            <div>
              <span>BUILD // v1.10.3</span>
            </div>
          </div>

          {/* Centered Glitch Title & Progress */}
          <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center py-20 flex-grow">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h1 
                className="text-4xl md:text-6xl font-black font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-600 animate-glitch relative"
                data-text="ETERNIVENTURES"
              >
                ETERNIVENTURES
              </h1>
              <p className="text-xs tracking-[0.3em] text-violet-400/80 font-mono uppercase">
                // AI-ASSISTED HYPER-ENGINEERING //
              </p>
            </motion.div>

            {/* Diagnostic Logs Scroll */}
            <div className="w-full h-40 bg-black/40 border border-cyan-500/10 rounded-lg p-4 mt-12 overflow-hidden text-left flex flex-col justify-end text-[10px] md:text-xs text-cyan-400/70 space-y-1 shadow-inner">
              <AnimatePresence>
                {logs.slice(-6).map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="truncate font-mono"
                  >
                    <span className="text-violet-500/70">&gt;</span> {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Micro progress bar */}
            <div className="w-full mt-8 space-y-2">
              <div className="flex justify-between text-xs text-cyan-500/80 font-mono">
                <span>INTENT CORE LINKAGE</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-cyan-950/40 h-2 rounded-full overflow-hidden border border-cyan-500/20 relative">
                <motion.div
                  className="bg-gradient-to-r from-violet-600 to-cyan-400 h-full rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA to Skip */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cyan-500/40 border-t border-cyan-500/10 pt-4 gap-3">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-violet-500/80">&gt;</span> DIRECTED BY AI, SHAPED BY INTENT
            </div>
            <div className="animate-pulse flex items-center gap-2 bg-cyan-950/30 px-3 py-1.5 border border-cyan-500/20 rounded cursor-pointer hover:bg-cyan-500/10 hover:text-[#22D3EE] transition-all">
              <span>CLICK / PRESS ANY KEY TO BYPASS SEQUENCE</span>
              <kbd className="px-1.5 py-0.5 bg-cyan-900/40 text-cyan-300 rounded text-[9px] uppercase font-bold">ESC</kbd>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
