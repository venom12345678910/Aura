import React, { useEffect, useRef, useCallback } from 'react';

export const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        particles.forEach(p => {
            p.update(ctx.canvas.width, ctx.canvas.height);
            p.draw(ctx);
        });
        requestAnimationFrame(() => draw(ctx, particles));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        const animationFrameId = requestAnimationFrame(() => draw(ctx, particles));
        
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [draw]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[-1] pointer-events-none opacity-50" />;
};

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update(canvasWidth: number, canvasHeight: number) {
        if (this.x > canvasWidth || this.x < 0) this.speedX *= -1;
        if (this.y > canvasHeight || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}