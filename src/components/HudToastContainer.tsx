import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Info, Terminal, Sparkles } from 'lucide-react';
import { HudToast } from '../types';

interface HudToastContainerProps {
  toasts: HudToast[];
  onRemove: (id: string) => void;
}

export default function HudToastContainer({ toasts, onRemove }: HudToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isAchievement = toast.type === 'achievement' || toast.type === 'unlocked';
          
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="pointer-events-auto bg-[#06060e]/95 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3 shadow-xl relative overflow-hidden grain-overlay group hover:border-cyan-400 transition-colors"
              style={{
                boxShadow: isAchievement 
                  ? '0 10px 25px -5px rgba(124, 58, 237, 0.2), 0 0 10px rgba(124, 58, 237, 0.05)'
                  : '0 10px 25px -5px rgba(34, 211, 238, 0.15), 0 0 10px rgba(34, 211, 238, 0.05)'
              }}
            >
              {/* Saturated edge signal */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
                  isAchievement ? 'bg-gradient-to-b from-violet-600 to-fuchsia-500' : 'bg-gradient-to-b from-cyan-400 to-blue-500'
                }`}
              />

              {/* Icon */}
              <div 
                className={`p-1.5 rounded-lg border ${
                  isAchievement 
                    ? 'bg-violet-950/40 text-violet-400 border-violet-500/20' 
                    : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/20'
                }`}
              >
                {toast.type === 'achievement' && <Trophy className="w-4 h-4" />}
                {toast.type === 'unlocked' && <Sparkles className="w-4 h-4 animate-pulse" />}
                {toast.type === 'system' && <Terminal className="w-4 h-4" />}
              </div>

              {/* Text content */}
              <div className="flex-grow space-y-1 font-mono">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${
                    isAchievement ? 'text-violet-400' : 'text-cyan-400'
                  }`}>
                    {isAchievement ? '// ACHIEVE_UNLOCKED' : '// SYSTEM_LOG'}
                  </span>
                  <button 
                    onClick={() => onRemove(toast.id)}
                    className="text-gray-600 hover:text-white transition-colors text-[9px] px-1 cursor-pointer"
                  >
                    DISMISS
                  </button>
                </div>
                <h4 className="text-xs font-semibold text-white tracking-tight">
                  {toast.title}
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                  {toast.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
