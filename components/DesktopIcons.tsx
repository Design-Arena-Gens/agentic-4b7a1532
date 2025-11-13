'use client';

interface DesktopIconsProps {
  openWindow: (appName: string, icon: string) => void;
}

export default function DesktopIcons({ openWindow }: DesktopIconsProps) {
  const icons = [
    { name: 'Macintosh HD', icon: '💾' },
    { name: 'Documents', icon: '📁' },
    { name: 'Downloads', icon: '📥' },
  ];

  return (
    <div className="absolute top-12 right-8 space-y-4 z-10">
      {icons.map(icon => (
        <button
          key={icon.name}
          className="flex flex-col items-center space-y-1 p-2 rounded hover:bg-white/10 transition-colors"
          onDoubleClick={() => openWindow(icon.name, icon.icon)}
        >
          <div className="text-5xl">{icon.icon}</div>
          <span className="text-xs text-white font-medium text-center drop-shadow-lg">
            {icon.name}
          </span>
        </button>
      ))}
    </div>
  );
}
