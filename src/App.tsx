import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Send, 
  AlertCircle, 
  Lock, 
  Unlock, 
  HelpCircle, 
  Eye, 
  Check, 
  Maximize2, 
  Sparkles,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  RefreshCw
} from 'lucide-react';

import { PROJECTS } from './data';
import { Project, HudToast } from './types';
import { speak, VOICE_LINES } from './lib/speech';

// Custom sub-components
import BootSequence from './components/BootSequence';
import ParticleField from './components/ParticleField';
import DeviceMockup from './components/DeviceMockup';
import EasterEggTerminal from './components/EasterEggTerminal';
import HudToastContainer from './components/HudToastContainer';
import CustomCursor from './components/CustomCursor';
import ProgressRail from './components/ProgressRail';
import StackGrid from './components/StackGrid';
import TickingStats from './components/TickingStats';
import SocialProofMarquee from './components/SocialProofMarquee';
import AnimatedRays from './components/AnimatedRays';
import SpotlightNavbar from './components/SpotlightNavbar';
import MobileBottomDock from './components/MobileBottomDock';
import { WebGLShader } from './components/ui/web-gl-shader';
import TubesCursor from './components/ui/tubes-cursor';

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [toasts, setToasts] = useState<HudToast[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Web App' | 'SaaS' | 'E-commerce'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  // Interactive Prompt Directive Simulator in Hero
  const [simulatedPrompt, setSimulatedPrompt] = useState('Architect an Awwwards-grade luxury ecommerce interface with 60fps micro-animations.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedTokens, setSimulatedTokens] = useState<string[]>([
    'PARSING_STRUCTURAL_INTENT',
    'SYNTHESIZING_REACT19_COMPONENTS',
    'INJECTING_TAILWIND_SHADERS',
    'LOCKING_60FPS_FRAME_BUFFER'
  ]);

  // Quick contact form interactive simulator
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'shipping' | 'sent'>('idle');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Trigger HUD toasts
  const addToast = (title: string, description: string, type: 'achievement' | 'system' | 'unlocked' = 'system') => {
    const id = Math.random().toString();
    const newToast = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Setup live clock in header
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set initial login toast after boot
  const handleBootComplete = () => {
    setIsBooted(true);
    setTimeout(() => {
      addToast(
        'Mainframe Connected', 
        'AI directive link established. System operating at full visual frame rate.', 
        'unlocked'
      );
    }, 800);
  };

  const handleSectionChange = (sectionId: string) => {
    if (voiceEnabled && VOICE_LINES[sectionId]) {
      speak(VOICE_LINES[sectionId]);
    }
  };

  // Rail scroll achievement triggers
  const handleUnlockSection = (sectionId: string, title: string) => {
    if (sectionId === 'deep-diver') {
      addToast(
        'Deep Diver', 
        'Explored 80% of Eterniventures core workspace. All dossiers loaded.', 
        'achievement'
      );
    } else {
      addToast(
        `Section Decrypted`, 
        `Now viewing: ${title.toUpperCase()} // LEVEL_SECURED`, 
        'system'
      );
    }
  };

  const handleTestSynthesis = () => {
    setIsSimulating(true);
    addToast('Directive Broadcasted', 'Synthesizing layout directives into virtual DOM buffer.', 'system');
    
    setTimeout(() => {
      setSimulatedTokens(prev => [
        ...prev.slice(1),
        `DEPLOYED_NODE_${Math.floor(Math.random() * 900 + 100)} // 0.04ms`
      ]);
      setIsSimulating(false);
      addToast('Synthesis Complete', 'Virtual container compiled at 60 FPS.', 'unlocked');
    }, 1200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setContactStatus('shipping');
    setTimeout(() => {
      setContactStatus('sent');
      addToast(
        'Direct Link Dispatched',
        'Secure packet sent to Eterniventures nodes. Response pending.',
        'unlocked'
      );
      setContactMessage('');
    }, 1500);
  };

  // Filter project cards with spring animations
  const filteredProjects = PROJECTS.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const categoryCounts = {
    'All': PROJECTS.length,
    'Web App': PROJECTS.filter(p => p.category === 'Web App').length,
    'SaaS': PROJECTS.filter(p => p.category === 'SaaS').length,
    'E-commerce': PROJECTS.filter(p => p.category === 'E-commerce').length,
  };

  if (!isBooted) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-[#f5f5f5] font-sans relative selection:bg-cyan-500/30 selection:text-white overflow-x-hidden pb-24">
      
      {/* Immersive cyber backgrounds & inputs */}
      <TubesCursor />
      <WebGLShader className="opacity-40" />
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-sleek-grid" />
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-sleek-scanlines" />
      <ParticleField />
      <CustomCursor />
      
      {/* Side Viewport Navigation / Gamified Tracker */}
      <ProgressRail onUnlockSection={handleUnlockSection} onSectionChange={handleSectionChange} />

      {/* Secrets Mainframe shell launcher */}
      <EasterEggTerminal 
        isOpenExternal={isTerminalOpen} 
        onCloseExternal={() => setIsTerminalOpen(false)} 
        onUnlockAchievement={(title, desc) => addToast(title, desc, 'achievement')} 
      />

      {/* Floating HUD toast logger */}
      <HudToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* SYSTEM HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#040409]/85 backdrop-blur-2xl border-b border-white/[0.08] px-3 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Top edge specular highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2 sm:gap-4">
          
          {/* Logo brand & telemetry node status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-cyan-400 font-semibold uppercase">
                  SYSTEM_OPERATOR
                </span>
              </div>
              <span className="text-lg sm:text-2xl font-black tracking-tighter text-white uppercase block font-display">
                ETERNIVENTURES<span className="text-violet-500 animate-pulse">_</span>
              </span>
            </div>
          </div>

          {/* Centered Spotlight Navbar - for md/lg displays */}
          <div className="hidden md:flex items-center justify-center">
            <SpotlightNavbar 
              items={[
                { label: "Home", href: "#hero" },
                { label: "Showcase", href: "#work" },
                { label: "Manifesto", href: "#manifesto" },
                { label: "Stack", href: "#stack" },
                { label: "Pipeline", href: "#process" },
                { label: "Contact", href: "#contact" },
              ]}
              onItemClick={(item) => {
                addToast('Sector Vectoring', `Targeting coordinate [${item.label.toUpperCase()}].`, 'system');
              }}
            />
          </div>

          {/* Action cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Telemetry pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-3.5 font-mono text-[10px] text-gray-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="font-semibold text-emerald-400">NODE: LIVE</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div>
                <span>SYS: <span className="text-cyan-400 font-bold">12ms</span></span>
              </div>
            </div>

            {/* Terminal launcher shortcut button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 bg-[#0e0e1a] border border-violet-500/40 hover:border-violet-400 rounded-xl text-[10px] font-mono text-violet-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              title="Launch Mainframe Terminal"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-semibold">TERMINAL</span>
            </button>

            {/* Voice HUD Audio button */}
            <button
              onClick={() => {
                 setVoiceEnabled(!voiceEnabled);
                 if (!voiceEnabled) {
                    speak("Voice system activated.");
                 } else {
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                 }
              }}
              className={`p-2 sm:px-3 sm:py-1.5 border rounded-xl text-[10px] font-mono transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                voiceEnabled 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]' 
                  : 'bg-[#0a0a14] border-white/10 text-gray-400 hover:text-cyan-200 hover:border-cyan-400/50'
              }`}
              title="Toggle HUD Audio Assistant"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden xl:inline font-semibold">HUD_VOICE</span>
            </button>

            {/* Direct Link CTA */}
            <a 
              href="#contact" 
              className="px-3 sm:px-4 py-2 sm:py-1.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-950/50 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
              onClick={() => addToast('Signal Transmitted', 'Navigating coordinates to contact portal.', 'system')}
            >
              <span className="hidden xs:inline">Direct Link</span>
              <span className="xs:hidden">Contact</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3.5 sm:px-8 lg:px-12 space-y-20 sm:space-y-36 relative z-10 pt-6 sm:pt-10 lg:pt-14 pb-24 lg:pb-0">
        
        {/* 1. HERO SECTION (Desktop Dual-Column Interactive Cyber Suite) */}
        <section id="hero" className="min-h-0 sm:min-h-[75vh] flex flex-col justify-center relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 lg:p-16 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          {/* iPhone Glass Specular Highlight & Radial Shine Overlay */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          <div className="absolute top-[1px] left-4 sm:left-8 right-4 sm:right-8 h-[0.5px] bg-white/20 rounded-full pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-cyan-500/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-violet-600/[0.06] blur-3xl pointer-events-none" />

          {/* Animated Aurora Rays Background */}
          <AnimatedRays className="absolute inset-0 -z-10 pointer-events-none opacity-85" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* HUD tag indicator */}
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#22D3EE]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold tracking-wider">[ INTERFACE_BOOT_OK ]</span>
                <span className="h-px bg-cyan-500/30 w-12 sm:w-16 hidden xs:block" />
                <span className="text-gray-400 tracking-wider text-[10px] sm:text-[11px] hidden sm:block">DIRECTING_PURE_INTENT</span>
              </div>

              {/* Kinetic display heading */}
              <div className="relative pl-3.5 sm:pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent rounded-full" />
                <h2 className="text-3.5xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.95] font-black uppercase tracking-tighter text-white font-display">
                  I don’t write code.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-cyan-300 animate-glitch relative drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]" data-text="I DIRECT IT.">
                    I direct it.
                  </span>
                </h2>
              </div>

              {/* Secondary alternative headings (the curiosity gaps) */}
              <p className="text-gray-300 text-xs sm:text-base md:text-lg font-mono max-w-xl leading-relaxed">
                // Bypassing obsolete manual syntax bottlenecks to orchestrate, compile, and deploy pure autonomous intent at terminal speed.
              </p>

              {/* Interactive target call to action cluster */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <a 
                  href="#work"
                  className="w-full xs:w-auto justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-cyan-400 text-white text-xs font-mono font-bold uppercase rounded-xl shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/30 transition-all flex items-center gap-2.5 border border-white/20 group cursor-pointer hover:scale-[1.02]"
                  onClick={() => addToast('Routing Sequence', 'Initiating coordinate translation to showcase.', 'system')}
                >
                  <span>EXPLORE SHOWCASE // 02</span>
                  <Layers className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="w-full xs:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 bg-black/60 border border-white/15 hover:border-cyan-400/60 hover:bg-white/[0.04] text-gray-300 hover:text-white text-xs font-mono font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <TerminalIcon className="w-4 h-4 text-cyan-400" />
                  <span>LAUNCH DIRECT_CLI</span>
                </button>
              </div>

              {/* Live telemetry metadata pill row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                <span className="text-[9px] sm:text-[10px] font-mono px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>React 19 & Vite</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Edge &lt; 100ms</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-violet-400" />
                  <span>60 FPS Fluid</span>
                </span>
              </div>

            </div>

            {/* Right Column (5 cols on desktop) - Interactive Holographic Telemetry Hub */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl backdrop-blur-2xl bg-black/70 border border-white/15 p-6 shadow-2xl overflow-hidden space-y-5">
                {/* Specular glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
                
                {/* Terminal Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] font-mono font-bold text-gray-300 ml-1">DIRECTIVE_ENGINE_V3</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold">
                    60 FPS LOCKED
                  </span>
                </div>

                {/* Simulated Audio/Cognition Waveform */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>COGNITIVE_SYNTHESIS_BAND</span>
                    <span className="text-cyan-400">98.4% EFFICIENCY</span>
                  </div>
                  <div className="h-10 bg-black/60 rounded-lg p-1.5 flex items-end justify-between gap-1 border border-white/5 overflow-hidden">
                    {[40, 65, 30, 85, 95, 50, 75, 90, 45, 60, 100, 70, 85, 40, 60, 95, 80, 55, 70, 90, 60, 45, 80, 95, 30].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-full bg-gradient-to-t from-violet-600 via-cyan-400 to-cyan-300 rounded-t-sm transition-all duration-300"
                        style={{ 
                          height: isSimulating ? `${(h * 1.2) % 100}%` : `${h}%`,
                          opacity: isSimulating ? 1 : 0.65
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Live Streaming Prompt Token Feed */}
                <div className="space-y-2 bg-black/80 rounded-xl p-3 border border-white/5 font-mono text-[10px]">
                  <div className="flex justify-between text-gray-400 text-[9px] uppercase border-b border-white/5 pb-1">
                    <span>// DIRECTIVE_STREAM</span>
                    <span className="text-cyan-400">LIVE_EDGE</span>
                  </div>
                  <div className="space-y-1 text-gray-300">
                    {simulatedTokens.map((tok, i) => (
                      <div key={i} className="flex items-center gap-2 truncate">
                        <span className="text-violet-400">&gt;&gt;</span>
                        <span className={i === simulatedTokens.length - 1 ? 'text-cyan-300 font-bold' : 'text-gray-400'}>
                          {tok}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Test Directive Sandbox Button */}
                <button
                  onClick={handleTestSynthesis}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 hover:from-violet-600/50 hover:to-cyan-500/50 border border-cyan-400/40 rounded-xl text-[11px] font-mono font-bold text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>SYNTHESIZING TO VIRTUAL DOM...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>TEST DIRECTIVE SYNTHESIS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Ticking telemetry bottom HUD strip */}
          <div className="border-t border-white/10 pt-8 mt-10 flex flex-wrap justify-between items-center gap-4 font-mono text-[10px] text-gray-400">
            <div>
              <span>TARGET_HOST // <span className="text-white font-semibold">ETERNIVENTURES_PRODUCTION</span></span>
            </div>
            <div className="flex flex-wrap gap-6">
              <span>DESIGN // <span className="text-cyan-400 font-bold">AWWWARDS_CALIBER</span></span>
              <span>ENGINE // <span className="text-violet-400 font-bold">VIBE_COGNITION_v3.2</span></span>
              <span>FRAME_RATE // <span className="text-emerald-400 font-bold">60 FPS LOCKED</span></span>
            </div>
          </div>
        </section>


        {/* 2. WORK / PROJECT SHOWCASE SECTION */}
        <section id="work" className="space-y-12">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 font-mono text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold tracking-wider">02 // DISPATCHED_RESOURCES</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
                Vibe-Coded Showcase
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl">
                Real high-leverage production applications running live on global edges. Fully designed, orchestrated, and launched using prompt architecture.
              </p>
            </div>

            {/* Category Filter Pills with Item Counts */}
            <div className="flex flex-wrap gap-1.5 bg-black/50 border border-white/10 p-1.5 rounded-xl self-start lg:self-end shadow-inner">
              {(['All', 'Web App', 'SaaS', 'E-commerce'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    addToast('Filter Re-indexed', `Sorting system parameters to ${cat.toUpperCase()}`, 'system');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat ? 'bg-black/40 text-white' : 'bg-white/5 text-gray-500'}`}>
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bento-Grid Project System */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10" id="projects-bento-grid">
            {filteredProjects.map((proj, idx) => {
              const isExpanded = selectedProject?.id === proj.id;

              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] rounded-2xl p-7 lg:p-8 group hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all flex flex-col justify-between space-y-6 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  data-cursor="project"
                >
                  {/* iPhone Glass Specular Highlight & Radial Shine Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <div className="absolute top-[1px] left-4 right-4 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
                  <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />

                  {/* Decorative glowing top background matching project accent */}
                  <div 
                    className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-300"
                    style={{ backgroundColor: proj.color }}
                  />

                  {/* 1. Device Mockup Showcase Frame (Dual Screen, Desktop, and Mobile preview) */}
                  <div className="relative z-10">
                    <DeviceMockup url={proj.liveUrl} name={proj.name} accentColor={proj.color} />
                  </div>

                  {/* 2. Text Details: Title, Description, and tags */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    
                    {/* Category & Status Indicators */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        // {proj.category}
                      </span>
                      <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold tracking-wider">SECURE_EDGE</span>
                      </div>
                    </div>

                    {/* Title and one-liner */}
                    <div className="space-y-1.5">
                      <h4 className="text-2xl font-bold text-white font-display tracking-tight group-hover:text-cyan-400 transition-colors">
                        {proj.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                        {proj.oneLiner}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 rounded-md text-[9px] font-mono text-gray-300 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progressive Disclosure Panel Toggle (Problem -> Approach -> Result) */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (isExpanded) {
                            setSelectedProject(null);
                          } else {
                            setSelectedProject(proj);
                            addToast('Manifest Restructured', `Decrypted pipeline details for ${proj.name}`, 'system');
                          }
                        }}
                        className="w-full py-2.5 bg-black/50 border border-white/10 hover:border-violet-500/40 rounded-xl text-[11px] font-mono text-gray-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-semibold shadow-inner"
                      >
                        <span>{isExpanded ? 'Collapse System Manifest' : 'Expand System Manifest // Problem_Approach_Metrics'}</span>
                        <Maximize2 className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expanded core details wrapper */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-black/80 border border-white/10 rounded-xl p-5 mt-3 space-y-4 text-xs font-mono shadow-2xl"
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] text-rose-400 font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                // THE PROBLEM
                              </span>
                              <p className="text-gray-300 font-sans leading-relaxed text-xs">{proj.problem}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                // SURGICAL APPROACH
                              </span>
                              <p className="text-gray-300 font-sans leading-relaxed text-xs">{proj.detailedApproach}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                // RESULT & METRIC OUTCOME
                              </span>
                              <p className="text-gray-300 font-sans leading-relaxed text-xs">{proj.result}</p>
                            </div>

                            {/* Metrics ticker box */}
                            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                              {proj.stats.map((st) => (
                                <div key={st.label} className="bg-white/[0.03] border border-white/10 rounded-lg p-2.5 text-center">
                                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold">{st.label}</span>
                                  <span className="text-sm font-black text-white block mt-1 font-display">{st.value}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Social Proof Infinite Testimonial & Marquee */}
          <div className="pt-10">
            <SocialProofMarquee />
          </div>
        </section>


        {/* 3. MANIFESTO / PHILOSOPHY SECTION (Responsive 2-Column Split) */}
        <section id="manifesto" className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          {/* iPhone Glass Specular Highlight & Radial Shine Overlay */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          <div className="absolute top-[1px] left-8 right-8 h-[0.5px] bg-white/20 rounded-full pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-violet-500/[0.08] blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Narrative Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-violet-400">
                <span className="font-bold tracking-wider">03 // CORE_MANIFESTO_DECRYPTED</span>
                <span className="h-px bg-violet-500/30 w-12" />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight leading-tight">
                Directing Artificial Intelligence as a High-Leverage Discipline.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                <p>
                  The era of manual code laboring is sunsetting. Spending hours tweaking braces, correcting semicolons, and rewriting boilerplate is an obsolete developer pattern. Today, true engineering is about <strong className="text-white">directing structural intention</strong>.
                </p>
                <p>
                  At <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold">Eterniventures</span>, we treat code as compiled liquid. We feed rich structural patterns, visual rhythm layouts, and clean mathematical logic into our cognitive accelerators. By directing code architectures rather than grinding them out line-by-line, we ship production-grade, optimized apps at 10x velocity.
                </p>
                <p className="font-mono text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-xl leading-relaxed">
                  // "THE ARTIST DOES NOT MANUALLY BLEND RAW ENAMEL TO LAY A MOSAIC. THEY ARRANGE THE TESSERAE."
                </p>
              </div>
            </div>

            {/* Right Comparison Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-xs text-gray-400">
                  <span className="font-bold text-white">// THE_PARADIGM_SHIFT</span>
                  <span className="text-cyan-400 font-semibold">10x VELOCITY</span>
                </div>

                {/* Legacy Mode */}
                <div className="space-y-2 p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  <div className="flex justify-between items-center text-[10px] font-mono text-rose-400 font-bold uppercase">
                    <span>Legacy Dev Grinding</span>
                    <span>OBSOLETE</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Manual syntax typing, dependency hell, boilerplate bugs, and 4-week sprint drag.
                  </p>
                </div>

                {/* Vibe Orchestration Mode */}
                <div className="space-y-2 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300 font-bold uppercase">
                    <span>Vibe Orchestration</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-sans">
                    Cognitive intent translation, type-safe architecture synthesis, 60fps edge shipping in 48h.
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-1">
                  <span>LATENCY: 0.04ms</span>
                  <span>ACCURACY: 99.8%</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* 4. STACK / TOOLS SECTION */}
        <section id="stack" className="space-y-10">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <span>04 // SURGICAL_COGNITIVE_TOOLS</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              Surgical Tool Stack
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl">
              Our weaponized accelerator setup used to draft, sculpt, compile, and edge-deploy codebases within seconds.
            </p>
          </div>

          {/* Bento tool grid with brand SVGs */}
          <StackGrid />
        </section>


        {/* 5. PROCESS PIPELINE SECTION */}
        <section id="process" className="space-y-12">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <span>05 // COMPILE_DEPLOY_PIPELINE</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              Vibe-Coding Pipeline
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl">
              From pure conceptual prompting to a highly responsive, cloud-run ready endpoint within minutes.
            </p>
          </div>

          {/* Stepped layout cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="process-pipeline-grid">
            {[
              {
                step: '01',
                title: 'Capture Intent',
                desc: 'Feeding clear visual mock parameters, semantic grids, and structural guidelines into our accelerator matrices.',
                output: 'SYSTEM: MANIFEST_CREATED'
              },
              {
                step: '02',
                title: 'AI Synthesis',
                desc: 'Cognitive models construct precise type systems, layouts, and hooks, fully utilizing modern React + Tailwind.',
                output: 'COMPILING: SYNTHESIS_OK'
              },
              {
                step: '03',
                title: 'Micro-Refining',
                desc: 'A custom, prompt-guided linter audits and patches edge cases, and secures WCAG AA contrast colors.',
                output: 'COMPILATION: ZERO_WARNINGS'
              },
              {
                step: '04',
                title: 'Global Ship',
                desc: 'Compiled build deployed natively to Cloud Run containers or Vercel edge endpoints in less than 3 seconds.',
                output: 'ORBIT_INGRESS: ACTIVE_LIVE'
              }
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between h-64 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
              >
                {/* iPhone Glass Specular Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <div className="absolute top-[1px] left-3 right-3 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-4">
                    <span className="text-violet-400 font-bold tracking-wider">// STEP_{p.step}</span>
                    <span className="text-emerald-400 font-semibold text-[10px]">READY</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display uppercase tracking-tight mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 mt-4">
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold block truncate">
                    &gt; {p.output}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive telemetry counting stats row */}
          <div className="pt-12 space-y-12">
            <TickingStats />
          </div>
        </section>


        {/* 6. CONTACT / CTA SECTION */}
        <section id="contact" className="space-y-12">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <span>06 // AUTHORIZED_SECURE_DISPATCH</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              Establish Connection
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl">
              Initiate a zero-friction communications handshake. No lengthy forms. Secure end-to-end telemetry dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Quick dispatch terminal form (7 cols on desktop) */}
            <form 
              onSubmit={handleContactSubmit}
              className="lg:col-span-7 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] rounded-2xl p-7 lg:p-8 space-y-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden"
            >
              {/* iPhone Glass Specular Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <div className="absolute top-[1px] left-4 right-4 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
              
              <div className="flex items-center justify-between font-mono text-xs text-cyan-400/80 border-b border-white/10 pb-3">
                <span className="font-bold">COMM_STATION: #EV-HANDSHAKE</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SECURE_PACKET
                </span>
              </div>

              {/* Quick Directive Preset Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">// Quick Directive Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    '⚡ MVP Build in 48h',
                    '🚀 AI SaaS Architecture',
                    '💎 Enterprise Redesign',
                    '💬 Custom Inquiry'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setContactMessage(`Directive Request: ${preset}. Looking for high-speed architecture design and implementation.`)}
                      className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:border-cyan-400/50 text-[10px] font-mono text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest block font-semibold">
                  // Input Telemetry Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full h-36 bg-black/60 border border-white/10 rounded-xl p-3.5 font-mono text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 resize-none transition-all shadow-inner"
                  placeholder="Type your project parameters, timeframe, or contact link here..."
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-gray-400">
                  {contactStatus === 'sent' ? 'PACKET_TRANSMITTED_OK' : 'DISPATCH_ORBIT: ACTIVE'}
                </span>

                <button
                  type="submit"
                  disabled={contactStatus === 'shipping' || !contactMessage.trim()}
                  className="px-6 py-2.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-cyan-400 text-white text-xs font-mono font-bold uppercase rounded-xl shadow-md hover:shadow-cyan-500/30 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  {contactStatus === 'shipping' ? (
                    <>
                      <span>TRANSMITTING...</span>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </>
                  ) : contactStatus === 'sent' ? (
                    <>
                      <span>LINK DISPATCHED</span>
                      <Check className="w-4 h-4 text-emerald-300" />
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT PACKET</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct channels & SLA card (5 cols on desktop) */}
            <div className="lg:col-span-5 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.1] rounded-2xl p-7 lg:p-8 space-y-6 font-mono text-xs text-gray-300 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              {/* iPhone Glass Specular Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <div className="absolute top-[1px] left-4 right-4 h-[0.5px] bg-white/15 rounded-full pointer-events-none" />
              
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#22D3EE] uppercase tracking-widest block font-bold">// DIRECT SECURE CHANNELS</span>
                <p className="text-white text-base font-bold font-sans">kaizersilila@gmail.com</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-[#7C3AED] uppercase tracking-widest block font-bold">// TRANSMISSION_ORBITAL_METADATA</span>
                <p className="font-sans text-xs leading-relaxed text-gray-300">
                  All digital packets dispatched through this interface are channeled via peer-to-peer cloud vectors. Secure link verification handles spam filtering in less than 30ms.
                </p>
              </div>

              <div className="space-y-2.5 border-t border-white/10 pt-4">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">// RESPONSE_SLA_SPEC:</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[9px]">RESPONSE TIME</span>
                    <span className="text-cyan-400 font-bold">&lt; 2 HOURS</span>
                  </div>
                  <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[9px]">ENCRYPTION</span>
                    <span className="text-emerald-400 font-bold">TLS 1.3 AES-256</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* SYSTEM FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 sm:px-12 bg-black/50 backdrop-blur-2xl mt-24 sm:mt-36 mb-20 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-gray-400 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
            <span className="text-white font-black tracking-widest uppercase text-sm font-display">ETERNIVENTURES</span>
            <span className="text-gray-500 text-[10px] sm:text-xs">© 2031 // ALL DIRECTIVES SECURED</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px]">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => addToast('Directive Policy', 'Terms of dispatch link loaded.', 'system')}>Terms of Dispatch</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => addToast('Konami Clue', 'Try typing "vibe" on your keyboard inside the mainframe.', 'unlocked')}>Mainframe Override</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent hidden md:block"></div>
            <div className="flex items-center gap-1.5 text-cyan-400/60 font-semibold text-[10px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>TRANSMISSION ACTIVE</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Mobile Floating Glass Dock (Quick Navigation & Sector Tracker) */}
      <MobileBottomDock 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onNavigate={(id, label) => {
          handleSectionChange(id);
          addToast('Sector Vectoring', `Targeting coordinate [${label.toUpperCase()}].`, 'system');
        }}
      />

      {/* Sleek scroll buffer indicator */}
      <div className="fixed bottom-0 right-0 p-8 flex flex-col items-end pointer-events-none z-40 hidden md:flex">
        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 w-3/4 rounded-full"></div>
        </div>
        <span className="font-mono text-[9px] text-cyan-400/60 mt-1.5 tracking-widest font-semibold">SCROLL_BUFFER_ONLINE</span>
      </div>

    </div>
  );
}
