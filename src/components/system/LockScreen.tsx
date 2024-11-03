import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Wallpaper } from './Wallpaper';
import { User, Lock, Power } from 'lucide-react';
import Image from 'next/image';

interface LockScreenProps {
  isLocked: boolean;
  onUnlock: () => void;
  currentTime: Date;
  isDarkMode: boolean;
}

export const LockScreen = ({ isLocked, onUnlock, currentTime, isDarkMode }: LockScreenProps) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showPowerOptions, setShowPowerOptions] = useState(false);

  const profilePicture = "/image/profile_picture.png";

  useEffect(() => {
    if (isLocked) {
      const timer = setTimeout(() => setShowInput(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowInput(false);
      setPassword('');
      setShowError(false);
      setIsUnlocking(false);
      setShowPowerOptions(false);
    }
  }, [isLocked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLocked) return;
      
      if (!showInput) {
        setShowInput(true);
        return;
      }

      if (e.key === 'Enter') {
        handleSubmit(e as unknown as React.FormEvent);
      } else if (e.key === 'Escape') {
        setPassword('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, password, showInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'velldy') {
      setIsUnlocking(true);
      setShowError(false);
      
      setTimeout(() => {
        setPassword('');
        onUnlock();
      }, 600);
    } else {
      setShowError(true);
      setPassword('');
      const input = document.querySelector('input');
      if (input) {
        input.classList.add('animate-shake');
        setTimeout(() => input.classList.remove('animate-shake'), 500);
      }
    }
  };

  const PowerOptions = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-8 flex items-center space-x-6"
    >
      <button 
        onClick={() => console.log('restart')}
        className="flex flex-col items-center space-y-2 text-white/80 hover:text-white 
          transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl 
          flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 3V8H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 16V21H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 8C21 9.8385 20.3271 11.6215 19.0711 13.0711C17.8151 14.5207 16.0674 15.5 14.1582 15.8911" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 16C3 14.1615 3.67294 12.3785 4.92893 10.9289C6.18492 9.47928 7.93261 8.49998 9.84183 8.10889" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xs">Restart</span>
      </button>
      <button 
        onClick={() => console.log('shutdown')}
        className="flex flex-col items-center space-y-2 text-white/80 hover:text-white 
          transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl 
          flex items-center justify-center">
          <Power className="w-4 h-4" />
        </div>
        <span className="text-xs">Shut Down</span>
      </button>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center"
          onClick={() => !showInput && setShowInput(true)}
        >
          <Wallpaper isDarkMode={isDarkMode} isBlurred />

          {/* Power button in top-right corner */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 
              backdrop-blur-xl flex items-center justify-center text-white/80 
              hover:text-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowPowerOptions(!showPowerOptions);
            }}
          >
            <Power className="w-4 h-4" />
          </motion.button>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
            <motion.div
              className="text-white text-center space-y-2 mb-16"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.div className="text-[96px] font-extralight tracking-tight">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </motion.div>
              <motion.div className="text-[34px] font-light tracking-wide">
                {currentTime.toLocaleDateString([], { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </motion.div>
            </motion.div>

            <AnimatePresence mode="wait">
              {showInput && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col items-center space-y-6"
                >
                  <div className="flex flex-col items-center space-y-2">
                    {profilePicture ? (
                      <div className="w-[72px] h-[72px] rounded-full bg-white/10 
                        backdrop-blur-xl border border-white/20 overflow-hidden">
                        <Image
                          src={profilePicture}
                          alt="Profile"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                    <div className="w-[72px] h-[72px] rounded-full bg-white/10 
                      backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-white/80" />
                    </div>
                    )}
                    <div className="text-white/90 text-lg font-medium">
                      User
                    </div>
                  </div>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="relative group">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className={`px-12 py-3 w-[280px] rounded-full 
                          ${isUnlocking ? 'bg-white/20' : 'bg-white/10'} 
                          backdrop-blur-xl border border-white/20 
                          text-white placeholder:text-white/40
                          focus:outline-none focus:ring-2 focus:ring-white/30 
                          text-center text-lg transition-all duration-300
                          group-hover:bg-white/[0.15]`}
                        disabled={isUnlocking}
                        autoFocus
                      />
                      <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 
                        w-4 h-4 text-white/40" />
                    </div>

                    <AnimatePresence>
                      {showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm text-center font-medium"
                        >
                          Wrong password. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.form>

                  <div className="text-white/60 text-sm">
                  Click or press any key to unlock (Password: velldy)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showPowerOptions && <PowerOptions />}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 