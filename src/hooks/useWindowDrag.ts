import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface WindowState {
  isDragging: boolean;
  position: Position;
  lastPosition: Position;
}

export const useWindowDrag = (isMaximized: boolean) => {
  const [windowState, setWindowState] = useState<WindowState>({
    isDragging: false,
    position: { x: 0, y: 0 },
    lastPosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!windowState.isDragging) return;

      const dx = e.clientX - windowState.lastPosition.x;
      const dy = e.clientY - windowState.lastPosition.y;

      setWindowState(prev => ({
        ...prev,
        position: {
          x: prev.position.x + dx,
          y: prev.position.y + dy,
        },
        lastPosition: { x: e.clientX, y: e.clientY },
      }));
    };

    const handleMouseUp = () => {
      setWindowState(prev => ({ ...prev, isDragging: false }));
    };

    if (windowState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [windowState.isDragging, windowState.lastPosition]);

  const startDragging = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setWindowState(prev => ({
      ...prev,
      isDragging: true,
      lastPosition: { x: e.clientX, y: e.clientY },
    }));
  };

  return {
    position: windowState.position,
    startDragging,
  };
}; 