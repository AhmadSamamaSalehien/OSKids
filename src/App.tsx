import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { MenuBar } from './components/os/MenuBar';
import { Dock } from './components/os/Dock';
import { WindowContainer } from './components/os/Window';
import { Desktop } from './components/os/Desktop';
import { Spotlight } from './components/os/Spotlight';
import { ControlCenter } from './components/os/ControlCenter';
import { NotificationCenter } from './components/os/NotificationCenter';
import { Launchpad } from './components/os/Launchpad';
import { FinderApp } from './components/apps/FinderApp';
import { SafariApp } from './components/apps/SafariApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { SettingsApp } from './components/apps/SettingsApp';
import { NotesApp } from './components/apps/NotesApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { PhotosApp } from './components/apps/PhotosApp';
import { MusicApp } from './components/apps/MusicApp';
import { CalendarApp } from './components/apps/CalendarApp';
import { TextEditApp } from './components/apps/TextEditApp';
import { AppStoreApp } from './components/apps/AppStoreApp';
import { GeminiApp } from './components/apps/GeminiApp';

const DesktopContent: React.FC = () => {
  const { windows, theme } = useOS();

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'finder':
        return <FinderApp />;
      case 'safari':
        return <SafariApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'settings':
        return <SettingsApp />;
      case 'notes':
        return <NotesApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'photos':
        return <PhotosApp />;
      case 'music':
        return <MusicApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'textedit':
        return <TextEditApp />;
      case 'appstore':
        return <AppStoreApp />;
      case 'gemini':
        return <GeminiApp />;
      default:
        return (
          <div className="h-full flex items-center justify-center p-6 bg-white dark:bg-zinc-900 text-black dark:text-white font-mono text-xs">
            App {appId} loaded cleanly.
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none font-sans transition-colors duration-300 ${
        theme.darkMode ? 'dark' : ''
      }`}
    >
      {/* Primary Desktop Canvas & File Icons */}
      <Desktop />

      {/* Open Application Windows Layer */}
      {windows.map(win => (
        <WindowContainer key={win.id} windowState={win}>
          {renderAppContent(win.appId)}
        </WindowContainer>
      ))}

      {/* System Navigation & Overlay Components */}
      <MenuBar />
      <Dock />
      <Spotlight />
      <ControlCenter />
      <NotificationCenter />
      <Launchpad />
    </div>
  );
};

export function App() {
  return (
    <OSProvider>
      <DesktopContent />
    </OSProvider>
  );
}

export default App;
