const fs = require('fs');

let code = fs.readFileSync('src/components/DeviceMockup.tsx', 'utf8');

// Replace dark colors with light ones or liquid glass
code = code.replace(/bg-black\/40/g, 'bg-white/40');
code = code.replace(/border-white\/10/g, 'border-white/50');
code = code.replace(/bg-\[#0b0b14\]\/90/g, 'bg-white/60');
code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-gray-400/g, 'text-slate-500');
code = code.replace(/hover:text-white/g, 'hover:text-slate-900');
code = code.replace(/hover:bg-white\/5/g, 'hover:bg-white/40');
code = code.replace(/bg-\[#030307\]\/90/g, 'bg-slate-100/90');
code = code.replace(/shadow-\[inset_0_0_40px_rgba\(0,0,0,0\.8\)\]/g, 'shadow-inner');
code = code.replace(/bg-\[#08080f\]\/98/g, 'bg-white/95');
code = code.replace(/bg-black\/70/g, 'bg-slate-200/70');
code = code.replace(/text-gray-300/g, 'text-slate-700');
code = code.replace(/bg-\[#040408\]/g, 'bg-slate-50');
code = code.replace(/bg-\[#040408\]\/90/g, 'bg-slate-50/90');
code = code.replace(/bg-white\/5/g, 'bg-slate-200/50');
code = code.replace(/text-gray-500/g, 'text-slate-400');
code = code.replace(/bg-\[#0e0e1a\]/g, 'bg-white');
code = code.replace(/text-cyan-400/g, 'text-blue-600');
code = code.replace(/text-cyan-200/g, 'text-blue-500');
code = code.replace(/border-cyan-500\/30/g, 'border-blue-400/30');
code = code.replace(/hover:border-cyan-400/g, 'hover:border-blue-500');
code = code.replace(/bg-\[#06060c\]/g, 'bg-white');
code = code.replace(/bg-black/g, 'bg-slate-200');
code = code.replace(/bg-neutral-900/g, 'bg-slate-300');
code = code.replace(/bg-neutral-800/g, 'bg-slate-400');
code = code.replace(/bg-neutral-700/g, 'bg-slate-500');
code = code.replace(/bg-cyan-950\/30/g, 'bg-blue-100/30');

fs.writeFileSync('src/components/DeviceMockup.tsx', code);
console.log('DeviceMockup fixed');
