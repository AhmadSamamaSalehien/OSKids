import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { FileText, Save, FolderOpen, FileCode, Check } from 'lucide-react';

interface TextEditAppProps {
  initialFileId?: string;
}

export const TextEditApp: React.FC<TextEditAppProps> = ({ initialFileId }) => {
  const { files, updateFileContent, addFile } = useOS();
  const [activeFileId, setActiveFileId] = useState<string | null>(initialFileId || null);
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('Untitled.txt');
  const [savedBadge, setSavedBadge] = useState(false);

  useEffect(() => {
    if (initialFileId) {
      const f = files.find(file => file.id === initialFileId);
      if (f) {
        setActiveFileId(f.id);
        setFilename(f.name);
        setContent(f.content || '');
      }
    } else if (files.length > 0 && !activeFileId) {
      const firstTxt = files.find(f => f.type === 'file');
      if (firstTxt) {
        setActiveFileId(firstTxt.id);
        setFilename(firstTxt.name);
        setContent(firstTxt.content || '');
      }
    }
  }, [initialFileId, files]);

  const handleSave = () => {
    if (activeFileId) {
      updateFileContent(activeFileId, content);
    } else {
      addFile({
        name: filename,
        type: 'file',
        extension: filename.split('.').pop() || 'txt',
        parentId: 'desktop',
        content,
        size: `${content.length} B`,
        color: '#A855F7',
      });
    }
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 1500);
  };

  const lineCount = content.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Top Bar */}
      <div className="p-3 bg-[#A855F7] text-white border-b-3 border-black flex items-center justify-between font-extrabold text-xs">
        <div className="flex items-center space-x-2">
          <FileCode className="w-5 h-5 stroke-[2.5]" />
          <input
            type="text"
            value={filename}
            onChange={e => setFilename(e.target.value)}
            className="bg-black/30 border border-white/50 rounded-lg px-2 py-0.5 text-white font-mono outline-none w-48"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-3 py-1 bg-[#FFE600] text-black border-2 border-black rounded-full font-black text-xs neo-shadow-sm flex items-center space-x-1 hover:bg-yellow-400"
        >
          {savedBadge ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedBadge ? 'Saved!' : 'Save File'}</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden font-mono text-xs">
        {/* Line Numbers */}
        <div className="w-10 bg-gray-100 dark:bg-zinc-800 border-r-2 border-black p-3 text-right text-gray-400 font-bold select-none leading-relaxed">
          {Array.from({ length: Math.max(1, lineCount) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-1 p-3 bg-white dark:bg-zinc-900 text-black dark:text-white outline-none resize-none leading-relaxed font-mono"
          placeholder="Type plain text or code..."
        />
      </div>

      {/* Footer Info Bar */}
      <div className="p-2 bg-gray-100 dark:bg-zinc-800 border-t-2 border-black flex items-center justify-between font-mono text-[10px] text-gray-600 dark:text-gray-300 font-bold">
        <span>Lines: {lineCount} | Characters: {content.length}</span>
        <span>UTF-8 • PlainText/Code</span>
      </div>
    </div>
  );
};
