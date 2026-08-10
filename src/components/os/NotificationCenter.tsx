import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';
import { Bell, Trash2, Calendar, CloudSun, Cpu, HardDrive, Sparkles, X } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    notificationCenterOpen,
    setNotificationCenterOpen,
    notifications,
    clearNotifications,
    events,
  } = useOS();

  if (!notificationCenterOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-9 right-2 bottom-16 z-[9995] w-80 sm:w-96 select-none flex flex-col">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="h-full bg-white dark:bg-zinc-900 border-4 border-black rounded-3xl neo-shadow-xl p-4 overflow-auto flex flex-col space-y-4 text-black dark:text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#FF597B] text-white border-2 border-black rounded-xl">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm">Notification Center</span>
            </div>
            <button
              onClick={() => setNotificationCenterOpen(false)}
              className="p-1 bg-black text-white border-2 border-black rounded-xl hover:bg-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Widgets Grid */}
          <div className="space-y-3">
            {/* Weather Widget Card */}
            <div className="p-3 bg-[#4D96FF] text-white border-3 border-black rounded-2xl neo-shadow-sm flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm">Cupertino / Silicon Valley</div>
                <div className="text-2xl font-black font-mono">74°F Sunny</div>
                <div className="text-[10px] text-blue-100 font-mono">H: 78° L: 58° • Ideal OS Day</div>
              </div>
              <CloudSun className="w-10 h-10 text-yellow-300 stroke-[2]" />
            </div>

            {/* Calendar Agenda Widget */}
            <div className="p-3 bg-[#FFFEE0] text-black border-3 border-black rounded-2xl neo-shadow-sm space-y-2">
              <div className="flex items-center justify-between font-extrabold text-xs">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Today's Agenda</span>
                </div>
                <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded-full">
                  {events.length} Events
                </span>
              </div>
              <div className="space-y-1.5 text-xs font-semibold">
                {events.map(evt => (
                  <div key={evt.id} className="p-2 bg-white border-2 border-black rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold">{evt.title}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{evt.time}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#FFE600] border border-black rounded-full text-[9px] font-bold">
                      {evt.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Performance Gauges Widget */}
            <div className="p-3 bg-[#6BCB77] text-black border-3 border-black rounded-2xl neo-shadow-sm space-y-2">
              <div className="font-extrabold text-xs flex items-center space-x-1">
                <Cpu className="w-4 h-4" />
                <span>Apple M3 Max Performance</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-2 bg-white border-2 border-black rounded-xl">
                  <div className="text-[10px] text-gray-500 font-mono">CPU Usage</div>
                  <div className="text-lg font-black font-mono text-emerald-600">12%</div>
                </div>
                <div className="p-2 bg-white border-2 border-black rounded-xl">
                  <div className="text-[10px] text-gray-500 font-mono">Unified RAM</div>
                  <div className="text-lg font-black font-mono text-blue-600">18.4 / 64GB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="flex-1 space-y-2 pt-2">
            <div className="flex items-center justify-between font-extrabold text-xs">
              <span>Notifications ({notifications.length})</span>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-[10px] font-mono text-red-600 dark:text-red-400 hover:underline flex items-center space-x-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500 font-mono border-2 border-dashed border-black rounded-2xl">
                No recent notifications
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className="p-3 bg-white dark:bg-zinc-800 border-2 border-black rounded-2xl neo-shadow-sm space-y-1">
                  <div className="flex items-center justify-between font-extrabold text-xs">
                    <span className="text-purple-600 dark:text-purple-400">{n.title}</span>
                    <span className="text-[9px] font-mono text-gray-400">{n.time}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{n.message}</div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
