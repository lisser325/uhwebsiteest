document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOUSE EFFECTS (The "Emo" Interaction) ---
    const glow = document.querySelector('.cursor-glow');
    const grid = document.querySelector('.bg-grid');

    document.addEventListener('mousemove', (e) => {
        // Move the flashlight glow
        if (glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }

        // Move the grid slightly (Parallax effect)
        if (grid) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
            grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // Pulse effect on click
    document.addEventListener('mousedown', () => {
        if(glow) glow.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    document.addEventListener('mouseup', () => {
        if(glow) glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });


    // --- 2. AUTH & USER STATUS ---
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const ctaButton = navbar.querySelector('.cta-button');

    function updateStatus() {
        const username = localStorage.getItem('username');
        const avatar = localStorage.getItem('avatar');

        if (username) {
            const userHTML = `
                <div id="userStatus" style="display:flex; align-items:center; gap:15px;">
                    <img src="${avatar || '/images/axiom.png'}" 
                         alt="Avatar" 
                         style="width:32px; height:32px; border-radius:50%; border: 1px solid #8A2BE2; object-fit:cover;">
                    <span style="font-size:14px; font-weight:600; color:#fff;">${username}</span>
                    <a href="/dashboard" class="cta-button">Dashboard</a>
                    <button onclick="logout()" class="logout-button" style="
                        padding:8px 16px;
                        background:transparent;
                        color:#fff;
                        border:1px solid rgba(255,255,255,0.1);
                        border-radius:6px;
                        cursor:pointer;
                        font-weight:600;
                        font-size:12px;
                    ">Logout</button>
                </div>
            `;
            if (ctaButton) ctaButton.replaceWith(document.createRange().createContextualFragment(userHTML));
        }
    }

    window.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        window.location.href = '/';
    }

    updateStatus();


    // --- 3. UI INTERACTABLES (Dropdowns & Smooth Scroll) ---
    
    // Smooth Scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior:'smooth' });
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const content = button.nextElementSibling;
            const isOpen = container.classList.contains('open');

            // Close other dropdowns
            document.querySelectorAll('.dropdown-container').forEach(c => {
                c.classList.remove('open');
                c.querySelector('.dropdown-content').style.maxHeight = null;
            });

            // Toggle current
            if(!isOpen){
                content.style.maxHeight = content.scrollHeight + "px";
                container.classList.add('open');
            }
        });
    });
});
