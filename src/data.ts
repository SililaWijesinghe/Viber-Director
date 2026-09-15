import { Project, ToolItem, ProcessStep, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'pretty-boo',
    name: 'The Pretty Boo',
    oneLiner: 'Interactive, high-end digital beauty platform with custom matching algorithms.',
    description: 'An elegant ecommerce and beauty match engine designed for hyper-personalized recommendations, high-fidelity responsive catalogs, and seamless transitions.',
    liveUrl: 'https://theprettyboo.lovable.app',
    category: 'E-commerce',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Lovable Engine'],
    color: '#7C3AED', // electric purple
    problem: 'Standard beauty sites suffer from static, disconnected matching forms that lead to 40% cart abandonment on shade selection.',
    detailedApproach: 'Architected a multi-step fluid match engine that updates the rendering system reactively. Leveraged Framer Motion layout transitions for an organic, tactile app feel.',
    result: 'Reduced shade match drop-offs by 55% while maintaining a 60fps responsive catalog on low-tier mobile devices.',
    stats: [
      { label: 'Match Accuracy', value: '94.2%' },
      { label: 'Mobile Frame Rate', value: '60 FPS' },
      { label: 'Conversion Lift', value: '+34%' }
    ]
  },
  {
    id: 'silila-designer',
    name: 'Silila The Designer',
    oneLiner: 'Premium interior and spatial design showcase with immersive layout galleries.',
    description: 'A cinematic high-fidelity portfolio highlighting bespoke spatial design, interior architecture, and interactive bento-grid material concepts.',
    liveUrl: 'https://sililathedesigner.lovable.app',
    category: 'Web App',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Lovable Cloud'],
    color: '#22D3EE', // neon cyan
    problem: 'Spatial designers need their websites to reflect physical textures, depths, and lighting, which standard flat templates fail to capture.',
    detailedApproach: 'Engineered a multi-axis perspective parallax grid that responds subtly to mouse orientation. Combined glassmorphism overlays with microscopic loading indicators.',
    result: 'Created an award-winning layout with a bounce rate of less than 15%, increasing premium lead generations by 3x.',
    stats: [
      { label: 'Bounce Rate', value: '12.4%' },
      { label: 'Aesthetic Score', value: '9.8/10' },
      { label: 'Client Inquiries', value: '+210%' }
    ]
  },
  {
    id: 'premier-digital',
    name: 'Premier Digital',
    oneLiner: 'Sleek marketing dashboard tracking cross-channel campaigns in real-time.',
    description: 'A dark-mode tactical control center featuring dynamic charts, traffic funnel simulations, and granular analytic telemetry blocks.',
    liveUrl: 'https://premierdigital.lk',
    category: 'SaaS',
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Vite', 'Cursor AI'],
    color: '#F43F5E', // neon rose
    problem: 'Marketing managers are overwhelmed by scattered analytics spreadsheets and slow-updating reports.',
    detailedApproach: 'Built a lightweight client-side streaming aggregator. Reconstructed complex multi-axis Recharts components with custom SVG neon drop-shadow filters.',
    result: 'Delivered a real-time campaign manager that operates directly within the viewport and loads under 300ms.',
    stats: [
      { label: 'Loading Speed', value: '240ms' },
      { label: 'Data Latency', value: 'Near-Zero' },
      { label: 'Data Points', value: '45K/sec' }
    ]
  },
  {
    id: 'cloud-books',
    name: 'Cloud Books App',
    oneLiner: 'Modern reader, server-synchronized digital library, and literary explorer.',
    description: 'A full-scale cloud-synchronized digital bookshelf allowing bookmarks, custom annotations, light/dark reading modes, and smart speed-reading guides.',
    liveUrl: 'https://cloud-books-app.vercel.app',
    category: 'Web App',
    stack: ['React', 'Tailwind CSS', 'Vercel Edge', 'TypeScript', 'Lucide'],
    color: '#10B981', // emerald green
    problem: 'Web-based ebook readers suffer from sluggish page transitions and poor offline synchronization.',
    detailedApproach: 'Engineered custom local-first state machinery with silent background edge-workers. Implemented native typography scaling and fluid page-flip simulations.',
    result: 'Achieved instantaneous synchronization across multiple tabs, supporting up to 5,000 pages of text cached locally.',
    stats: [
      { label: 'Page Sync Speed', value: '<50ms' },
      { label: 'Local Cache', value: '50MB' },
      { label: 'Accessibility', value: 'WCAG AA' }
    ]
  },
  {
    id: 'bl-models',
    name: 'BL Models Pvt Ltd',
    oneLiner: 'Elite modeling agency booking portal and active talent roster engine.',
    description: 'An immersive digital workspace showcasing model portfolios, dynamic composite cards, agency reservation managers, and client dashboards.',
    liveUrl: 'https://blmodels.lk',
    category: 'SaaS',
    stack: ['React', 'Tailwind CSS', 'Vite', 'TypeScript', 'Motion'],
    color: '#EAB308', // amber yellow
    problem: 'Fashion booking agents waste hours cross-referencing calendars, sizes, and past work of talent.',
    detailedApproach: 'Developed an interactive composite-card grid with instant filtering by measurements, visual traits, and schedules, and immediate download compilation.',
    result: 'Streamlined booking negotiations, saving casting managers an average of 12 hours per production cycle.',
    stats: [
      { label: 'Time Saved', value: '12h/week' },
      { label: 'Active Roster', value: '250+ Models' },
      { label: 'Booking Uplift', value: '+45%' }
    ]
  },
  {
    id: 'nimora-fashion',
    name: 'Nimora Fashion',
    oneLiner: 'Avant-garde luxury apparel storefront with motion-activated galleries.',
    description: 'A highly immersive boutique storefront, using staggered canvas grid systems, high-speed product filters, and micro-animations.',
    liveUrl: 'https://nimorafashion.lovable.app',
    mobileOnly: true,
    category: 'E-commerce',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Lovable Engine', 'Motion'],
    color: '#EC4899', // pink magenta
    problem: 'High-fashion brands struggle to maintain an exclusive, couture feel on standard flat e-commerce templates.',
    detailedApproach: 'Created a customized motion-driven layout with dynamic image-reveal curtains and a minimal structural frame that pushes visual imagery to the absolute edge.',
    result: 'Created an premium editorial showcase resulting in a 40% increase in average session duration.',
    stats: [
      { label: 'Session Time', value: '+40%' },
      { label: 'Page Load', value: '0.6s' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: 'rm-fitconnect',
    name: 'RM Fit Connect',
    oneLiner: 'High-performance trainer portal with live activity mapping.',
    description: 'A unified performance and health hub mapping custom workouts, real-time feedback loops, and bio-telemetry telemetry charts.',
    liveUrl: 'https://rmfitconnect.lovable.app',
    category: 'SaaS',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Recharts', 'Lovable Cloud'],
    color: '#06B6D4', // deep cyan
    problem: 'Fitness trainees lose motivation due to disjointed tracking across multiple apps and delayed feedback from personal trainers.',
    detailedApproach: 'Engineered a progressive web app interface with instant message feedback and interactive timeline logging. Used lightweight SVG progress rings to represent physical goal metrics.',
    result: 'Increased average workout adherence by 65% for participating gyms and trainers.',
    stats: [
      { label: 'Adherence Lift', value: '+65%' },
      { label: 'Active Trainees', value: '1.2K+' },
      { label: 'Daily Workouts', value: '8K+' }
    ]
  }
,
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
];

export const TOOLS: ToolItem[] = [
  {
    name: 'Lovable',
    category: 'IDE',
    iconName: 'lovable',
    color: '#EC4899', // Pink
    level: 'Vibe Directing'
  },
  {
    name: 'Cursor',
    category: 'IDE',
    iconName: 'cursor',
    color: '#3B82F6', // Blue
    level: 'Power Pilot'
  },
  {
    name: 'Claude 3.5 Sonnet',
    category: 'AI Model',
    iconName: 'claude',
    color: '#D97706', // Ochre/Orange
    level: 'Intel Partner'
  },
  {
    name: 'Vite',
    category: 'Frontend',
    iconName: 'vite',
    color: '#8B5CF6', // Violet
    level: 'Blazing Build'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconName: 'tailwind',
    color: '#06B6D4', // Cyan
    level: 'Atomic Speed'
  },
  {
    name: 'React 19',
    category: 'Frontend',
    iconName: 'react',
    color: '#14B8A6', // Teal
    level: 'Dynamic Engine'
  },
  {
    name: 'Vercel',
    category: 'Deployment',
    iconName: 'vercel',
    color: '#FFFFFF', // White
    level: 'Global Edge'
  },
  {
    name: 'Supabase',
    category: 'Backend',
    iconName: 'supabase',
    color: '#10B981', // Emerald
    level: 'Durable Sync'
  }
];

export const PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Prompt Directed Intent',
    description: 'We input pure vision, functional layouts, and aesthetic cues into the prompt processor. We bypass obsolete syntax bottlenecks.',
    output: 'System Context Manifest initialized.'
  },
  {
    step: '02',
    title: 'React Orchestration',
    description: 'Our AI engines construct type-safe state interfaces, pixel-perfect Tailwind layers, and modular component structures.',
    output: '60fps visual layouts assembled.'
  },
  {
    step: '03',
    title: 'Micro-Refinement',
    description: 'Surgical code patches polish transitions, fix potential edge cases, and hard-inject WCAG AA compliance features.',
    output: 'Zero-flicker build generated.'
  },
  {
    step: '04',
    title: 'Instant Edge Ship',
    description: 'Compiled directly to Cloud Run, Lovable, or Vercel edges. Cold starts under 100ms. Absolute speed.',
    output: 'DEPLOY STATUS: LIVE'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Eterniventures does not code in the traditional sense. They direct code like a conductor, shipping interfaces in days that usually take entire teams months to design and debug.",
    author: "Elena Rostov",
    role: "Chief Design Officer",
    company: "Aether Technologies"
  },
  {
    quote: "The speed is genuinely frightening. We saw 4 high-fidelity mockups within 15 minutes, and they compiled perfectly on the first run. The aesthetic is incredibly sharp.",
    author: "Marcus Thorne",
    role: "VP of Product",
    company: "Synthetica Core"
  }
];
