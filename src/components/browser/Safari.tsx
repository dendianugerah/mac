'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowTitleBar } from '../window/WindowTitleBar';
import { useGitHubData } from '@/hooks/useGitHubData';
import { useSafariWindow } from '@/hooks/useSafariWindow';
import { SafariToolbar } from './SafariToolbar';
import { SafariContent } from './SafariContent';
import { SafariTabs } from './SafariTabs';
import { ClientPortal } from '@/lib/client-portal';

interface SafariProps {
  isDarkMode: boolean;
  url: string;
  onClose: () => void;
  isMaximized?: boolean;
  onMaximize?: () => void;
}

interface Tab {
  id: string;
  url: string;
  title: string;
  type: 'github' | 'web';
}

export const Safari = ({ isDarkMode, url, onClose, isMaximized, onMaximize }: SafariProps) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', url, title: 'GitHub', type: 'github' as const }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const { isLoading, userData, repos, error } = useGitHubData(
    activeTab?.type === 'github' && activeTab.url ? activeTab.url : url
  );
  const { isClosing, handleClose } = useSafariWindow(onClose);

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: 'https://www.google.com',
      title: 'New Tab',
      type: 'web' as const
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) {
      handleClose();
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const updateTabUrl = (tabId: string, newUrl: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId 
        ? { 
            ...tab, 
            url: newUrl,
            type: newUrl.includes('github.com') ? 'github' : 'web'
          }
        : tab
    ));
  };

  const handleMinimize = () => {
  };

  const handleMouseDown = () => {
  };

  return (
    <ClientPortal>
      <AnimatePresence>
        <div className="fixed inset-0 flex items-start justify-center">
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
            className={`relative w-[90%] h-[85%] mt-6 flex flex-col
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
              className="rounded-t-xl"
            />

            <div className={`flex-1 flex flex-col
              ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f6f6f6]'}`}>
              <SafariTabs
                tabs={tabs}
                activeTabId={activeTabId}
                isDarkMode={isDarkMode}
                onTabClick={setActiveTabId}
                onAddTab={addNewTab}
                onCloseTab={closeTab}
              />

              <SafariToolbar 
                isDarkMode={isDarkMode} 
                url={activeTab?.url || ''} 
                onUrlChange={(newUrl) => updateTabUrl(activeTabId, newUrl)}
              />

              <SafariContent 
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                userData={userData}
                repos={repos}
                error={error}
                activeTab={{
                  url: activeTab?.url || '',
                  type: activeTab?.type || 'web'
                }}
                type={activeTab?.type || 'web'}
              />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </ClientPortal>
  );
};