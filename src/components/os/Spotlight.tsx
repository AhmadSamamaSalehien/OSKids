import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';
import { APP_CATALOG } from '../../utils/appCatalog';
import { AppId } from '../../types/os';
import { Search, Folder, FileText, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

export const Spotlight: React.FC = () => {
  const { spotlightOpen, setSpotlightOpen, openApp, files } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (spotlightOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  // Global Cmd+Space hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      } else if (e.key === 'Escape' && spotlightOpen) {
        setSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spotlightOpen, setSpotlightOpen]);

  if (!spotlightOpen) return null;

  // Calculate Search Results
  const matchingApps = Object.values(APP_CATALOG).filter(
    app =>
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchingFiles = files.filter(
    f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      (f.content && f.content.toLowerCase().includes(query.toLowerCase()))
  );

  // Evaluate simple math in search box if numeric
  let mathResult: string | null = null;
  if (/^[0-9+\-*/().\s]+$/.test(query) && query.trim().length > 1) {
    try {
      // eslint-disable-next-line no-eval
      const res = Function(`"use strict"; return (${query})`)();
      if (typeof res === 'number' && !isNaN(res)) {
        mathResult = `= ${res}`;
      }
    } catch {
      // ignore
    }
  }

  const allItems = [
    ...(mathResult ? [{ type: 'math', label: mathResult }] : []),
    ...matchingApps.map(a => ({ type: 'app', id: a.id, label: a.name, category: a.category, color: a.color })),
    ...matchingFiles.map(f => ({ type: 'file', id: f.id, label: f.name, parentId: f.parentId })),
  ];

  const handleSelect = (item: (typeof allItems)[0]) => {
    if (item.type === 'app') {
      openApp(item.id as AppId);
    } else if (item.type === 'file') {
      openApp('textedit', item.id);
    } else if (item.type === 'math') {
      openApp('calculator');
    }
    setSpotlightOpen(false);
  };

  const handleKeyDownModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, allItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allItems.length) % Math.max(1, allItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex]);
      } else if (query.trim()) {
        openApp('gemini');
        setSpotlightOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-24 px-4 select-none">
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSpotlightOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          onKeyDown={handleKeyDownModal}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border-4 border-black rounded-3xl neo-shadow-xl overflow-hidden z-10"
        >
          {/* Search Input Header */}
          <div className="p-4 bg-[#FFFEE0] dark:bg-zinc-800 border-b-3 border-black flex items-center space-x-3">
            <div className="p-2 bg-[#FFE600] border-2 border-black rounded-2xl neo-shadow-sm">
              <Search className="w-6 h-6 text-black stroke-[3]" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Spotlight Search or ask Gemini AI..."
              className="w-full bg-transparent text-black dark:text-white font-extrabold text-lg outline-none placeholder-gray-500"
            />
            <div className="px-2.5 py-1 bg-black text-white border-2 border-black rounded-xl text-xs font-mono font-bold flex items-center space-x-1">
              <span>⌘</span>
              <span>SPACE</span>
            </div>
          </div>

          {/* Search Results List */}
          <div className="max-h-80 overflow-auto p-2 divide-y divide-gray-100 dark:divide-zinc-800">
            {mathResult && (
              <div
                onClick={() => handleSelect({ type: 'math', label: mathResult! })}
                className={`p-3 rounded-2xl border-2 border-black mb-2 flex items-center justify-between cursor-pointer font-mono font-black text-xl bg-[#6BCB77] text-black ${
                  selectedIndex === 0 ? 'ring-3 ring-black shadow-md' : ''
                }`}
              >
                <span>Calculation: {query}</span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-base">{mathResult}</span>
              </div>
            )}

            {allItems.length === 0 && query.trim().length > 0 && (
              <div
                onClick={() => {
                  openApp('gemini');
                  setSpotlightOpen(false);
                }}
                className="p-4 rounded-2xl bg-[#8B5CF6] text-white border-3 border-black neo-shadow flex items-center justify-between cursor-pointer font-bold hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6" />
                  <div>
                    <div className="text-base font-extrabold">Ask Gemini Copilot</div>
                    <div className="text-xs text-purple-200">"{query}"</div>
                  </div>
                </div>
                <CornerDownLeft className="w-5 h-5" />
              </div>
            )}

            {allItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}_${item.label}_${idx}`}
                  onClick={() => handleSelect(item)}
                  className={`p-3 my-1 rounded-2xl border-2 border-black flex items-center justify-between cursor-pointer font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FFE600] text-black neo-shadow-sm border-black scale-[1.01]'
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-800 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.type === 'app' && (
                      <div
                        className="w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center font-black text-black"
                        style={{ backgroundColor: item.color || '#FFE600' }}
                      >
                        {item.label.substring(0, 1)}
                      </div>
                    )}
                    {item.type === 'file' && (
                      <div className="w-9 h-9 rounded-xl border-2 border-black bg-blue-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <div className="font-extrabold text-sm">{item.label}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                        {item.type === 'app' ? `App • ${item.category}` : `File in ${item.parentId}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-mono">
                    <span>OPEN</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-2.5 bg-gray-100 dark:bg-zinc-800 border-t-2 border-black flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
            <div className="flex items-center space-x-1 text-purple-600 font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OS Kids Intelligence</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
