// ===== FUNCIONALIDADES PRINCIPAIS =====

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÕES AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos com classe scroll-animate
document.querySelectorAll('.about-card, .product-card, .contact-item').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            nome: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            mensagem: contactForm.querySelector('textarea').value
        };

        // Simular envio
        console.log('Enviando mensagem:', data);
        
        // Mostrar feedback
        showNotification('Mensagem enviada com sucesso! 🎉', 'success');
        contactForm.reset();
    });
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInUp 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== HEADER DINÂMICO =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== MODAL DE CADASTRO =====
function openSignupModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Criar Conta</h2>
                <button class="modal-close">&times;</button>
            </div>
            <form class="modal-form" id="signupForm">
                <input type="text" placeholder="Seu nome completo" required>
                <input type="email" placeholder="Seu email" required>
                <input type="password" placeholder="Senha" required>
                <input type="password" placeholder="Confirmar senha" required>
                <button type="submit" class="btn btn-primary btn-large">Criar Conta</button>
            </form>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        animation: slideInUp 0.3s ease-out;
    `;

    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    `;

    modalHeader.querySelector('h2').style.cssText = `
        font-size: 24px;
        font-weight: 700;
        color: #1a1a1a;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        transition: color 0.3s;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.color = '#ed1c24';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.color = '#666';
    });

    const form = modal.querySelector('.modal-form');
    form.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;

    form.querySelectorAll('input').forEach(input => {
        input.style.cssText = `
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            transition: all 0.3s;
        `;

        input.addEventListener('focus', function() {
            this.style.borderColor = '#ed1c24';
            this.style.boxShadow = '0 0 0 3px rgba(237, 28, 36, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = 'none';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => modal.remove(), 300);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Conta criada com sucesso! 🎉', 'success');
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });

    document.body.appendChild(modal);
}

// ===== MODAL DE LOGIN =====
function openLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Login</h2>
                <button class="modal-close">&times;</button>
            </div>
            <form class="modal-form" id="loginForm">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Senha" required>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #666;">
                    <input type="checkbox" style="width: 16px; height: 16px; cursor: pointer;">
                    Lembrar-me
                </label>
                <button type="submit" class="btn btn-primary btn-large">Entrar</button>
            </form>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        animation: slideInUp 0.3s ease-out;
    `;

    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    `;

    modalHeader.querySelector('h2').style.cssText = `
        font-size: 24px;
        font-weight: 700;
        color: #1a1a1a;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        transition: color 0.3s;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.color = '#ed1c24';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.color = '#666';
    });

    const form = modal.querySelector('.modal-form');
    form.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;

    form.querySelectorAll('input[type="email"], input[type="password"]').forEach(input => {
        input.style.cssText = `
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            transition: all 0.3s;
        `;

        input.addEventListener('focus', function() {
            this.style.borderColor = '#ed1c24';
            this.style.boxShadow = '0 0 0 3px rgba(237, 28, 36, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = 'none';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => modal.remove(), 300);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Login realizado com sucesso! 🎉', 'success');
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });

    document.body.appendChild(modal);
}

// ===== EVENT LISTENERS PARA BOTÕES =====
document.addEventListener('DOMContentLoaded', () => {
    // Botão de cadastro
    const signupBtn = document.querySelector('a[href="#cadastro"]');
    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSignupModal();
        });
    }

    // Botão de login
    const loginBtn = document.querySelector('a[href="#login"]');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }
});

// ===== ADICIONAR ANIMAÇÕES AO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ===== SCROLL SUAVE PARA O TOPO =====
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        if (!scrollBtn) {
            const btn = document.createElement('button');
            btn.className = 'scroll-to-top';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #ed1c24, #ff6b9d);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                z-index: 999;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s;
                animation: slideInUp 0.3s ease-out;
            `;

            btn.addEventListener('mouseover', () => {
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            });

            btn.addEventListener('mouseout', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });

            btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            document.body.appendChild(btn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});
