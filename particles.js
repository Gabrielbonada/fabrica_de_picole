// Sistema de partículas animadas
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.init();
    }

    init() {
        // Criar canvas invisível para partículas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 0;
            opacity: 0.3;
        `;
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');

        // Criar partículas
        this.createParticles(50);

        // Animar
        this.animate();

        // Responder a redimensionamento
        window.addEventListener('resize', () => this.handleResize());
    }

    createParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    getRandomColor() {
        const colors = ['#ed1c24', '#ff6b9d', '#ffd700', '#ff9f43'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach((particle, index) => {
            // Atualizar posição
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce nas bordas
            if (particle.x - particle.radius < 0 || particle.x + particle.radius > this.width) {
                particle.vx *= -1;
            }
            if (particle.y - particle.radius < 0 || particle.y + particle.radius > this.height) {
                particle.vy *= -1;
            }

            // Desenhar partícula
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Desenhar conexões
            for (let i = index + 1; i < this.particles.length; i++) {
                const other = this.particles[i];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (1 - distance / 150) * 0.2;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
