'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import WindowContent from './WindowContent';

interface WindowProps {
  id: string;
  appName: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isActive: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdate: (updates: any) => void;
  onFocus: () => void;
}

export default function Window({
  id,
  appName,
  icon,
  x,
  y,
  width,
  height,
  zIndex,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onUpdate,
  onFocus,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, windowX: 0, windowY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        onUpdate({
          x: dragStart.current.windowX + deltaX,
          y: Math.max(24, dragStart.current.windowY + deltaY),
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.windowX;
        let newY = resizeStart.current.windowY;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(400, resizeStart.current.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          newWidth = Math.max(400, resizeStart.current.width - deltaX);
          newX = resizeStart.current.windowX + deltaX;
          if (newWidth === 400) newX = resizeStart.current.windowX + resizeStart.current.width - 400;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(300, resizeStart.current.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          newHeight = Math.max(300, resizeStart.current.height - deltaY);
          newY = Math.max(24, resizeStart.current.windowY + deltaY);
          if (newHeight === 300) newY = resizeStart.current.windowY + resizeStart.current.height - 300;
        }

        onUpdate({ width: newWidth, height: newHeight, x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, resizeDirection, onUpdate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    onFocus();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      windowX: x,
      windowY: y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width,
      height,
      windowX: x,
      windowY: y,
    };
  };

  const windowStyle = isMaximized
    ? { x: 0, y: 24, width: '100vw', height: 'calc(100vh - 24px - 4.5rem)' }
    : { x, y, width, height };

  return (
    <motion.div
      ref={windowRef}
      className="absolute overflow-hidden"
      style={{
        ...windowStyle,
        zIndex,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onMouseDown={onFocus}
    >
      <div className={`w-full h-full bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden ${
        isActive ? 'ring-2 ring-blue-500/50' : ''
      }`}>
        {/* Title Bar */}
        <div
          className={`h-10 px-4 flex items-center justify-between cursor-move select-none ${
            isActive ? 'bg-gray-100' : 'bg-gray-50'
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">✕</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
            >
              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMaximize(); }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
            >
              <span className="text-green-900 text-[8px] opacity-0 group-hover:opacity-100">⬜</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <span className="text-lg">{icon}</span>
            <span>{appName}</span>
          </div>
          <div className="w-16" />
        </div>

        {/* Toolbar */}
        <div className="h-12 px-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-200 rounded">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <div className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm">
            {appName === 'Finder' ? 'Documents' : appName}
          </div>
          <button className="p-2 hover:bg-gray-200 rounded">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <WindowContent appName={appName} />
        </div>
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1 cursor-n-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'n')} />
          <div className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize" onMouseDown={(e) => handleResizeMouseDown(e, 's')} />
          <div className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'w')} />
          <div className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'e')} />
          <div className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} />
          <div className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'se')} />
        </>
      )}
    </motion.div>
  );
}
