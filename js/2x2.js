// Configure Tailwind to use our new fonts
tailwind.config = {
    theme: {
    extend: {
        fontFamily: {
        sans: ['Inter', 'Sarabun', 'ui-sans-serif', 'system-ui'],
        },
    },
    },
}

function applyLang() {
    const c = content[window.currentLang];
    document.querySelectorAll('[data-nav]').forEach((el, i) => el.textContent = c.nav[i]);
    document.getElementById('heroSubtitle').textContent = c.heroSubtitle;
    document.getElementById('coachingTitle').textContent = c.coachingTitle;
    document.getElementById('coachingText').textContent = c.coachingText;
    document.getElementById('resourcesTitle').textContent = c.resourcesTitle;
    document.getElementById('resourcesText').textContent = c.resourcesText;
    document.getElementById('contactTitle').textContent = c.contactTitle;
    document.getElementById('langBtnText').textContent = currentLang === 'en' ? 'TH' : 'EN';

    const cards = document.getElementById('courseCards');
    cards.innerHTML = '';
    c.courseCards.forEach(card => {
    cards.innerHTML += `
        <div class="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-indigo-500 transition-all duration-300">
        <h3 class="text-xl font-semibold mb-2">${card.title}</h3>
        <p class="text-neutral-400 mb-4">${card.desc}</p>
        <div class="text-2xl font-bold text-indigo-400">${card.price}</div>
        </div>`;
    });
}

document.addEventListener('DOMContentLoaded', applyLang);