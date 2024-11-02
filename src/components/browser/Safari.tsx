import { useState } from 'react';
import { motion } from 'framer-motion';
import { WindowTitleBar } from '../window/WindowTitleBar';
import { useGitHubData } from '@/hooks/useGitHubData';
import { useSafariWindow } from '@/hooks/useSafariWindow';
import { SafariToolbar } from './SafariToolbar';
import { SafariContent } from './SafariContent';

interface SafariProps {
  isDarkMode: boolean;
  url: string;
  onClose: () => void;
  isMaximized?: boolean;
  onMaximize?: () => void;
}

export const Safari = ({ isDarkMode, url, onClose, isMaximized, onMaximize }: SafariProps) => {
  const { isLoading, userData, repos, error } = useGitHubData(url);
  const { isClosing, handleClose } = useSafariWindow(onClose);
  const [activeTab, setActiveTab] = useState('overview');

  const handleMinimize = () => {
  };

  const handleMouseDown = (e: React.MouseEvent) => {
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-start justify-center">
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -10 }}
        animate={{ 
          scale: isClosing ? 0.9 : 1,
          opacity: isClosing ? 0 : 1,
          y: isClosing ? 10 : 0
        }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
        className={`relative w-[90%] h-[85%] mt-8 flex flex-col
          ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-[#ffffff]'}
          shadow-2xl shadow-black/20
          rounded-xl border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <WindowTitleBar
          isDarkMode={isDarkMode}
          onClose={handleClose}
          isMaximized={isMaximized || false}
          onMaximize={onMaximize || (() => {})}
          onMinimize={handleMinimize}
          onMouseDown={handleMouseDown}
          title="Safari"
        />

        <SafariToolbar isDarkMode={isDarkMode} url={url} onMaximize={onMaximize} />

        <SafariContent 
          isDarkMode={isDarkMode}
          isLoading={isLoading}
          userData={userData}
          repos={repos}
          error={error}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </motion.div>
    </div>
  );
};