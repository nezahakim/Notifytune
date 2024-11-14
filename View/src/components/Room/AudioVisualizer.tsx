import React, { useEffect, useRef } from 'react';

const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

      for (let i = 0; i < 64; i++) {
        const height = Math.random() * canvas.height;
        const x = i * (canvas.width / 64);
        ctx.fillRect(x, canvas.height - height, canvas.width / 128, height);
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-40" />;
};

export default AudioVisualizer;
