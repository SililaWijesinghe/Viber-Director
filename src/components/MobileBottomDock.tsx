import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Layers, 
  BookOpen, 
  Cpu, 
  Zap, 
  Send,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero', icon: <Home className="w-4 h-4" /> },
  { id: 'work', label: 'Work', href: '#work', icon: <Layers className="w-4 h-4" /> },
  { id: 'manifesto', label: 'Manifesto', href: '#manifesto', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'stack', label: 'Stack', href: '#stack', icon: <Cpu className="w-4 h-4" /> },
  { id: 'process', label: 'Pipeline', href: '#process', icon: <Zap className="w-4 h-4" /> },
  { id: 'contact', label: 'Direct', href: '#contact', icon: <Send className="w-4 h-4" /> },
];

interface MobileBottomDockProps {
  onOpenTerminal?: () => void;
  onNavigate?: (id: string, label: string) => void;
}

export default function MobileBottomDock({ onOpenTerminal, onNavigate }: MobileBottomDockProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track active section and hide on rapid fast down-scroll if needed, or keep persistent
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const id = NAV_ITEMS[i].id;
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (item: NavItem) => {
    setActiveSection(item.id);
    onNavigate?.(item.id, item.label);
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center items-center px-3 pointer-events-none lg:hidden">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="pointer-events-auto relative flex items-center justify-between gap-1 bg-[#06060f]/90 backdrop-blur-2xl border border-white/15 rounded-full px-2 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.15)] max-w-md w-full"
      >
        {/* Top Gloss Specular line */}
        <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-full transition-all duration-200 cursor-pointer select-none active:scale-90 min-h-[44px] ${
                isActive
                  ? 'text-cyan-300 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Active illuminated background pill */}
              {isActive && (
                <motion.div
                  layoutId="mobile-dock-active-pill"
                  className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-violet-600/20 border border-cyan-400/40 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <span className="relative z-10 transition-transform">
                {item.icon}
              </span>
              <span className="relative z-10 text-[9px] font-mono tracking-tighter mt-0.5 uppercase block">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Quick Mainframe CLI Trigger Button */}
        {onOpenTerminal && (
          <button
            onClick={onOpenTerminal}
            className="relative flex flex-col items-center justify-center p-1.5 bg-violet-950/60 border border-violet-500/40 text-violet-300 hover:text-white rounded-full transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px] shadow-[0_0_10px_rgba(124,58,237,0.3)] shrink-0 ml-1"
            title="Open Mainframe Terminal"
          >
            <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="text-[8px] font-mono text-cyan-400 tracking-tighter uppercase font-bold">CLI</span>
          </button>
        )}
      </motion.nav>
    </div>
  );
}
