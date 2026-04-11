import { useState, useCallback, useEffect, useRef } from 'react';

const useResizable = (initialSize = { width: 360, height: 480 }, initialPos = { bottom: 24, right: 24 }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPos);
  const [isResizing, setIsResizing] = useState(false);
  const sizeRef = useRef(initialSize);
  
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
      newBottom = Math.max(0, Math.min(viewportHeight - newHeight, (startBottom || 24) - dy));
      newRight = Math.max(0, Math.min(viewportWidth - newWidth, (startRight || 24) - dx));
      setPosition({ bottom: Number(newBottom) || 0, right: Number(newRight) || 0 });
      return;
    }

    // Horizontal Clamp
    if (direction.includes('e')) {
      newWidth = Math.min(viewportWidth - (startRight || 0), (startWidth || 320) + dx);
      newRight = (startRight || 0) - (newWidth - (startWidth || 0)); 
    } else if (direction.includes('w')) {
      newWidth = Math.min(viewportWidth - (startRight || 0), (startWidth || 320) - dx);
    }

    // Vertical Clamp
    if (direction.includes('s')) {
      newHeight = Math.min(viewportHeight - (startBottom || 0), (startHeight || 400) + dy);
      newBottom = (startBottom || 0) - (newHeight - (startHeight || 0));
    } else if (direction.includes('n')) {
      newHeight = Math.min(viewportHeight - (startBottom || 0), (startHeight || 400) - dy);
    }

    if (newWidth >= minWidth) {
      const w = Number(newWidth) || minWidth;
      sizeRef.current = { ...sizeRef.current, width: w };
      setSize((prev) => ({ ...prev, width: w }));
      setPosition((prev) => ({ ...prev, right: Math.max(0, Number(newRight) || 0) }));
    }
    if (newHeight >= minHeight) {
      const h = Number(newHeight) || minHeight;
      sizeRef.current = { ...sizeRef.current, height: h };
      setSize((prev) => ({ ...prev, height: h }));
      setPosition((prev) => ({ ...prev, bottom: Math.max(0, Number(newBottom) || 0) }));
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

  // Clamp position & size when browser is resized
  useEffect(() => {
    const handleResize = () => {
      const curWidth = Number(sizeRef.current.width) || 360;
      const curHeight = Number(sizeRef.current.height) || 480;
      const clampedWidth = Math.min(curWidth, window.innerWidth);
      const clampedHeight = Math.min(curHeight, window.innerHeight);

      if (clampedWidth !== curWidth || clampedHeight !== curHeight) {
        sizeRef.current = { width: clampedWidth, height: clampedHeight };
        setSize({ width: clampedWidth, height: clampedHeight });
      }

      setPosition((prev) => {
        const safeBottom = Number(prev.bottom) || 24;
        const safeRight = Number(prev.right) || 24;
        return {
          bottom: Math.min(safeBottom, Math.max(0, window.innerHeight - clampedHeight)),
          right: Math.min(safeRight, Math.max(0, window.innerWidth - clampedWidth)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    size,
    position,
    setPosition,
    isResizing,
    onResizeStart,
  };
};

export default useResizable;
