import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Smooth pointer coordinates using motion springs
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if device has accurate pointing mechanism and supports hover
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasMouse(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    // Global listener to check whether we are hovering over buttons, cards, or interactive regions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.style.cursor === 'pointer';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!hasMouse || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen overflow-hidden">
      {/* 1. Outer Sanctuary Ember Glow */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isActive ? 0.75 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(217, 119, 6, 0.4)' : 'rgba(177, 181, 187, 0.15)',
          backgroundColor: isHovered ? 'rgba(217, 119, 6, 0.05)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute w-8 h-8 rounded-full border border-ash/15 flex items-center justify-center transition-colors duration-300"
      >
        {/* Subtle internal gold core glow only when hovered */}
        {isHovered && (
          <div className="absolute inset-2 bg-gradient-to-tr from-ember/30 to-copper/30 rounded-full animate-pulse blur-[4px]" />
        )}
      </motion.div>

      {/* 2. Inner Precise Focus Point */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isActive ? 2.5 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? 'rgb(217, 119, 6)' : 'rgb(202, 138, 4)',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 15 }}
        className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.6)]"
      />
    </div>
  );
}
