export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  accentColor: string;
  textColor: string;
  year: string;
  client: string;
  videoUrl?: string;
  featured: boolean;
  coverImage: string;
  stats?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'oryzo_ai',
    title: 'Oryzo AI',
    category: 'concept • web • design • development • 3d • animation',
    tags: ['Next.js', 'WebGL', 'AI Interface', 'Realtime 3D'],
    description: 'An intelligent creative platform combining AI automation with bespoke 3D visual storytelling and hyper-responsive user interactions.',
    accentColor: '#d97706',
    textColor: '#ffedd7',
    year: '2026',
    client: 'Oryzo Technologies',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Awards', value: 'FWA of the Day' },
      { label: 'Frame Rate', value: '60 FPS WebGL' },
      { label: 'Engagement', value: '+340%' }
    ]
  },
  {
    id: 'atlas_motion',
    title: 'Atlas Motion',
    category: 'concept • web • design • development • 3d • animation',
    tags: ['Kinetic Physics', 'Three.js', 'Sound Design'],
    description: 'A revolutionary motion design studio experience driven by generative particle mechanics, fluid dynamics, and tactile audio feedback.',
    accentColor: '#eab308',
    textColor: '#FFFDE0',
    year: '2026',
    client: 'Atlas Motion Lab',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Awwwards', value: 'Site of the Month' },
      { label: 'Interactions', value: 'Realtime Physics' }
    ]
  },
  {
    id: 'devin_ai',
    title: 'Devin AI',
    category: 'web • design • development • 3d',
    tags: ['Autonomous AI', 'Digital Twin', 'GLSL Shaders'],
    description: 'Immersive digital presence for the world’s first autonomous AI software engineer, featuring neural visualizers and dynamic data streams.',
    accentColor: '#06b6d4',
    textColor: '#e0f2fe',
    year: '2025',
    client: 'Cognition AI',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Traffic', value: '2.5M+ Visits' },
      { label: 'Render Tech', value: 'Custom Raymarching' }
    ]
  },
  {
    id: 'of_the_oak',
    title: 'Of The Oak',
    category: 'web • design • development • 3d • animation',
    tags: ['Organic 3D', 'Spatial Audio', 'Interactive Narrative'],
    description: 'A poetic exploration of nature and digital consciousness, weaving organic procedural botanical simulations with ambient soundscapes.',
    accentColor: '#10b981',
    textColor: '#d1fae5',
    year: '2025',
    client: 'Oak Foundation',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Webby', value: 'Best Visual Design' },
      { label: 'Shader Tech', value: 'Volumetric Flora' }
    ]
  },
  {
    id: 'everswap',
    title: 'Everswap',
    category: 'concept • web • design • development • 3d • animation',
    tags: ['Fintech', 'Liquid Glassmorphism', 'Micro-interactions'],
    description: 'Next-generation decentralized exchange interface wrapped in futuristic glass refractions, fluid morphing tokens, and instantaneous feedback.',
    accentColor: '#818cf8',
    textColor: '#e0e7ff',
    year: '2025',
    client: 'Everswap Protocol',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Awwwards', value: 'Developer Award' },
      { label: 'Conversion', value: '+185%' }
    ]
  },
  {
    id: 'porsche_dream_machine',
    title: 'Porsche: Dream Machine',
    category: 'concept • 3D illustration • mograph • video',
    tags: ['Automotive Configurator', 'Raytraced Materials', 'Cinematic'],
    description: 'An interactive visceral journey celebrating the engineering majesty of Porsche electric hypercars through real-time ray-marched carbon reflections.',
    accentColor: '#f43f5e',
    textColor: '#ffe4e6',
    year: '2024',
    client: 'Porsche AG',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'FWA', value: 'Site of the Month' },
      { label: 'Shader Quality', value: 'PBR Chrome & Glass' }
    ]
  },
  {
    id: 'synthetic_human',
    title: 'Synthetic Human',
    category: 'concept • 3d • research • webgl',
    tags: ['Neural Avatar', 'Face Tracking', 'Audio-reactive'],
    description: 'Experimental biological cybernetics interface exploring synthetic humanoid consciousness with audio-reactive facial deformation.',
    accentColor: '#ec4899',
    textColor: '#fce7f3',
    year: '2024',
    client: 'Lusion Labs',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Experiment', value: 'Lab Project #08' },
      { label: 'Latency', value: '<12ms Reaction' }
    ]
  }
];

export const AWARDS = [
  { title: 'Awwwards Site of the Year', count: '3x' },
  { title: 'Awwwards Site of the Day', count: '48x' },
  { title: 'FWA of the Month', count: '12x' },
  { title: 'FWA of the Day', count: '62x' },
  { title: 'Webby Awards Nominee & Winner', count: '8x' },
  { title: 'CSSDA Best UI/UX/Innovation', count: '35x' },
];

export const CLIENTS = [
  'Porsche', 'Nike', 'Google', 'Spotify', 'Cognition AI', 'Microsoft', 'Moncler', 'Apple', 'Prada', 'Sony Music'
];
