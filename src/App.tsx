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
  VolumeX
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
import { WebGLShader } from './components/ui/web-gl-shader';

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [toasts, setToasts] = useState<HudToast[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Web App' | 'SaaS' | 'E-commerce'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
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
      // Voice guide will only play if enabled (we'll add a toggle for user interaction)
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

  if (!isBooted) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-[#f5f5f5] font-sans relative selection:bg-cyan-500/30 selection:text-white overflow-x-hidden pb-20">
      
      {/* Immersive cyber backgrounds & inputs */}
      <WebGLShader className="opacity-40" />
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-sleek-grid" />
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-sleek-scanlines" />
      <ParticleField />
      <CustomCursor />
      
      {/* Side Viewport Navigation / Gamified Tracker */}
      <ProgressRail onUnlockSection={handleUnlockSection} onSectionChange={handleSectionChange} />

      {/* Secrets Mainframe shell launcher */}
      <EasterEggTerminal onUnlockAchievement={(title, desc) => addToast(title, desc, 'achievement')} />

      {/* Floating HUD toast logger */}
      <HudToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* SYSTEM HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#040409]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-2.5 md:py-3 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          
          {/* Logo brand & telemetry node status */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-400">
                  SYSTEM_OPERATOR / v3.1
                </span>
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase block">
                  ETERNIVENTURES<span className="text-violet-500 animate-pulse">_</span>
                </span>
              </div>
            </div>

            {/* Mobile-only quick toggle */}
            <div className="flex md:hidden items-center gap-2">
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
                className={`p-1.5 border rounded text-[10px] font-mono transition-all uppercase ${
                  voiceEnabled ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-[#0a0a14] border-cyan-500/20 text-gray-500'
                }`}
                title="Toggle HUD voice assistant"
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Centered Spotlight Navbar */}
          <div className="flex items-center justify-center">
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

          {/* Right telemetry & Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-gray-500 mr-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>GATE: 3000</span>
              </div>
              <div>
                <span>SYS: <span className="text-cyan-400">14ms</span></span>
              </div>
            </div>

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
              className={`px-2.5 py-1.5 border rounded text-[10px] font-mono transition-all uppercase tracking-wider flex items-center gap-1.5 ${
                voiceEnabled ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-[#0a0a14] border-cyan-500/20 text-gray-500 hover:text-cyan-200 hover:border-cyan-400'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span className="hidden xl:inline">SYS_VOICE</span>
            </button>

            <a 
              href="#contact" 
              className="px-3 py-1.5 bg-[#0a0a14] border border-cyan-500/30 hover:border-cyan-400 rounded text-[10px] font-mono text-cyan-400 hover:text-cyan-200 transition-all uppercase tracking-wider flex items-center gap-1.5"
              onClick={() => addToast('Signal Transmitted', 'Navigating coordinates to contact portal.', 'system')}
            >
              <span>Direct Link</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32 relative z-10 pt-16">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center space-y-8 relative overflow-hidden rounded-3xl p-6 md:p-12 border border-white/5 bg-[#05050a]/40 backdrop-blur-xs">
          {/* Animated Aurora Rays Background */}
          <AnimatedRays className="absolute inset-0 -z-10 pointer-events-none opacity-85" />
          
          <div className="space-y-4 relative z-10">
            
            {/* HUD tag indicator */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE]">
              <span>[ INTERFACE_BOOT_INIT_OK ]</span>
              <span className="h-px bg-cyan-500/20 w-16" />
              <span className="text-gray-500 tracking-wider">DIRECTING_PURE_INTENT</span>
            </div>

            {/* Kinetic display heading */}
            <div className="relative">
              <h2 className="text-[64px] md:text-[84px] leading-[0.85] font-black uppercase tracking-tighter mix-blend-difference text-white">
                I don’t write code.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-cyan-400 to-cyan-500 animate-glitch relative" data-text="I DIRECT IT.">
                  I direct it.
                </span>
              </h2>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-violet-600"></div>
            </div>

            {/* Secondary alternative headings (the curiosity gaps) */}
            <p className="text-gray-400 text-sm md:text-base font-mono max-w-2xl leading-relaxed">
              // Bypassing obsolete manual syntax bottlenecks to orchestrate, compile, and deploy pure autonomous intent at terminal speed.
            </p>
          </div>

          {/* Interactive target call to action */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#work"
              className="px-5 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-mono font-bold uppercase rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 border border-cyan-400/20 group cursor-pointer"
              onClick={() => addToast('Routing Sequence', 'Initiating coordinate translation to showcase.', 'system')}
            >
              <span>EXPLORE SYSTEMS // CAT</span>
              <Layers className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                const terminalBtn = document.querySelector('[title="Open AI Core Console"]') as HTMLElement;
                if (terminalBtn) terminalBtn.click();
              }}
              className="px-5 py-3 bg-[#08080f]/90 border border-white/5 hover:border-cyan-500/40 text-gray-400 hover:text-white text-xs font-mono rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span>LAUNCH AI DIRECT_CLI</span>
            </button>
          </div>

          {/* Ticking telemetry bottom HUD strip */}
          <div className="border-t border-white/5 pt-8 flex flex-wrap justify-between items-center gap-4 font-mono text-[10px] text-gray-500">
            <div>
              <span>TARGET_HOST // <span className="text-white">ETERNIVENTURES</span></span>
            </div>
            <div className="flex gap-4">
              <span>DESIGN // <span className="text-cyan-400">AWWWARDS_CALIBER</span></span>
              <span>ENGINE // <span className="text-violet-400">VIBE_COGNITION</span></span>
            </div>
          </div>
        </section>


        {/* 2. WORK / PROJECT SHOWCASE SECTION */}
        <section id="work" className="space-y-12">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <span>02 // DISPATCHED_RESOURCES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h3 className="text-3xl font-black font-display text-white uppercase tracking-tight">
                Vibe-Coded Showcase
              </h3>
              <p className="text-gray-400 text-xs font-mono leading-relaxed max-w-xl">
                Real high-leverage production applications running live on edges. Fully designed, orchestrated, and launched using prompt architecture.
              </p>
            </div>

            {/* Category Filter Pills (Reflow with motion springs) */}
            <div className="flex flex-wrap gap-1.5 bg-black/40 border border-white/5 p-1 rounded-lg self-start md:self-end">
              {(['All', 'Web App', 'SaaS', 'E-commerce'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    addToast('Filter Re-indexed', `Sorting system parameters to ${cat.toUpperCase()}`, 'system');
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bento-Grid Project System */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="projects-bento-grid">
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
                  className="bg-white/5 border border-white/10 rounded-lg p-6 group hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
                  data-cursor="project"
                >
                  {/* Decorative glowing top background */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5 pointer-events-none transition-all duration-300"
                    style={{ backgroundColor: proj.color }}
                  />

                  {/* 1. Device Mockup Showcase Frame (Desktop & Mobile device frame display) */}
                  <div className="relative z-10">
                    <DeviceMockup url={proj.liveUrl} name={proj.name} accentColor={proj.color} />
                  </div>

                  {/* 2. Text Details: Title, Description, and tags */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    
                    {/* Category & Status Indicators */}
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                        // {proj.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-emerald-400 tracking-wider">SECURE_EDGE</span>
                      </div>
                    </div>

                    {/* Title and one-liner */}
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white font-display tracking-tight hover:text-cyan-400 transition-colors">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
                        {proj.oneLiner}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1">
                      {proj.stack.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded text-[8px] font-mono text-gray-500 uppercase tracking-wider"
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
                        className="w-full py-2 bg-black/40 border border-white/5 hover:border-violet-500/20 rounded-lg text-[10px] font-mono text-gray-400 hover:text-violet-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <span>{isExpanded ? 'Collapse System Manifest' : 'Expand System Manifest // Problem_Approach_Metrics'}</span>
                        <Maximize2 className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expanded core details wrapper */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-black/60 border border-white/5 rounded-lg p-4 mt-3 space-y-4 text-xs font-mono"
                          >
                            <div className="space-y-1">
                              <span className="text-[9px] text-rose-400">// PROBLEM</span>
                              <p className="text-gray-300 font-sans leading-relaxed text-[11px]">{proj.problem}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] text-cyan-400">// APPROACH</span>
                              <p className="text-gray-300 font-sans leading-relaxed text-[11px]">{proj.detailedApproach}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] text-emerald-400">// RESULT & OUTCOME</span>
                              <p className="text-gray-300 font-sans leading-relaxed text-[11px]">{proj.result}</p>
                            </div>

                            {/* Metrics ticker box */}
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                              {proj.stats.map((st) => (
                                <div key={st.label} className="bg-white/[0.02] border border-white/5 rounded p-2 text-center">
                                  <span className="text-[8px] text-gray-500 uppercase tracking-wider block">{st.label}</span>
                                  <span className="text-xs font-bold text-white block mt-0.5">{st.value}</span>
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
          <div className="pt-8">
            <SocialProofMarquee />
          </div>
        </section>


        {/* 3. MANIFESTO / PHILOSOPHY SECTION */}
        <section id="manifesto" className="relative overflow-hidden bg-gradient-to-br from-[#06060c] to-transparent border border-white/5 rounded-3xl p-8 md:p-12 glow-purple">
          
          {/* Ambient code background watermark */}
          <div className="absolute right-0 bottom-0 opacity-[0.01] pointer-events-none select-none font-mono text-[100px] font-black text-white uppercase tracking-tighter leading-none">
            VIBE
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-violet-400">
              <span>03 // CORE_MANIFESTO_DECRYPTED</span>
              <span className="h-px bg-violet-500/20 w-12" />
            </div>

            <h3 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
              Directing Artificial Intelligence as a High-Leverage Discipline.
            </h3>

            <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed font-sans">
              <p>
                The era of manual code laboring is sunsetting. Spending hours tweaking braces, correcting semicolons, and rewriting boilerplate is an obsolete developer pattern. Today, true engineering is about **directing structural intention**.
              </p>
              <p>
                At <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold">Eterniventures</span>, we treat code as compiled liquid. We feed rich structural patterns, visual rhythm layouts, and clean mathematical logic into our cognitive accelerators. By directing code architectures rather than grinding them out line-by-line, we ship production-grade, optimized apps at 10x velocity.
              </p>
              <p className="font-mono text-xs text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 p-4 rounded-xl">
                // "THE ARTIST DOES NOT MANUALLY BLEND RAW ENAMEL TO LAY A MOSAIC. THEY ARRANGE THE TESSERAE."
              </p>
            </div>
          </div>
        </section>


        {/* 4. STACK / TOOLS SECTION */}
        <section id="stack" className="space-y-10">
          <div className="space-y-2 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span>04 // SURGICAL_COGNITIVE_TOOLS</span>
            </div>
            <h3 className="text-3xl font-black font-display text-white uppercase tracking-tight">
              Surgical Tool Stack
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed max-w-xl">
              Our weaponized accelerator setup used to draft, sculpt, compile, and edge-deploy codebases within seconds.
            </p>
          </div>

          {/* Bento tool grid with brand SVGs */}
          <StackGrid />
        </section>


        {/* 5. PROCESS PIPELINE SECTION */}
        <section id="process" className="space-y-12">
          <div className="space-y-2 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span>05 // COMPILE_DEPLOY_PIPELINE</span>
            </div>
            <h3 className="text-3xl font-black font-display text-white uppercase tracking-tight">
              Vibe-Coding Pipeline
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed max-w-xl">
              From pure conceptual prompting to a highly responsive, cloud-run ready endpoint within minutes.
            </p>
          </div>

          {/* Stepped layout cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="process-pipeline-grid">
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
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#06060c]/40 border border-white/5 rounded-xl p-5 hover:border-cyan-500/10 transition-all flex flex-col justify-between h-56 glow-cyan"
              >
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-4">
                    <span className="text-violet-500 font-bold">// STEP_{p.step}</span>
                    <span>READY</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-tight mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-2 mt-4">
                  <span className="text-[9px] font-mono text-cyan-400 block truncate">
                    &gt; {p.output}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive telemetry counting stats row */}
          <div className="pt-12">
            <TickingStats />
          </div>
        </section>


        {/* 6. CONTACT / CTA SECTION */}
        <section id="contact" className="space-y-12">
          <div className="space-y-2 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span>06 // AUTHORIZED_SECURE_DISPATCH</span>
            </div>
            <h3 className="text-3xl font-black font-display text-white uppercase tracking-tight">
              Establish Connection
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed max-w-xl">
              Initiate a zero-friction communications handshake. No lengthy forms. Secure end-to-end telemetry dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Quick dispatch terminal form */}
            <form 
              onSubmit={handleContactSubmit}
              className="bg-[#05050b] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl glow-cyan"
            >
              <div className="flex items-center justify-between font-mono text-xs text-cyan-500/60 border-b border-white/5 pb-3">
                <span>COMM_STATION: #EV-HANDSHAKE</span>
                <span>SECURE</span>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase text-gray-500 tracking-widest block">
                  // Input Telemetry Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full h-32 bg-black/60 border border-white/5 rounded-lg p-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 resize-none transition-all"
                  placeholder="Type your message, project parameters, or secure telegram link here..."
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-500">
                  {contactStatus === 'sent' ? 'PACKET_TRANSMITTED' : 'DISPATCH_ORBIT: OFF'}
                </span>

                <button
                  type="submit"
                  disabled={contactStatus === 'shipping' || !contactMessage.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-mono font-bold uppercase rounded-lg shadow-md hover:shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {contactStatus === 'shipping' ? (
                    <>
                      <span>TRANSMITTING...</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </>
                  ) : contactStatus === 'sent' ? (
                    <>
                      <span>LINK DISPATCHED</span>
                      <Check className="w-4.5 h-4.5 text-emerald-400" />
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

            {/* Rogue details box */}
            <div className="bg-[#06060c]/40 border border-white/5 rounded-2xl p-6 space-y-6 font-mono text-xs text-gray-400">
              <div className="space-y-1">
                <span className="text-[9px] text-[#22D3EE] uppercase tracking-widest block">// DIRECT SECURE CHANNELS</span>
                <p className="text-white text-sm font-bold font-sans">kaizersilila@gmail.com</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#7C3AED] uppercase tracking-widest block">// TRANSMISSION_ORBITAL_METADATA</span>
                <p className="font-sans text-[11px] leading-relaxed text-gray-400">
                  All digital packets dispatched through this interface are channeled via peer-to-peer cloud vectors. Secure link verification handles spam filtering in less than 30ms.
                </p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-[9px] text-gray-500 block uppercase">// SECURE_CORE_SYSTEMS:</span>
                <div className="flex flex-wrap gap-2 text-[9px] text-gray-400">
                  <span className="px-2 py-0.5 bg-black/50 border border-white/10 rounded">SSL_LEVEL_3</span>
                  <span className="px-2 py-0.5 bg-black/50 border border-white/10 rounded">IPV6_LINK</span>
                  <span className="px-2 py-0.5 bg-black/50 border border-white/10 rounded">COGNITIVE_ACCELERATED</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* SYSTEM FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-8 bg-black/40 backdrop-blur-md mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-gray-500">
          
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-widest uppercase text-xs">ETERNIVENTURES</span>
            <span>© 2031 // ALL DIRECTIVES SECURED</span>
          </div>

          <div className="flex gap-6">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => addToast('Directive Policy', 'Terms of dispatch link loaded.', 'system')}>Terms of Dispatch</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => addToast('Konami Clue', 'Try typing "vibe" on your physical keyboard inside the mainframe.', 'unlocked')}>Mainframe Override Code</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block"></div>
            <div className="flex items-center gap-1.5 text-white/30 italic">
              <span>// TRANSMISSION ENDS //</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Sleek scroll buffer indicator */}
      <div className="fixed bottom-0 right-0 p-8 flex flex-col items-end pointer-events-none z-40 hidden md:flex">
        <div className="w-48 h-1 bg-white/5 overflow-hidden">
          <div className="h-full bg-cyan-400 w-3/4"></div>
        </div>
        <span className="font-mono text-[9px] text-cyan-400/50 mt-1 tracking-widest">SCROLL_BUFFER_LOADED_75%</span>
      </div>

    </div>
  );
}
