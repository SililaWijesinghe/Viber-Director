const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.03\] border border-white\/\[0\.1\] rounded-2xl p-6 hover:border-cyan-400\/40 hover:bg-white\/\[0\.05\] transition-all flex flex-col justify-between h-64 relative overflow-hidden shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.37\)\]/g, 'liquid-glass rounded-3xl p-6 hover:border-white hover:bg-white/60 transition-all flex flex-col justify-between h-64 relative overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]');
code = code.replace(/bg-black\/60 border border-white\/15 hover:border-cyan-400\/60 hover:bg-white\/\[0\.04\]/g, 'bg-white/40 border border-white/50 hover:border-white hover:bg-white/60 backdrop-blur-md shadow-sm');
fs.writeFileSync('src/App.tsx', code);

console.log('App.tsx cleaned');
