//let currentLang = 'en';
window.currentLang = localStorage.getItem('preferredLang') || 'en';

function toggleLang() {
    window.currentLang = window.currentLang === 'en' ? 'th' : 'en';
    //applyLang();
    //if (typeof applyLang === 'function') applyLang();

    localStorage.setItem('preferredLang', window.currentLang);

    // Update the Page Content (Everything with class "lang-text")
    const pageElements = document.querySelectorAll('[data-en]');
    pageElements.forEach(el => {
        const translation = el.getAttribute(`data-${window.currentLang}`);
        if (translation) {
            el.textContent = translation;
        }
    });

    if (typeof applyLang === 'function') {
        try {
            applyLang();
        } catch (e) {
            console.warn("applyLang failed on this page, but that's okay.");
        }
    }

    window.dispatchEvent(new CustomEvent('languageChanged'))
}

document.addEventListener('DOMContentLoaded', () => {
    // Force the UI to match the saved language
    const pageElements = document.querySelectorAll('[data-en]');
    pageElements.forEach(el => {
        const translation = el.getAttribute(`data-${window.currentLang}`);
        if (translation) el.textContent = translation;
    });
    window.dispatchEvent(new CustomEvent('languageChanged'));
});