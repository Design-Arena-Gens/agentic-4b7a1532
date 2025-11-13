'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuBarProps {
  time: Date;
}

export default function MenuBar({ time }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    {
      name: '',
      icon: true,
      items: ['About This Mac', 'System Preferences...', 'App Store...', null, 'Recent Items', null, 'Force Quit...', null, 'Sleep', 'Restart...', 'Shut Down...', null, 'Lock Screen', 'Log Out...']
    },
    {
      name: 'Finder',
      items: ['About Finder', null, 'Preferences...', null, 'Empty Trash...', null, 'Services', null, 'Hide Finder', 'Hide Others', 'Show All']
    },
    {
      name: 'File',
      items: ['New Finder Window', 'New Folder', 'New Smart Folder', 'New Tab', null, 'Open', 'Open With', 'Close Window', null, 'Get Info', 'Rename', null, 'Compress', 'Duplicate', 'Make Alias', 'Quick Look', null, 'Move to Trash', 'Eject', null, 'Find', null, 'Tags...']
    },
    {
      name: 'Edit',
      items: ['Undo', 'Redo', null, 'Cut', 'Copy', 'Paste', 'Select All', null, 'Show Clipboard']
    },
    {
      name: 'View',
      items: ['as Icons', 'as List', 'as Columns', 'as Gallery', null, 'Use Groups', 'Sort By', null, 'Clean Up', 'Clean Up By', null, 'Hide Toolbar', 'Show All Tabs', 'Show Tab Bar', 'Show Path Bar', 'Show Status Bar']
    },
    {
      name: 'Go',
      items: ['Back', 'Forward', 'Enclosing Folder', null, 'Recents', 'Documents', 'Desktop', 'Downloads', 'Home', 'Computer', 'AirDrop', 'Network', 'Applications', 'Utilities', null, 'Go to Folder...', 'Connect to Server...']
    },
    {
      name: 'Window',
      items: ['Minimize', 'Zoom', null, 'Move Window to Left Side of Screen', 'Move Window to Right Side of Screen', 'Enter Full Screen', null, 'Bring All to Front']
    },
    {
      name: 'Help',
      items: ['Send Feedback', 'macOS Help']
    },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-white/80 backdrop-blur-xl border-b border-black/5 z-[10000] flex items-center px-4 text-xs font-medium">
      {/* Left side - Menus */}
      <div className="flex items-center space-x-4">
        {menus.map((menu, index) => (
          <div key={index} className="relative">
            <button
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === menu.name
                  ? 'bg-blue-500 text-white'
                  : 'text-black hover:bg-black/5'
              }`}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.name)}
              onClick={() => setActiveMenu(activeMenu === menu.name ? null : menu.name)}
            >
              {menu.icon ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              ) : menu.name}
            </button>

            <AnimatePresence>
              {activeMenu === menu.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-0.5 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-black/10 py-1 min-w-[220px] overflow-hidden"
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {menu.items.map((item, idx) => (
                    item === null ? (
                      <div key={idx} className="h-px bg-black/10 my-1 mx-2" />
                    ) : (
                      <button
                        key={idx}
                        className="w-full px-4 py-1 text-left hover:bg-blue-500 hover:text-white transition-colors text-xs"
                      >
                        {item}
                      </button>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right side - Status icons and time */}
      <div className="ml-auto flex items-center space-x-4 text-black">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div className="flex items-center space-x-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
        </svg>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
          <span className="text-xs">100%</span>
        </div>
        <span className="text-xs">{formatTime(time)}</span>
      </div>
    </div>
  );
}
