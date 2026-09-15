"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export default function SpotlightNavbar({
  items = [
    { label: "Home", href: "#hero" },
    { label: "Showcase", href: "#work" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "Stack", href: "#stack" },
    { label: "Pipeline", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentIdx = activeIndex;
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.href.startsWith("#")) {
          const el = document.getElementById(item.href.slice(1));
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
              currentIdx = i;
              break;
            }
          }
        }
      }
      if (currentIdx !== activeIndex) {
        setActiveIndex(currentIdx);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activeIndex]);

  const handleItemClick = (item: NavItem, index: number, e: React.MouseEvent) => {
    setActiveIndex(index);
    if (onItemClick) onItemClick(item, index);
    if (item.href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="liquid-glass-dark border border-white/10 rounded-2xl px-4 py-3 flex justify-between items-center backdrop-blur-xl">
          <div className="flex items-center gap-2 font-display">
            <span className="text-white font-black tracking-widest uppercase text-sm">ETERNIVENTURES_</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#05050a]/95 backdrop-blur-2xl flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleItemClick(item, idx, e)}
                  className={`text-2xl font-display uppercase tracking-widest ${
                    activeIndex === idx ? "text-cyan-400 font-bold" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none", className)}>
        <div className="pointer-events-auto liquid-glass-dark spotlight-nav rounded-full border border-white/10 p-1.5 flex items-center gap-1">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleItemClick(item, idx, e)}
              className={cn(
                "relative px-4 py-2 text-sm font-mono tracking-wide rounded-full transition-colors duration-300",
                activeIndex === idx ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-white"
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {activeIndex === idx && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white/5 rounded-full border border-cyan-400/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
