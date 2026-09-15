const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add the background lines back right after VortexDemoSecond
code = code.replace(
  /<VortexDemoSecond \/>/g, 
  `<VortexDemoSecond />\n      <div className="fixed inset-0 pointer-events-none opacity-20 bg-sleek-grid z-[-40]" />\n      <div className="fixed inset-0 pointer-events-none opacity-5 bg-sleek-scanlines z-[-40]" />`
);

// Also re-add AnimatedRays import and usage
if (!code.includes('AnimatedRays')) {
  code = code.replace(
    /import { VortexDemoSecond } from "\.\/components\/VortexDemoSecond";/,
    `import { VortexDemoSecond } from "./components/VortexDemoSecond";\nimport AnimatedRays from './components/AnimatedRays';`
  );
  
  // Find <section id="hero" and add AnimatedRays inside it
  code = code.replace(
    /<section id="hero"([^>]*)>/g,
    `<section id="hero"$1>\n          <AnimatedRays className="absolute inset-0 -z-10 pointer-events-none opacity-85" />`
  );
}

// Make the root bg transparent so Vortex can be seen properly if it was hiding
code = code.replace(/bg-\[#05050a\]/, 'bg-transparent');

fs.writeFileSync('src/App.tsx', code);
