'use client';

import { useState } from 'react';

interface WindowContentProps {
  appName: string;
}

export default function WindowContent({ appName }: WindowContentProps) {
  const [url, setUrl] = useState('https://www.apple.com');

  const renderContent = () => {
    switch (appName) {
      case 'Finder':
        return (
          <div className="flex h-full">
            <div className="w-48 bg-gray-50 border-r border-gray-200 p-4 space-y-2">
              <div className="text-xs font-semibold text-gray-500 mb-2">Favorites</div>
              <div className="space-y-1">
                {['Recents', 'Applications', 'Desktop', 'Documents', 'Downloads', 'Pictures', 'Music', 'Movies'].map(item => (
                  <button key={item} className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-2">
                    <span className="text-blue-500">📁</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs font-semibold text-gray-500 mb-2 mt-4">iCloud</div>
              <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-2">
                <span className="text-blue-500">☁️</span>
                <span>iCloud Drive</span>
              </button>
            </div>
            <div className="flex-1 p-6 bg-white">
              <div className="grid grid-cols-4 gap-6">
                {['Project.pdf', 'Presentation.key', 'Budget.xlsx', 'Notes.txt', 'Image.png', 'Video.mp4'].map(file => (
                  <div key={file} className="flex flex-col items-center space-y-2 p-3 rounded hover:bg-blue-50 cursor-pointer">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      {file.endsWith('.pdf') ? '📄' : file.endsWith('.key') ? '📊' : file.endsWith('.xlsx') ? '📈' : file.endsWith('.txt') ? '📝' : file.endsWith('.png') ? '🖼️' : '🎬'}
                    </div>
                    <span className="text-xs text-center">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Safari':
        return (
          <div className="flex flex-col h-full">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                placeholder="Search or enter website name"
              />
            </div>
            <div className="flex-1 bg-white flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🧭</div>
                <h2 className="text-2xl font-semibold text-gray-800">Safari</h2>
                <p className="text-gray-500">Browse the web with Safari</p>
              </div>
            </div>
          </div>
        );

      case 'Messages':
        return (
          <div className="flex h-full">
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="overflow-y-auto">
                {['Mom', 'Work Team', 'John Doe', 'Jane Smith', 'Project Group'].map(contact => (
                  <div key={contact} className="px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {contact[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{contact}</div>
                        <div className="text-xs text-gray-500">Hey, how are you?</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-white p-6 space-y-4 overflow-y-auto">
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-xs">
                    <p className="text-sm">Hey! How's it going?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs">
                    <p className="text-sm">Great! Just working on some projects.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="iMessage"
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm"
                  />
                  <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    ↑
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Mail':
        return (
          <div className="flex h-full">
            <div className="w-48 bg-gray-50 border-r border-gray-200 p-4 space-y-1">
              {['Inbox', 'Sent', 'Drafts', 'Spam', 'Trash'].map(folder => (
                <button key={folder} className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 text-sm flex items-center justify-between">
                  <span>{folder}</span>
                  {folder === 'Inbox' && <span className="text-blue-500 text-xs">12</span>}
                </button>
              ))}
            </div>
            <div className="w-80 border-r border-gray-200 overflow-y-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="font-semibold text-sm">Email Subject {i + 1}</div>
                  <div className="text-xs text-gray-500 mt-1">sender@example.com</div>
                  <div className="text-xs text-gray-600 mt-2">This is a preview of the email content...</div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white p-8 flex items-center justify-center text-gray-400">
              Select an email to read
            </div>
          </div>
        );

      case 'Calendar':
        return (
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Today</button>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">←</button>
                  <span className="font-semibold">November 2025</span>
                  <button className="p-1 hover:bg-gray-100 rounded">→</button>
                </div>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">+ New Event</button>
            </div>
            <div className="flex-1 p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square border border-gray-200 rounded p-2 hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm">{(i % 30) + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Notes':
        return (
          <div className="flex h-full">
            <div className="w-64 bg-yellow-50 border-r border-yellow-200 p-4 space-y-2">
              <button className="w-full text-left px-3 py-2 bg-yellow-200 rounded font-semibold text-sm">
                📝 All Notes
              </button>
              {['Quick Notes', 'Work', 'Personal', 'Ideas'].map(folder => (
                <button key={folder} className="w-full text-left px-3 py-2 rounded hover:bg-yellow-100 text-sm">
                  📁 {folder}
                </button>
              ))}
            </div>
            <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="font-semibold text-sm">Note Title {i + 1}</div>
                  <div className="text-xs text-gray-500 mt-1">Nov {i + 1}, 2025</div>
                  <div className="text-xs text-gray-600 mt-2">This is the note content preview...</div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white p-8">
              <input
                type="text"
                placeholder="Title"
                className="w-full text-2xl font-bold mb-4 outline-none"
              />
              <textarea
                placeholder="Start typing..."
                className="w-full h-full resize-none outline-none text-gray-700"
              />
            </div>
          </div>
        );

      case 'Music':
        return (
          <div className="flex flex-col h-full bg-gradient-to-b from-pink-50 to-white">
            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold">Listen Now</h2>
              <div className="grid grid-cols-3 gap-4">
                {['Chill Vibes', 'Top Hits', 'Workout Mix'].map(playlist => (
                  <div key={playlist} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-full aspect-square bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg mb-3" />
                    <div className="font-semibold">{playlist}</div>
                    <div className="text-xs text-gray-500">Playlist • 50 songs</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">Song Title</div>
                  <div className="text-xs text-gray-500">Artist Name</div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full">⏮</button>
                  <button className="p-3 bg-black text-white rounded-full">▶</button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">⏭</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'System Preferences':
        return (
          <div className="p-6 bg-gray-50 h-full overflow-y-auto">
            <div className="grid grid-cols-4 gap-6">
              {[
                { name: 'General', icon: '⚙️' },
                { name: 'Desktop & Dock', icon: '🖥️' },
                { name: 'Displays', icon: '📺' },
                { name: 'Sound', icon: '🔊' },
                { name: 'Network', icon: '🌐' },
                { name: 'Bluetooth', icon: '📶' },
                { name: 'Notifications', icon: '🔔' },
                { name: 'Security', icon: '🔒' },
                { name: 'Users', icon: '👤' },
                { name: 'Accessibility', icon: '♿' },
                { name: 'Battery', icon: '🔋' },
                { name: 'Date & Time', icon: '🕐' },
              ].map(pref => (
                <button key={pref.name} className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="text-4xl">{pref.icon}</div>
                  <span className="text-sm font-medium">{pref.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center space-y-4">
              <div className="text-6xl">{appName === 'Photos' ? '🌸' : appName === 'Maps' ? '🗺️' : appName === 'TV' ? '📺' : appName === 'App Store' ? '🏪' : appName === 'Reminders' ? '✓' : '📱'}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{appName}</h2>
              <p className="text-gray-500">Welcome to {appName}</p>
            </div>
          </div>
        );
    }
  };

  return <div className="w-full h-full">{renderContent()}</div>;
}
