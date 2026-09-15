const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Blur to the item transition
code = code.replace(
  /initial=\{\{ opacity: 0, y: 20 \}\}/,
  'initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}'
);
code = code.replace(
  /whileInView=\{\{ opacity: 1, y: 0 \}\}/,
  'whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}'
);

// 2. Add the Load More button after the bento grid closes
code = code.replace(
  /            \}\)\}\n          <\/div>\n\n          \{\/\* Social Proof Infinite Testimonial \& Marquee \*\/\}/,
  `            })}\n          </div>\n\n          {filteredProjects.length > visibleCount && (
            <div className="flex justify-center mt-12 w-full">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-8 py-3 bg-transparent border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-400 hover:text-white transition-all font-mono font-semibold uppercase tracking-widest flex items-center gap-2 group shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_-2px_rgba(6,182,212,0.5)]"
              >
                <span>Load More</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}\n\n          {/* Social Proof Infinite Testimonial & Marquee */}`
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed');
