import { FolderClosed, ChevronRight, Plus } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  notesCount: number;
  onAddNote: () => void;
}

export const Sidebar = ({ isDarkMode, notesCount, onAddNote }: SidebarProps) => {
  return (
    <div className={`w-48 flex-shrink-0 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f6f6f6]'} border-r ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} flex flex-col`}>
      <div className="p-3 flex items-center justify-between">
        <h1 className={`text-[11px] font-semibold ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#888888]'} uppercase tracking-wide`}>iCloud</h1>
        <button className="text-[#007aff] text-xs font-medium">Edit</button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li className={`px-3 py-1 text-[13px] ${isDarkMode ? 'text-white bg-[#3a3a3a]' : 'text-[#000000] bg-[#e8e8ed]'} cursor-pointer flex items-center group`}>
            <FolderClosed className="w-4 h-4 mr-2 text-[#007aff]" />
            Notes
            <ChevronRight className="w-3 h-3 ml-auto text-[#b3b3b3]" />
          </li>
        </ul>
      </nav>
      <div className={`p-3 border-t ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'} flex justify-between items-center`}>
        <span className={`text-[11px] ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#888888]'}`}>{notesCount} Notes</span>
        <button onClick={onAddNote} className="text-[#007aff]">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 