import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Volume1, Volume, VolumeX } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface VolumeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const VolumeMenu = ({ isOpen, onClose, isDarkMode }: VolumeMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, onClose);
  const [volume, setVolume] = useState(75);
  const [alertVolume, setAlertVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [playFeedback, setPlayFeedback] = useState(true);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleAlertVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertVolume(parseInt(e.target.value));
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-4 h-4" />;
    if (volume < 30) return <Volume className="w-4 h-4" />;
    if (volume < 70) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.1 }}
          className={`absolute right-0 top-7 w-[280px] rounded-lg
            ${isDarkMode ? 'bg-[#2a2a2a]/90' : 'bg-[#ffffff]/90'} 
            backdrop-blur-2xl
            border ${isDarkMode ? 'border-[#3a3a3a]' : 'border-[#d1d1d6]/50'}
            shadow-xl shadow-black/20 z-[9999]`}
        >
          <div className="py-1">
            {/* Volume Control */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Volume
                </span>
                <span className={`text-[13px] ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                  {volume}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className={`p-1 rounded transition-colors duration-150
                    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                    ${isMuted || volume === 0 ? 'text-[#86868b]' : 'text-[#007AFF]'}`}
                >
                  {getVolumeIcon()}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 appearance-none bg-gradient-to-r from-[#007AFF] to-[#007AFF] rounded-full outline-none
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-[16px]
                    [&::-webkit-slider-thumb]:h-[16px]
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-[#007AFF]/20"
                  style={{
                    background: `linear-gradient(to right, #007AFF ${volume}%, ${isDarkMode ? '#424242' : '#e5e5e5'} ${volume}%)`
                  }}
                />
              </div>
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            {/* Sound Output */}
            <div className="py-1">
              <div className={`px-3 py-1 text-[13px] font-medium ${isDarkMode ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
                Sound Output
              </div>
              <OutputDeviceItem
                icon="🔊"
                label="MacBook Pro Speakers"
                isActive={true}
                isDarkMode={isDarkMode}
              />
              <OutputDeviceItem
                icon="🎧"
                label="AirPods Pro"
                isActive={false}
                isDarkMode={isDarkMode}
              />
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            {/* Sound Options */}
            <div className="py-1">
              <div className="px-3 py-1 flex items-center justify-between">
                <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Alert volume
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alertVolume}
                  onChange={handleAlertVolumeChange}
                  className="w-24 h-1 appearance-none rounded-full outline-none
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-[12px]
                    [&::-webkit-slider-thumb]:h-[12px]
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-[#007AFF]/20"
                  style={{
                    background: `linear-gradient(to right, #007AFF ${alertVolume}%, ${isDarkMode ? '#424242' : '#e5e5e5'} ${alertVolume}%)`
                  }}
                />
              </div>
              <div className="px-3 py-1 flex items-center justify-between">
                <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Play feedback when volume is changed
                </span>
                <button
                  onClick={() => setPlayFeedback(!playFeedback)}
                  className={`w-[36px] h-[20px] rounded-full relative
                    ${playFeedback ? 'bg-[#007AFF]' : isDarkMode ? 'bg-[#424242]' : 'bg-[#e5e5e5]'}
                    transition-colors duration-200`}
                >
                  <div className={`absolute w-[16px] h-[16px] rounded-full bg-white
                    top-[2px] left-[2px] transition-transform duration-200
                    ${playFeedback ? 'translate-x-[16px]' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>

            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

            {/* Sound Settings */}
            <div className="py-1">
              <button className={`w-full px-3 py-1 text-left
                ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                transition-colors duration-150`}
              >
                <span className={`text-[13px] text-[#007AFF]`}>
                  Sound Settings...
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface OutputDeviceItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  isDarkMode: boolean;
}

const OutputDeviceItem = ({ icon, label, isActive, isDarkMode }: OutputDeviceItemProps) => (
  <div className={`px-3 py-1 flex items-center justify-between
    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
    transition-colors duration-150 cursor-default`}
  >
    <div className="flex items-center space-x-2">
      <span className="text-[13px]">{icon}</span>
      <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {label}
      </span>
    </div>
    {isActive && (
      <div className="text-[#007AFF] text-[13px]">✓</div>
    )}
  </div>
);

interface SoundOptionProps {
  label: string;
  isDarkMode: boolean;
  showSlider?: boolean;
  value?: number;
  isToggle?: boolean;
  isActive?: boolean;
}

const SoundOption = ({ label, isDarkMode, showSlider, value, isToggle, isActive }: SoundOptionProps) => (
  <div className={`px-3 py-1 flex items-center justify-between
    ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}
    transition-colors duration-150 cursor-default`}
  >
    <span className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {label}
    </span>
    {showSlider && (
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="w-24 h-1 appearance-none bg-[#007AFF] rounded-full outline-none
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-[12px]
          [&::-webkit-slider-thumb]:h-[12px]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:border
          [&::-webkit-slider-thumb]:border-[#007AFF]/20"
      />
    )}
    {isToggle && (
      <div className={`w-[36px] h-[20px] rounded-full relative
        ${isActive ? 'bg-[#007AFF]' : isDarkMode ? 'bg-[#424242]' : 'bg-[#e5e5e5]'}
        transition-colors duration-200`}
      >
        <div className={`absolute w-[16px] h-[16px] rounded-full bg-white
          top-[2px] left-[2px] transition-transform duration-200
          ${isActive ? 'translate-x-[16px]' : 'translate-x-0'}`}
        />
      </div>
    )}
  </div>
); 