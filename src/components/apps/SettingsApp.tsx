import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Sliders, Palette, Monitor, Volume2, Info, Check, Moon, Sun, Shield } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const { theme, updateTheme } = useOS();
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'appearance' | 'dock' | 'about'>('wallpaper');

  const wallpapers = [
    { id: 'tahoe-expressive', name: 'Tahoe Expressive (Default)', bg: 'bg-[#FFE600]', desc: 'Solid Neobrutalist geometric pop shapes' },
    { id: 'tahoe-sunset', name: 'Tahoe Pop Sunset', bg: 'bg-gradient-to-r from-pink-500 via-amber-400 to-blue-500', desc: 'Vivid high-contrast gradient' },
    { id: 'material-you', name: 'Material You Palette', bg: 'bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-400', desc: 'Google M3 Expressive dynamic tones' },
    { id: 'dark-grid', name: 'Dark Monolith Grid', bg: 'bg-zinc-900', desc: 'Minimalist dark engineering canvas' },
    { id: 'abstract-pop', name: 'Pop Dot Pattern', bg: 'bg-yellow-400', desc: 'Playful halftone retro pattern' },
  ];

  const accentColors = [
    { name: 'Tahoe Gold', hex: '#FFE600' },
    { name: 'Hot Pink', hex: '#FF597B' },
    { name: 'Cobalt Blue', hex: '#4D96FF' },
    { name: 'Mint Green', hex: '#6BCB77' },
    { name: 'Vivid Orange', hex: '#FF9F29' },
    { name: 'Purple Ray', hex: '#8B5CF6' },
  ];

  return (
    <div className="h-full flex bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Settings Left Navigation Sidebar */}
      <div className="w-56 bg-gray-100 dark:bg-zinc-800 border-r-3 border-black p-3 space-y-1 font-bold text-xs">
        <div className="p-2 mb-3 bg-[#FFFEE0] dark:bg-zinc-900 border-2 border-black rounded-2xl flex items-center space-x-2 neo-shadow-sm">
          <Sliders className="w-5 h-5 text-black dark:text-white stroke-[2.5]" />
          <div>
            <div className="font-extrabold text-sm">System Settings</div>
            <div className="text-[10px] text-gray-500 font-mono">OS Kids v1.0</div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('wallpaper')}
          className={`w-full text-left px-3 py-2.5 rounded-2xl border-2 flex items-center space-x-2.5 transition-all ${
            activeTab === 'wallpaper' ? 'bg-[#FFE600] text-black border-black neo-shadow-sm font-black' : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Wallpaper Gallery</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`w-full text-left px-3 py-2.5 rounded-2xl border-2 flex items-center space-x-2.5 transition-all ${
            activeTab === 'appearance' ? 'bg-[#FFE600] text-black border-black neo-shadow-sm font-black' : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Appearance & Colors</span>
        </button>

        <button
          onClick={() => setActiveTab('dock')}
          className={`w-full text-left px-3 py-2.5 rounded-2xl border-2 flex items-center space-x-2.5 transition-all ${
            activeTab === 'dock' ? 'bg-[#FFE600] text-black border-black neo-shadow-sm font-black' : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Dock & Menu Bar</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`w-full text-left px-3 py-2.5 rounded-2xl border-2 flex items-center space-x-2.5 transition-all ${
            activeTab === 'about' ? 'bg-[#FFE600] text-black border-black neo-shadow-sm font-black' : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>About OS Kids</span>
        </button>
      </div>

      {/* Settings Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'wallpaper' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black">Desktop Wallpaper Gallery</h2>
            <p className="text-xs text-gray-500 font-mono">Select a Neobrutalist or Material 3 Expressive wallpaper canvas</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wallpapers.map(wp => (
                <div
                  key={wp.id}
                  onClick={() => updateTheme({ wallpaperId: wp.id })}
                  className={`p-4 border-3 border-black rounded-3xl neo-shadow cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between h-36 ${
                    wp.bg
                  } ${theme.wallpaperId === wp.id ? 'ring-4 ring-black shadow-xl scale-[1.02]' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-black text-sm px-3 py-1 bg-white text-black border-2 border-black rounded-full neo-shadow-sm">
                      {wp.name}
                    </span>
                    {theme.wallpaperId === wp.id && (
                      <div className="p-1 bg-black text-white rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-mono font-bold px-2 py-1 bg-black/80 text-white rounded-lg w-max">
                    {wp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-xl font-black">Appearance & Color Tokens</h2>

            {/* Dark Mode */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-3xl neo-shadow flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm">Theme Mode</div>
                <div className="text-xs text-gray-500">Switch between Light and Dark Neobrutalism</div>
              </div>
              <button
                onClick={() => updateTheme({ darkMode: !theme.darkMode })}
                className="px-4 py-2 bg-[#FFE600] text-black border-2 border-black rounded-full font-black neo-shadow-sm hover:scale-105 flex items-center space-x-1.5"
              >
                {theme.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>{theme.darkMode ? 'Dark' : 'Light'}</span>
              </button>
            </div>

            {/* Accent Colors */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-3xl neo-shadow space-y-3">
              <div className="font-extrabold text-sm">System Accent Color</div>
              <div className="flex flex-wrap gap-3">
                {accentColors.map(ac => (
                  <button
                    key={ac.hex}
                    onClick={() => updateTheme({ accentColor: ac.hex, accentName: ac.name })}
                    className={`w-10 h-10 rounded-full border-3 border-black flex items-center justify-center neo-shadow-sm transition-transform ${
                      theme.accentColor === ac.hex ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: ac.hex }}
                    title={ac.name}
                  >
                    {theme.accentColor === ac.hex && <Check className="w-5 h-5 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound FX Toggle */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-3xl neo-shadow flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm">Tactile Audio Feedback</div>
                <div className="text-xs text-gray-500">Play web audio clicks and window sounds</div>
              </div>
              <button
                onClick={() => updateTheme({ soundEnabled: !theme.soundEnabled })}
                className={`px-4 py-2 border-2 border-black rounded-full font-black neo-shadow-sm ${
                  theme.soundEnabled ? 'bg-[#6BCB77] text-black' : 'bg-gray-300 text-black'
                }`}
              >
                {theme.soundEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dock' && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-xl font-black">Dock & Widgets Settings</h2>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-3xl neo-shadow space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm">Desktop Widgets Grid</div>
                  <div className="text-xs text-gray-500">Show weather, clock, and stats cards on desktop</div>
                </div>
                <button
                  onClick={() => updateTheme({ widgetVisible: !theme.widgetVisible })}
                  className={`px-4 py-2 border-2 border-black rounded-full font-black ${
                    theme.widgetVisible ? 'bg-[#4D96FF] text-white' : 'bg-gray-300'
                  }`}
                >
                  {theme.widgetVisible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="p-6 bg-[#FFFEE0] dark:bg-zinc-800 border-4 border-black rounded-3xl neo-shadow-xl space-y-4 max-w-lg text-black dark:text-white">
            <div className="text-center space-y-1">
              <div className="w-20 h-20 mx-auto bg-[#FFE600] border-3 border-black rounded-3xl neo-shadow flex items-center justify-center font-black text-3xl">
                
              </div>
              <h1 className="text-2xl font-black mt-2">OS Kids</h1>
              <p className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">
                Version 15.0 (Build 24A5260)
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-900 border-3 border-black rounded-2xl neo-shadow-sm space-y-2 text-xs font-bold font-mono">
              <div className="flex justify-between py-1 border-b border-black">
                <span>Processor:</span>
                <span>Apple M3 Max (16-core)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black">
                <span>Graphics:</span>
                <span>40-Core GPU Engine</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black">
                <span>Memory:</span>
                <span>64 GB Unified LPDDR5</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black">
                <span>Design System:</span>
                <span>Neobrutalism + Material 3</span>
              </div>
              <div className="flex justify-between py-1 text-purple-600 font-extrabold">
                <span>Glassmorphism:</span>
                <span>0% (Strictly Solid)</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-gray-500 font-mono">
              TM and © 2026 Apple Inc. All rights reserved.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
