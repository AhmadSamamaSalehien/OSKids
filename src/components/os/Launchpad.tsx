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
  Search,
  Grid,
  X,
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

export const Launchpad: React.FC = () => {
  const { launchpadOpen, setLaunchpadOpen, openApp } = useOS();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!launchpadOpen) return null;

  const categories = ['All', 'System', 'Productivity', 'Utilities', 'Media', 'AI'];

  const filteredApps = Object.values(APP_CATALOG).filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9998] bg-[#FFE600] dark:bg-zinc-950 p-6 sm:p-12 select-none flex flex-col justify-between overflow-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white border-3 border-black rounded-2xl neo-shadow">
              <Grid className="w-8 h-8 text-black stroke-[3]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-black dark:text-white">OS Kids Launchpad</h1>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-300 font-mono">
                Material 3 Expressive + Neobrutalist App Catalog
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black stroke-[3]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 bg-white text-black border-3 border-black rounded-full neo-shadow font-extrabold outline-none text-sm placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => setLaunchpadOpen(false)}
            className="p-3 bg-black text-white border-3 border-black rounded-2xl neo-shadow hover:bg-red-600 transition-colors"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto my-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-black text-xs border-2 border-black neo-shadow-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white scale-105'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto w-full flex-1 items-center py-6">
          {filteredApps.map(app => {
            const IconComponent = ICON_MAP[app.iconName] || Folder;
            return (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  openApp(app.id as AppId);
                  setLaunchpadOpen(false);
                }}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 border-3 border-black rounded-3xl neo-shadow cursor-pointer group"
              >
                <div
                  className="w-16 h-16 rounded-2xl border-3 border-black flex items-center justify-center neo-shadow-sm mb-3 group-hover:rotate-3 transition-transform"
                  style={{ backgroundColor: app.color }}
                >
                  <IconComponent className="w-8 h-8 text-black stroke-[2.5]" />
                </div>
                <span className="font-black text-sm text-center text-black dark:text-white group-hover:underline">
                  {app.name}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase mt-0.5">
                  {app.category}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center font-mono text-xs font-bold text-black dark:text-gray-300">
          Press ESC or click anywhere outside to return to Desktop
        </div>
      </div>
    </AnimatePresence>
  );
};
