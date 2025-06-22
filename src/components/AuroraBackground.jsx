import React, { useRef, useEffect } from 'react';
import './AuroraBackground.css';

export default function AuroraBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let hue = 0;

    // Animation loop
    const animate = () => {
      const { width, height } = canvas;

      // Fade previous frame with a translucent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 70; i++) {
        const x = Math.sin(i + hue / 100) * 300 + width / 2;
        const y = Math.cos(i + hue / 120) * 300 + height / 2;
        const radius = Math.sin(i + hue / 200) * 40 + 80;
        const color = `hsl(${(hue + i * 8) % 360}, 100%, 60%)`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 30;
        ctx.shadowColor = color;
        ctx.fill();
      }

      hue += 1;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="aurora-canvas" />;
}
