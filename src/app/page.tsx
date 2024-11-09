'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useNotes } from '@/hooks/useNotes';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { MenuBar } from '@/components/layout/MenuBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { NotesList } from '@/components/notes/NotesList';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { WindowTitleBar } from '@/components/window/WindowTitleBar';
import { SleepScreen } from '@/components/system/SleepScreen';
import { LockScreen } from '@/components/system/LockScreen';
import { Safari } from '@/components/browser/Safari';


export default function Home() {
  const currentTime = useCurrentTime();
  const [isAsleep, setIsAsleep] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSafariOpen, setIsSafariOpen] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { position, startDragging } = useWindowDrag(isMaximized);
  const { notes, selectedNote, setSelectedNote, addNote, deleteNote, updateNote } = useNotes();

  // Auto sleep after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsAsleep(true);
        setIsLocked(true);
      }, 1 * 60 * 1000); // 1 minutes
    };

    const handleActivity = () => {
      if (!isAsleep && !isLocked) {
        resetTimeout();
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isAsleep, isLocked]);

  const handleWake = () => {
    setIsAsleep(false);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleFileAction = (action: string) => {
    switch (action) {
      case 'new':
        addNote();
        break;
      case 'delete':
        if (selectedNote) {
          deleteNote(selectedNote.id);
        }
        break;
      case 'save':
        console.log('Saving note...');
        break;
      case 'saveAs':
        console.log('Save As...');
        break;
      case 'open':
        console.log('Opening note...');
        break;
      case 'close':
        setSelectedNote(null);
        break;
      case 'toggle':
        setIsFileMenuOpen(!isFileMenuOpen);
        return;
      default:
        console.log(`${action} functionality to be implemented`);
    }
    setIsFileMenuOpen(false);
  }; 

  const handleWindowControl = (action: 'close' | 'minimize' | 'maximize') => {
    if (typeof window === 'undefined') return;

    const mainWindow = document.querySelector('.main-window') as HTMLElement;
    
    switch (action) {
      case 'maximize':
        setIsMaximized(!isMaximized);
        break;
        
      case 'minimize':
        if (mainWindow) {
          mainWindow.style.transition = 'all 0.3s cubic-bezier(0.2, 0.82, 0.2, 1)';
          mainWindow.style.transform = 'scale(0.7) translateY(10px)';
          mainWindow.style.opacity = '0';
          
          setTimeout(() => {
            mainWindow.style.transition = 'none';
            mainWindow.style.transform = 'scale(0.5) translateY(100vh)';
            
            setTimeout(() => {
              mainWindow.style.transition = 'all 0.4s cubic-bezier(0.2, 0.82, 0.2, 1)';
              mainWindow.style.transform = '';
              mainWindow.style.opacity = '1';
            }, 50);
          }, 300);
        }
        break;
        
      case 'close':
        if (mainWindow) {
          mainWindow.style.transition = 'all 0.2s cubic-bezier(0.2, 0.82, 0.2, 1)';
          mainWindow.style.transform = 'scale(0.9)';
          mainWindow.style.opacity = '0';
          
          setTimeout(() => {
            mainWindow.style.transition = 'none';
            mainWindow.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
              mainWindow.style.transition = 'all 0.3s cubic-bezier(0.2, 0.82, 0.2, 1)';
              mainWindow.style.transform = '';
              mainWindow.style.opacity = '1';
            }, 50);
          }, 200);
        }
        break;
    }
  };

  const handleSleep = () => {
    setIsAsleep(true);
  };

  const handleLock = () => {
    setIsLocked(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Sleep shortcut: Command + Option + Power (P)
      if (e.metaKey && e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsAsleep(true);
      }
      // Lock shortcut: Command + Control + Q
      if (e.metaKey && e.ctrlKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setIsLocked(true);
      }
      // Wake shortcut: Space or Enter
      if ((e.key === ' ' || e.key === 'Enter') && isAsleep) {
        e.preventDefault();
        setIsAsleep(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAsleep]);

  return (
    <>
      <div className={`h-screen font-sans flex flex-col transition-all duration-300 
        ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-[#e8e8e8] text-black'}
        relative z-0`}
      >
        <MenuBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isFileMenuOpen={isFileMenuOpen}
          setIsFileMenuOpen={setIsFileMenuOpen}
          handleFileAction={handleFileAction}
          currentTime={currentTime}
          onSleep={handleSleep}
          onLock={handleLock}
        />

        <motion.div 
          className={`main-window flex-1 flex flex-col will-change-transform
            ${isMaximized 
              ? 'm-0 w-full max-w-none rounded-none' 
              : 'mx-auto my-3 w-[92%] max-w-6xl rounded-xl'
            }
            overflow-hidden shadow-2xl relative z-10
            ${isDarkMode 
              ? 'bg-[#232323] shadow-black/40' 
              : 'bg-[#ffffff] shadow-black/15'}`}
          initial={false}
          animate={{ 
            scale: isMaximized ? 1 : 0.95,
            x: isMaximized ? 0 : position.x,
            y: isMaximized ? 0 : position.y,
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
          style={{
            transform: isMaximized ? undefined : `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <WindowTitleBar 
            isDarkMode={isDarkMode}
            isMaximized={isMaximized}
            onClose={() => handleWindowControl('close')}
            onMinimize={() => handleWindowControl('minimize')}
            onMaximize={() => handleWindowControl('maximize')}
            onMouseDown={startDragging}
          />

          {/* Main window content */}
          <div className="flex-1 flex overflow-hidden">
            <Sidebar
              isDarkMode={isDarkMode}
              notesCount={notes.length}
              onAddNote={addNote}
            />

            <div className={`w-64 border-r ${
              isDarkMode ? 'border-[#3a3a3a]' : 'border-[#e7e7e7]'
            }`}>
              <NotesList
                notes={notes}
                selectedNote={selectedNote}
                isDarkMode={isDarkMode}
                onSelectNote={setSelectedNote}
              />
            </div>

            <div className={`flex-1 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white'} overflow-y-auto`}>
              <AnimatePresence mode="wait">
                {selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    isDarkMode={isDarkMode}
                    onUpdate={updateNote}
                  />
                ) : (
                  <EmptyState isDarkMode={isDarkMode} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sleep and Lock screens */}
      <SleepScreen isAsleep={isAsleep} onWake={handleWake} />
      <LockScreen 
        isLocked={isLocked} 
        onUnlock={handleUnlock}
        currentTime={currentTime} 
        isDarkMode={isDarkMode}
      />

      {/* Safari Browser */}
      <AnimatePresence>
        {isSafariOpen && (
          <Safari
            isDarkMode={isDarkMode}
            url="https://github.com/dendianugerah"
            onClose={() => setIsSafariOpen(false)}
            isMaximized={false}
            onMaximize={() => {/* handle maximize */}}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const EmptyState = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`h-full flex flex-col items-center justify-center ${
      isDarkMode ? 'text-[#b3b3b3]' : 'text-[#8e8e93]'
    }`}
  >
    <span className="text-sm">Select a note or create a new one</span>
  </motion.div>
);