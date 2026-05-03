//let currentLang = 'en';
window.currentLang = 'en';

function toggleLang() {
    window.currentLang = window.currentLang === 'en' ? 'th' : 'en';
    //applyLang();
    if (typeof applyLang === 'function') applyLang();
    // Update the Page Content (Everything with class "lang-text")
    const pageElements = document.querySelectorAll('[data-en]');
    pageElements.forEach(el => {
        const translation = el.getAttribute(`data-${window.currentLang}`);
        if (translation) {
            el.textContent = translation;
        }
    });
    window.dispatchEvent(new CustomEvent('languageChanged'))
}

//document.addEventListener('DOMContentLoaded', toggleLang);