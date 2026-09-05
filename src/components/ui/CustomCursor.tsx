import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect clickable hover
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive-node') ||
          target.closest('[role="button"]') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Dot */}
      <div
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-cosmic-cyan transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicking ? 0.7 : 1})`,
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        }}
      />

      {/* Outer Sci-Fi Reticle */}
      <div
        className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border border-cosmic-cyan/60 transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${
            isHovered ? 1.6 : isClicking ? 0.9 : 1
          }) rotate(${isHovered ? 45 : 0}deg)`,
          borderColor: isHovered ? '#00ff9f' : 'rgba(0, 240, 255, 0.6)',
          boxShadow: isHovered ? '0 0 15px rgba(0, 255, 159, 0.5)' : 'none',
        }}
      >
        {/* Reticle tick marks */}
        <span className="absolute -top-1 left-1/2 -ml-[1px] w-[2px] h-1 bg-cosmic-cyan" />
        <span className="absolute -bottom-1 left-1/2 -ml-[1px] w-[2px] h-1 bg-cosmic-cyan" />
        <span className="absolute -left-1 top-1/2 -mt-[1px] h-[2px] w-1 bg-cosmic-cyan" />
        <span className="absolute -right-1 top-1/2 -mt-[1px] h-[2px] w-1 bg-cosmic-cyan" />
      </div>

      {/* Mini HUD Coordinates Readout */}
      <div
        className="absolute text-[9px] font-mono text-cosmic-cyan/50 tracking-tighter"
        style={{
          transform: `translate3d(${pos.x + 14}px, ${pos.y + 14}px, 0)`,
        }}
      >
        {Math.round(pos.x)},{Math.round(pos.y)}
      </div>
    </div>
  );
}

