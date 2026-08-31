"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

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

export function SpotlightNavbar({
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

  // Refs for the light positions for imperative animation
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = items.length - 1; i >= 0; i--) {
        const id = items[i].href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v: number) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the Ambience (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v: number) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);

    if (item.href.startsWith("#")) {
      const targetId = item.href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow",
          "relative h-10 md:h-11 rounded-full transition-all duration-300 overflow-hidden",
          "border border-cyan-500/20 bg-[#06060f]/80 backdrop-blur-xl shadow-lg shadow-cyan-950/40"
        )}
        style={{
          ["--spotlight-color" as string]: "rgba(34, 211, 238, 0.25)",
          ["--ambience-color" as string]: "rgba(34, 211, 238, 0.95)",
        }}
      >
        {/* Navigation Items */}
        <ul className="relative flex items-center h-full px-1.5 md:px-2 gap-0.5 md:gap-1 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item, idx);
                }}
                className={cn(
                  "px-2.5 md:px-3.5 py-1 text-[11px] md:text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 rounded-full select-none cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400",
                  activeIndex === idx
                    ? "text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 1. The Moving Spotlight (Follows Mouse with Cyber glow) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                110px circle at var(--spotlight-x, 50%) 100%, 
                var(--spotlight-color, rgba(34,211,238,0.25)) 0%, 
                rgba(124, 58, 237, 0.12) 40%,
                transparent 70%
              )
            `,
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active Item with neon beam) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
              radial-gradient(
                70px circle at var(--ambience-x, 50%) 0%, 
                var(--ambience-color, rgba(34,211,238,0.95)) 0%, 
                rgba(124, 58, 237, 0.8) 50%,
                transparent 100%
              )
            `,
          }}
        />
      </nav>
    </div>
  );
}

export default SpotlightNavbar;
