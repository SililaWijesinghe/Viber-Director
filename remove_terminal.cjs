const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove import
code = code.replace(/import EasterEggTerminal from '\.\/components\/EasterEggTerminal';\n?/g, '');

// 2. Remove state
code = code.replace(/  const \[isTerminalOpen, setIsTerminalOpen\] = useState\(false\);\n/g, '');

// 3. Remove EasterEggTerminal component instantiation
code = code.replace(/[ \t]*\{\/\* Secrets Mainframe shell launcher \*\/\}\n[ \t]*<EasterEggTerminal[\s\S]*?\/>\n/g, '');

// 4. Remove button 1 (header)
code = code.replace(/[ \t]*\{\/\* Terminal launcher shortcut button \*\/\}\n[ \t]*<button\n[ \t]*onClick=\{\(\) => setIsTerminalOpen\(true\)\}\n[ \t]*className="[^"]*"\n[ \t]*title="Launch Mainframe Terminal"\n[ \t]*>\n[ \t]*<TerminalIcon className="[^"]*" \/>\n[ \t]*<span className="[^"]*">TERMINAL<\/span>\n[ \t]*<\/button>\n/g, '');

// 5. Remove button 2 (hero)
code = code.replace(/[ \t]*<button\n[ \t]*onClick=\{\(\) => setIsTerminalOpen\(true\)\}\n[ \t]*className="[^"]*"\n[ \t]*>\n[ \t]*<TerminalIcon className="[^"]*" \/>\n[ \t]*<span>LAUNCH DIRECT_CLI<\/span>\n[ \t]*<\/button>\n/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Terminal removed');
