import { useState } from 'react';

export const useSafariWindow = (onClose: () => void) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return {
    isClosing,
    handleClose
  };
}; 