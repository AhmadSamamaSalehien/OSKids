import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { FileItem } from '../../types/os';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Trash2,
  Plus,
  Search,
  ArrowLeft,
  Grid,
  List,
  Eye,
  RefreshCw,
  FolderPlus,
} from 'lucide-react';

interface FinderAppProps {
  initialFolderId?: string;
}

export const FinderApp: React.FC<FinderAppProps> = ({ initialFolderId = 'root' }) => {
  const { files, addFile, deleteFile, restoreFile, emptyTrash, openApp } = useOS();
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId);
  const [folderHistory, setFolderHistory] = useState<string[]>(['root']);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const sidebarFolders = [
    { id: 'desktop', name: 'Desktop', color: '#FFE600' },
    { id: 'documents', name: 'Documents', color: '#4D96FF' },
    { id: 'downloads', name: 'Downloads', color: '#FF597B' },
    { id: 'pictures', name: 'Pictures', color: '#6BCB77' },
    { id: 'trash', name: 'Trash', color: '#94A3B8' },
  ];

  const navigateToFolder = (folderId: string) => {
    setFolderHistory(prev => [...prev, folderId]);
    setCurrentFolderId(folderId);
    setPreviewFile(null);
  };

  const handleBack = () => {
    if (folderHistory.length > 1) {
      const newHistory = [...folderHistory];
      newHistory.pop();
      setFolderHistory(newHistory);
      setCurrentFolderId(newHistory[newHistory.length - 1]);
      setPreviewFile(null);
    }
  };

  const currentFolder = files.find(f => f.id === currentFolderId) || { id: 'root', name: 'Macintosh HD' };

  const currentFolderFiles = files.filter(f => {
    const matchesFolder = f.parentId === currentFolderId;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Top Toolbar */}
      <div className="p-3 bg-[#FFFEE0] dark:bg-zinc-800 border-b-3 border-black flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBack}
            disabled={folderHistory.length <= 1}
            className="p-1.5 bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black neo-shadow-sm"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
          </button>

          <span className="font-extrabold text-sm px-3 py-1 bg-white dark:bg-zinc-900 border-2 border-black rounded-full">
            📁 {currentFolder.name}
          </span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black stroke-[3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="pl-8 pr-3 py-1 bg-white text-black border-2 border-black rounded-full font-bold text-xs outline-none w-36 sm:w-48"
            />
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-1.5 bg-white border-2 border-black rounded-xl hover:bg-[#FFE600] neo-shadow-sm"
            title="Toggle Grid/List View"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>

          {currentFolderId === 'trash' ? (
            <button
              onClick={emptyTrash}
              className="px-3 py-1 bg-red-500 text-white border-2 border-black rounded-full font-extrabold text-xs neo-shadow-sm hover:bg-red-600"
            >
              Empty Trash
            </button>
          ) : (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  addFile({
                    name: `New_Doc_${Date.now().toString().slice(-4)}.txt`,
                    type: 'file',
                    extension: 'txt',
                    parentId: currentFolderId,
                    content: 'Created in Finder',
                    size: '120 B',
                    color: '#4D96FF',
                  });
                }}
                className="px-2.5 py-1 bg-[#4D96FF] text-white border-2 border-black rounded-full font-extrabold text-xs neo-shadow-sm hover:bg-blue-600 flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>File</span>
              </button>

              <button
                onClick={() => {
                  addFile({
                    name: `New_Folder_${Date.now().toString().slice(-4)}`,
                    type: 'folder',
                    parentId: currentFolderId,
                    color: '#FFE600',
                  });
                }}
                className="px-2.5 py-1 bg-[#FFE600] text-black border-2 border-black rounded-full font-extrabold text-xs neo-shadow-sm hover:bg-yellow-400 flex items-center space-x-1"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Folder</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Finder Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 bg-gray-50 dark:bg-zinc-800 border-r-3 border-black p-3 space-y-1 text-xs font-bold">
          <div className="text-[10px] uppercase font-mono text-gray-500 mb-2 px-2">Favorites</div>
          {sidebarFolders.map(sb => (
            <button
              key={sb.id}
              onClick={() => navigateToFolder(sb.id)}
              className={`w-full text-left px-3 py-2 rounded-2xl border-2 flex items-center space-x-2 transition-all ${
                currentFolderId === sb.id
                  ? 'bg-[#FFE600] text-black border-black neo-shadow-sm font-extrabold'
                  : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Folder className="w-4 h-4 text-black stroke-[2.5]" />
              <span className="truncate">{sb.name}</span>
            </button>
          ))}
        </div>

        {/* File Grid / List View */}
        <div className="flex-1 p-4 overflow-auto">
          {currentFolderFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 font-mono text-xs">
              <Folder className="w-12 h-12 mb-2 opacity-50" />
              <span>This folder is empty</span>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentFolderFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => setPreviewFile(file)}
                  onDoubleClick={() => {
                    if (file.type === 'folder') {
                      navigateToFolder(file.id);
                    } else if (file.extension === 'jpg') {
                      openApp('photos');
                    } else {
                      openApp('textedit', file.id);
                    }
                  }}
                  className={`p-3 bg-white dark:bg-zinc-800 border-3 border-black rounded-2xl neo-shadow-sm hover:neo-shadow hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-center transition-all ${
                    previewFile?.id === file.id ? 'ring-3 ring-black bg-yellow-100 dark:bg-zinc-700' : ''
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center mb-2"
                    style={{ backgroundColor: file.color || '#FFE600' }}
                  >
                    {file.type === 'folder' ? (
                      <Folder className="w-6 h-6 text-black stroke-[2.5]" />
                    ) : (
                      <FileText className="w-6 h-6 text-black stroke-[2.5]" />
                    )}
                  </div>
                  <span className="font-extrabold text-xs text-center truncate w-full">{file.name}</span>
                  <span className="text-[9px] font-mono text-gray-500 mt-1">{file.size || 'Folder'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1.5">
              {currentFolderFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => setPreviewFile(file)}
                  onDoubleClick={() => {
                    if (file.type === 'folder') navigateToFolder(file.id);
                    else openApp('textedit', file.id);
                  }}
                  className={`p-2.5 bg-white dark:bg-zinc-800 border-2 border-black rounded-xl flex items-center justify-between cursor-pointer font-bold text-xs hover:bg-yellow-100 dark:hover:bg-zinc-700 ${
                    previewFile?.id === file.id ? 'bg-[#FFE600] text-black font-extrabold' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-black" />
                    <span>{file.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 font-mono text-[10px] text-gray-500">
                    <span>{file.updatedAt}</span>
                    <span>{file.size || 'Folder'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Look Preview Panel */}
        {previewFile && (
          <div className="w-64 bg-[#FFFEE0] dark:bg-zinc-800 border-l-3 border-black p-4 flex flex-col justify-between text-xs">
            <div>
              <div className="flex items-center justify-between font-extrabold mb-3">
                <span className="uppercase font-mono text-gray-500 text-[10px]">Quick Look</span>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="px-2 py-0.5 bg-black text-white border border-black rounded-lg text-[10px]"
                >
                  CLOSE
                </button>
              </div>

              <div className="p-4 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl neo-shadow-sm mb-3 text-center">
                <div
                  className="w-16 h-16 mx-auto rounded-2xl border-2 border-black flex items-center justify-center mb-2"
                  style={{ backgroundColor: previewFile.color || '#FFE600' }}
                >
                  <FileText className="w-8 h-8 text-black" />
                </div>
                <div className="font-extrabold text-sm break-words">{previewFile.name}</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">{previewFile.size || 'Directory'}</div>
              </div>

              {previewFile.content && (
                <div className="p-3 bg-white dark:bg-zinc-900 border-2 border-black rounded-xl font-mono text-[11px] max-h-40 overflow-auto whitespace-pre-wrap">
                  {previewFile.content}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-3 border-t-2 border-black">
              {currentFolderId === 'trash' ? (
                <button
                  onClick={() => restoreFile(previewFile.id)}
                  className="w-full py-2 bg-[#6BCB77] text-black border-2 border-black rounded-xl font-black neo-shadow-sm hover:bg-green-500"
                >
                  Restore File
                </button>
              ) : (
                <button
                  onClick={() => deleteFile(previewFile.id)}
                  className="w-full py-2 bg-red-500 text-white border-2 border-black rounded-xl font-black neo-shadow-sm hover:bg-red-600 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Move to Trash</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
