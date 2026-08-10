import { AppMetadata, AppId } from '../types/os';

export const APP_CATALOG: Record<AppId, AppMetadata> = {
  finder: {
    id: 'finder',
    name: 'Finder',
    iconName: 'Folder',
    color: '#FFE600', // Expressive Yellow
    category: 'System',
    defaultWidth: 780,
    defaultHeight: 520,
    minWidth: 500,
    minHeight: 350,
  },
  safari: {
    id: 'safari',
    name: 'Safari',
    iconName: 'Compass',
    color: '#4D96FF', // Expressive Blue
    category: 'Productivity',
    defaultWidth: 860,
    defaultHeight: 580,
    minWidth: 550,
    minHeight: 400,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    iconName: 'SquareTerminal',
    color: '#18181B', // Expressive Dark
    category: 'Utilities',
    defaultWidth: 700,
    defaultHeight: 460,
    minWidth: 450,
    minHeight: 300,
  },
  settings: {
    id: 'settings',
    name: 'System Settings',
    iconName: 'Sliders',
    color: '#94A3B8', // Expressive Slate
    category: 'System',
    defaultWidth: 760,
    defaultHeight: 540,
    minWidth: 500,
    minHeight: 380,
  },
  notes: {
    id: 'notes',
    name: 'Notes',
    iconName: 'StickyNote',
    color: '#FFBD2E', // Expressive Amber
    category: 'Productivity',
    defaultWidth: 720,
    defaultHeight: 500,
    minWidth: 450,
    minHeight: 350,
  },
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    iconName: 'Calculator',
    color: '#FF597B', // Expressive Pink
    category: 'Utilities',
    defaultWidth: 360,
    defaultHeight: 520,
    minWidth: 320,
    minHeight: 460,
  },
  photos: {
    id: 'photos',
    name: 'Photos',
    iconName: 'Image',
    color: '#6BCB77', // Expressive Mint
    category: 'Media',
    defaultWidth: 800,
    defaultHeight: 550,
    minWidth: 500,
    minHeight: 380,
  },
  music: {
    id: 'music',
    name: 'Music',
    iconName: 'Music',
    color: '#FF4757', // Expressive Red
    category: 'Media',
    defaultWidth: 780,
    defaultHeight: 500,
    minWidth: 500,
    minHeight: 380,
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
    iconName: 'Calendar',
    color: '#3B82F6', // Expressive Royal
    category: 'Productivity',
    defaultWidth: 780,
    defaultHeight: 540,
    minWidth: 500,
    minHeight: 380,
  },
  textedit: {
    id: 'textedit',
    name: 'TextEdit',
    iconName: 'FileText',
    color: '#A855F7', // Expressive Purple
    category: 'Productivity',
    defaultWidth: 740,
    defaultHeight: 520,
    minWidth: 450,
    minHeight: 350,
  },
  appstore: {
    id: 'appstore',
    name: 'App Store',
    iconName: 'ShoppingBag',
    color: '#06B6D4', // Expressive Cyan
    category: 'System',
    defaultWidth: 820,
    defaultHeight: 560,
    minWidth: 520,
    minHeight: 400,
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini Copilot',
    iconName: 'Sparkles',
    color: '#8B5CF6', // Expressive Violet
    category: 'AI',
    defaultWidth: 780,
    defaultHeight: 560,
    minWidth: 500,
    minHeight: 400,
  },
};
