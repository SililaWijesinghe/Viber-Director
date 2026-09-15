const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/bg-black\/60 border border-white\/15 hover:border-cyan-400\/60 hover:bg-white\/\[0\.04\]/g, 'bg-white/40 border border-white/50 hover:border-white hover:bg-white/60 shadow-sm');
code = code.replace(/bg-black\/40/g, 'bg-white/60');
code = code.replace(/backdrop-blur-xl bg-black\/70 border border-white\/10 rounded-2xl/g, 'liquid-glass rounded-3xl');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx cleaned 3');
