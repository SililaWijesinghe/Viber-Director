const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove HudToastContainer import
code = code.replace(/import HudToastContainer from '\.\/components\/HudToastContainer';\n/g, '');

// 2. Remove HudToast type import
code = code.replace(/HudToast,? ?/g, '');

// 3. Remove toasts state
code = code.replace(/  const \[toasts, setToasts\] = useState<\[\]>\(\[\]\);\n/g, '');
code = code.replace(/  const \[toasts, setToasts\] = useState<any\[\]>\(\[\]\);\n/g, '');
// Since we removed HudToast from types, it might just say useState<[]>([]); Let's be generic:
code = code.replace(/[ \t]*const \[toasts, setToasts\] = useState<[^>]*>\(\[\]\);\n/g, '');

// 4. Remove addToast function definition completely (it's between voiceEnabled and updateClock)
code = code.replace(/[ \t]*\/\/ Trigger HUD toasts\n[ \t]*const addToast = [\s\S]*?  \/\/ Setup live clock in header/g, '  // Setup live clock in header');

// 5. Remove addToast usages (multi-line)
code = code.replace(/[ \t]*addToast\([\s\S]*?\);/g, '');

// 6. Replace inline arrow function usages
code = code.replace(/onClick=\{\(\) => addToast\([^)]+\)\}/g, 'onClick={() => {}}');
code = code.replace(/onUnlockAchievement=\{\(title, desc\) => addToast\([^)]+\)\}/g, 'onUnlockAchievement={() => {}}');

// 7. Remove onClick={...} that just have addToast, or wrap them if they have multiple lines
// In MobileBottomDock onNavigate:
code = code.replace(/addToast\([^;]+;/g, '');

// 8. Remove the HudToastContainer component rendering
code = code.replace(/[ \t]*<HudToastContainer toasts=\{toasts\} onRemove=\{\(id\) => setToasts\(prev => prev\.filter\(t => t\.id !== id\)\)\} \/>\n/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Toasts removed');
