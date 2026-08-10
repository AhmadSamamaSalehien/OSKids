import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_CATALOG } from '../../utils/appCatalog';
import { AppId } from '../../types/os';
import {
  Apple,
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  Search,
  Sliders,
  Bell,
  Sparkles,
  Check,
  Power,
  RotateCcw,
  Moon,
  Info,
  Settings,
  ShoppingBag,
  Clock,
  XCircle,
  Lock,
  User,
  ChevronRight,
  LogOut,
  Terminal,
  Compass,
  FileText,
  Calculator,
} from 'lucide-react';

export const MenuBar: React.FC = () => {
  const {
    activeAppId,
    openApp,
    windows,
    closeWindow,
    theme,
    updateTheme,
    spotlightOpen,
    setSpotlightOpen,
    controlCenterOpen,
    setControlCenterOpen,
    notificationCenterOpen,
    setNotificationCenterOpen,
    notifications,
  } = useOS();

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [wifiConnected, setWifiConnected] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [batteryLevel] = useState(98);

  // New macOS state handlers
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [showRecentItems, setShowRecentItems] = useState(false);
  const [forceQuitOpen, setForceQuitOpen] = useState(false);
  const [selectedForceQuitId, setSelectedForceQuitId] = useState<string | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  // Clock ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setDate(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setShowRecentItems(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCatalog = APP_CATALOG[activeAppId] || APP_CATALOG.finder;

  // App specific menu items
  const getAppMenus = (appId: AppId) => {
    switch (appId) {
      case 'finder':
        return ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];
      case 'safari':
        return ['File', 'Edit', 'View', 'History', 'Bookmarks', 'Window'];
      case 'terminal':
        return ['Shell', 'Edit', 'View', 'Profiles', 'Window'];
      case 'gemini':
        return ['Model', 'Prompt', 'History', 'Window'];
      case 'notes':
        return ['File', 'Edit', 'Format', 'View', 'Window'];
      case 'textedit':
        return ['File', 'Edit', 'Format', 'View', 'Window'];
      default:
        return ['File', 'Edit', 'View', 'Window', 'Help'];
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div
        ref={menuRef}
        className="fixed top-0 left-0 right-0 h-8 bg-[#FFFEE0] text-black font-semibold text-xs border-b-3 border-black z-[9999] flex items-center justify-between px-3 select-none neo-shadow-sm"
        style={{ backgroundColor: theme.darkMode ? '#27272A' : '#FFFEE0', color: theme.darkMode ? '#FFFFFF' : '#000000' }}
      >
        {/* Left Menu Section */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-visible py-0.5">
          {/* Authentic Corner Apple Icon Button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'apple' ? null : 'apple')}
              className={`px-2.5 py-1 rounded-lg flex items-center justify-center transition-all border-2 border-black font-extrabold neo-shadow-sm hover:scale-105 active:scale-95 ${
                activeDropdown === 'apple'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-[#FFE600] text-black hover:bg-yellow-400'
              }`}
              title="Apple Menu"
            >
              <Apple className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Authentic macOS Apple Dropdown */}
            {activeDropdown === 'apple' && (
              <div className="absolute top-9 left-0 w-64 bg-white dark:bg-zinc-900 border-3 border-black text-black dark:text-white rounded-2xl neo-shadow-xl py-2 z-[100000] text-xs font-semibold space-y-0.5">
                {/* About OS Kids */}
                <button
                  onClick={() => {
                    setAboutModalOpen(true);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center justify-between font-extrabold rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-500 stroke-[2.5]" />
                    <span>About OS Kids</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60 bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">Kids v1.0</span>
                </button>

                <div className="my-1 border-t-2 border-black/10 dark:border-white/10" />

                {/* System Settings */}
                <button
                  onClick={() => {
                    openApp('settings');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center space-x-2 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span>System Settings...</span>
                </button>

                {/* App Store */}
                <button
                  onClick={() => {
                    openApp('appstore');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center space-x-2 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-500 stroke-[2.5]" />
                  <span>App Store...</span>
                </button>

                <div className="my-1 border-t-2 border-black/10 dark:border-white/10" />

                {/* Recent Items Submenu */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowRecentItems(true)}
                  onMouseLeave={() => setShowRecentItems(false)}
                >
                  <button
                    className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center justify-between rounded-lg transition-colors font-semibold"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-500 stroke-[2.5]" />
                      <span>Recent Items</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {showRecentItems && (
                    <div className="absolute top-0 left-full ml-1 w-52 bg-white dark:bg-zinc-900 border-3 border-black text-black dark:text-white rounded-2xl neo-shadow-xl py-1.5 text-xs z-[100001] space-y-0.5">
                      <div className="px-3 py-1 text-[10px] uppercase font-black tracking-wider text-zinc-400">Applications</div>
                      {[
                        { name: 'Safari Browser', id: 'safari' as AppId, icon: Compass },
                        { name: 'Gemini Copilot AI', id: 'gemini' as AppId, icon: Sparkles },
                        { name: 'Terminal', id: 'terminal' as AppId, icon: Terminal },
                        { name: 'Notes', id: 'notes' as AppId, icon: FileText },
                        { name: 'Calculator', id: 'calculator' as AppId, icon: Calculator },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            openApp(item.id);
                            setActiveDropdown(null);
                            setShowRecentItems(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center space-x-2 rounded-lg font-bold"
                        >
                          <item.icon className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="my-1 border-t-2 border-black/10 dark:border-white/10" />

                {/* Force Quit */}
                <button
                  onClick={() => {
                    setForceQuitOpen(true);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center justify-between rounded-lg transition-colors font-bold"
                >
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 stroke-[2.5]" />
                    <span>Force Quit...</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-black/10 dark:bg-white/10 px-1 rounded">⌥⌘Esc</span>
                </button>

                <div className="my-1 border-t-2 border-black/10 dark:border-white/10" />

                {/* Sleep */}
                <button
                  onClick={() => {
                    setIsSleeping(true);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center space-x-2 rounded-lg transition-colors font-bold"
                >
                  <Moon className="w-4 h-4 text-indigo-400 stroke-[2.5]" />
                  <span>Sleep</span>
                </button>

                {/* Restart */}
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restart OS Kids?')) {
                      window.location.reload();
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center space-x-2 rounded-lg transition-colors font-bold"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                  <span>Restart...</span>
                </button>

                {/* Shut Down Menu Option */}
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to shut down OS Kids?')) {
                      document.body.innerHTML = `
                        <div style="background:#000;color:#fff;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;user-select:none;">
                          <div style="width:72px;height:72px;background:#ffe600;border:4px solid #000;border-radius:24px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:6px 6px 0px #000;">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                          </div>
                          <h1 style="font-size:2rem;margin-bottom:0.5rem;font-weight:900;letter-spacing:-0.03em;">OS Kids is Powered Off</h1>
                          <p style="color:#888;font-size:0.9rem;margin-bottom:2rem;font-weight:600;">System state saved securely.</p>
                          <button onclick="location.reload()" style="background:#ffe600;color:#000;padding:14px 28px;border:3px solid #000;font-weight:900;font-size:1rem;border-radius:18px;cursor:pointer;box-shadow:4px 4px 0px #fff;transition:transform 0.1s;">Power On</button>
                        </div>
                      `;
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-red-500 hover:text-white flex items-center space-x-2 text-red-600 dark:text-red-400 font-black rounded-lg transition-colors"
                >
                  <Power className="w-4 h-4 stroke-[2.5]" />
                  <span>Shut Down...</span>
                </button>

                <div className="my-1 border-t-2 border-black/10 dark:border-white/10" />

                {/* Lock Screen */}
                <button
                  onClick={() => {
                    setIsLocked(true);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center justify-between rounded-lg transition-colors font-bold"
                >
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-zinc-500 stroke-[2.5]" />
                    <span>Lock Screen</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-black/10 dark:bg-white/10 px-1 rounded">⌃⌘Q</span>
                </button>

                {/* Log Out */}
                <button
                  onClick={() => {
                    setIsLocked(true);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-[#FFE600] hover:text-black flex items-center justify-between rounded-lg transition-colors font-bold"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4 text-orange-500 stroke-[2.5]" />
                    <span>Log Out Admin User...</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-black/10 dark:bg-white/10 px-1 rounded">⇧⌘Q</span>
                </button>
              </div>
            )}
          </div>

        {/* Active App Title */}
        <button
          onClick={() => openApp(activeAppId)}
          className="px-2 py-0.5 font-extrabold hover:bg-black/10 rounded-full transition-colors tracking-tight flex items-center space-x-1 flex-shrink-0"
        >
          <span>{activeCatalog.name}</span>
        </button>

        {/* App Menu Options */}
        {getAppMenus(activeAppId).map(menuItem => (
          <div key={menuItem} className="relative hidden md:block flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === menuItem ? null : menuItem)}
              className={`px-2 py-0.5 rounded-full transition-colors border-2 ${
                activeDropdown === menuItem
                  ? 'bg-black text-white border-black font-bold'
                  : 'hover:bg-black/10 border-transparent font-medium'
              }`}
            >
              {menuItem}
            </button>

            {activeDropdown === menuItem && (
              <div className="absolute top-8 left-0 w-48 bg-white dark:bg-zinc-900 border-3 border-black text-black dark:text-white rounded-xl neo-shadow-md py-1.5 z-[10000] text-xs font-medium">
                <button
                  onClick={() => {
                    alert(`${activeCatalog.name} - ${menuItem} action executed!`);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#FFE600] hover:text-black font-bold"
                >
                  New {activeCatalog.name} Item
                </button>
                <button
                  onClick={() => {
                    alert(`${activeCatalog.name} preferences opened.`);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#FFE600] hover:text-black"
                >
                  Preferences...
                </button>
                <div className="my-1 border-t-2 border-black" />
                <button
                  onClick={() => {
                    openApp(activeAppId);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-black hover:text-white"
                >
                  Bring All to Front
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right System Icons Section */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
        {/* Gemini Copilot Quick Launch */}
        <button
          onClick={() => openApp('gemini')}
          className="px-2 sm:px-2.5 py-0.5 bg-[#8B5CF6] text-white border-2 border-black rounded-full flex items-center space-x-1 font-black neo-shadow-sm hover:scale-105 active:scale-95 transition-transform"
          title="Open Gemini Copilot AI"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[10px] tracking-wider uppercase">Copilot</span>
        </button>

        {/* Wi-Fi Dropdown */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'wifi' ? null : 'wifi')}
            className={`p-1 rounded-full transition-colors border-2 ${
              activeDropdown === 'wifi' ? 'bg-black text-white border-black' : 'hover:bg-black/10 border-transparent'
            }`}
          >
            <Wifi className={`w-3.5 h-3.5 ${wifiConnected ? '' : 'text-gray-400'}`} />
          </button>

          {activeDropdown === 'wifi' && (
            <div className="absolute top-8 right-0 w-56 bg-white dark:bg-zinc-900 border-3 border-black text-black dark:text-white rounded-2xl neo-shadow-md p-3 z-[10000] text-xs">
              <div className="flex items-center justify-between font-bold mb-2">
                <span>Wi-Fi Network</span>
                <button
                  onClick={() => setWifiConnected(!wifiConnected)}
                  className={`w-10 h-5 border-2 border-black rounded-full flex items-center p-0.5 transition-colors ${
                    wifiConnected ? 'bg-[#6BCB77]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white border-2 border-black rounded-full transition-transform ${
                      wifiConnected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {wifiConnected ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-2 py-1.5 bg-[#FFE600] text-black border-2 border-black rounded-xl font-bold">
                    <span>Tahoe_5G_Fiber</span>
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="px-2 py-1 text-gray-500 hover:text-black dark:hover:text-white cursor-pointer">
                    Apple_Park_Guest
                  </div>
                  <div className="px-2 py-1 text-gray-500 hover:text-black dark:hover:text-white cursor-pointer">
                    Silicon_Valley_Hub
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 italic p-1">Wi-Fi is turned off</div>
              )}
            </div>
          )}
        </div>

        {/* Volume Popover */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'volume' ? null : 'volume')}
            className={`p-1 rounded-full transition-colors border-2 ${
              activeDropdown === 'volume' ? 'bg-black text-white border-black' : 'hover:bg-black/10 border-transparent'
            }`}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {activeDropdown === 'volume' && (
            <div className="absolute top-8 right-0 w-48 bg-white dark:bg-zinc-900 border-3 border-black text-black dark:text-white rounded-2xl neo-shadow-md p-3 z-[10000] text-xs">
              <div className="flex items-center justify-between font-bold mb-2">
                <span>Sound Level</span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-2 py-0.5 bg-[#FF597B] text-white border-2 border-black rounded-full font-bold text-[10px]"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={e => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-full accent-[#000000] cursor-pointer"
              />
              <div className="text-right text-[10px] font-mono mt-1 font-bold">{isMuted ? 'Muted' : `${volume}%`}</div>
            </div>
          )}
        </div>

        {/* High-Contrast Clear Battery Percentage Badge */}
        <div className="flex items-center space-x-1 px-2 py-0.5 bg-[#27C93F] text-black border-2 border-black rounded-full text-xs font-mono font-black neo-shadow-sm flex-shrink-0">
          <Battery className="w-3.5 h-3.5 text-black fill-current stroke-[2]" />
          <span>{batteryLevel}%</span>
        </div>

        {/* Spotlight Trigger */}
        <button
          onClick={() => setSpotlightOpen(!spotlightOpen)}
          className={`p-1.5 bg-[#FFE600] text-black border-2 border-black rounded-full neo-shadow-sm hover:scale-105 active:scale-95 transition-transform flex-shrink-0`}
          title="Spotlight Search (Cmd+Space)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => setControlCenterOpen(!controlCenterOpen)}
          className={`p-1.5 bg-[#4D96FF] text-white border-2 border-black rounded-full neo-shadow-sm hover:scale-105 active:scale-95 transition-transform flex-shrink-0 ${
            controlCenterOpen ? 'ring-2 ring-black' : ''
          }`}
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Notification Center Trigger */}
        <button
          onClick={() => setNotificationCenterOpen(!notificationCenterOpen)}
          className="relative p-1.5 bg-[#FF597B] text-white border-2 border-black rounded-full neo-shadow-sm hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-black border-2 border-black rounded-full text-[9px] font-black flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* High-Contrast Clear Date & Time Badge */}
        <button
          onClick={() => setNotificationCenterOpen(!notificationCenterOpen)}
          className="px-2.5 py-0.5 bg-[#FFE600] text-black border-2 border-black rounded-full hover:scale-105 transition-transform font-black text-xs whitespace-nowrap neo-shadow-sm flex items-center space-x-1 flex-shrink-0"
        >
          <span className="hidden sm:inline font-extrabold">{date}</span>
          <span className="bg-black text-white px-1.5 py-0.2 rounded-full font-mono text-[10px] font-black">{time}</span>
        </button>
      </div>
    </div>

      {/* Sleep Mode Overlay */}
      {isSleeping && (
        <div
          onClick={() => setIsSleeping(false)}
          className="fixed inset-0 bg-black z-[100000] flex flex-col items-center justify-center text-white space-y-4 cursor-pointer animate-fade-in select-none"
        >
          <Moon className="w-16 h-16 text-[#FFE600] animate-pulse" />
          <p className="text-2xl font-black tracking-wide">OS Kids is Asleep</p>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 border-2 border-zinc-700 px-5 py-2.5 rounded-full neo-shadow">
            Click anywhere or press any key to wake up
          </span>
        </div>
      )}

      {/* Lock Screen Overlay */}
      {isLocked && (
        <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-xl z-[100000] flex flex-col items-center justify-center text-white space-y-6 select-none p-4">
          <div className="text-center space-y-1">
            <h1 className="text-6xl font-black font-mono tracking-tight">{time}</h1>
            <p className="text-sm font-bold text-zinc-400">{date}</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-[#FFE600] border-4 border-black flex items-center justify-center text-black font-black text-3xl neo-shadow">
              <User className="w-12 h-12 stroke-[2.5]" />
            </div>
            <p className="font-extrabold text-lg">Admin User</p>
            <div className="flex items-center space-x-2">
              <input
                type="password"
                placeholder="Enter password..."
                value={lockPassword}
                onChange={(e) => setLockPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsLocked(false);
                }}
                className="px-4 py-2 bg-zinc-800 border-2 border-black rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
                autoFocus
              />
              <button
                onClick={() => setIsLocked(false)}
                className="px-4 py-2 bg-[#FFE600] text-black border-2 border-black rounded-xl font-extrabold text-sm neo-shadow hover:scale-105 active:scale-95"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Force Quit Window Modal */}
      {forceQuitOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-4 border-black rounded-3xl neo-shadow-xl p-6 text-black dark:text-white space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center space-x-2">
                <XCircle className="w-6 h-6 text-red-500 stroke-[2.5]" />
                <h2 className="font-black text-lg">Force Quit Applications</h2>
              </div>
              <button
                onClick={() => setForceQuitOpen(false)}
                className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              If an application doesn't respond, select its name and click Force Quit below.
            </p>

            <div className="border-2 border-black rounded-2xl p-2 bg-zinc-50 dark:bg-zinc-800 max-h-48 overflow-y-auto space-y-1">
              {windows.length === 0 ? (
                <p className="text-xs text-zinc-400 italic text-center py-4">No open applications</p>
              ) : (
                windows.map(win => (
                  <div
                    key={win.id}
                    onClick={() => setSelectedForceQuitId(win.id)}
                    className={`p-2.5 rounded-xl flex items-center justify-between border-2 cursor-pointer font-extrabold text-xs transition-all ${
                      selectedForceQuitId === win.id
                        ? 'bg-[#FFE600] text-black border-black neo-shadow-sm'
                        : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{win.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-black/10 rounded-full">Running</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setForceQuitOpen(false)}
                className="px-4 py-2 border-2 border-black rounded-xl font-extrabold text-xs hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                disabled={!selectedForceQuitId}
                onClick={() => {
                  if (selectedForceQuitId) {
                    closeWindow(selectedForceQuitId);
                    setSelectedForceQuitId(null);
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white border-2 border-black rounded-xl font-extrabold text-xs neo-shadow hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                Force Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About OS Kids Modal Window */}
      {aboutModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="w-full max-w-sm bg-[#FFFEE0] dark:bg-zinc-900 border-4 border-black rounded-3xl neo-shadow-xl p-6 text-black dark:text-white space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-500 stroke-[2.5]" />
                <h2 className="font-black text-base">About OS Kids</h2>
              </div>
              <button
                onClick={() => setAboutModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto bg-[#FFE600] border-3 border-black rounded-3xl neo-shadow flex items-center justify-center font-black text-4xl text-black hover:rotate-6 transition-transform">
                
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">OS Kids</h1>
                <p className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
                  Version 1.0 (Build 2026.KIDS.1)
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-zinc-800 border-2 border-black rounded-2xl neo-shadow-sm space-y-2 text-xs font-bold font-mono">
              <div className="flex justify-between py-0.5 border-b border-black/10 dark:border-white/10">
                <span className="text-zinc-500">Chip:</span>
                <span className="font-extrabold">Apple M3 Max</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/10 dark:border-white/10">
                <span className="text-zinc-500">Memory:</span>
                <span>64 GB Unified LPDDR5</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/10 dark:border-white/10">
                <span className="text-zinc-500">Serial No:</span>
                <span className="text-[10px]">OSK-2026-EXPRESSIVE</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/10 dark:border-white/10">
                <span className="text-zinc-500">UI Engine:</span>
                <span className="text-amber-600 dark:text-amber-400">Neobrutalism M3</span>
              </div>
              <div className="flex justify-between py-0.5 text-purple-600 dark:text-purple-400 font-black">
                <span>Glassmorphism:</span>
                <span>0% (Solid Opaque)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setAboutModalOpen(false);
                  openApp('settings');
                }}
                className="px-3.5 py-2 bg-[#FFE600] text-black border-2 border-black rounded-xl font-extrabold text-xs neo-shadow-sm hover:scale-105 active:scale-95"
              >
                System Settings...
              </button>
              <button
                onClick={() => setAboutModalOpen(false)}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black border-2 border-black rounded-xl font-extrabold text-xs neo-shadow-sm hover:scale-105 active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
