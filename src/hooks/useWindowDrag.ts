import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useWindowDrag = (isMaximized: boolean) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [windowStart, setWindowStart] = useState<Position>({ x: 0, y: 0 });

  const startDragging = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setWindowStart({ ...position });

    // Prevent text selection while dragging
    e.preventDefault();
  }, [isMaximized, position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setPosition({
        x: windowStart.x + deltaX,
        y: windowStart.y + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart.x, dragStart.y, windowStart]);

  // Reset position when window is closed
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [isMaximized]);

  return {
    position,
    isDragging,
    startDragging,
  };
}; 