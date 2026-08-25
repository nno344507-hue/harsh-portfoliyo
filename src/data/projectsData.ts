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
    id: 'redbull_desert_drift',
    title: 'Red Bull // Desert Drift',
    category: 'commercial • sound design • color grading • speed ramp',
    tags: ['DaVinci Resolve', 'Sound Design', 'Speed Ramping', '4K 60FPS'],
    description: 'High-octane commercial edit for Red Bull Motorsports featuring aggressive beat-synced cuts, custom engine Foley sound design, and master-grade cinematic sunset color grading.',
    accentColor: '#f59e0b',
    textColor: '#fffbeb',
    year: '2026',
    client: 'Red Bull Media House',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Views', value: '4.8M+ Total' },
      { label: 'Pacing', value: '140 BPM Sync' },
      { label: 'Color Grade', value: 'Film Print 2383' }
    ]
  },
  {
    id: 'cyberpunk_night_city',
    title: 'Cyberpunk // Night City Cinematic',
    category: 'trailer • vfx compositing • kinetic typography • sound mix',
    tags: ['After Effects', 'Premiere Pro', 'Glitch VFX', '3D Camera'],
    description: 'A gritty, futuristic game trailer edit weaving rapid jump-cuts with bespoke cybernetic glitch VFX, spatial neon typography, and bass-heavy audio mastering.',
    accentColor: '#06b6d4',
    textColor: '#ecfeff',
    year: '2026',
    client: 'Gaming & Entertainment',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Retention', value: '88.4% AVD' },
      { label: 'Resolution', value: '4K DCI Cinema' },
      { label: 'Awards', value: 'Vimeo Staff Pick' }
    ]
  },
  {
    id: 'travis_scott_utopia',
    title: 'Utopia // Music Video Edit',
    category: 'music video • visual rhythm • trippy transitions • color fx',
    tags: ['Music Video', 'Mask Transitions', 'Film Halation', 'Rhythm Cut'],
    description: 'Dynamic music video edit driven by seamless fluid match-cuts, customized psychedelic film grain halation, dynamic speed ramps, and frame-accurate beat alignment.',
    accentColor: '#ec4899',
    textColor: '#fdf2f8',
    year: '2025',
    client: 'Sony Music / Artist Label',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'YouTube Views', value: '12.5M+' },
      { label: 'VFX Layers', value: '180+ Tracks' }
    ]
  },
  {
    id: 'nike_air_max_viral',
    title: 'Nike Air // 9:16 Viral Campaign',
    category: 'reels & shorts • viral hooks • kinetic motion • audio design',
    tags: ['Viral Reels', '9:16 Vertical', 'Animated Captions', 'Sound FX'],
    description: 'High-converting social campaign crafted for TikTok and Instagram Reels with 3-second psychological hooks, pop-up animated typography, and explosive retention pacing.',
    accentColor: '#10b981',
    textColor: '#ecfdf5',
    year: '2025',
    client: 'Nike Global / Social Media',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Total Reach', value: '28M+ Impressions' },
      { label: 'Engagement', value: '+420% Shares' }
    ]
  },
  {
    id: 'apple_vision_commercial',
    title: 'Vision Pro // Minimalist Product Film',
    category: 'commercial • clean narrative • 3d camera projection • grade',
    tags: ['Commercial', 'Clean Aesthetic', 'Macro B-Roll', 'Spatial Audio'],
    description: 'Refined minimalist product commercial highlighting industrial design curves, macro lens footage pacing, and studio-calibrated clean white and obsidian color tones.',
    accentColor: '#8b5cf6',
    textColor: '#f5f3ff',
    year: '2025',
    client: 'Tech Brand Studio',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Clio Award', value: 'Commercial Craft' },
      { label: 'Format', value: 'ProRes 4444 XQ' }
    ]
  },
  {
    id: 'beast_documentary_story',
    title: 'Inside The Arctic // Documentary Edit',
    category: 'documentary • narrative pacing • atmospheric audio • color',
    tags: ['Long Form', 'Story Pacing', 'Atmospheric Foley', 'HDR Grade'],
    description: 'Full-length 35-minute cinematic documentary edit featuring emotional narrative arc building, ambient environmental audio design, and natural HDR landscape grading.',
    accentColor: '#38bdf8',
    textColor: '#f0f9ff',
    year: '2024',
    client: 'Independent Film & Documentary',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Runtime', value: '34:20 Master' },
      { label: 'Selection', value: 'Film Festival Finalist' }
    ]
  }
];

export const AWARDS = [
  { title: 'Best Commercial Editing', count: '4x' },
  { title: 'Vimeo Staff Pick Selection', count: '6x' },
  { title: 'Clio Film Craft Award (Editing)', count: '2x' },
  { title: 'YouTube Creator Impact (Retention)', count: '18x' },
  { title: 'Shorty Award for Best Viral Video', count: '5x' },
  { title: 'Cannes Lions Shortlist (Sound & Edit)', count: '3x' },
];

export const CLIENTS = [
  'Red Bull', 'Nike', 'Sony Music', 'Apple', 'Spotify', 'boAt Audio', 'Universal Music', 'Warner Records', 'Puma', 'Beast Media'
];
