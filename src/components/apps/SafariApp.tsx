import React, { useState } from 'react';
import { Compass, Search, ArrowLeft, ArrowRight, RotateCcw, Bookmark, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export const SafariApp: React.FC = () => {
  const [url, setUrl] = useState('https://apple.com');
  const [inputUrl, setInputUrl] = useState('https://apple.com');
  const [history, setHistory] = useState<string[]>(['https://apple.com']);
  const [historyIdx, setHistoryIdx] = useState(0);

  const bookmarks = [
    { title: 'Apple', url: 'https://apple.com', color: '#000000', icon: '' },
    { title: 'GitHub', url: 'https://github.com', color: '#18181B', icon: '🐙' },
    { title: 'Wikipedia', url: 'https://wikipedia.org', color: '#6366F1', icon: '🌐' },
    { title: 'Hacker News', url: 'https://news.ycombinator.com', color: '#FF6600', icon: 'Y' },
    { title: 'AI Studio', url: 'https://ai.studio', color: '#8B5CF6', icon: '✦' },
  ];

  const handleNavigate = (targetUrl: string) => {
    let formatted = targetUrl.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    setUrl(formatted);
    setInputUrl(formatted);
    setHistory(prev => [...prev.slice(0, historyIdx + 1), formatted]);
    setHistoryIdx(prev => prev + 1);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      setUrl(history[prevIdx]);
      setInputUrl(history[prevIdx]);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setUrl(history[nextIdx]);
      setInputUrl(history[nextIdx]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Safari Address Toolbar */}
      <div className="p-3 bg-[#FFFEE0] dark:bg-zinc-800 border-b-3 border-black flex items-center space-x-2">
        <button
          onClick={handleBack}
          disabled={historyIdx <= 0}
          className="p-1.5 bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          onClick={handleForward}
          disabled={historyIdx >= history.length - 1}
          className="p-1.5 bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white disabled:opacity-40"
        >
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          onClick={() => handleNavigate(url)}
          className="p-1.5 bg-white border-2 border-black rounded-xl hover:bg-[#FFE600]"
        >
          <RotateCcw className="w-4 h-4 stroke-[3]" />
        </button>

        {/* URL Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleNavigate(inputUrl);
          }}
          className="flex-1 flex items-center bg-white border-2 border-black rounded-full px-3 py-1 neo-shadow-sm focus-within:ring-2 focus-within:ring-black"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" />
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            className="w-full bg-transparent outline-none font-bold text-xs text-black"
            placeholder="Search or enter website name..."
          />
        </form>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 bg-[#4D96FF] text-white border-2 border-black rounded-xl hover:bg-blue-600 neo-shadow-sm flex items-center space-x-1 text-xs font-bold"
          title="Open in new browser tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Bookmarks Bar */}
      <div className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 border-b-2 border-black flex items-center space-x-2 overflow-x-auto text-xs font-bold">
        <Bookmark className="w-3.5 h-3.5 text-amber-500" />
        {bookmarks.map(bm => (
          <button
            key={bm.title}
            onClick={() => handleNavigate(bm.url)}
            className="px-3 py-1 bg-white dark:bg-zinc-900 border-2 border-black rounded-full hover:bg-[#FFE600] hover:text-black flex items-center space-x-1.5 neo-shadow-sm whitespace-nowrap"
          >
            <span>{bm.icon}</span>
            <span>{bm.title}</span>
          </button>
        ))}
      </div>

      {/* Web View Container */}
      <div className="flex-1 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
        <iframe
          src={url}
          title="Safari Web Browser"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};
