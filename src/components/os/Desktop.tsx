import React, { useState, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { FileItem } from '../../types/os';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Plus,
  Terminal,
  Settings,
  Sparkles,
  CloudSun,
  Clock,
  StickyNote,
  Cpu,
} from 'lucide-react';

export const Desktop: React.FC = () => {
  const {
    files,
    openApp,
    addFile,
    theme,
    notes,
    addNote,
    events,
  } = useOS();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Drag selection rectangle
  const [selectionBox, setSelectionBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const isSelectingRef = useRef(false);
  const selectionStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const desktopFiles = files.filter(f => f.parentId === 'desktop');

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handlePointerDownDesktop = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.desktop-icon') || (e.target as HTMLElement).closest('.context-menu')) {
      return;
    }
    setContextMenu(null);
    setSelectedFileId(null);

    isSelectingRef.current = true;
    selectionStartRef.current = { x: e.clientX, y: e.clientY };
    setSelectionBox({ x1: e.clientX, y1: e.clientY, x2: e.clientX, y2: e.clientY });
  };

  const handlePointerMoveDesktop = (e: React.MouseEvent) => {
    if (!isSelectingRef.current) return;
    setSelectionBox({
      x1: Math.min(selectionStartRef.current.x, e.clientX),
      y1: Math.min(selectionStartRef.current.y, e.clientY),
      x2: Math.max(selectionStartRef.current.x, e.clientX),
      y2: Math.max(selectionStartRef.current.y, e.clientY),
    });
  };

  const handlePointerUpDesktop = () => {
    isSelectingRef.current = false;
    setTimeout(() => setSelectionBox(null), 100);
  };

  // Wallpapers Solid Dynamic Backgrounds
  const getWallpaperClass = () => {
    switch (theme.wallpaperId) {
      case 'tahoe-sunset':
        return 'bg-gradient-to-br from-[#FF597B] via-[#FFBD2E] to-[#4D96FF]';
      case 'material-you':
        return 'bg-gradient-to-tr from-[#6BCB77] via-[#FFE600] to-[#FF4757]';
      case 'dark-grid':
        return 'bg-zinc-950 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:3rem_3rem]';
      case 'abstract-pop':
        return 'bg-[#FFE600] bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px]';
      default:
        return 'bg-[#FFE600] dark:bg-zinc-900';
    }
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onMouseDown={handlePointerDownDesktop}
      onMouseMove={handlePointerMoveDesktop}
      onMouseUp={handlePointerUpDesktop}
      className={`fixed inset-0 pt-8 pb-20 px-6 select-none overflow-hidden ${getWallpaperClass()}`}
    >
      {/* Neobrutalist Geometric Wallpaper Accents */}
      {theme.wallpaperId === 'tahoe-expressive' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-20 w-80 h-80 bg-[#FF597B] border-4 border-black rounded-3xl neo-shadow-lg rotate-3" />
          <div className="absolute bottom-24 right-20 w-96 h-96 bg-[#4D96FF] border-4 border-black rounded-full neo-shadow-lg -rotate-6" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#6BCB77] border-4 border-black rounded-3xl neo-shadow-lg rotate-12" />
        </div>
      )}

      {/* Desktop Widgets Area */}
      {theme.widgetVisible && (
        <div className="absolute top-12 right-6 space-y-4 w-72 hidden md:block z-10">
          {/* Weather Widget Card */}
          <div className="p-4 bg-white dark:bg-zinc-900 text-black dark:text-white border-3 border-black rounded-3xl neo-shadow-md">
            <div className="flex items-center justify-between font-extrabold text-xs mb-1">
              <span className="uppercase font-mono text-blue-600 dark:text-blue-400">Silicon Valley</span>
              <CloudSun className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black font-mono">72°F</div>
            <div className="text-xs font-bold text-gray-600 dark:text-gray-300">Mostly Sunny • Crisp Breeze</div>
          </div>

          {/* Quick Sticky Note Widget */}
          <div className="p-4 bg-[#FFBD2E] text-black border-3 border-black rounded-3xl neo-shadow-md space-y-2">
            <div className="flex items-center justify-between font-extrabold text-xs">
              <div className="flex items-center space-x-1">
                <StickyNote className="w-4 h-4" />
                <span>Desktop Sticky</span>
              </div>
              <button
                onClick={() => addNote({ title: 'New Sticky', content: 'Type note content here...', tags: ['Sticky'], color: '#FFE600' })}
                className="p-1 bg-black text-white rounded-lg hover:bg-white hover:text-black"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs font-semibold leading-relaxed line-clamp-3">
              {notes[0]?.content || 'Double click any desktop item or launch Gemini Copilot from menu bar!'}
            </p>
          </div>

          {/* Clock Widget */}
          <div className="p-4 bg-[#FFE600] text-black border-3 border-black rounded-3xl neo-shadow-md flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs text-gray-800">OS Kids Time</div>
              <div className="text-2xl font-black font-mono">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <Clock className="w-8 h-8 text-black stroke-[2.5]" />
          </div>
        </div>
      )}

      {/* Desktop File & Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-2xl relative z-10">
        {desktopFiles.map(file => {
          const isSelected = selectedFileId === file.id;

          return (
            <div
              key={file.id}
              onClick={e => {
                e.stopPropagation();
                setSelectedFileId(file.id);
              }}
              onDoubleClick={e => {
                e.stopPropagation();
                if (file.type === 'folder') {
                  openApp('finder', file.id);
                } else if (file.extension === 'jpg' || file.extension === 'png') {
                  openApp('photos');
                } else {
                  openApp('textedit', file.id);
                }
              }}
              className={`desktop-icon p-3 rounded-2xl border-3 border-black flex flex-col items-center justify-center cursor-pointer transition-all neo-shadow-sm hover:neo-shadow hover:-translate-y-1 ${
                isSelected
                  ? 'bg-[#FFE600] text-black ring-3 ring-black scale-105 neo-shadow'
                  : 'bg-white dark:bg-zinc-900 text-black dark:text-white'
              }`}
            >
              <div
                className="w-14 h-14 rounded-2xl border-2 border-black flex items-center justify-center mb-2 neo-shadow-sm"
                style={{
                  backgroundColor: file.color || (file.type === 'folder' ? '#FFE600' : '#4D96FF'),
                }}
              >
                {file.type === 'folder' ? (
                  <Folder className="w-8 h-8 text-black stroke-[2.5]" />
                ) : file.extension === 'jpg' ? (
                  <ImageIcon className="w-8 h-8 text-black stroke-[2.5]" />
                ) : (
                  <FileText className="w-8 h-8 text-white stroke-[2.5]" />
                )}
              </div>
              <span className="font-extrabold text-xs text-center truncate max-w-[130px]">
                {file.name}
              </span>
              <span className="text-[9px] font-mono text-gray-500 uppercase mt-0.5">
                {file.size || (file.type === 'folder' ? 'Folder' : 'File')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Drag Selection Box */}
      {selectionBox && (
        <div
          className="absolute border-2 border-black bg-yellow-300/60 pointer-events-none z-20"
          style={{
            left: selectionBox.x1,
            top: selectionBox.y1,
            width: selectionBox.x2 - selectionBox.x1,
            height: selectionBox.y2 - selectionBox.y1,
          }}
        />
      )}

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div
          className="context-menu fixed bg-white dark:bg-zinc-900 text-black dark:text-white border-3 border-black rounded-2xl neo-shadow-xl p-1.5 z-[10000] w-52 text-xs font-bold"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => setContextMenu(null)}
        >
          <button
            onClick={() => {
              addFile({
                name: `New Document ${Date.now().toString().slice(-4)}.txt`,
                type: 'file',
                extension: 'txt',
                parentId: 'desktop',
                content: 'Start typing content...',
                size: '100 B',
                color: '#4D96FF',
              });
            }}
            className="w-full text-left px-3 py-2 hover:bg-[#FFE600] hover:text-black rounded-xl flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Text File</span>
          </button>

          <button
            onClick={() => {
              addFile({
                name: `New Folder ${Date.now().toString().slice(-4)}`,
                type: 'folder',
                parentId: 'desktop',
                color: '#FFE600',
              });
            }}
            className="w-full text-left px-3 py-2 hover:bg-[#FFE600] hover:text-black rounded-xl flex items-center space-x-2"
          >
            <Folder className="w-4 h-4" />
            <span>New Folder</span>
          </button>

          <div className="my-1 border-t-2 border-black" />

          <button
            onClick={() => openApp('terminal')}
            className="w-full text-left px-3 py-2 hover:bg-black hover:text-white rounded-xl flex items-center space-x-2"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Terminal Here</span>
          </button>

          <button
            onClick={() => openApp('settings')}
            className="w-full text-left px-3 py-2 hover:bg-[#FFE600] hover:text-black rounded-xl flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Change Wallpaper...</span>
          </button>

          <button
            onClick={() => openApp('gemini')}
            className="w-full text-left px-3 py-2 bg-[#8B5CF6] text-white hover:bg-purple-700 rounded-xl flex items-center space-x-2 font-bold"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Gemini Copilot</span>
          </button>
        </div>
      )}
    </div>
  );
};
