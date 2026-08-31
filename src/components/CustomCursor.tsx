import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Disable on touch screens
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(touchQuery.matches);
    
    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    touchQuery.addEventListener('change', handleTouchChange);

    if (touchQuery.matches) return;

    // Apply cursor-none to body so we don't double up
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });

      // Scan target properties to morph cursor
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        setHoverType(cursorAttr.getAttribute('data-cursor'));
      } else if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setHoverType('interactive');
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Ease tracking
    const updateCursor = () => {
      setPosition((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        // Dampened velocity interpolation
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      touchQuery.removeEventListener('change', handleTouchChange);
      cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos]);

  if (isMobile) return null;

  const isInteractive = hoverType !== null;
  const size = isInteractive ? 40 : 8;

  return (
    <>
      {/* Outer target ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[8px]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          width: `${size}px`,
          height: `${size}px`,
          border: isInteractive 
            ? `1px solid ${hoverType === 'project' ? '#7C3AED' : '#22D3EE'}` 
            : '1px solid rgba(34, 211, 238, 0.4)',
          background: isInteractive ? 'rgba(34, 211, 238, 0.02)' : 'transparent',
          boxShadow: isInteractive 
            ? `0 0 10px ${hoverType === 'project' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(34, 211, 238, 0.2)'}`
            : 'none'
        }}
      >
        {isInteractive && (
          <span 
            className={`absolute -bottom-4 text-center whitespace-nowrap tracking-widest uppercase ${
              hoverType === 'project' ? 'text-violet-400' : 'text-cyan-400'
            }`}
          >
            {hoverType === 'project' ? '[VIEW]' : hoverType === 'interactive' ? '[ACTIVATE]' : `[${hoverType}]`}
          </span>
        )}
      </div>

      {/* Core laser dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0)`,
          width: '4px',
          height: '4px',
          background: hoverType === 'project' ? '#7C3AED' : '#22D3EE',
          boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)'
        }}
      />
    </>
  );
}
