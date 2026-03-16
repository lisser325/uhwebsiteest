document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const ctaButton = navbar.querySelector('.cta-button');

    function updateStatus() {
        const username = localStorage.getItem('username');
        const avatar = localStorage.getItem('avatar');

        if (username) {
            const userHTML = `
                <div id="userStatus" style="display:flex; align-items:center; gap:10px;">
                    <img src="${avatar || '/images/axiom.png'}" 
                         alt="Avatar" 
                         style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
                    <span style="font-size:14px; color:#ccc;">${username}</span>
                    <a href="/dashboard" class="cta-button" style="margin-left:10px;">Dashboard</a>
                    <button onclick="logout()" class="logout-button" style="
                        margin-left:10px;
                        padding:8px 16px;
                        background:#5844e5;
                        color:#fff;
                        border:none;
                        border-radius:6px;
                        cursor:pointer;
                        font-weight:600;
                    ">Logout</button>
                </div>
            `;
            if (ctaButton) ctaButton.replaceWith(document.createRange().createContextualFragment(userHTML));
        } else {
            if (!document.getElementById('userStatus') && ctaButton) {
                ctaButton.style.display = 'inline-block';
            }
        }
    }

    window.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        updateStatus();
        window.location.href = '/';
    }

    updateStatus();

    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior:'smooth' });
        });
    });

    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const content = button.nextElementSibling;

            document.querySelectorAll('.dropdown-container').forEach(c => {
                if(c !== container){
                    c.classList.remove('open');
                    c.querySelector('.dropdown-content').style.maxHeight = null;
                    c.querySelector('.dropdown-content').style.padding = '0 18px';
                }
            });

            if(content.style.maxHeight){
                content.style.maxHeight = null;
                content.style.padding = '0 18px';
                container.classList.remove('open');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = '0 18px 18px';
                container.classList.add('open');
            }
        });
    });
});
