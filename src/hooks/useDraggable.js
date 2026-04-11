import { useState, useEffect, useRef } from 'react';

const useDraggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const localPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    
    setIsDragging(true);
    setDragged(false); // Reset on new click
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setDragged(true);
      }

      let newX = Number(localPos.current.x || 0) + dx;
      let newY = Number(localPos.current.y || 0) + dy;

      const viewportWidth = window.innerWidth || 1024;
      const viewportHeight = window.innerHeight || 768;
      const btnSize = 56;
      const offset = 24;

      newX = Math.max(24 - viewportWidth + btnSize, Math.min(offset, newX));
      newY = Math.max(24 - viewportHeight + btnSize, Math.min(offset, newY));

      setPosition({
        x: Number(newX) || 0,
        y: Number(newY) || 0,
      });
    };


    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localPos.current = position;
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const updatePosition = (newPos) => {
    setPosition(newPos);
    localPos.current = newPos;
  };

  // Clamp button position when browser is resized
  useEffect(() => {
    const handleResize = () => {
      const btnSize = 56;
      const vw = window.innerWidth || 1024;
      const vh = window.innerHeight || 768;
      // x is a translate offset from right:24, y from bottom:24
      // x range: [24 - vw + btnSize, 24]  (more negative = more left)
      // y range: [24 - vh + btnSize, 24]  (more negative = more up)
      setPosition((prev) => {
        const safeX = Number(prev.x) || 0;
        const safeY = Number(prev.y) || 0;
        const clampedX = Math.max(24 - vw + btnSize, Math.min(24, safeX));
        const clampedY = Math.max(24 - vh + btnSize, Math.min(24, safeY));
        const newPos = { x: clampedX, y: clampedY };
        localPos.current = newPos;
        return newPos;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    position,
    setPosition: updatePosition,
    handleMouseDown,
    isDragging,
    dragged,
  };
};

export default useDraggable;
