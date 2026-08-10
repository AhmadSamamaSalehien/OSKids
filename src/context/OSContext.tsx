import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppId, WindowState, FileItem, Notification, OSTheme, NoteItem, CalendarEvent } from '../types/os';
import { APP_CATALOG } from '../utils/appCatalog';
import { INITIAL_FILES } from '../utils/initialFileSystem';
import { playSound } from '../utils/soundEffects';

interface OSContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  activeAppId: AppId;
  files: FileItem[];
  theme: OSTheme;
  notifications: Notification[];
  notes: NoteItem[];
  events: CalendarEvent[];
  spotlightOpen: boolean;
  controlCenterOpen: boolean;
  notificationCenterOpen: boolean;
  launchpadOpen: boolean;
  trashCount: number;

  // Window Actions
  openApp: (appId: AppId, initialPath?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPos: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  snapWindow: (id: string, mode: 'left' | 'right' | 'top' | 'center' | 'full') => void;

  // File System Actions
  addFile: (file: Omit<FileItem, 'id' | 'updatedAt'>) => void;
  deleteFile: (id: string) => void;
  restoreFile: (id: string) => void;
  emptyTrash: () => void;
  updateFileContent: (id: string, content: string) => void;

  // System UI Controls
  setSpotlightOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setControlCenterOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setNotificationCenterOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setLaunchpadOpen: (open: boolean | ((prev: boolean) => boolean)) => void;

  // Settings & Theme
  updateTheme: (newTheme: Partial<OSTheme>) => void;
  addNotification: (title: string, message: string, appId?: AppId) => void;
  clearNotifications: () => void;

  // Notes & Calendar
  addNote: (note: Omit<NoteItem, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, content: Partial<NoteItem>) => void;
  deleteNote: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const DEFAULT_THEME: OSTheme = {
  accentColor: '#FFE600', // Expressive Yellow
  accentName: 'Tahoe Gold',
  wallpaperId: 'tahoe-expressive',
  dockPosition: 'bottom',
  dockSize: 68,
  soundEnabled: true,
  darkMode: false,
  highContrast: false,
  widgetVisible: true,
};

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [activeAppId, setActiveAppId] = useState<AppId>('finder');
  const [nextZIndex, setNextZIndex] = useState(10);

  // Files
  const [files, setFiles] = useState<FileItem[]>(() => {
    const saved = localStorage.getItem('tahoe_files');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_FILES;
  });

  // Theme
  const [theme, setTheme] = useState<OSTheme>(() => {
    const saved = localStorage.getItem('tahoe_theme');
    if (saved) {
      try { return { ...DEFAULT_THEME, ...JSON.parse(saved) }; } catch { /* ignore */ }
    }
    return DEFAULT_THEME;
  });

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif_1',
      title: 'Welcome to OS Kids',
      message: 'Experience Neobrutalism + Material 3 Expressive UI with ZERO glassmorphism!',
      time: 'Just now',
      appId: 'system' as AppId,
      read: false,
    },
  ]);

  // Modals / Panels
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);

  // Notes
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('tahoe_notes');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      {
        id: 'note_1',
        title: '🚀 OS Kids Design Principles',
        content: `1. Bold 3px black borders and sharp offset shadows.\n2. Material 3 Expressive pills, bouncy physics, vibrant color blocks.\n3. Zero glassmorphism, zero transparency blurs!\n4. Tactile interactive components.`,
        tags: ['Design', 'OS Kids'],
        updatedAt: 'Today',
        color: '#FFE600',
      },
      {
        id: 'note_2',
        title: '🛒 Shopping List for Studio',
        content: `- Mechanical Keyboard (Linear Switches)\n- Ultra-wide Monitor\n- Neobrutalist Poster\n- Coffee Beans`,
        tags: ['Personal'],
        updatedAt: 'Yesterday',
        color: '#FF597B',
      },
    ];
  });

  // Calendar Events
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 'evt_1', title: 'OS Kids Launch Party', date: new Date().toISOString().split('T')[0], time: '02:00 PM', category: 'Work' },
    { id: 'evt_2', title: 'Design System Sprint', date: new Date().toISOString().split('T')[0], time: '04:30 PM', category: 'Meeting' },
  ]);

  // Sync files to localStorage
  useEffect(() => {
    localStorage.setItem('tahoe_files', JSON.stringify(files));
  }, [files]);

  // Sync theme to localStorage
  useEffect(() => {
    localStorage.setItem('tahoe_theme', JSON.stringify(theme));
  }, [theme]);

  // Sync notes
  useEffect(() => {
    localStorage.setItem('tahoe_notes', JSON.stringify(notes));
  }, [notes]);

  const trashCount = files.filter(f => f.parentId === 'trash').length;

  const openApp = (appId: AppId, initialPath?: string) => {
    playSound('open', theme.soundEnabled);
    setActiveAppId(appId);

    // Check if window already exists
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      const updatedZ = nextZIndex + 1;
      setNextZIndex(updatedZ);
      setWindows(prev =>
        prev.map(w =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: updatedZ, ...(initialPath ? { initialPath } : {}) }
            : w
        )
      );
      setActiveWindowId(existing.id);
      return;
    }

    // Otherwise create new window
    const catalog = APP_CATALOG[appId];
    const newId = `${appId}_${Date.now()}`;
    const updatedZ = nextZIndex + 1;
    setNextZIndex(updatedZ);

    // Offset window slightly based on existing count
    const windowOffset = (windows.length % 5) * 28;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const startX = Math.max(40, Math.min(screenWidth - catalog.defaultWidth - 40, 100 + windowOffset));
    const startY = Math.max(50, Math.min(screenHeight - catalog.defaultHeight - 80, 60 + windowOffset));

    const newWindow: WindowState = {
      id: newId,
      appId,
      title: catalog.name,
      x: startX,
      y: startY,
      width: catalog.defaultWidth,
      height: catalog.defaultHeight,
      isMinimized: false,
      isMaximized: false,
      zIndex: updatedZ,
      initialPath,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newId);
  };

  const closeWindow = (id: string) => {
    playSound('close', theme.soundEnabled);
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        // focus topmost window
        const topmost = remaining.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remaining[0]);
        setActiveWindowId(topmost.id);
        setActiveAppId(topmost.appId);
      } else {
        setActiveWindowId(null);
        setActiveAppId('finder');
      }
    }
  };

  const focusWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (activeWindowId !== id || win.isMinimized) {
      playSound('click', theme.soundEnabled);
      const updatedZ = nextZIndex + 1;
      setNextZIndex(updatedZ);
      setWindows(prev =>
        prev.map(w => (w.id === id ? { ...w, zIndex: updatedZ, isMinimized: false } : w))
      );
      setActiveWindowId(id);
      setActiveAppId(win.appId);
    }
  };

  const minimizeWindow = (id: string) => {
    playSound('click', theme.soundEnabled);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const topmost = remaining.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remaining[0]);
        setActiveWindowId(topmost.id);
        setActiveAppId(topmost.appId);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const maximizeWindow = (id: string) => {
    playSound('click', theme.soundEnabled);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const updateWindowPos = (id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x: Math.max(0, x), y: Math.max(28, y) } : w))
    );
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;
    const catalog = APP_CATALOG[win.appId];
    const minW = catalog.minWidth || 300;
    const minH = catalog.minHeight || 200;

    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, width: Math.max(minW, width), height: Math.max(minH, height) } : w
      )
    );
  };

  const snapWindow = (id: string, mode: 'left' | 'right' | 'top' | 'center' | 'full') => {
    playSound('click', theme.soundEnabled);
    const screenW = window.innerWidth;
    const screenH = window.innerHeight - 80; // account for dock & menu bar

    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        if (mode === 'left') {
          return { ...w, x: 10, y: 38, width: Math.floor(screenW / 2) - 20, height: screenH - 20, isMaximized: false };
        }
        if (mode === 'right') {
          return { ...w, x: Math.floor(screenW / 2) + 10, y: 38, width: Math.floor(screenW / 2) - 20, height: screenH - 20, isMaximized: false };
        }
        if (mode === 'top' || mode === 'full') {
          return { ...w, isMaximized: true };
        }
        if (mode === 'center') {
          const wW = Math.min(800, screenW - 100);
          const wH = Math.min(550, screenH - 100);
          return { ...w, x: (screenW - wW) / 2, y: (screenH - wH) / 2 + 20, width: wW, height: wH, isMaximized: false };
        }
        return w;
      })
    );
  };

  // Files
  const addFile = (fileData: Omit<FileItem, 'id' | 'updatedAt'>) => {
    const newFile: FileItem = {
      ...fileData,
      id: `file_${Date.now()}`,
      updatedAt: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setFiles(prev => [...prev, newFile]);
    playSound('notify', theme.soundEnabled);
  };

  const deleteFile = (id: string) => {
    // move to trash or delete permanently if already in trash
    playSound('trash', theme.soundEnabled);
    setFiles(prev =>
      prev.map(f => {
        if (f.id === id) {
          if (f.parentId === 'trash') {
            return null; // remove
          }
          return { ...f, parentId: 'trash' };
        }
        return f;
      }).filter(Boolean) as FileItem[]
    );
  };

  const restoreFile = (id: string) => {
    playSound('open', theme.soundEnabled);
    setFiles(prev =>
      prev.map(f => (f.id === id ? { ...f, parentId: 'desktop' } : f))
    );
  };

  const emptyTrash = () => {
    playSound('trash', theme.soundEnabled);
    setFiles(prev => prev.filter(f => f.parentId !== 'trash'));
  };

  const updateFileContent = (id: string, content: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === id ? { ...f, content, updatedAt: 'Just now' } : f))
    );
  };

  // Theme
  const updateTheme = (newTheme: Partial<OSTheme>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const addNotification = (title: string, message: string, appId?: AppId) => {
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      appId,
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
    playSound('notify', theme.soundEnabled);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Notes
  const addNote = (noteData: Omit<NoteItem, 'id' | 'updatedAt'>) => {
    const newNote: NoteItem = {
      ...noteData,
      id: `note_${Date.now()}`,
      updatedAt: 'Just now',
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, partial: Partial<NoteItem>) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...partial, updatedAt: 'Just now' } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Events
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `evt_${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        activeAppId,
        files,
        theme,
        notifications,
        notes,
        events,
        spotlightOpen,
        controlCenterOpen,
        notificationCenterOpen,
        launchpadOpen,
        trashCount,

        openApp,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPos,
        updateWindowSize,
        snapWindow,

        addFile,
        deleteFile,
        restoreFile,
        emptyTrash,
        updateFileContent,

        setSpotlightOpen,
        setControlCenterOpen,
        setNotificationCenterOpen,
        setLaunchpadOpen,

        updateTheme,
        addNotification,
        clearNotifications,

        addNote,
        updateNote,
        deleteNote,
        addEvent,
        deleteEvent,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within an OSProvider');
  return ctx;
};
