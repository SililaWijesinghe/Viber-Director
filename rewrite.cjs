const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove imports of terminal/cli/effects
code = code.replace(/import BootSequence from '\.\/components\/BootSequence';\n/g, '');
code = code.replace(/import ParticleField from '\.\/components\/ParticleField';\n/g, '');
code = code.replace(/import EasterEggTerminal from '\.\/components\/EasterEggTerminal';\n/g, '');
code = code.replace(/import HudToastContainer from '\.\/components\/HudToastContainer';\n/g, '');
code = code.replace(/import CustomCursor from '\.\/components\/CustomCursor';\n/g, '');
code = code.replace(/import ProgressRail from '\.\/components\/ProgressRail';\n/g, '');
code = code.replace(/import AnimatedRays from '\.\/components\/AnimatedRays';\n/g, '');
code = code.replace(/import \{ WebGLShader \} from '\.\/components\/ui\/web-gl-shader';\n/g, '');
code = code.replace(/import TubesCursor from '\.\/components\/ui\/tubes-cursor';\n/g, '');

// 2. Remove states and functions related to terminal
code = code.replace(/const \[isBooted, setIsBooted\] = useState\(false\);\n/g, '');
code = code.replace(/const \[toasts, setToasts\] = useState<HudToast\[\]>\(\[\]\);\n/g, '');
code = code.replace(/const \[isTerminalOpen, setIsTerminalOpen\] = useState\(false\);\n/g, '');
// Simulators
code = code.replace(/const \[simulatedPrompt, setSimulatedPrompt\] = useState[^\n]+\n/g, '');
code = code.replace(/const \[isSimulating, setIsSimulating\] = useState[^\n]+\n/g, '');
code = code.replace(/const \[simulatedTokens, setSimulatedTokens\] = useState<string\[\]>\([\s\S]*?\]\);\n/g, '');

// 3. Remove addToast function and others
code = code.replace(/\/\/ Trigger HUD toasts[\s\S]*?}, 4500\);\n  };\n/g, '');
code = code.replace(/\/\/ Set initial login toast[\s\S]*?}, 800\);\n  };\n/g, '');
code = code.replace(/\/\/ Rail scroll achievement triggers[\s\S]*?};\n/g, '');
code = code.replace(/const handleTestSynthesis = \(\) => \{[\s\S]*?}, 1200\);\n  };\n/g, '');

// Replace toast calls inside other functions
code = code.replace(/addToast\([^)]+\);/g, '');

// 4. Remove component usages
code = code.replace(/if \(!isBooted\) \{[\s\S]*?return <BootSequence onComplete=\{handleBootComplete\} \/>;\n  \}\n/g, '');

// Remove cyber backgrounds & inputs
code = code.replace(/\{\/\* Immersive cyber backgrounds & inputs \*\/\}[\s\S]*?<CustomCursor \/>/g, '');

code = code.replace(/<ProgressRail[\s\S]*?\/>/g, '');
code = code.replace(/<EasterEggTerminal[\s\S]*?\/>/g, '');
code = code.replace(/<HudToastContainer[\s\S]*?\/>/g, '');
code = code.replace(/<AnimatedRays[\s\S]*?\/>/g, '');

// 5. Change styles
// Main div
code = code.replace(/bg-\[#05050a\] text-\[#f5f5f5\] selection:bg-cyan-500\/30 selection:text-white/g, 'bg-slate-50 text-slate-900 selection:bg-blue-500/30 selection:text-slate-900');

// Header
code = code.replace(/bg-\[#040409\]\/85/g, 'bg-white/70');
code = code.replace(/border-white\/\[0\.08\]/g, 'border-white/50');
code = code.replace(/bg-gradient-to-r from-transparent via-cyan-400\/30 to-transparent/g, 'bg-gradient-to-r from-transparent via-white/50 to-transparent');

// Logo
code = code.replace(/text-cyan-400 font-semibold uppercase">\s*SYSTEM_OPERATOR\s*<\/span>/g, 'text-blue-500 font-semibold uppercase">PORTFOLIO</span>');
code = code.replace(/text-white uppercase/g, 'text-slate-900 uppercase');
code = code.replace(/<span className="text-violet-500 animate-pulse">_<\/span>/g, '');
code = code.replace(/bg-emerald-400/g, 'bg-blue-400');

// Action cluster (Terminal and Node Live)
code = code.replace(/\{\/\* Telemetry pill \(Desktop\) \*\/\}[\s\S]*?<\/div>\n            <\/div>\n/g, '');
code = code.replace(/\{\/\* Terminal launcher shortcut button \*\/\}[\s\S]*?<\/button>\n/g, '');

// Direct link button
code = code.replace(/bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white/g, 'bg-blue-600 hover:bg-blue-700 text-white');

// Section styles
code = code.replace(/backdrop-blur-2xl bg-white\/\[0\.03\] border border-white\/\[0\.1\] shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.37\)\]/g, 'liquid-glass rounded-2xl sm:rounded-3xl');
code = code.replace(/backdrop-blur-2xl bg-black\/70 border border-white\/15/g, 'liquid-glass-card border border-white/40');
code = code.replace(/bg-black\/50 border border-white\/10/g, 'bg-white/40 border border-white/50 backdrop-blur-md');
code = code.replace(/bg-white\/\[0\.04\] border border-white\/10/g, 'bg-white/50 border border-white/60');
code = code.replace(/bg-\[#0a0a14\] border-white\/10 text-gray-400/g, 'bg-white/50 border-white/60 text-slate-500');

// Typography
code = code.replace(/text-white/g, 'text-slate-900');
code = code.replace(/text-gray-400/g, 'text-slate-500');
code = code.replace(/text-gray-300/g, 'text-slate-600');
code = code.replace(/text-cyan-400/g, 'text-blue-600');
code = code.replace(/text-violet-400/g, 'text-purple-600');
code = code.replace(/text-emerald-400/g, 'text-green-600');

// Hero section text
code = code.replace(/\[ INTERFACE_BOOT_OK \]/g, 'MODERN WEB CRAFT');
code = code.replace(/DIRECTING_PURE_INTENT/g, 'LIQUID GLASS AESTHETIC');
code = code.replace(/I don’t write code\.<br \/>\s*<span[^>]*>\s*I direct it\.\s*<\/span>/g, 'Building elegant<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">digital experiences.</span>');
code = code.replace(/\/\/ Bypassing obsolete manual syntax bottlenecks to orchestrate, compile, and deploy pure autonomous intent at terminal speed\./g, 'Crafting seamless, modern web applications with a focus on intuitive design, fluid animations, and high performance.');
code = code.replace(/EXPLORE SHOWCASE \/\/ 02/g, 'EXPLORE SHOWCASE');
code = code.replace(/\{\/\* Secondary interactive CLI button \*\/\}[\s\S]*?<\/button>/g, '');

// Remove the interactive right column in Hero (Telemetry Hub)
code = code.replace(/\{\/\* Right Column \(5 cols on desktop\) - Interactive Holographic Telemetry Hub \*\/\}[\s\S]*?\{\/\* Ticking telemetry bottom HUD strip \*\/\}/g, '');
code = code.replace(/lg:col-span-7/g, 'lg:col-span-12 max-w-3xl'); // make the left column take full width or center it

// Process Pipeline section terminal text
code = code.replace(/04 \/\/ EXECUTION_PIPELINE/g, '04 // OUR PROCESS');

// Manifesto section
code = code.replace(/03 \/\/ CORE_DIRECTIVES/g, '03 // OUR MANIFESTO');
code = code.replace(/\[\/\/ Bypassing the mundane to engineer the profound\. \]/g, 'Building the future of web experiences.');

// Footer text
code = code.replace(/SYSTEMS_NOMINAL \/\/ ETERNIVENTURES \/\/ EOF/g, 'ETERNIVENTURES © 2026');

fs.writeFileSync('src/App.tsx', code);
console.log('Done!');
