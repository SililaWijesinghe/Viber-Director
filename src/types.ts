export interface Project {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  liveUrl: string;
  category: 'Web App' | 'SaaS' | 'E-commerce' | 'Experiment';
  stack: string[];
  desktopImage?: string; // fallback
  mobileImage?: string;  // fallback
  color: string; // e.g. '#7C3AED' or '#22D3EE'
  detailedApproach: string;
  mobileOnly?: boolean;
  problem: string;
  result: string;
  stats: { label: string; value: string }[];
}

export interface ToolItem {
  name: string;
  category: 'IDE' | 'AI Model' | 'Frontend' | 'Deployment' | 'Backend' | 'Google AI' | 'Agent';
  iconName: string; // references lucide or custom SVG handler
  color: string;
  level: string; // e.g., '100% Directed', 'Power User'
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  output: string;
}

export interface HudToast {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'system' | 'unlocked';
}

