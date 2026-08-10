import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useOS } from '../../context/OSContext';
import { WindowState } from '../../types/os';
import { X, Minus, Maximize2, Minimize2, LayoutGrid } from 'lucide-react';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowContainer: React.FC<WindowProps> = ({ windowState, children }) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPos,
    updateWindowSize,
    snapWindow,
    theme,
  } = useOS();

  const isFocused = activeWindowId === windowState.id;

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; winX: number; winY: number }>({
    x: 0,
    y: 0,
    winX: windowState.x,
    winY: windowState.y,
  });

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: windowState.width,
    h: windowState.height,
  });

  const [snapMenuOpen, setSnapMenuOpen] = useState(false);

  // Handle Dragging
  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (windowState.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;

    focusWindow(windowState.id);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      winX: windowState.x,
      winY: windowState.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveHeader = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    updateWindowPos(
      windowState.id,
      dragStartRef.current.winX + dx,
      dragStartRef.current.winY + dy
    );
  };

  const handlePointerUpHeader = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    }
  };

  // Handle Resizing
  const handlePointerDownResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) return;

    focusWindow(windowState.id);
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: windowState.width,
      h: windowState.height,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveResize = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStartRef.current.x;
    const dy = e.clientY - resizeStartRef.current.y;
    updateWindowSize(
      windowState.id,
      resizeStartRef.current.w + dx,
      resizeStartRef.current.h + dy
    );
  };

  const handlePointerUpResize = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    }
  };

  if (windowState.isMinimized) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const windowStyle = (windowState.isMaximized || isMobile)
    ? {
        top: 36,
        left: isMobile ? 4 : 8,
        width: isMobile ? 'calc(100vw - 8px)' : 'calc(100vw - 16px)',
        height: isMobile ? 'calc(100vh - 90px)' : 'calc(100vh - 116px)',
        zIndex: windowState.zIndex,
      }
    : {
        top: Math.max(36, Math.min(windowState.y, window.innerHeight - 100)),
        left: Math.max(4, Math.min(windowState.x, window.innerWidth - 100)),
        width: Math.min(windowState.width, window.innerWidth - 16),
        height: Math.min(windowState.height, window.innerHeight - 116),
        zIndex: windowState.zIndex,
      };

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
      onClick={() => focusWindow(windowState.id)}
      style={windowStyle}
      className={`fixed flex flex-col bg-white dark:bg-zinc-900 border-3 border-black rounded-2xl neo-shadow-lg select-none overflow-hidden transition-shadow duration-150 ${
        isFocused ? 'ring-2 ring-black neo-shadow-xl' : 'opacity-95'
      }`}
    >
      {/* Window Title Bar / Header */}
      <div
        onPointerDown={handlePointerDownHeader}
        onPointerMove={handlePointerMoveHeader}
        onPointerUp={handlePointerUpHeader}
        className={`h-10 px-3 bg-[#FFFEE0] dark:bg-zinc-800 border-b-3 border-black flex items-center justify-between cursor-grab active:cursor-grabbing font-bold text-xs ${
          isFocused ? 'bg-[#FFE600] text-black dark:bg-zinc-700 dark:text-white' : 'text-gray-700 dark:text-gray-300'
        }`}
        style={{
          backgroundColor: isFocused
            ? theme.darkMode
              ? '#27272A'
              : '#FFE600'
            : theme.darkMode
            ? '#18181B'
            : '#F4F4F5',
        }}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          {/* Close */}
          <button
            onClick={e => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            className="group w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
            title="Close"
          >
            <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>

          {/* Minimize */}
          <button
            onClick={e => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
            className="group w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>

          {/* Maximize */}
          <button
            onClick={e => {
              e.stopPropagation();
              maximizeWindow(windowState.id);
            }}
            className="group w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
            title="Maximize"
          >
            {windowState.isMaximized ? (
              <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            ) : (
              <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            )}
          </button>
        </div>

        {/* Window Title */}
        <div className="font-extrabold tracking-tight truncate max-w-[200px] sm:max-w-[350px] text-center">
          {windowState.title}
        </div>

        {/* Window Controls (Tile / Snap Menu) */}
        <div className="relative flex items-center space-x-1">
          <button
            onClick={e => {
              e.stopPropagation();
              setSnapMenuOpen(!snapMenuOpen);
            }}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg border border-black transition-colors"
            title="Window Layout / Snap"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>

          {snapMenuOpen && (
            <div
              className="absolute top-8 right-0 w-44 bg-white dark:bg-zinc-900 border-3 border-black rounded-xl neo-shadow-md p-1.5 z-[10000] text-xs font-bold"
              onMouseLeave={() => setSnapMenuOpen(false)}
            >
              <button
                onClick={() => {
                  snapWindow(windowState.id, 'left');
                  setSnapMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 hover:bg-[#FFE600] dark:hover:bg-zinc-800 rounded-lg"
              >
                Tile Left Half
              </button>
              <button
                onClick={() => {
                  snapWindow(windowState.id, 'right');
                  setSnapMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 hover:bg-[#FFE600] dark:hover:bg-zinc-800 rounded-lg"
              >
                Tile Right Half
              </button>
              <button
                onClick={() => {
                  snapWindow(windowState.id, 'center');
                  setSnapMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 hover:bg-[#FFE600] dark:hover:bg-zinc-800 rounded-lg"
              >
                Center Window
              </button>
              <button
                onClick={() => {
                  snapWindow(windowState.id, 'full');
                  setSnapMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 hover:bg-[#FFE600] dark:hover:bg-zinc-800 rounded-lg"
              >
                Full Screen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-zinc-900 text-black dark:text-white relative">
        {children}
      </div>

      {/* Bottom Right Resize Handle */}
      {!windowState.isMaximized && (
        <div
          onPointerDown={handlePointerDownResize}
          onPointerMove={handlePointerMoveResize}
          onPointerUp={handlePointerUpResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center p-0.5 z-20 group"
          title="Resize window"
        >
          <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-black dark:border-white group-hover:scale-125 transition-transform" />
        </div>
      )}
    </motion.div>
  );
};
