'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DockProps {
  openWindow: (appName: string, icon: string) => void;
  windows: any[];
  onRestoreWindow: (id: string) => void;
  activeWindowId: string | null;
}

export default function Dock({ openWindow, windows, onRestoreWindow, activeWindowId }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const apps = [
    { name: 'Finder', icon: '👁️', color: 'from-blue-400 to-blue-600' },
    { name: 'Safari', icon: '🧭', color: 'from-blue-300 to-blue-500' },
    { name: 'Messages', icon: '💬', color: 'from-green-400 to-green-600' },
    { name: 'Mail', icon: '✉️', color: 'from-blue-400 to-blue-600' },
    { name: 'Maps', icon: '🗺️', color: 'from-green-300 to-green-500' },
    { name: 'Photos', icon: '🌸', color: 'from-red-300 to-yellow-400' },
    { name: 'Calendar', icon: '📅', color: 'from-white to-gray-100' },
    { name: 'Notes', icon: '📝', color: 'from-yellow-200 to-yellow-400' },
    { name: 'Reminders', icon: '✓', color: 'from-red-400 to-red-600' },
    { name: 'Music', icon: '🎵', color: 'from-pink-400 to-red-500' },
    { name: 'TV', icon: '📺', color: 'from-gray-800 to-black' },
    { name: 'App Store', icon: '🏪', color: 'from-blue-400 to-blue-600' },
    { name: 'System Preferences', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
  ];

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[10001]">
      <motion.div
        className="flex items-end gap-2 px-3 py-2 bg-white/30 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {apps.map((app, index) => {
          const windowForApp = windows.find(w => w.appName === app.name && w.isMinimized);
          const isActive = windows.some(w => w.appName === app.name && !w.isMinimized);

          return (
            <motion.button
              key={app.name}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (windowForApp) {
                  onRestoreWindow(windowForApp.id);
                } else {
                  openWindow(app.name, app.icon);
                }
              }}
              animate={{
                scale: getScale(index),
                y: hoveredIndex === index ? -10 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} shadow-lg flex items-center justify-center text-3xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20" />
                <span className="relative z-10">{app.icon}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5 w-1 h-1 bg-gray-800 rounded-full" />
                )}
              </div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -10 : 10,
                }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
              >
                {app.name}
              </motion.div>
            </motion.button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-12 bg-white/30 mx-1" />

        {/* Trash */}
        <motion.button
          className="relative group"
          onMouseEnter={() => setHoveredIndex(apps.length)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: getScale(apps.length),
            y: hoveredIndex === apps.length ? -10 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg flex items-center justify-center text-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20" />
            <span className="relative z-10">🗑️</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: hoveredIndex === apps.length ? 1 : 0,
              y: hoveredIndex === apps.length ? -10 : 10,
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
          >
            Trash
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
