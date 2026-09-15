const fs = require('fs');

let code = fs.readFileSync('src/components/StackGrid.tsx', 'utf8');

code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-cyan-400/g, 'text-blue-600');
code = code.replace(/bg-black\/40 border border-white\/5 group-hover:border-white\/10/g, 'bg-white/40 border border-white/50 group-hover:border-white shadow-sm');
code = code.replace(/bg-black\/40/g, 'bg-white/40');
code = code.replace(/via-cyan-400/g, 'via-blue-400');

fs.writeFileSync('src/components/StackGrid.tsx', code);
console.log('StackGrid fixed');
