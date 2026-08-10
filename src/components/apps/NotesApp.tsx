import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { StickyNote, Plus, Search, Trash2, Tag, Save, Check } from 'lucide-react';

export const NotesApp: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useOS();
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [search, setSearch] = useState('');
  const [savedBadge, setSavedBadge] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 1500);
  };

  return (
    <div className="h-full flex bg-white dark:bg-zinc-900 text-black dark:text-white font-sans select-none">
      {/* Notes Left Sidebar */}
      <div className="w-64 bg-[#FFFEE0] dark:bg-zinc-800 border-r-3 border-black p-3 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#FFBD2E] border-2 border-black rounded-xl">
                <StickyNote className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-sm">Notes & Ideas</span>
            </div>

            <button
              onClick={() => {
                addNote({
                  title: `Untitled Note ${notes.length + 1}`,
                  content: 'Type your thoughts here...',
                  tags: ['General'],
                  color: '#FFE600',
                });
              }}
              className="p-1.5 bg-[#4D96FF] text-white border-2 border-black rounded-xl neo-shadow-sm hover:bg-blue-600"
              title="New Note"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black stroke-[3]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-8 pr-3 py-1 bg-white text-black border-2 border-black rounded-full font-bold text-xs outline-none"
            />
          </div>

          {/* Notes List */}
          <div className="space-y-2 overflow-auto max-h-[380px]">
            {filteredNotes.map(n => (
              <div
                key={n.id}
                onClick={() => setSelectedNoteId(n.id)}
                className={`p-3 rounded-2xl border-2 border-black cursor-pointer transition-all ${
                  selectedNoteId === n.id
                    ? 'bg-black text-white neo-shadow-sm font-bold'
                    : 'bg-white text-black hover:bg-yellow-100'
                }`}
              >
                <div className="font-extrabold text-xs truncate">{n.title}</div>
                <div className="text-[10px] opacity-70 line-clamp-1 mt-0.5">{n.content}</div>
                <div className="text-[9px] font-mono opacity-50 mt-1">{n.updatedAt}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedNote && (
          <button
            onClick={() => deleteNote(selectedNote.id)}
            className="w-full py-2 bg-red-500 text-white border-2 border-black rounded-xl font-bold text-xs neo-shadow-sm hover:bg-red-600 flex items-center justify-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Note</span>
          </button>
        )}
      </div>

      {/* Main Note Editor */}
      {selectedNote ? (
        <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={selectedNote.title}
                onChange={e => updateNote(selectedNote.id, { title: e.target.value })}
                className="text-xl font-black bg-transparent outline-none border-b-2 border-black pb-1 w-full max-w-lg"
              />

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-[#6BCB77] text-black border-2 border-black rounded-full font-extrabold text-xs neo-shadow-sm flex items-center space-x-1"
              >
                {savedBadge ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{savedBadge ? 'Saved!' : 'Save'}</span>
              </button>
            </div>

            <textarea
              value={selectedNote.content}
              onChange={e => updateNote(selectedNote.id, { content: e.target.value })}
              className="flex-1 w-full p-4 bg-gray-50 dark:bg-zinc-800 border-3 border-black rounded-2xl neo-shadow font-mono text-xs leading-relaxed outline-none resize-none"
              placeholder="Write anything..."
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center font-mono text-xs text-gray-400">
          Select or create a note
        </div>
      )}
    </div>
  );
};
