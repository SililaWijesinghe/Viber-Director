import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Check, ShieldAlert } from 'lucide-react';

interface EasterEggTerminalProps {
  onUnlockAchievement: (title: string, desc: string) => void;
}

export default function EasterEggTerminal({ onUnlockAchievement }: EasterEggTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([
    'ETERNIVENTURES QUANTUM COMMAND LINE // ACTIVE',
    'TYPE "help" FOR A LIST OF AVAILABLE SYSTEM ROUTINES',
    ''
  ]);
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  // Listen for Konami and "vibe" code
  useEffect(() => {
    let typedPhrase = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Konami Tracker
      const nextKey = e.key;
      const expectedKey = konamiCode[konamiProgress.length];

      if (nextKey === expectedKey) {
        const nextProgress = [...konamiProgress, nextKey];
        setKonamiProgress(nextProgress);
        
        if (nextProgress.length === konamiCode.length) {
          setIsOpen(true);
          setKonamiProgress([]);
          onUnlockAchievement('System Hacker', 'You unlocked the secret AI mainframe using the Konami Code!');
          setHistory(prev => [...prev, '>> MAIN_SYSTEM_CORE_OVERRIDE_ENABLED: OK', '']);
        }
      } else {
        // Reset progress on miss, but check if the key is the first of the code
        setKonamiProgress(nextKey === konamiCode[0] ? [nextKey] : []);
      }

      // 2. "vibe" keyword tracker
      if (e.key.length === 1) {
        typedPhrase = (typedPhrase + e.key).slice(-4);
        if (typedPhrase === 'vibe') {
          setIsOpen(true);
          onUnlockAchievement('Vibe Synchronizer', 'You activated the rogue console using the "vibe" override!');
          setHistory(prev => [...prev, '>> KEYWORD_OVERRIDE: "vibe" DETECTED', '']);
          typedPhrase = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newHistory = [...history, `guest@eterniventures:~$ ${cmdStr}`];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    let response: string[] = [];

    switch (trimmed) {
      case 'help':
        response = [
          'AVAILABLE SYSTEM COMMANDS:',
          '  help      - Display commands directory',
          '  projects  - Query shipped AI-assisted websites',
          '  stats     - Print telemetry counter state',
          '  ship      - Run high-speed mock build compiler',
          '  matrix    - Activate/deactivate digital matrix code rain',
          '  clear     - Wipe terminal output log',
          '  exit      - De-authorize console shell'
        ];
        break;
      case 'projects':
        response = [
          'SHIPPED SITES CATALOG (7 ACTIVE NODES):',
          '  [01] The Pretty Boo     - https://theprettyboo.lovable.app',
          '  [02] Silila Designer    - https://sililathedesigner.lovable.app',
          '  [03] Premier Digital    - https://premier-digital.lovable.app',
          '  [04] Cloud Books        - https://cloud-books-app.vercel.app',
          '  [05] BL Models          - https://bl-models-pvt-ltd.vercel.app',
          '  [06] Nimora Fashion     - https://nimorafashion.lovable.app',
          '  [07] RM Fit Connect     - https://rmfitconnect.lovable.app'
        ];
        break;
      case 'stats':
        response = [
          'TELEMETRY DATA STREAM:',
          '  VIBE HOURS LOGGED    : 1,420 HOURS',
          '  PRODUCTS SHIPPED     : 37 LIVE APPLICATIONS',
          '  COMPILATION ACCURACY : 99.85%',
          '  VIRTUAL COFFEE FLUID : 12.4K LITERS',
          '  AI ENGINE PARTNER    : CLAUDE-SONNET-V3.5 / LOVABLE-CORE'
        ];
        break;
      case 'ship':
        response = [
          'INITIATING HIGH-SPEED SHIPMENT PROCESS...',
          '  [x] Parsing prompt: "Deploy cutting edge luxury tech platform"',
          '  [x] Synthesizing component graphs...',
          '  [x] Running static types checkers: OK',
          '  [x] Shuffling layout containers...',
          '  [!] COMPILATION SUCCESSFUL IN 184ms.',
          '  [>] DEPLOYING TO GLOBAL EDGE ORBIT... ACTIVE!',
          '  [>] ENDPOINT: https://quantum-vibe-prototype.lovable.app'
        ];
        onUnlockAchievement('Master Shipper', 'You compiled and shipped an autonomous application in 184ms!');
        break;
      case 'matrix':
        setMatrixActive(!matrixActive);
        response = [
          matrixActive 
            ? '>> MATRIX SCREEN RENDER: DEACTIVATED' 
            : '>> MATRIX SCREEN RENDER: ACTIVATED. (ENJOY THE DIGITAL CASCADE)'
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        setIsOpen(false);
        setInputVal('');
        return;
      default:
        response = [
          `COMMAND NOT FOUND: "${cmdStr}".`,
          'Type "help" to list valid system directives.'
        ];
    }

    setHistory([...newHistory, ...response, '']);
    setInputVal('');
  };

  if (!isOpen) {
    // Hidden prompt floating hint
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => {
            setIsOpen(true);
            onUnlockAchievement('Console Initiated', 'You opened the rogue developer console.');
          }}
          className="p-2.5 bg-black/80 border border-white/5 rounded-full text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-md flex items-center justify-center cursor-pointer group hover:glow-cyan"
          title="Open AI Core Console"
        >
          <TerminalIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="w-0 overflow-hidden group-hover:w-20 group-hover:ml-2 text-[10px] font-mono transition-all duration-300 uppercase whitespace-nowrap">
            Launch CLI
          </span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md crt-effect">
        
        {/* Matrix background inside terminal overlay if active */}
        {matrixActive && <MatrixRain />}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-[#030307]/95 border border-cyan-500/20 rounded-xl overflow-hidden shadow-2xl shadow-cyan-950/40 relative flex flex-col h-[480px]"
          style={{
            boxShadow: '0 20px 50px -15px rgba(0,0,0,0.9), 0 0 30px rgba(34, 211, 238, 0.05)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400">
              <TerminalIcon className="w-4 h-4 animate-pulse" />
              <span>TERMINAL CORE // ETERNI-CLI v9.22</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500">// ESC TO DISCONNECT</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Screen logs */}
          <div className="flex-grow p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-cyan-400 select-text scrollbar-thin">
            {history.map((line, idx) => {
              if (line.startsWith('guest@eterniventures')) {
                return (
                  <div key={idx} className="text-white font-medium flex items-center gap-1.5">
                    <span className="text-violet-400">guest@eterniventures</span>
                    <span className="text-gray-500">:~$</span>
                    <span>{line.split(':~$')[1]}</span>
                  </div>
                );
              }
              if (line.startsWith('>>') || line.includes('SUCCESS') || line.includes('ACTIVE')) {
                return (
                  <div key={idx} className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 inline" />
                    <span>{line}</span>
                  </div>
                );
              }
              if (line.includes('NOT FOUND') || line.includes('ALERT')) {
                return (
                  <div key={idx} className="text-rose-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 inline" />
                    <span>{line}</span>
                  </div>
                );
              }
              return <div key={idx} className="text-cyan-400/80 leading-relaxed">{line}</div>;
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Form Command input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center border-t border-white/10 bg-black/60 px-4 py-3"
          >
            <span className="font-mono text-xs text-violet-400 mr-2">guest@eterniventures</span>
            <span className="font-mono text-xs text-gray-500 mr-2">:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-grow bg-transparent focus:outline-none font-mono text-xs text-white"
              placeholder="Query terminal command (try 'help', 'projects', 'ship', 'matrix')..."
              autoFocus
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Matrix falling rain simulation component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+=?';
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#22D3EE'; // neon cyan rain
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
    />
  );
}
