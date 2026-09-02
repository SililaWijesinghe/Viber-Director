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
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl p-2 sm:p-2.5 text-xs shadow-inner">
        <div className="flex items-center gap-2 font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="uppercase text-[10px] sm:text-[11px] font-semibold text-gray-300 truncate max-w-[140px] sm:max-w-none">
            ENGINE // {name}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#0b0b14]/90 rounded-lg p-1 border border-white/10 font-mono w-full xs:w-auto justify-end">
          <button
            onClick={() => setActiveTab('both')}
            className={`flex-1 xs:flex-none px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] uppercase font-semibold transition-all cursor-pointer text-center ${
              activeTab === 'both'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Dual
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 xs:flex-none px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] uppercase font-semibold transition-all cursor-pointer text-center ${
              activeTab === 'desktop'
                ? 'bg-violet-600/40 text-violet-200 border border-violet-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="inline w-3 h-3 mr-0.5 sm:mr-1" /> Desk
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 xs:flex-none px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] uppercase font-semibold transition-all cursor-pointer text-center ${
              activeTab === 'mobile'
                ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="inline w-3 h-3 mr-0.5 sm:mr-1" /> Mob
          </button>
        </div>
      </div>

      {/* Main Mockup Screen Frame */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] min-h-[220px] bg-[#030307]/90 rounded-2xl overflow-hidden border border-white/10 p-2 sm:p-4 flex items-center justify-center grain-overlay shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
        
        {/* Background glow matching project's accent color */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none blur-3xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 65%)`
          }}
        />

        {/* 1. DESKTOP BROWSER FRAME */}
        {(activeTab === 'both' || activeTab === 'desktop') && (
          <motion.div
            layoutId={`${name}-desktop-frame`}
            className={`transition-all duration-300 relative rounded-xl border border-white/15 bg-[#08080f]/98 shadow-2xl flex flex-col ${
              activeTab === 'both' 
                ? 'w-[80%] sm:w-[75%] aspect-[16/10] -translate-x-2 sm:-translate-x-4 -translate-y-1 sm:-translate-y-2 z-10' 
                : 'w-full h-full z-20'
            }`}
            style={{
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.9), 0 0 25px -5px ${accentColor}25`
            }}
          >
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 sm:py-2 border-b border-white/10 bg-black/70 rounded-t-xl">
              {/* Colored Dots */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              </div>
              {/* URL Address Bar */}
              <div className="flex-grow mx-2 sm:mx-4 max-w-sm">
                <div className="bg-black/60 border border-white/10 rounded-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-gray-300 flex items-center justify-between select-all shadow-inner">
                  <span className="truncate">{displayUrl}</span>
                  <ExternalLink className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-500 hover:text-cyan-400 transition-colors shrink-0 ml-1" />
                </div>
              </div>
              {/* Controls */}
              <div className="flex items-center space-x-1 text-[9px] sm:text-[10px] font-mono text-gray-400 shrink-0">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden xs:inline">SECURE</span>
                </span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-grow w-full relative bg-[#040408] overflow-hidden rounded-b-xl" ref={desktopContainerRef}>
              {connectLive ? (
                <>
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[10px] sm:text-xs text-gray-400 gap-2 z-10 bg-[#040408]/90 p-2 text-center">
                      <RefreshCw className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-cyan-400" />
                      <span className="tracking-wider">INITIALIZING LIVE ROUTE...</span>
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
                    className="px-3.5 py-2 bg-[#0e0e1a] border border-cyan-500/30 hover:border-cyan-400 rounded-lg text-[10px] text-cyan-400 hover:text-cyan-200 transition-all font-mono flex items-center gap-1.5 shadow-sm shadow-cyan-950/50 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> CONNECT LIVE FRAME
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
            className={`transition-all duration-300 relative rounded-[18px] sm:rounded-[22px] border-2 border-white/20 bg-[#06060c] shadow-2xl flex flex-col overflow-hidden ${
              activeTab === 'both'
                ? 'absolute bottom-2 sm:bottom-3 right-2 sm:right-6 w-[32%] sm:w-[28%] aspect-[9/18] z-20'
                : 'w-[50%] sm:w-[40%] max-w-[260px] aspect-[9/18] z-20'
            }`}
            style={{
              boxShadow: `0 20px 40px -10px rgba(0,0,0,0.95), 0 0 25px -2px ${accentColor}40`
            }}
          >
            {/* Phone Top Notch / Speaker */}
            <div className="absolute top-0 inset-x-0 h-3.5 sm:h-4 bg-black flex justify-center items-center z-30">
              <div className="w-12 sm:w-16 h-2.5 sm:h-3 bg-neutral-900 rounded-b-md flex justify-around items-center px-1.5 sm:px-2">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-6 sm:w-8 h-0.5 bg-neutral-700 rounded-full" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
            </div>

            {/* Mobile Content */}
            <div className="flex-grow w-full h-full pt-3 sm:pt-4 relative bg-[#040408] overflow-hidden rounded-[16px] sm:rounded-[20px]" ref={mobileContainerRef}>
              {connectLive ? (
                <div className="absolute top-3 sm:top-4 left-0 right-0 bottom-0" style={{
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
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 text-center space-y-3 pt-6 sm:pt-8">
                  {/* Mock mobile dashboard */}
                  <div className="w-full space-y-2">
                    <div className="w-5 h-5 rounded-full bg-white/5 mx-auto animate-ping" />
                    <div className="h-2.5 bg-white/5 rounded w-1/2 mx-auto" />
                  </div>
                  
                  <span className="text-[7px] sm:text-[8px] font-mono text-gray-500 uppercase tracking-wider block">
                    MOBILE ROUTED PREVIEW
                  </span>
                </div>
              )}
            </div>

            {/* Phone Bottom indicator line */}
            <div className="absolute bottom-1 inset-x-0 h-1.5 bg-transparent flex justify-center items-center z-30 pointer-events-none">
              <span className="w-12 sm:w-16 h-0.5 sm:h-1 bg-white/30 rounded-full" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Embedded Live Action Details */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 px-1 font-mono">
        <span className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>CLOUD ENDPOINT SECURED</span>
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full xs:w-auto text-center justify-center text-[9px] sm:text-[10px] font-mono font-medium text-cyan-400 hover:text-cyan-200 transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 rounded-lg shadow-sm"
        >
          <span>OPEN IN NEW TAB</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
