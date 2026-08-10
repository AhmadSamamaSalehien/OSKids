import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_CATALOG } from '../../utils/appCatalog';
import { AppId } from '../../types/os';
import { ShoppingBag, Download, Check, Star, Sparkles, Search } from 'lucide-react';

export const AppStoreApp: React.FC = () => {
  const { openApp } = useOS();
  const [installedApps, setInstalledApps] = useState<Record<string, boolean>>({
    finder: true,
    safari: true,
    terminal: true,
    settings: true,
    notes: true,
    calculator: true,
    photos: true,
    music: true,
    calendar: true,
    textedit: true,
    gemini: true,
  });

  const featured = [
    { id: 'gemini', tag: 'ESSENTIAL AI', title: 'Gemini Copilot 2.5', desc: 'Integrated system intelligence for OS Kids.', color: '#8B5CF6' },
    { id: 'safari', tag: 'SPEED & SECURITY', title: 'Safari Browser', desc: 'The world\'s fastest browser with built-in privacy.', color: '#4D96FF' },
    { id: 'music', tag: 'NEOBRUTAL AUDIO', title: 'Music & Beats', desc: 'Stream millions of tracks with high-fidelity equalizer.', color: '#FF4757' },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* App Store Header */}
      <div className="p-3 bg-[#06B6D4] text-white border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
          <span>OS Kids App Store</span>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Discover apps, games, tools..."
            className="px-3 py-1 bg-white text-black border-2 border-black rounded-full font-bold text-xs outline-none w-48"
          />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto space-y-6">
        {/* Featured Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map(item => (
            <div
              key={item.id}
              className="p-5 border-3 border-black rounded-3xl neo-shadow flex flex-col justify-between text-white"
              style={{ backgroundColor: item.color }}
            >
              <div>
                <span className="px-2.5 py-0.5 bg-black/40 text-white rounded-full font-mono text-[9px] uppercase font-bold">
                  {item.tag}
                </span>
                <h3 className="text-xl font-black mt-2">{item.title}</h3>
                <p className="text-xs font-medium text-white/90 mt-1">{item.desc}</p>
              </div>

              <button
                onClick={() => openApp(item.id as AppId)}
                className="mt-4 py-2 px-4 bg-white text-black border-2 border-black rounded-2xl font-black text-xs neo-shadow-sm hover:scale-105 transition-transform w-max"
              >
                OPEN APP
              </button>
            </div>
          ))}
        </div>

        {/* All App Catalog Grid */}
        <div className="space-y-3">
          <h2 className="text-lg font-black border-b-2 border-black pb-2">All Native Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(APP_CATALOG).map(app => {
              const isInstalled = installedApps[app.id];

              return (
                <div
                  key={app.id}
                  className="p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-3xl neo-shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center font-black text-black"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">{app.name}</div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase">{app.category}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openApp(app.id)}
                    className="px-3 py-1.5 bg-[#FFE600] text-black border-2 border-black rounded-full font-black text-xs neo-shadow-sm hover:bg-yellow-400 flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>OPEN</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
