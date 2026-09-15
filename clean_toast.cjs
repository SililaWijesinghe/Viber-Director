const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove HudToastContainer import
code = code.replace(/import HudToastContainer from '\.\/components\/HudToastContainer';\n?/g, '');

// 2. Remove HudToast type import
code = code.replace(/,? ?HudToast/g, '');

// 3. Remove toasts state (find exact block)
code = code.replace(/  const \[toasts, setToasts\] = useState<HudToast\[\]>\(\[\]\);\n/g, '');

// 4. Remove addToast function definition
code = code.replace(/  \/\/ Trigger HUD toasts\n  const addToast = \([\s\S]*?  \};/g, '');

// 5. Remove addToast usage in handleBootComplete
code = code.replace(/    setTimeout\(\(\) => \{\n      addToast\([\s\S]*?\);\n    \}, 800\);/g, '');

// 6. Remove addToast usage in handleUnlockSection
code = code.replace(/    if \(sectionId === 'deep-diver'\) \{\n      addToast\([\s\S]*?\);\n    \} else \{\n      addToast\([\s\S]*?\);\n    \}/g, '');

// 7. Remove addToast usage in handleTestSynthesis
code = code.replace(/    addToast\('Directive Broadcasted', 'Synthesizing layout directives into virtual DOM buffer\.', 'system'\);/g, '');
code = code.replace(/      addToast\('Synthesis Complete', 'Virtual container compiled at 60 FPS\.', 'unlocked'\);/g, '');

// 8. Remove addToast usage in handleContactSubmit
code = code.replace(/      addToast\([\s\S]*?\);\n/g, function(match) {
  if(match.includes('Direct Link Dispatched')) return '';
  return match;
});

// 9. Remove onClick handlers that just addToast
code = code.replace(/onClick=\{\(\) => addToast\('Signal Transmitted', 'Navigating coordinates to contact portal\.', 'system'\)\}/g, '');
code = code.replace(/onClick=\{\(\) => addToast\('Routing Sequence', 'Initiating coordinate translation to showcase\.', 'system'\)\}/g, '');

// 10. Replace onUnlockAchievement
code = code.replace(/onUnlockAchievement=\{\(title, desc\) => addToast\(title, desc, 'achievement'\)\}/g, '');

// 11. Remove multi-line calls that we missed
code = code.replace(/addToast\([\s\S]*?\);/g, function(match) {
    if (match.includes("Sector Vectoring") || 
        match.includes("Filter Re-indexed") ||
        match.includes("Manifest Restructured") ||
        match.includes("Directive Policy") ||
        match.includes("Konami Clue") ||
        match.includes("Direct Link Dispatched")) {
        return '';
    }
    return match;
});

// 12. Remove the actual container
code = code.replace(/      <HudToastContainer toasts=\{toasts\} onRemove=\{\(id\) => setToasts\(prev => prev.filter\(t => t.id !== id\)\)\} \/>\n/g, '');

// Some cleanup for onClick that had empty bodies if they were just addToast
code = code.replace(/onClick=\{\(\) => \}/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx cleaned safely');
