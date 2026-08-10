import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, Trash2 } from 'lucide-react';

export const CalendarApp: React.FC = () => {
  const { events, addEvent, deleteEvent } = useOS();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newCategory, setNewCategory] = useState('Work');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addEvent({
      title: newTitle,
      date: currentDate.toISOString().split('T')[0],
      time: newTime,
      category: newCategory,
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Calendar Header */}
      <div className="p-3 bg-[#3B82F6] text-white border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 stroke-[2.5]" />
          <span>OS Kids Calendar</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-1 bg-white text-black border-2 border-black rounded-lg hover:bg-black hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>
          <span className="px-3 py-1 bg-black text-white border-2 border-black rounded-full font-mono font-bold text-xs">
            {monthName}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-1 bg-white text-black border-2 border-black rounded-lg hover:bg-black hover:text-white"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1 bg-[#FFE600] text-black border-2 border-black rounded-full font-extrabold text-xs neo-shadow-sm flex items-center space-x-1 hover:bg-yellow-400"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Month Days Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-7 gap-2 mb-2 text-center font-extrabold text-xs uppercase font-mono text-gray-500">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isToday = dayNum === new Date().getDate();

              return (
                <div
                  key={dayNum}
                  className={`p-2 min-h-[70px] border-2 border-black rounded-2xl neo-shadow-sm flex flex-col justify-between font-bold text-xs transition-transform hover:scale-105 ${
                    isToday ? 'bg-[#FFE600] text-black ring-3 ring-black font-extrabold' : 'bg-gray-50 dark:bg-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono">{dayNum}</span>
                    {isToday && <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded-full font-mono">TODAY</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="w-72 bg-gray-100 dark:bg-zinc-800 border-l-3 border-black p-4 space-y-3 overflow-auto">
          <div className="font-extrabold text-xs flex items-center justify-between border-b-2 border-black pb-2">
            <span>Scheduled Events ({events.length})</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>

          {events.map(e => (
            <div key={e.id} className="p-3 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl neo-shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs">{e.title}</span>
                <button onClick={() => deleteEvent(e.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>{e.time}</span>
                <span className="px-2 py-0.5 bg-[#FFE600] text-black border border-black rounded-full font-bold">
                  {e.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center p-4">
          <form
            onSubmit={handleAddEvent}
            className="w-full max-w-sm bg-white dark:bg-zinc-900 border-4 border-black rounded-3xl neo-shadow-xl p-5 space-y-3 text-black dark:text-white"
          >
            <h3 className="font-black text-base border-b-2 border-black pb-2">Add New Calendar Event</h3>
            <div>
              <label className="text-xs font-bold font-mono">Event Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Design Review Sync"
                className="w-full p-2 bg-gray-100 dark:bg-zinc-800 border-2 border-black rounded-xl font-bold text-xs mt-1 outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold font-mono">Time</label>
              <input
                type="text"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full p-2 bg-gray-100 dark:bg-zinc-800 border-2 border-black rounded-xl font-bold text-xs mt-1 outline-none"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 bg-gray-200 text-black border-2 border-black rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#FFE600] text-black border-2 border-black rounded-xl font-extrabold text-xs neo-shadow-sm"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
