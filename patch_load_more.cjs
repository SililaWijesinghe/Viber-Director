const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state for visibleCount
code = code.replace(/  const \[activeCategory, setActiveCategory\] = useState<'All' \| 'Web App' \| 'SaaS' \| 'E-commerce'\>\('All'\);\n/, 
  "  const [activeCategory, setActiveCategory] = useState<'All' | 'Web App' | 'SaaS' | 'E-commerce'>('All');\n  const [visibleCount, setVisibleCount] = useState(4);\n");

// 2. Reverse PROJECTS order when calculating filteredProjects
code = code.replace(/  const filteredProjects = PROJECTS\.filter\(p => \{/g, "  const filteredProjects = [...PROJECTS].reverse().filter(p => {");

// 3. Reset visibleCount when activeCategory changes
// In the category button onClick:
code = code.replace(/onClick=\{\(\) => setActiveCategory\(cat\)\}/g, "onClick={() => { setActiveCategory(cat); setVisibleCount(4); }}");

// 4. Slice filteredProjects in the render
code = code.replace(/\{filteredProjects\.map\(\(proj, idx\) => \{/g, "{filteredProjects.slice(0, visibleCount).map((proj, idx) => {");

// 5. Add "Load More" button after the grid
code = code.replace(/          <\/div>\n\n          \{\/\* Process & Architecture Pipeline \*\/\}/g, 
`          </div>\n
          {filteredProjects.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-8 py-3 bg-transparent border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-400 hover:text-white transition-all font-mono font-semibold uppercase tracking-widest flex items-center gap-2 group shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_-2px_rgba(6,182,212,0.5)]"
              >
                <span>Load More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-y-1 rotate-90 transition-transform" />
              </button>
            </div>
          )}

          {/* Process & Architecture Pipeline */}`);

fs.writeFileSync('src/App.tsx', code);
console.log('Load More patched');
