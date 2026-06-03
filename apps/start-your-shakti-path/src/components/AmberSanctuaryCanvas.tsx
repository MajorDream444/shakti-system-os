import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

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

    // Deep fluid candlelight firelight blobs - larger, flickering, warm, Shakta temple colors
    const blobs = [
      { x: width * 0.25, y: height * 0.85, rx: width * 0.45, ry: height * 0.6, speedX: 0.03, speedY: -0.01, maxAlpha: 0.18, color: '80, 5, 18', pulseOffset: 0 }, // Rich Sacred Burgundy
      { x: width * 0.75, y: height * 0.15, rx: width * 0.4, ry: height * 0.55, speedX: -0.03, speedY: 0.03, maxAlpha: 0.14, color: '130, 12, 35', pulseOffset: 2 }, // Deep Crimson / Magenta Undertone
      { x: width * 0.5, y: height * 0.6, rx: width * 0.55, ry: height * 0.7, speedX: 0.015, speedY: -0.02, maxAlpha: 0.12, color: '217, 85, 6', pulseOffset: 4 }, // Living Flame Orange / Embers
      { x: width * 0.2, y: height * 0.35, rx: width * 0.35, ry: height * 0.5, speedX: -0.015, speedY: 0.01, maxAlpha: 0.10, color: '185, 135, 15', pulseOffset: 5 }  // Sacred Temple Saffron Gold
    ];

    // Cinematic drifting micro-particles/sparks - more numerous and alive
    const particles: Particle[] = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -Math.random() * 0.25 - 0.08, // slow vertical ascent
        swaySpeed: Math.random() * 0.005 + 0.002,
        swayAmount: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        radius: Math.random() * 2.0 + 0.8,
        alpha: Math.random() * 0.45 + 0.1,
        alphaSpeed: Math.random() * 0.003 + 0.001,
        color: Math.random() > 0.65 
          ? '217, 85, 6' // True Ember Flame
          : (Math.random() > 0.4 
              ? '185, 135, 15' // Saffron Gold
              : '166, 19, 19') // Ceremonial Blood Red/Crimson
      });
    }

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
      blobs.forEach((blob, i) => {
        // Slow move
        blob.x += blob.speedX;
        blob.y += blob.speedY;

        // Wrap boundaries
        if (blob.x < -blob.rx) blob.x = width + blob.rx;
        if (blob.x > width + blob.rx) blob.x = -blob.rx;
        if (blob.y < -blob.ry) blob.y = height + blob.ry;
        if (blob.y > height + blob.ry) blob.y = -blob.ry;

        // Multi-frequency irregular wave model to simulate live, devotional temple firelight/oil lamps
        const t1 = frame * 0.0018 + blob.pulseOffset;       // Deep baseline somatic breath
        const t2 = frame * 0.012 + blob.pulseOffset * 2.3;  // Organic sway & breeze
        const t3 = frame * 0.085 + blob.pulseOffset * 5.7;  // Rapid crackle flicker
        const t4 = frame * 0.31 + blob.pulseOffset * 11.1;  // Hot micro-spark draft jitter

        // Combine high and low frequencies into a non-repeating natural wave
        const wave = Math.sin(t1) * 0.45 + 
                     Math.sin(t2) * 0.32 + 
                     Math.sin(t3) * 0.18 + 
                     Math.sin(t4) * 0.05;

        // Custom volatility matching their role (Burgundy is stable, Live Orange and Saffron Gold crackle and glow intensely)
        let flickerFactor = 0.12;
        let scaleFactor = 0.08;
        if (i === 2) { // Living Flame Orange
          flickerFactor = 0.35; // Intensified volatile flame flicker
          scaleFactor = 0.16;   // Heavy dancing shadow size fluctuations
        } else if (i === 3) { // Sacred Temple Saffron Gold
          flickerFactor = 0.28; // Vibrant flickering gold
          scaleFactor = 0.12;
        } else if (i === 1) { // Deep Crimson / Magenta
          flickerFactor = 0.18;
          scaleFactor = 0.08;
        } else { // Rich Burgundy (sacred foundation base)
          flickerFactor = 0.08;
          scaleFactor = 0.04;
        }

        // Simulating highly organic, spontaneous flame draft disruptions
        const draftThreshold = Math.sin(frame * 0.007 + Math.cos(frame * 0.025) * 1.8);
        const draftDip = draftThreshold > 0.85
          ? -0.18 * (0.6 + 0.4 * Math.sin(frame * 0.12)) // sudden drop in flame energy
          : 0;

        const modifier = wave * flickerFactor + draftDip;
        const currentAlpha = Math.max(0.005, blob.maxAlpha * (1 + modifier));
        const currentRx = blob.rx * (1 + wave * scaleFactor);

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, currentRx);
        grad.addColorStop(0, `rgba(${blob.color}, ${currentAlpha})`);
        grad.addColorStop(0.4, `rgba(${blob.color}, ${currentAlpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, currentRx, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw drifting organic fireplace embers
      particles.forEach(p => {
        // Move with a slow horizontal swaying
        p.swayOffset += p.swaySpeed;
        const sway = Math.sin(p.swayOffset) * p.swayAmount;
        p.x += p.vx + sway * 0.15;
        p.y += p.vy;

        // Breathe the particle alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.65 || p.alpha < 0.08) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Screen wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color}, 0.75)`;
        ctx.shadowBlur = p.radius * 3;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for next draws
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
