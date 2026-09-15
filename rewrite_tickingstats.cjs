const fs = require('fs');
let code = fs.readFileSync('src/components/TickingStats.tsx', 'utf8');

code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.03\] border border-white\/\[0\.1\] rounded-2xl p-6 hover:border-cyan-400\/40 hover:bg-white\/\[0\.05\] transition-all group overflow-hidden relative flex flex-col justify-between h-36 shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.37\)\]/g, 'liquid-glass rounded-3xl p-6 hover:border-white hover:bg-white/60 transition-all group overflow-hidden relative flex flex-col justify-between h-36 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]');
code = code.replace(/text-cyan-400\/70/g, 'text-blue-600/70');
code = code.replace(/text-cyan-400\/80/g, 'text-blue-600/80');
code = code.replace(/text-cyan-400/g, 'text-blue-600');
code = code.replace(/border-cyan-400\/50/g, 'border-blue-500/50');
code = code.replace(/bg-cyan-400 animate-ping/g, 'bg-blue-400 animate-ping');
code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-gray-400/g, 'text-slate-500');
code = code.replace(/text-gray-300/g, 'text-slate-700');
code = code.replace(/text-violet-400/g, 'text-purple-600');
code = code.replace(/drop-shadow-\[0_0_12px_rgba\(255,255,255,0\.2\)\]/g, 'drop-shadow-sm');
code = code.replace(/border-white\/5/g, 'border-white/30');

fs.writeFileSync('src/components/TickingStats.tsx', code);
console.log('TickingStats fixed');
