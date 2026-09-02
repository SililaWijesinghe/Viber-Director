import React, { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js' as string)
        .then((module: any) => {
          const TubesCursorModule = module.default;
          
          if (canvasRef.current) {
            const app = TubesCursorModule(canvasRef.current, {
              tubes: {
                colors: ["#22D3EE", "#7C3AED", "#3B82F6"],
                lights: {
                  intensity: 220,
                  colors: ["#22D3EE", "#7C3AED", "#10B981", "#F43F5E"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch((err: any) => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(newLightColors);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />
    </div>
  );
}
