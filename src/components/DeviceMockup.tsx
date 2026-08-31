import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Smartphone, ExternalLink, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceMockupProps {
  url: string;
  name: string;
  accentColor: string;
}

export default function DeviceMockup({ url, name, accentColor }: DeviceMockupProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'desktop' | 'mobile'>('both');
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [connectLive, setConnectLive] = useState(true);

  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [desktopScale, setDesktopScale] = useState(1);
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === desktopContainerRef.current) {
          setDesktopScale(entry.contentRect.width / 1440);
        } else if (entry.target === mobileContainerRef.current) {
          setMobileScale(entry.contentRect.width / 390);
        }
      }
    });

    if (desktopContainerRef.current) resizeObserver.observe(desktopContainerRef.current);
    if (mobileContainerRef.current) resizeObserver.observe(mobileContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [activeTab]);

  // Parse host for the mock browser URL bar
  const displayUrl = url.replace('https://', '');

  return (
    <div className="w-full flex flex-col space-y-4" id={`mockup-container-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Top Controls / Viewport Toggle */}
      <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-lg p-2 text-xs">
        <div className="flex items-center gap-1.5 font-mono text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="uppercase text-[10px]">ENGINE // {name}</span>
        </div>
        <div className="flex items-center gap-1 bg-[#0b0b14] rounded-md p-0.5 border border-white/5 font-mono">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-2 py-1 rounded text-[10px] uppercase transition-all ${
              activeTab === 'both'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Dual Screen
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`px-2 py-1 rounded text-[10px] uppercase transition-all ${
              activeTab === 'desktop'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="inline w-3 h-3 mr-1" /> Desktop
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-2 py-1 rounded text-[10px] uppercase transition-all ${
              activeTab === 'mobile'
                ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="inline w-3 h-3 mr-1" /> Mobile
          </button>
        </div>
      </div>

      {/* Main Mockup Screen Frame */}
      <div className="relative w-full aspect-[16/10] bg-[#030307]/80 rounded-xl overflow-hidden border border-white/5 p-4 flex items-center justify-center grain-overlay">
        
        {/* Background glow matching project's accent color */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none blur-3xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 65%)`
          }}
        />

        {/* 1. DESKTOP BROWSER FRAME */}
        {(activeTab === 'both' || activeTab === 'desktop') && (
          <motion.div
            layoutId={`${name}-desktop-frame`}
            className={`transition-all duration-300 relative rounded-lg border border-white/10 bg-[#08080f]/95 shadow-2xl flex flex-col ${
              activeTab === 'both' 
                ? 'w-[75%] aspect-[16/10] -translate-x-4 -translate-y-2 z-10' 
                : 'w-full h-full z-20'
            }`}
            style={{
              boxShadow: `0 20px 40px -15px rgba(0,0,0,0.8), 0 0 15px -3px ${accentColor}20`
            }}
          >
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black/60 rounded-t-lg">
              {/* Colored Dots */}
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              {/* URL Address Bar */}
              <div className="flex-grow mx-4 max-w-sm">
                <div className="bg-black/50 border border-white/5 rounded px-2 py-0.5 text-[9px] font-mono text-gray-400 flex items-center justify-between select-all">
                  <span className="truncate">{displayUrl}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-600 hover:text-cyan-400 transition-colors" />
                </div>
              </div>
              {/* Controls */}
              <div className="flex items-center space-x-1 text-[10px] font-mono text-gray-500">
                <span className="text-emerald-400/80">SECURE //</span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-grow w-full relative bg-[#040408] overflow-hidden rounded-b-lg" ref={desktopContainerRef}>
              {connectLive ? (
                <>
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-xs text-gray-500 gap-2 z-10">
                      <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
                      <span>INITIALIZING FRAME ROUTE...</span>
                    </div>
                  )}
                  <div className="absolute inset-0" style={{
                    width: '1440px',
                    height: '900px', // using 16:10 ratio base
                    transform: `scale(${desktopScale})`,
                    transformOrigin: 'top left'
                  }}>
                    <iframe
                      src={url}
                      title={`${name} Desktop Preview`}
                      className="w-full h-full border-0 transition-opacity duration-300"
                      referrerPolicy="no-referrer"
                      style={{ opacity: isIframeLoaded ? 1 : 0 }}
                      onLoad={() => setIsIframeLoaded(true)}
                    />
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-4">
                  {/* Cyber wireframe mock layout inside browser */}
                  <div className="w-full max-w-[80%] space-y-3">
                    <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-20 bg-gradient-to-br from-white/5 to-transparent rounded border border-white/5 flex flex-col items-center justify-center text-[10px] font-mono text-gray-500">
                        <span>METRICS.LOG</span>
                        <span className="text-cyan-400">99.8%</span>
                      </div>
                      <div className="h-20 bg-gradient-to-br from-white/5 to-transparent rounded border border-white/5 flex flex-col items-center justify-center text-[10px] font-mono text-gray-500">
                        <span>LATENCY</span>
                        <span className="text-violet-400">12ms</span>
                      </div>
                      <div className="h-20 bg-gradient-to-br from-white/5 to-transparent rounded border border-white/5 flex flex-col items-center justify-center text-[10px] font-mono text-gray-500">
                        <span>SYNC.NODE</span>
                        <span className="text-emerald-400">LIVE</span>
                      </div>
                    </div>
                    <div className="h-8 bg-white/5 rounded flex items-center justify-center">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">// COGNITIVE CONTAINER OFFLINE //</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setConnectLive(true)}
                    className="px-3 py-1.5 bg-[#0e0e1a] border border-cyan-500/20 hover:border-cyan-400 rounded-md text-[10px] text-cyan-400 hover:text-cyan-200 transition-all font-mono flex items-center gap-1.5 shadow-sm shadow-cyan-950/50"
                  >
                    <Eye className="w-3 h-3" /> CONNECT LIVE FRAME
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 2. MOBILE PHONE FRAME */}
        {(activeTab === 'both' || activeTab === 'mobile') && (
          <motion.div
            layoutId={`${name}-mobile-frame`}
            className={`transition-all duration-300 relative rounded-[20px] border-2 border-white/10 bg-[#06060c] shadow-2xl flex flex-col overflow-hidden ${
              activeTab === 'both'
                ? 'absolute bottom-3 right-6 w-[28%] aspect-[9/18] z-20'
                : 'w-[40%] max-w-[260px] aspect-[9/18] z-20'
            }`}
            style={{
              boxShadow: `0 15px 35px -10px rgba(0,0,0,0.9), 0 0 20px -2px ${accentColor}35`
            }}
          >
            {/* Phone Top Notch / Speaker */}
            <div className="absolute top-0 inset-x-0 h-4 bg-black flex justify-center items-center z-30">
              <div className="w-16 h-3 bg-neutral-900 rounded-b-md flex justify-around items-center px-2">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-8 h-0.5 bg-neutral-700 rounded-full" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
            </div>

            {/* Mobile Content */}
            <div className="flex-grow w-full h-full pt-4 relative bg-[#040408] overflow-hidden rounded-[18px]" ref={mobileContainerRef}>
              {connectLive ? (
                <div className="absolute top-4 left-0 right-0 bottom-0" style={{
                  width: '390px',
                  height: '844px',
                  transform: `scale(${mobileScale})`,
                  transformOrigin: 'top left'
                }}>
                  <iframe
                    src={url}
                    title={`${name} Mobile Preview`}
                    className="w-full h-full border-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-4 pt-8">
                  {/* Mock mobile dashboard */}
                  <div className="w-full space-y-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 mx-auto animate-ping" />
                    <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
                    <div className="space-y-1.5">
                      <div className="h-2 bg-white/5 rounded" />
                      <div className="h-2 bg-white/5 rounded w-5/6 mx-auto" />
                      <div className="h-2 bg-white/5 rounded w-2/3 mx-auto" />
                    </div>
                  </div>
                  
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">
                    MOBILE ROUTED PREVIEW
                  </span>
                </div>
              )}
            </div>

            {/* Phone Bottom indicator line */}
            <div className="absolute bottom-1 inset-x-0 h-2 bg-transparent flex justify-center items-center z-30 pointer-events-none">
              <span className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Embedded Live Action Details */}
      <div className="flex justify-between items-center px-1 font-mono">
        <span className="text-[10px] text-gray-500">// CLOUD ENDPOINT SECURED</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-cyan-400 hover:text-cyan-200 transition-colors flex items-center gap-1.5 px-2 py-0.5 bg-cyan-950/20 border border-cyan-500/20 rounded-md"
        >
          <span>OPEN IN NEW TAB</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
