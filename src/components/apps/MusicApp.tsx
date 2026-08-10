import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Disc } from 'lucide-react';

export const MusicApp: React.FC = () => {
  const tracks = [
    { id: '1', title: 'Tahoe Synth Horizon', artist: 'Neobrutal Beats', album: 'Expressive 15.0', duration: '3:45', color: '#FF4757' },
    { id: '2', title: 'Silicon Valley Sunset', artist: 'M3 Max Groove', album: 'Expressive 15.0', duration: '4:12', color: '#FFE600' },
    { id: '3', title: 'Zero Glassmorphism', artist: 'Solid Layer', album: 'Pure Architecture', duration: '2:58', color: '#4D96FF' },
    { id: '4', title: 'Bouncy Spring Physics', artist: 'Motion React', album: 'Pure Architecture', duration: '3:30', color: '#6BCB77' },
  ];

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Top Header */}
      <div className="p-3 bg-[#FF4757] text-white border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <Music className="w-5 h-5 stroke-[2.5]" />
          <span>OS Kids Music Player</span>
        </div>
        <span className="px-2.5 py-0.5 bg-black text-white border border-white rounded-full font-mono text-[10px]">
          STEREO HI-FI
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Track List */}
        <div className="w-64 bg-gray-100 dark:bg-zinc-800 border-r-3 border-black p-3 space-y-2 overflow-auto">
          <div className="text-[10px] font-mono uppercase text-gray-500 mb-2">Library Tracks ({tracks.length})</div>
          {tracks.map(t => (
            <div
              key={t.id}
              onClick={() => {
                setCurrentTrack(t);
                setIsPlaying(true);
              }}
              className={`p-3 rounded-2xl border-2 border-black cursor-pointer transition-all flex items-center justify-between ${
                currentTrack.id === t.id
                  ? 'bg-black text-white neo-shadow-sm font-black scale-105'
                  : 'bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-red-100'
              }`}
            >
              <div>
                <div className="font-extrabold text-xs truncate">{t.title}</div>
                <div className="text-[10px] opacity-70 font-mono">{t.artist}</div>
              </div>
              <span className="text-[10px] font-mono">{t.duration}</span>
            </div>
          ))}
        </div>

        {/* Now Playing Main View */}
        <div className="flex-1 p-6 flex flex-col items-center justify-between bg-[#FFFEE0] dark:bg-zinc-950">
          {/* Album Artwork Display */}
          <div className="flex flex-col items-center space-y-4 my-auto">
            <div
              className={`w-48 h-48 rounded-3xl border-4 border-black neo-shadow-xl flex items-center justify-center transition-transform ${
                isPlaying ? 'scale-105 rotate-1' : ''
              }`}
              style={{ backgroundColor: currentTrack.color }}
            >
              <Disc className={`w-24 h-24 text-black ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-black">{currentTrack.title}</h2>
              <p className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">{currentTrack.artist} • {currentTrack.album}</p>
            </div>

            {/* Visualizer Equalizer */}
            {isPlaying && (
              <div className="flex items-end space-x-1 h-8">
                <span className="w-2 bg-black dark:bg-white animate-bounce rounded-full h-full" />
                <span className="w-2 bg-black dark:bg-white animate-bounce rounded-full h-1/2 delay-100" />
                <span className="w-2 bg-black dark:bg-white animate-bounce rounded-full h-3/4 delay-200" />
                <span className="w-2 bg-black dark:bg-white animate-bounce rounded-full h-2/3 delay-150" />
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="w-full max-w-md p-4 bg-white dark:bg-zinc-900 border-3 border-black rounded-3xl neo-shadow flex items-center justify-between">
            <button
              onClick={() => setLiked(prev => ({ ...prev, [currentTrack.id]: !prev[currentTrack.id] }))}
              className={`p-2 border-2 border-black rounded-full ${
                liked[currentTrack.id] ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-zinc-800'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const idx = tracks.findIndex(t => t.id === currentTrack.id);
                  const prevIdx = (idx - 1 + tracks.length) % tracks.length;
                  setCurrentTrack(tracks[prevIdx]);
                }}
                className="p-2 bg-gray-100 dark:bg-zinc-800 border-2 border-black rounded-full hover:bg-black hover:text-white"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-[#FFE600] text-black border-3 border-black rounded-full neo-shadow-sm hover:scale-110 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6 stroke-[3]" /> : <Play className="w-6 h-6 stroke-[3] ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  const idx = tracks.findIndex(t => t.id === currentTrack.id);
                  const nextIdx = (idx + 1) % tracks.length;
                  setCurrentTrack(tracks[nextIdx]);
                }}
                className="p-2 bg-gray-100 dark:bg-zinc-800 border-2 border-black rounded-full hover:bg-black hover:text-white"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <Volume2 className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
