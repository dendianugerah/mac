import { Note } from '@/types';
import { Search, MoreVertical, Pin } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  isDarkMode: boolean;
  onSelectNote: (note: Note) => void;
}

export const NotesList = ({ notes, selectedNote, isDarkMode, onSelectNote }: NotesListProps) => {
  // Group notes by pinned status
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className={`w-64 flex-shrink-0 
      ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'} 
      border-r ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} 
      flex flex-col`}
    >
      <div className={`h-10
        ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f6f6f6]'} 
        border-b ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} 
        flex items-center px-4`}
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className={`w-full pl-8 pr-4 py-1 rounded-md
              ${isDarkMode 
                ? 'bg-[#1e1e1e] text-white placeholder-[#b3b3b3]' 
                : 'bg-[#e3e3e5] text-black placeholder-[#8e8e93]'
              } focus:outline-none focus:ring-2 focus:ring-[#007aff] text-[13px]`}
          />
          <Search className={`absolute left-2 top-1.5 w-4 h-4
            ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#8e8e93]'}`} 
          />
        </div>
        <button className="ml-4 text-[#007aff] hover:opacity-80 transition-opacity">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Pinned Notes Section */}
        {pinnedNotes.length > 0 && (
          <>
            <div className={`px-3 py-1 text-xs font-medium
              ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}
            >
              Pinned Notes
            </div>
            {pinnedNotes.map(note => (
              <NoteListItem
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                isDarkMode={isDarkMode}
                onClick={() => onSelectNote(note)}
              />
            ))}
            <div className={`h-[1px] mx-3 my-1
              ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#d1d1d6]'}`}
            />
          </>
        )}

        {/* Other Notes Section */}
        {unpinnedNotes.length > 0 && (
          <>
            <div className={`px-3 py-1 text-xs font-medium
              ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}
            >
              Notes
            </div>
            {unpinnedNotes.map(note => (
              <NoteListItem
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                isDarkMode={isDarkMode}
                onClick={() => onSelectNote(note)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  isDarkMode: boolean;
  onClick: () => void;
}

const NoteListItem = ({ note, isSelected, isDarkMode, onClick }: NoteListItemProps) => (
  <div
    className={`px-3 py-2 cursor-pointer border-b 
      ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} 
      ${isSelected 
        ? (isDarkMode ? 'bg-[#3a3a3a]' : 'bg-[#e8e8ed]') 
        : (isDarkMode ? 'hover:bg-[#333333]' : 'hover:bg-[#f6f6f6]')}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <h3 className={`font-medium text-[13px]
        ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}
      >
        {note.title}
      </h3>
      {note.isPinned && (
        <Pin className={`w-3 h-3 ${isDarkMode ? 'text-[#007AFF]' : 'text-[#007AFF]'}`} />
      )}
    </div>
    <p className={`text-[11px]
      ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#888888]'} mt-0.5`}
    >
      {note.date}
    </p>
    <p className={`text-[12px]
      ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#888888]'} mt-1 truncate`}
    >
      {note.content}
    </p>
  </div>
); 