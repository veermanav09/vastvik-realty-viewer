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
      type: 'leaf' | 'vine' | 'seedpod' | 'fern' | 'branch';
      swayOffset: number;
      swaySpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 18 + 8;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = Math.random() * 0.3 + 0.1; // Gentle falling motion
        this.speedZ = Math.random() * 0.8 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        
        // Earthy, nature-inspired colors
        const colors = [
          'rgba(107, 142, 88, 0.6)',   // forest green
          'rgba(134, 163, 118, 0.5)',  // sage green
          'rgba(85, 107, 71, 0.55)',   // moss green
          'rgba(165, 111, 98, 0.5)',   // terracotta
          'rgba(139, 119, 101, 0.45)', // bark brown
          'rgba(176, 163, 142, 0.4)',  // sand
          'rgba(162, 183, 142, 0.5)',  // light olive
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.25;
        
        const types = ['leaf', 'vine', 'seedpod', 'fern', 'branch'] as const;
        this.type = types[Math.floor(Math.random() * types.length)];
      }

      update(time: number) {
        // Gentle swaying motion like wind
        const sway = Math.sin(time * this.swaySpeed + this.swayOffset) * 0.5;
        this.x += this.speedX + sway;
        this.y += this.speedY;
        this.z -= this.speedZ;
        this.rotation += this.rotationSpeed;

        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * canvas!.width;
          this.y = -50;
        }

        // Reset when falling off screen
        if (this.y > canvas!.height + 50) {
          this.y = -50;
          this.x = Math.random() * canvas!.width;
        }

        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.x > canvas!.width + 50) this.x = -50;
      }

      drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        // Main leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size * 0.5, -size * 0.7, size * 0.6, -size * 0.2, size * 0.3, size * 0.3);
        ctx.bezierCurveTo(size * 0.2, size * 0.6, 0, size * 0.8, 0, size);
        ctx.bezierCurveTo(0, size * 0.8, -size * 0.2, size * 0.6, -size * 0.3, size * 0.3);
        ctx.bezierCurveTo(-size * 0.6, -size * 0.2, -size * 0.5, -size * 0.7, 0, -size);
        ctx.fill();
        
        // Leaf vein
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.8);
        ctx.lineTo(0, size * 0.7);
        ctx.stroke();
        
        ctx.restore();
      }

      drawVine(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size * 0.15;
        ctx.lineCap = 'round';
        
        // Curving vine
        ctx.beginPath();
        ctx.moveTo(-size * 0.5, -size);
        ctx.quadraticCurveTo(size * 0.3, -size * 0.3, -size * 0.2, size * 0.3);
        ctx.quadraticCurveTo(-size * 0.6, size * 0.8, size * 0.2, size);
        ctx.stroke();
        
        // Small leaves on vine
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(size * 0.15, -size * 0.2, size * 0.2, size * 0.12, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-size * 0.3, size * 0.5, size * 0.15, size * 0.1, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      drawSeedpod(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        // Dandelion-like seedpod
        const spokes = 8;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < spokes; i++) {
          const angle = (Math.PI * 2 * i) / spokes;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          const endX = Math.cos(angle) * size * 0.8;
          const endY = Math.sin(angle) * size * 0.8;
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Fluffy end
          ctx.beginPath();
          ctx.arc(endX, endY, size * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Center
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      drawFern(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        // Central stem
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size * 0.08;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.stroke();
        
        // Fronds
        const fronds = 6;
        for (let i = 0; i < fronds; i++) {
          const yPos = -size + (size * 2 * i) / fronds + size * 0.2;
          const frondSize = size * 0.4 * (1 - Math.abs(i - fronds / 2) / (fronds / 2) * 0.5);
          
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.quadraticCurveTo(frondSize * 0.5, yPos - frondSize * 0.2, frondSize, yPos + frondSize * 0.1);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.quadraticCurveTo(-frondSize * 0.5, yPos - frondSize * 0.2, -frondSize, yPos + frondSize * 0.1);
          ctx.stroke();
        }
        
        ctx.restore();
      }

      drawBranch(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size * 0.1;
        ctx.lineCap = 'round';
        
        // Main branch
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, size * 0.5);
        ctx.quadraticCurveTo(0, 0, size * 0.6, -size * 0.5);
        ctx.stroke();
        
        // Small twigs
        ctx.lineWidth = size * 0.05;
        ctx.beginPath();
        ctx.moveTo(-size * 0.2, size * 0.15);
        ctx.lineTo(-size * 0.4, -size * 0.3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.15);
        ctx.lineTo(size * 0.5, size * 0.2);
        ctx.stroke();
        
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
          case 'vine':
            this.drawVine(ctx, x2d, y2d, size2d);
            break;
          case 'seedpod':
            this.drawSeedpod(ctx, x2d, y2d, size2d);
            break;
          case 'fern':
            this.drawFern(ctx, x2d, y2d, size2d);
            break;
          case 'branch':
            this.drawBranch(ctx, x2d, y2d, size2d);
            break;
        }

        ctx.globalAlpha = 1;
      }
    }

    // Create nature particles
    const particles: NatureParticle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NatureParticle());
    }

    let animationTime = 0;

    // Animation loop
    const animate = () => {
      animationTime += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(animationTime);
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
      className="fixed inset-0 pointer-events-none z-10 opacity-30"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default Floating3DElements;
