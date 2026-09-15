const fs = require('fs');

let code = fs.readFileSync('src/components/DeviceMockup.tsx', 'utf8');

// Add mobileOnly to props
code = code.replace(/interface DeviceMockupProps \{/, 'interface DeviceMockupProps {\n  mobileOnly?: boolean;');
code = code.replace(/export default function DeviceMockup\(\{ url, name, accentColor = '#22D3EE' \}: DeviceMockupProps\) \{/, 'export default function DeviceMockup({ url, name, accentColor = \'#22D3EE\', mobileOnly }: DeviceMockupProps) {');

// Default activeTab based on mobileOnly
code = code.replace(/const \[activeTab, setActiveTab\] = useState\<'both' \| 'desktop' \| 'mobile'\>\('both'\);/, 'const [activeTab, setActiveTab] = useState<\'both\' | \'desktop\' | \'mobile\'>(mobileOnly ? \'mobile\' : \'both\');');

// Hide tabs if mobileOnly
code = code.replace(/<div className="flex bg-black\/40 p-1 rounded-lg border border-white\/10">/, '{!mobileOnly && (\n          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">');
code = code.replace(/<\/button>\n          <\/div>/, '</button>\n          </div>\n        )}');

fs.writeFileSync('src/components/DeviceMockup.tsx', code);
console.log('patched');
