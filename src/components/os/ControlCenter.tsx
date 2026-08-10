import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';
import {
  Wifi,
  Bluetooth,
  Radio,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  Music,
  Sliders,
  Sparkles,
  Volume1,
} from 'lucide-react';

export const ControlCenter: React.FC = () => {
  const { controlCenterOpen, setControlCenterOpen, theme, updateTheme, openApp } = useOS();

  if (!controlCenterOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-10 right-3 z-[9995] select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="w-80 sm:w-96 bg-white dark:bg-zinc-900 border-3 border-black rounded-3xl neo-shadow-xl p-4 text-black dark:text-white space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-extrabold pb-2 border-b-2 border-black">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#4D96FF] border-2 border-black rounded-xl">
                <Sliders className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Control Center</span>
            </div>
            <button
              onClick={() => setControlCenterOpen(false)}
              className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-200 dark:bg-zinc-800 border-2 border-black rounded-lg hover:bg-black hover:text-white"
            >
              CLOSE
            </button>
          </div>

          {/* Quick Connectivity Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Wi-Fi */}
            <div className="p-3 bg-[#FFFEE0] dark:bg-zinc-800 border-2 border-black rounded-2xl neo-shadow-sm flex items-center space-x-3">
              <div className="p-2 bg-[#6BCB77] border-2 border-black rounded-xl">
                <Wifi className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-xs">Wi-Fi</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400 font-mono">Connected</div>
              </div>
            </div>

            {/* Bluetooth */}
            <div className="p-3 bg-[#E0E7FF] dark:bg-zinc-800 border-2 border-black rounded-2xl neo-shadow-sm flex items-center space-x-3">
              <div className="p-2 bg-[#4D96FF] border-2 border-black rounded-xl">
                <Bluetooth className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-xs">Bluetooth</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400 font-mono">On (AirPods)</div>
              </div>
            </div>

            {/* AirDrop */}
            <div className="p-3 bg-[#FFE600] dark:bg-zinc-800 border-2 border-black rounded-2xl neo-shadow-sm flex items-center space-x-3">
              <div className="p-2 bg-[#FFBD2E] border-2 border-black rounded-xl">
                <Radio className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-xs">AirDrop</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400 font-mono">Everyone</div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => updateTheme({ darkMode: !theme.darkMode })}
              className={`p-3 border-2 border-black rounded-2xl neo-shadow-sm flex items-center space-x-3 text-left transition-all hover:scale-[1.02] ${
                theme.darkMode ? 'bg-zinc-800 text-white' : 'bg-[#FF597B] text-white'
              }`}
            >
              <div className="p-2 bg-black text-white border-2 border-white/40 rounded-xl">
                {theme.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-xs">Dark Mode</div>
                <div className="text-[10px] font-mono">{theme.darkMode ? 'Enabled' : 'Disabled'}</div>
              </div>
            </button>
          </div>

          {/* Sound FX & High Contrast Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateTheme({ soundEnabled: !theme.soundEnabled })}
              className={`p-2.5 border-2 border-black rounded-2xl flex items-center space-x-2 font-bold text-xs ${
                theme.soundEnabled ? 'bg-[#27C93F] text-black' : 'bg-gray-200 dark:bg-zinc-800'
              }`}
            >
              <Volume1 className="w-4 h-4" />
              <span>Sound FX: {theme.soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateTheme({ highContrast: !theme.highContrast })}
              className={`p-2.5 border-2 border-black rounded-2xl flex items-center space-x-2 font-bold text-xs ${
                theme.highContrast ? 'bg-black text-white' : 'bg-gray-200 dark:bg-zinc-800'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>High Contrast</span>
            </button>
          </div>

          {/* Now Playing Widget */}
          <div
            onClick={() => openApp('music')}
            className="p-3 bg-[#FF4757] text-white border-3 border-black rounded-2xl neo-shadow-sm flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black border-2 border-white rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <div className="font-extrabold text-xs">Tahoe Synth Wave</div>
                <div className="text-[10px] font-mono text-red-100">Neobrutal Beats • Playing</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1 h-4 bg-yellow-300 animate-pulse rounded-full" />
              <span className="w-1 h-6 bg-yellow-300 animate-pulse rounded-full delay-100" />
              <span className="w-1 h-3 bg-yellow-300 animate-pulse rounded-full delay-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
