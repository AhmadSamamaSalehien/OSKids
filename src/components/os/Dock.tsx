import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';
import { APP_CATALOG } from '../../utils/appCatalog';
import { AppId } from '../../types/os';
import {
  Folder,
  Compass,
  SquareTerminal,
  Sliders,
  StickyNote,
  Calculator,
  Image as ImageIcon,
  Music,
  Calendar,
  FileText,
  ShoppingBag,
  Sparkles,
  Trash2,
  Grid,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Folder,
  Compass,
  SquareTerminal,
  Sliders,
  StickyNote,
  Calculator,
  Image: ImageIcon,
  Music,
  Calendar,
  FileText,
  ShoppingBag,
  Sparkles,
};

export const Dock: React.FC = () => {
  const {
    windows,
    activeAppId,
    openApp,
    trashCount,
    emptyTrash,
    theme,
    launchpadOpen,
    setLaunchpadOpen,
  } = useOS();

  const [hoveredApp, setHoveredApp] = useState<AppId | 'launchpad' | 'trash' | null>(null);
  const [trashMenuOpen, setTrashMenuOpen] = useState(false);

  const dockApps: AppId[] = [
    'finder',
    'safari',
    'gemini',
    'terminal',
    'notes',
    'calculator',
    'photos',
    'music',
    'calendar',
    'textedit',
    'appstore',
    'settings',
  ];

  // Check if an app is currently open
  const isRunning = (appId: AppId) => windows.some(w => w.appId === appId && !w.isMinimized);

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[9900] select-none max-w-[98vw]">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-center space-x-1.5 sm:space-x-3 px-2.5 sm:px-4 py-1.5 sm:py-2.5 bg-white dark:bg-zinc-900 border-3 border-black rounded-3xl neo-shadow-lg overflow-x-auto no-scrollbar max-w-[98vw]"
        style={{
          backgroundColor: theme.darkMode ? '#18181B' : '#FFFFFF',
        }}
      >
        {/* Launchpad Icon */}
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setHoveredApp('launchpad')}
          onMouseLeave={() => setHoveredApp(null)}
        >
          <motion.button
            whileHover={{ scale: 1.25, y: -6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLaunchpadOpen(!launchpadOpen)}
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FFE600] border-2 border-black flex items-center justify-center neo-shadow-sm hover:neo-shadow transition-shadow ${
              launchpadOpen ? 'ring-3 ring-black bg-yellow-400' : ''
            }`}
          >
            <Grid className="w-4 h-4 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
          </motion.button>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredApp === 'launchpad' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -12, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFE600] text-black border-2 border-black text-xs font-black rounded-full whitespace-nowrap neo-shadow-md pointer-events-none z-[10000]"
              >
                Launchpad
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-6 sm:h-8 w-0.5 bg-black dark:bg-white rounded-full mx-0.5 sm:mx-1 flex-shrink-0" />

        {/* App Icons */}
        {dockApps.map(appId => {
          const app = APP_CATALOG[appId];
          const IconComponent = ICON_MAP[app.iconName] || Folder;
          const running = isRunning(appId);
          const isActive = activeAppId === appId;

          return (
            <div
              key={appId}
              className="relative flex flex-col items-center flex-shrink-0"
              onMouseEnter={() => setHoveredApp(appId)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <motion.button
                whileHover={{ scale: 1.28, y: -8 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openApp(appId)}
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-2 border-black flex items-center justify-center neo-shadow-sm transition-all relative ${
                  isActive ? 'ring-2 ring-black font-extrabold' : ''
                }`}
                style={{ backgroundColor: app.color }}
              >
                <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-black stroke-[2.5]" />

                {/* Badge for AI Copilot */}
                {appId === 'gemini' && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-purple-600 border border-black"></span>
                  </span>
                )}
              </motion.button>

              {/* Running Indicator Dot */}
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-black mt-0.5 sm:mt-1 transition-all ${
                  running ? 'bg-black dark:bg-white scale-100' : 'bg-transparent scale-0'
                }`}
              />

              {/* Hover Tooltip showing App Name */}
              <AnimatePresence>
                {hoveredApp === appId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -16, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFE600] text-black border-2 border-black text-xs font-black rounded-full whitespace-nowrap neo-shadow-md pointer-events-none z-[10000]"
                  >
                    {app.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Divider */}
        <div className="h-6 sm:h-8 w-0.5 bg-black dark:bg-white rounded-full mx-0.5 sm:mx-1 flex-shrink-0" />

        {/* Trash Icon */}
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setHoveredApp('trash')}
          onMouseLeave={() => setHoveredApp(null)}
        >
          <motion.button
            whileHover={{ scale: 1.25, y: -6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openApp('finder', 'trash')}
            onContextMenu={e => {
              e.preventDefault();
              setTrashMenuOpen(true);
            }}
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-200 dark:bg-zinc-800 border-2 border-black flex items-center justify-center neo-shadow-sm relative`}
          >
            <Trash2 className="w-4 h-4 sm:w-6 sm:h-6 text-black dark:text-white stroke-[2.5]" />
            {trashCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white border-2 border-black rounded-full text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {trashCount}
              </span>
            )}
          </motion.button>

          {/* Hover Tooltip for Trash */}
          <AnimatePresence>
            {hoveredApp === 'trash' && !trashMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -16, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFE600] text-black border-2 border-black text-xs font-black rounded-full whitespace-nowrap neo-shadow-md pointer-events-none z-[10000]"
              >
                Trash Bin
              </motion.div>
            )}
          </AnimatePresence>

          {/* Context Menu for Trash */}
          {trashMenuOpen && (
            <div
              className="absolute bottom-16 right-0 w-40 bg-white dark:bg-zinc-900 border-3 border-black rounded-xl neo-shadow-md p-1 z-[10000] text-xs font-bold"
              onMouseLeave={() => setTrashMenuOpen(false)}
            >
              <button
                onClick={() => {
                  openApp('finder', 'trash');
                  setTrashMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#FFE600] rounded-lg"
              >
                Open Trash
              </button>
              <button
                onClick={() => {
                  emptyTrash();
                  setTrashMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-red-500 hover:text-white rounded-lg text-red-600 dark:text-red-400"
              >
                Empty Trash ({trashCount})
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
