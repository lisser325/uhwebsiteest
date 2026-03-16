document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOUSE EFFECTS (B&W Parallax) ---
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
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // --- 2. AUTH & USER STATUS ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const ctaButton = navbar.querySelector('.cta-button');

        function updateStatus() {
            const username = localStorage.getItem('username');
            const avatar = localStorage.getItem('avatar');

            if (username) {
                const userHTML = `
                    <div id="userStatus" style="display:flex; align-items:center; gap:20px;">
                        <img src="${avatar || '/images/axiom.png'}" 
                             alt="Avatar" 
                             style="width:30px; height:30px; filter:grayscale(1); border: 1px solid #fff; object-fit:cover;">
                        <span style="font-size:12px; font-weight:800; text-transform:uppercase; color:#fff;">${username}</span>
                        <a href="/dashboard" class="cta-button" style="padding: 8px 16px;">Panel</a>
                        <button onclick="logout()" style="background:none; border:none; color:#555; cursor:pointer; font-size:10px; text-transform:uppercase; font-weight:800;">[ Exit ]</button>
                    </div>
                `;
                if (ctaButton) ctaButton.replaceWith(document.createRange().createContextualFragment(userHTML));
            }
        }
        updateStatus();
    }

    window.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        window.location.href = '/';
    }

    // --- 3. UI ACCORDION ---
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const content = button.nextElementSibling;
            const isOpen = container.classList.contains('open');

            document.querySelectorAll('.dropdown-container').forEach(c => {
                c.classList.remove('open');
                c.querySelector('.dropdown-content').style.maxHeight = null;
            });

            if(!isOpen){
                content.style.maxHeight = content.scrollHeight + "px";
                container.classList.add('open');
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior:'smooth' });
        });
    });
});
