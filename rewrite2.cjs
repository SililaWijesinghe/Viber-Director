const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace dark theme project cards
code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.03\] border border-white\/\[0\.1\] rounded-2xl p-7 lg:p-8 group hover:border-cyan-400\/50 hover:bg-white\/\[0\.05\] transition-all flex flex-col justify-between space-y-6 relative overflow-hidden shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.37\)\]/g, 'liquid-glass rounded-3xl p-7 lg:p-8 group hover:border-white hover:bg-white/60 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]');

// Replace project expand bg
code = code.replace(/bg-black\/80 border border-white\/10 rounded-xl p-5 mt-3 space-y-4 text-xs font-mono shadow-2xl/g, 'bg-white/40 border border-white/50 backdrop-blur-md rounded-xl p-5 mt-3 space-y-4 text-xs font-mono shadow-inner');

code = code.replace(/text-cyan-300/g, 'text-blue-600');
code = code.replace(/bg-white\/\[0\.03\] border border-white\/10/g, 'bg-white/50 border border-white/60');
code = code.replace(/text-slate-900 font-display/g, 'text-slate-900 font-display');

// Check other dark classes
code = code.replace(/bg-\[#040409\]\/85/g, 'liquid-glass');
code = code.replace(/bg-\[#05050a\]/g, 'bg-slate-50');

// Replace green pulse to blue for light theme
code = code.replace(/bg-emerald-950\/40 border-emerald-500\/20/g, 'bg-green-100 border-green-300');
code = code.replace(/text-green-600 font-semibold tracking-wider/g, 'text-green-700 font-semibold tracking-wider');

fs.writeFileSync('src/App.tsx', code);
console.log('Done 2!');
