import { FileItem } from '../types/os';

export const INITIAL_FILES: FileItem[] = [
  // Root Folders
  {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    parentId: 'root',
    updatedAt: '2026-08-09 10:00 AM',
    color: '#FFE600'
  },
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parentId: 'root',
    updatedAt: '2026-08-09 10:00 AM',
    color: '#4D96FF'
  },
  {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    parentId: 'root',
    updatedAt: '2026-08-09 10:00 AM',
    color: '#FF597B'
  },
  {
    id: 'pictures',
    name: 'Pictures',
    type: 'folder',
    parentId: 'root',
    updatedAt: '2026-08-09 10:00 AM',
    color: '#6BCB77'
  },
  {
    id: 'trash',
    name: 'Trash',
    type: 'folder',
    parentId: 'root',
    updatedAt: '2026-08-09 10:00 AM',
    color: '#94A3B8'
  },

  // Files inside Desktop
  {
    id: 'file_welcome',
    name: 'Welcome to OS Kids.txt',
    type: 'file',
    extension: 'txt',
    parentId: 'desktop',
    size: '1.2 KB',
    updatedAt: '2026-08-09 10:15 AM',
    content: `Welcome to OS Kids (Neobrutalism + Material 3 Expressive Edition)!

Features:
- Solid Neobrutalist design with bold black outlines and offset drop shadows.
- Google Material 3 Expressive UI tokens, bouncy spring animations, and rich pills.
- STRICTLY ZERO Glassmorphism: Pure opaque surfaces and crisp tactile geometry.
- Full desktop OS experience: Finder, Terminal, Safari, Gemini Copilot, Settings, Notes, Calculator, Photos, Music, Calendar, Code Editor, and App Store.
- Spotlight Search (Cmd+Space / Click Search icon)
- Interactive Control Center & Notification Panel
- Full drag & drop windows, resizing, snapping, and dock magnification.`
  },
  {
    id: 'file_system_specs',
    name: 'System_Architecture.md',
    type: 'file',
    extension: 'md',
    parentId: 'desktop',
    size: '3.4 KB',
    updatedAt: '2026-08-09 11:30 AM',
    content: `# OS Kids Technical Overview

- **OS Kernel**: OS Kids WebOS v1.0
- **Design System**: Neobrutalist M3 Expressive Fusion
- **CPU**: Apple M3 Max (16-core CPU, 40-core GPU)
- **Memory**: 64 GB Unified LPDDR5
- **Display**: ProMotion 120Hz Liquid Retina XDR
- **Security**: Hardware Enclave & Zero-Glassmorphism Solid Layering
- **Storage**: 2 TB NVMe Solid State`
  },
  {
    id: 'file_sample_code',
    name: 'app_demo.ts',
    type: 'file',
    extension: 'ts',
    parentId: 'desktop',
    size: '850 B',
    updatedAt: '2026-08-09 02:20 PM',
    content: `// OS Kids App Engine
export function launchApp(appId: string) {
  console.log(\`[OS Kids] Booting expressively: \${appId}\`);
  return {
    status: 'ACTIVE',
    mode: 'NEOBRUTALIST_EXPRESSIVE',
    glassmorphism: false
  };
}`
  },

  // Documents
  {
    id: 'file_project_plan',
    name: 'Project_Tahoe_Roadmap.txt',
    type: 'file',
    extension: 'txt',
    parentId: 'documents',
    size: '2.1 KB',
    updatedAt: '2026-08-08 04:00 PM',
    content: `Project Tahoe Roadmap 2026:
1. Complete Neobrutalism UI framework with thick 3px black borders and tactile shadows.
2. Integrate Material 3 Expressive color tokens and bouncy spring mechanics.
3. Eliminate all glassmorphism overlays and blur filters in favor of high-contrast solid panels.
4. Launch Gemini Copilot server-side integration.`
  },

  // Pictures
  {
    id: 'img_tahoe_sunset',
    name: 'Tahoe_Pop_Sunset.jpg',
    type: 'file',
    extension: 'jpg',
    parentId: 'pictures',
    size: '2.4 MB',
    updatedAt: '2026-08-07 09:12 AM',
    content: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'img_neo_art',
    name: 'Neobrutalist_Canvas.jpg',
    type: 'file',
    extension: 'jpg',
    parentId: 'pictures',
    size: '1.8 MB',
    updatedAt: '2026-08-06 01:45 PM',
    content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  }
];
