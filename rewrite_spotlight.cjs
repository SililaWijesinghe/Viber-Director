const fs = require('fs');

let code = fs.readFileSync('src/components/SpotlightNavbar.tsx', 'utf8');

code = code.replace(/border border-cyan-500\/20 bg-\[#06060f\]\/80 backdrop-blur-xl shadow-lg shadow-cyan-950\/40/g, 'liquid-glass border-white/50 bg-white/40 shadow-sm rounded-full');
code = code.replace(/rgba\(34, 211, 238, 0\.25\)/g, 'rgba(255, 255, 255, 0.4)');
code = code.replace(/rgba\(34, 211, 238, 0\.95\)/g, 'rgba(59, 130, 246, 0.9)');
code = code.replace(/rgba\(124, 58, 237, 0\.12\)/g, 'rgba(255, 255, 255, 0.2)');
code = code.replace(/rgba\(124, 58, 237, 0\.8\)/g, 'rgba(59, 130, 246, 0.5)');
code = code.replace(/text-cyan-300/g, 'text-blue-600');
code = code.replace(/drop-shadow-\[0_0_8px_rgba\(34,211,238,0\.6\)\]/g, 'drop-shadow-sm');
code = code.replace(/text-gray-400 hover:text-white/g, 'text-slate-500 hover:text-slate-900');
code = code.replace(/ring-cyan-400/g, 'ring-blue-400');
code = code.replace(/rgba\(34,211,238/g, 'rgba(59,130,246');

fs.writeFileSync('src/components/SpotlightNavbar.tsx', code);
console.log('SpotlightNavbar fixed');
