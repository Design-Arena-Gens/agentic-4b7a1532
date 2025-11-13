'use client';

import { useState, useEffect } from 'react';
import MenuBar from '@/components/MenuBar';
import Dock from '@/components/Dock';
import Window from '@/components/Window';
import DesktopIcons from '@/components/DesktopIcons';

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [windows, setWindows] = useState<any[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState('default');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (appName: string, icon: string) => {
    const newWindow = {
      id: Date.now().toString(),
      appName,
      icon,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 80,
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
    };
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    setActiveWindowId(id);
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const updateWindow = (id: string, updates: any) => {
    setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const bringToFront = (id: string) => {
    setActiveWindowId(id);
    setWindows([...windows.filter(w => w.id !== id), windows.find(w => w.id === id)!]);
  };

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
        style={{
          backgroundImage: wallpaper === 'default'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : undefined
        }}
      />

      {/* Desktop Icons */}
      <DesktopIcons openWindow={openWindow} />

      {/* Windows */}
      {windows.map((window, index) => (
        !window.isMinimized && (
          <Window
            key={window.id}
            {...window}
            zIndex={window.id === activeWindowId ? 9999 : 1000 + index}
            isActive={window.id === activeWindowId}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onUpdate={(updates) => updateWindow(window.id, updates)}
            onFocus={() => bringToFront(window.id)}
          />
        )
      ))}

      {/* Menu Bar */}
      <MenuBar time={time} />

      {/* Dock */}
      <Dock
        openWindow={openWindow}
        windows={windows}
        onRestoreWindow={restoreWindow}
        activeWindowId={activeWindowId}
      />
    </main>
  );
}
