const fs = require('fs');

function processFile(path) {
  let code = fs.readFileSync(path, 'utf8');

  code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.03\] border border-white\/\[0\.1\]/g, 'liquid-glass-dark');
  code = code.replace(/bg-\[#06060f\]\/90 backdrop-blur-2xl border border-white\/15/g, 'liquid-glass-dark');
  code = code.replace(/backdrop-blur-2xl bg-black\/70 border border-white\/15/g, 'liquid-glass-dark');
  code = code.replace(/bg-\[#080812\]\/90 backdrop-blur-2xl border border-white\/15/g, 'liquid-glass-dark');
  code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.02\] border-y border-white\/\[0\.08\]/g, 'liquid-glass-dark !border-x-0 !border-y');
  code = code.replace(/bg-\[#040409\]\/85 backdrop-blur-2xl border-b border-white\/\[0\.08\]/g, 'liquid-glass-dark !border-x-0 !border-t-0 !border-b !rounded-none');
  code = code.replace(/bg-black\/50 backdrop-blur-2xl/g, 'liquid-glass-dark !border-x-0 !border-b-0 !border-t !rounded-none');
  code = code.replace(/rounded-2xl/g, 'rounded-3xl'); // Rounder corners for modern glass
  code = code.replace(/shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.37\)\]/g, ''); // the liquid-glass-dark has its own shadow
  code = code.replace(/shadow-\[0_4px_24px_0_rgba\(0,0,0,0\.25\)\]/g, '');
  code = code.replace(/shadow-2xl/g, '');

  fs.writeFileSync(path, code);
}

const files = [
  'src/App.tsx',
  'src/components/TickingStats.tsx',
  'src/components/MobileBottomDock.tsx',
  'src/components/SocialProofMarquee.tsx',
  'src/components/StackGrid.tsx',
  'src/components/HudToastContainer.tsx'
];

files.forEach(processFile);
console.log('Replaced successfully');
