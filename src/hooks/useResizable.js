import { useState, useCallback, useRef } from 'react';

const useResizable = (initialSize = { width: 360, height: 480 }, initialPos = { bottom: 24, right: 24 }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPos);
  const [isResizing, setIsResizing] = useState(false);
  
  const resizeRef = useRef({
    direction: '',
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startBottom: 0,
    startRight: 0,
  });


  const onResizeMove = useCallback((e) => {
    const { direction, startX, startY, startWidth, startHeight, startBottom, startRight } = resizeRef.current;
    
    let newWidth = startWidth;
    let newHeight = startHeight;
    let newBottom = startBottom;
    let newRight = startRight;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Constraints
    const minWidth = 320;
    const minHeight = 400;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Clamp width/height to viewport size
    if (newWidth > viewportWidth) newWidth = viewportWidth;
    if (newHeight > viewportHeight) newHeight = viewportHeight;

    if (direction === 'move') {
      newBottom = Math.max(0, Math.min(viewportHeight - newHeight, startBottom - dy));
      newRight = Math.max(0, Math.min(viewportWidth - newWidth, startRight - dx));
      setPosition({ bottom: newBottom, right: newRight });
      return;
    }

    // Horizontal Clamp
    if (direction.includes('e')) {
      newWidth = Math.min(viewportWidth - startRight, startWidth + dx);
      newRight = startRight - (newWidth - startWidth); 
    } else if (direction.includes('w')) {
      newWidth = Math.min(viewportWidth - startRight, startWidth - dx);
    }

    // Vertical Clamp
    if (direction.includes('s')) {
      newHeight = Math.min(viewportHeight - startBottom, startHeight + dy);
      newBottom = startBottom - (newHeight - startHeight);
    } else if (direction.includes('n')) {
      newHeight = Math.min(viewportHeight - startBottom, startHeight - dy);
    }

    if (newWidth >= minWidth) {
      setSize((prev) => ({ ...prev, width: newWidth }));
      setPosition((prev) => ({ ...prev, right: Math.max(0, newRight) }));
    }
    if (newHeight >= minHeight) {
      setSize((prev) => ({ ...prev, height: newHeight }));
      setPosition((prev) => ({ ...prev, bottom: Math.max(0, newBottom) }));
    }
  }, []);


  const onResizeEnd = useCallback(function onResizeEndInner() {
    setIsResizing(false);
    window.removeEventListener('mousemove', onResizeMove);
    window.removeEventListener('mouseup', onResizeEndInner);
  }, [onResizeMove]);

  const onResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startBottom: position.bottom,
      startRight: position.right,
    };

    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);
  };

  return {
    size,
    position,
    setPosition,
    isResizing,
    onResizeStart,
  };
};

export default useResizable;
