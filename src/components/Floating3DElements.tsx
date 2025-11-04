import { useEffect, useRef } from 'react';

const Floating3DElements = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Nature-inspired particle system
    class NatureParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
      type: 'leaf' | 'flower' | 'butterfly' | 'petal';

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 15 + 10;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.speedZ = Math.random() * 1.5 + 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        
        // Nature-inspired colors
        const colors = [
          'rgba(134, 163, 118, 0.7)',  // sage green
          'rgba(165, 111, 98, 0.7)',   // terracotta
          'rgba(188, 147, 128, 0.6)',  // lighter terracotta
          'rgba(106, 130, 94, 0.7)',   // darker green
          'rgba(218, 181, 150, 0.6)',  // beige
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.6 + 0.3;
        
        const types = ['leaf', 'flower', 'butterfly', 'petal'] as const;
        this.type = types[Math.floor(Math.random() * types.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= this.speedZ;
        this.rotation += this.rotationSpeed;

        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
        }

        if (this.x < 0 || this.x > canvas!.width) {
          this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas!.height) {
          this.speedY *= -1;
        }
      }

      drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.6, -size * 0.3, size * 0.4, size * 0.2);
        ctx.quadraticCurveTo(size * 0.2, size * 0.6, 0, size);
        ctx.quadraticCurveTo(-size * 0.2, size * 0.6, -size * 0.4, size * 0.2);
        ctx.quadraticCurveTo(-size * 0.6, -size * 0.3, 0, -size);
        ctx.fill();
        ctx.restore();
      }

      drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        const petals = 5;
        for (let i = 0; i < petals; i++) {
          ctx.save();
          ctx.rotate((Math.PI * 2 * i) / petals);
          ctx.beginPath();
          ctx.ellipse(0, -size * 0.4, size * 0.3, size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      }

      drawButterfly(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        // Left wing
        ctx.beginPath();
        ctx.ellipse(-size * 0.3, 0, size * 0.4, size * 0.6, -0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Right wing
        ctx.beginPath();
        ctx.ellipse(size * 0.3, 0, size * 0.4, size * 0.6, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      drawPetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.5, -size * 0.5, size * 0.3, 0);
        ctx.quadraticCurveTo(size * 0.5, size * 0.5, 0, size);
        ctx.quadraticCurveTo(-size * 0.5, size * 0.5, -size * 0.3, 0);
        ctx.quadraticCurveTo(-size * 0.5, -size * 0.5, 0, -size);
        ctx.fill();
        ctx.restore();
      }

      draw(ctx: CanvasRenderingContext2D) {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas!.width / 2) * scale + canvas!.width / 2;
        const y2d = (this.y - canvas!.height / 2) * scale + canvas!.height / 2;
        const size2d = this.size * scale;

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * scale;

        switch (this.type) {
          case 'leaf':
            this.drawLeaf(ctx, x2d, y2d, size2d);
            break;
          case 'flower':
            this.drawFlower(ctx, x2d, y2d, size2d);
            break;
          case 'butterfly':
            this.drawButterfly(ctx, x2d, y2d, size2d);
            break;
          case 'petal':
            this.drawPetal(ctx, x2d, y2d, size2d);
            break;
        }

        ctx.globalAlpha = 1;
      }
    }

    // Create nature particles
    const particles: NatureParticle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NatureParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-25"
      style={{ mixBlendMode: 'soft-light' }}
    />
  );
};

export default Floating3DElements;
