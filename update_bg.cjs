const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the background divs and ParticleField
code = code.replace(/      <div className="fixed inset-0 pointer-events-none opacity-20 bg-sleek-grid" \/>\n/g, '');
code = code.replace(/      <div className="fixed inset-0 pointer-events-none opacity-5 bg-sleek-scanlines" \/>\n/g, '');
code = code.replace(/      <ParticleField \/>\n/g, '      <VortexDemoSecond />\n');

// Also remove AnimatedRays
code = code.replace(/import AnimatedRays from '\.\/components\/AnimatedRays';\n/g, '');
code = code.replace(/[ \t]*<AnimatedRays className="absolute inset-0 -z-10 pointer-events-none opacity-85" \/>\n/g, '');

fs.writeFileSync('src/App.tsx', code);
