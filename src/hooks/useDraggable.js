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

      let newX = localPos.current.x + dx;
      let newY = localPos.current.y + dy;

      // Optional clamping for floating button (56x56 size, 24px bottom/right original offset)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const btnSize = 56;
      const offset = 24;

      // Max X (Right edge): right: 0 => 24 + x = 0 => x = -24? 
      // Wait, if it's right: 24, and translate(x), then newRight = 24 - x.
      // newRight >= 0 => 24 - x >= 0 => x <= 24.
      // newRight <= viewportWidth - 56 => 24 - x <= viewportWidth - 56 => x >= 24 - viewportWidth + 56.
      
      newX = Math.max(24 - viewportWidth + btnSize, Math.min(offset, newX));
      newY = Math.max(24 - viewportHeight + btnSize, Math.min(offset, newY));

      setPosition({
        x: newX,
        y: newY,
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

  return {
    position,
    setPosition: updatePosition,
    handleMouseDown,
    isDragging,
    dragged,
  };
};

export default useDraggable;
