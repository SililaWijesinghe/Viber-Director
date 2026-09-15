import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../data';

const slideProjects = PROJECTS.filter(p => p.liveUrl && !p.mobileOnly);

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0, 1]);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Using a base desktop resolution for the iframe
        const baseWidth = 1920;
        const baseHeight = 1080;
        const scaleX = width / baseWidth;
        const scaleY = height / baseHeight;
        // Math.max to cover the area, Math.min to contain
        // Force uniform scale that covers the entire container without squishing
        const finalScale = Math.max(scaleX, scaleY);
        setScale(finalScale); 
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true);
      
      // Change slide half-way through the glitch
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % slideProjects.length;
          setLoadedIndices((loaded) => {
            const newLoaded = [...loaded];
            if (!newLoaded.includes(next)) newLoaded.push(next);
            const preloadNext = (next + 1) % slideProjects.length;
            if (!newLoaded.includes(preloadNext)) newLoaded.push(preloadNext);
            return newLoaded;
          });
          return next;
        });
      }, 400);

      // End glitch
      setTimeout(() => {
        setIsGlitching(false);
      }, 900);

    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentProject = slideProjects[currentIndex];

  return (
    <>
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="absolute -top-10 sm:-top-12 right-0 sm:right-4 flex flex-col items-end">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">LIVE_FEED_</span>
          </div>
          <div className="relative h-6 sm:h-8 overflow-hidden flex items-end">
            <div 
              className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest font-display transition-transform duration-500"
              style={{ 
                transform: isGlitching ? 'translateY(100%)' : 'translateY(0)',
                opacity: isGlitching ? 0 : 1
              }}
            >
              {currentProject?.name}
            </div>
          </div>
        </div>
      </div>
      <div ref={containerRef} className="relative w-full h-full rounded-[1.4rem] bg-black overflow-hidden pointer-events-auto">
      
      {/* Frame Container */}
      <div 
        className={`absolute top-1/2 left-1/2 transition-transform duration-1000 ${isGlitching ? 'glitch-anim' : ''}`}
        style={{
          width: '1920px',
          height: '1080px',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {slideProjects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`absolute inset-0  ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Absolute overlay block to catch clicks and prevent iframe interaction */}
            <div className="absolute inset-0 z-20 bg-transparent" />
            {/* Extra dark gradient over the iframe for better blending */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020308] via-transparent to-transparent opacity-80" />
            
            {loadedIndices.includes(idx) && (
              <iframe loading="lazy" src={proj.liveUrl}
                title={proj.name}
                className="w-full h-full border-0 pointer-events-none select-none filter saturate-[0.85] contrast-[1.1] brightness-[0.9]"
                referrerPolicy="no-referrer"
                scrolling="no"
                tabIndex={-1}
              />
            )}
          </div>
        ))}
      </div>

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay" />
      
      {/* Glitch Color Separation Layers during transition */}
      {isGlitching && (
        <>
          <div className="absolute inset-0 z-40 bg-cyan-500/20 mix-blend-screen glitch-layer-1 pointer-events-none" />
          <div className="absolute inset-0 z-40 bg-rose-500/20 mix-blend-screen glitch-layer-2 pointer-events-none" />
        </>
      )}

      <style>{`
        .glitch-anim {
          animation: glitch-shake 0.4s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        @keyframes glitch-shake {
          0% { transform: translate(-50%, -50%) scale(${scale}) translate(0) }
          20% { transform: translate(-50%, -50%) scale(${scale}) translate(-2px, 2px) }
          40% { transform: translate(-50%, -50%) scale(${scale}) translate(-2px, -2px) }
          60% { transform: translate(-50%, -50%) scale(${scale}) translate(2px, 2px) }
          80% { transform: translate(-50%, -50%) scale(${scale}) translate(2px, -2px) }
          100% { transform: translate(-50%, -50%) scale(${scale}) translate(0) }
        }
        .glitch-layer-1 {
          animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
          clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
        }
        .glitch-layer-2 {
          animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
          clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-4px) }
          20% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); transform: translate(4px) }
          40% { clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); transform: translate(-4px) }
          60% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); transform: translate(4px) }
          80% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); transform: translate(-4px) }
          100% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(4px) }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(4px) }
          20% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-4px) }
          40% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(4px) }
          60% { clip-path: polygon(0 30%, 100% 30%, 100% 35%, 0 35%); transform: translate(-4px) }
          80% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); transform: translate(4px) }
          100% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(-4px) }
        }
      `}</style>
      </div>
    </>
  );
}
