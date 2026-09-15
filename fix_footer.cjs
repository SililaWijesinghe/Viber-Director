const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const brokenRegex = /          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-\[10px\] sm:text-\[11px\]">\s*<span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick=\{\(\) =>\s*\}\}\s*\/>/m;

const fixedStr = `          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px]">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Dispatch</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Mainframe Override</span>
          </div>
        </div>
      </footer>

      <MobileBottomDock 
        onNavigate={(id, label) => {
          handleSectionChange(id);
        }}
      />`;

code = code.replace(brokenRegex, fixedStr);
fs.writeFileSync('src/App.tsx', code);
console.log('Footer fixed');
