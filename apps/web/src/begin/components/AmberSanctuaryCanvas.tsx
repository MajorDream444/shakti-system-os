import { useEffect, useRef } from 'react';

export default function AmberSanctuaryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Slow breath/water/candlelight fields only.
    const blobs = [
      { x: width * 0.25, y: height * 0.85, rx: width * 0.45, ry: height * 0.6, speedX: 0.015, speedY: -0.006, maxAlpha: 0.16, color: '80, 5, 18', pulseOffset: 0 },
      { x: width * 0.75, y: height * 0.15, rx: width * 0.4, ry: height * 0.55, speedX: -0.012, speedY: 0.01, maxAlpha: 0.12, color: '157, 23, 29', pulseOffset: 2 },
      { x: width * 0.5, y: height * 0.6, rx: width * 0.55, ry: height * 0.7, speedX: 0.008, speedY: -0.008, maxAlpha: 0.1, color: '195, 90, 46', pulseOffset: 4 },
      { x: width * 0.2, y: height * 0.35, rx: width * 0.35, ry: height * 0.5, speedX: -0.008, speedY: 0.006, maxAlpha: 0.08, color: '201, 162, 75', pulseOffset: 5 }
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.fillStyle = '#060505'; // Deep primeval dark obsidian (not flat, warm undertone)
      ctx.fillRect(0, 0, width, height);

      // Draw the warm breathing/flickering atmospheric blobs
      blobs.forEach((blob) => {
        // Slow move
        blob.x += blob.speedX;
        blob.y += blob.speedY;

        // Wrap boundaries
        if (blob.x < -blob.rx) blob.x = width + blob.rx;
        if (blob.x > width + blob.rx) blob.x = -blob.rx;
        if (blob.y < -blob.ry) blob.y = height + blob.ry;
        if (blob.y > height + blob.ry) blob.y = -blob.ry;

        const t1 = frame * 0.00114 + blob.pulseOffset;
        const t2 = frame * 0.0007 + blob.pulseOffset * 2.3;
        const wave = prefersReducedMotion ? 0 : Math.sin(t1) * 0.7 + Math.sin(t2) * 0.3;
        const modifier = wave * 0.16;
        const currentAlpha = Math.max(0.005, blob.maxAlpha * (1 + modifier));
        const currentRx = blob.rx * (1 + wave * 0.045);

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, currentRx);
        grad.addColorStop(0, `rgba(${blob.color}, ${currentAlpha})`);
        grad.addColorStop(0.4, `rgba(${blob.color}, ${currentAlpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, currentRx, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
