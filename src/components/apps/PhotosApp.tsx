import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, Play, Info, Heart } from 'lucide-react';

export const PhotosApp: React.FC = () => {
  const photos = [
    { id: '1', title: 'Tahoe Pop Sunset', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', date: 'August 2026' },
    { id: '2', title: 'Neobrutalist Art Canvas', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', date: 'July 2026' },
    { id: '3', title: 'Material Geometry', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80', date: 'June 2026' },
    { id: '4', title: 'Silicon Valley Dusk', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80', date: 'May 2026' },
  ];

  const [activePhoto, setActivePhoto] = useState(photos[0]);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Top Bar */}
      <div className="p-3 bg-[#6BCB77] text-black border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-5 h-5 stroke-[2.5]" />
          <span>OS Kids Photos Library</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLikes(prev => ({ ...prev, [activePhoto.id]: !prev[activePhoto.id] }))}
            className={`p-1.5 border-2 border-black rounded-xl neo-shadow-sm ${
              likes[activePhoto.id] ? 'bg-red-500 text-white' : 'bg-white text-black'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Main Photo Gallery */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails Sidebar */}
        <div className="w-52 bg-gray-100 dark:bg-zinc-800 border-r-3 border-black p-3 space-y-3 overflow-auto">
          <div className="text-[10px] font-mono uppercase text-gray-500">Recents ({photos.length})</div>
          {photos.map(p => (
            <div
              key={p.id}
              onClick={() => setActivePhoto(p)}
              className={`p-2 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl neo-shadow-sm cursor-pointer hover:scale-105 transition-transform ${
                activePhoto.id === p.id ? 'ring-3 ring-black bg-yellow-100 dark:bg-zinc-700' : ''
              }`}
            >
              <img src={p.url} alt={p.title} className="w-full h-24 object-cover rounded-xl border border-black mb-1" />
              <div className="font-extrabold text-[11px] truncate">{p.title}</div>
            </div>
          ))}
        </div>

        {/* Display Area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-zinc-950 relative">
          <img
            src={activePhoto.url}
            alt={activePhoto.title}
            className="max-h-[380px] max-w-full object-contain border-4 border-black rounded-3xl neo-shadow-xl"
          />
          <div className="mt-4 px-4 py-2 bg-white text-black border-2 border-black rounded-full font-extrabold text-xs neo-shadow flex items-center space-x-3">
            <span>📷 {activePhoto.title}</span>
            <span className="text-gray-500 font-mono text-[10px]">{activePhoto.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
