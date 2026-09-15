const fs = require('fs');

let code = fs.readFileSync('src/components/SocialProofMarquee.tsx', 'utf8');

code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.02\] border-y border-white\/\[0\.08\] rounded-2xl shadow-\[0_4px_24px_0_rgba\(0,0,0,0\.25\)\]/g, 'liquid-glass border-y border-white/50 rounded-2xl shadow-sm');
code = code.replace(/from-\[#05050a\]/g, 'from-slate-50');
code = code.replace(/text-gray-400 hover:text-cyan-400/g, 'text-slate-500 hover:text-blue-600');
code = code.replace(/bg-cyan-400\/40/g, 'bg-blue-600/40');
code = code.replace(/backdrop-blur-xl bg-white\/\[0\.03\] border border-white\/10 hover:border-cyan-400\/30 hover:bg-white\/\[0\.05\] shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.2\)\]/g, 'liquid-glass hover:border-white hover:bg-white/60 shadow-sm border-white/50');
code = code.replace(/text-cyan-400/g, 'text-blue-600');
code = code.replace(/text-gray-300/g, 'text-slate-700');
code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-gray-400/g, 'text-slate-500');

fs.writeFileSync('src/components/SocialProofMarquee.tsx', code);
console.log('SocialProofMarquee fixed');
