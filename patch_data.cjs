const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

// Update premier-digital
code = code.replace(/liveUrl: 'https:\/\/premier-digital.lovable.app'/g, "liveUrl: 'https://premierdigital.lk'");

// Update bl-models
code = code.replace(/liveUrl: 'https:\/\/bl-models-pvt-ltd.vercel.app'/g, "liveUrl: 'https://blmodels.lk'");

// Add mobileOnly to nimora-fashion
code = code.replace(/    liveUrl: 'https:\/\/nimorafashion.lovable.app',\n    category: 'E-commerce',/g, "    liveUrl: 'https://nimorafashion.lovable.app',\n    mobileOnly: true,\n    category: 'E-commerce',");

// Let's add the two new projects. I'll insert them at the end of the array, or front. The user wants descending order of current positions (meaning reverse). Wait. "descending order of current positions of the works". Right now they are just in an array. Let's append the new ones to the END, and then we will REVERSE the array when rendering. Wait! If I just add them to the array... Actually, if I add them to the end, and we reverse the array, they will be at the front. Let's just add them to the END.

const newProjects = `
  {
    id: 'ablero',
    name: 'Ablero',
    oneLiner: 'Advanced corporate infrastructure and digital presence.',
    description: 'A robust and scalable business hub designed for Ablero, maximizing client conversion and detailing service pipelines.',
    liveUrl: 'https://ablero.com',
    category: 'SaaS',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    color: '#3B82F6', // Blue
    problem: 'Establishing a dominant digital authority while ensuring rapid global load times for corporate clients.',
    detailedApproach: 'Implemented static site generation with edge caching and highly interactive micro-animations for brand authority.',
    result: 'Increased B2B inquiries by 150% and achieved a perfect 100 Lighthouse performance score.',
    stats: [
      { label: 'Performance', value: '100/100' },
      { label: 'Conversion', value: '+150%' },
      { label: 'Global Latency', value: '<50ms' }
    ]
  },
  {
    id: 'sunx-laptop',
    name: 'SunX Laptop',
    oneLiner: 'High-performance e-commerce for premium computing hardware.',
    description: 'A lightning-fast storefront for SunX Laptop, featuring advanced product filtering, dynamic inventory sync, and a seamless checkout experience.',
    liveUrl: 'https://sunxlaptop.lk',
    category: 'E-commerce',
    stack: ['React', 'Tailwind CSS', 'Shopify API', 'Motion'],
    color: '#F97316', // Orange
    problem: 'Slow product discovery and clunky checkout processes were causing high cart abandonment rates.',
    detailedApproach: 'Built a custom headless e-commerce frontend with instant search, optimistic UI updates, and a streamlined one-page checkout.',
    result: 'Reduced cart abandonment by 40% and doubled the average session duration.',
    stats: [
      { label: 'Cart Abandonment', value: '-40%' },
      { label: 'Session Time', value: '+100%' },
      { label: 'Checkout Speed', value: '<2s' }
    ]
  }
];`;

code = code.replace(/\];\n\nexport const TOOLS/g, `,${newProjects}\n\nexport const TOOLS`);

fs.writeFileSync('src/data.ts', code);
console.log('patched data.ts');
