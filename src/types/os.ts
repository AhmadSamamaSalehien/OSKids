export type AppId =
  | 'finder'
  | 'safari'
  | 'terminal'
  | 'settings'
  | 'notes'
  | 'calculator'
  | 'photos'
  | 'music'
  | 'calendar'
  | 'textedit'
  | 'appstore'
  | 'gemini';

export interface AppMetadata {
  id: AppId;
  name: string;
  iconName: string;
  color: string;
  category: 'System' | 'Productivity' | 'Utilities' | 'Media' | 'AI';
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
}

export interface WindowState {
  id: string; // unique window instance id (e.g. "finder_1")
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialPath?: string; // For Finder or TextEdit opening specific file
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  content?: string;
  size?: string;
  updatedAt: string;
  icon?: string;
  parentId: string; // parent folder id ('root', 'desktop', 'documents', etc.)
  color?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  appId?: AppId;
  read: boolean;
}

export interface OSTheme {
  accentColor: string; // e.g. '#FFE600' (yellow), '#FF597B' (pink), '#4D96FF' (blue), '#6BCB77' (green), '#FF9F29' (orange)
  accentName: string;
  wallpaperId: string;
  dockPosition: 'bottom' | 'left' | 'right';
  dockSize: number; // in px, e.g. 64
  soundEnabled: boolean;
  darkMode: boolean;
  highContrast: boolean;
  widgetVisible: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
  color: string;
}
