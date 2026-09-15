const fs = require('fs');

let code = fs.readFileSync('src/components/VortexDemoSecond.tsx', 'utf8');

// Change the background color and hue
code = code.replace(/backgroundColor="black"/g, 'backgroundColor="transparent"');
code = code.replace(/baseHue=\{120\}/g, 'baseHue=\{200\}');

// Remove the text from the demo so it works purely as a background, as requested "very body background"
// Wait, if they wanted the text, it would be weird. I will just keep it but push it down? 
// No, a background component shouldn't have text blocking the main app. Let's remove the children.
code = code.replace(/<h2[\s\S]*?<\/div>/, '{/* Background Vortex purely for aesthetics */}');

fs.writeFileSync('src/components/VortexDemoSecond.tsx', code);
