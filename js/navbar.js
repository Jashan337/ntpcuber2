class MyNavbar extends HTMLElement {
    connectedCallback() {
        this.render();
        // Listen for a custom event so the navbar updates when the language changes elsewhere
        window.addEventListener('languageChanged', () => this.updateLanguageDisplay());
    }

    render() {
        this.innerHTML = `
        <header class="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800/50">
            <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <div class="font-bold text-xl tracking-tighter cursor-pointer" onclick="window.location.href='index.html'">
                    NTP Cuber <span class="text-blue-500">Academy</span>
                </div>
                
                <nav class="hidden md:flex gap-8 text-sm font-medium">
                    <a href="index.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Home" data-th="หน้าแรก">Home</a>
                    <a href="courses.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Courses (Coming Soon)" data-th="คอร์สเรียน (เร็ว ๆ นี้)">Courses (Coming Soon)</a>
                    <a href="coaching.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Coaching" data-th="เรียนตัวต่อตัว">Coaching</a>
                    <a href="resources.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Resources" data-th="แหล่งเรียนรู้">Resources</a>
                </nav>
                
                <div class="flex items-center gap-4">
                    <button
                        id="lang-btn-nav"
                        type="button"
                        class="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all"
                    >
                        <span id="lang-text-nav">TH</span>
                    </button>

                    <!-- Hamburger Button (Visible on Mobile Only) -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-neutral-400 hover:text-white">
                        <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu Drawer (Hidden by Default) -->
            <div id="mobile-menu" class="hidden md:hidden bg-neutral-900 border-b border-neutral-800">
                <nav class="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
                    <a href="/index.html" class="nav-link text-neutral-400" data-en="Home" data-th="หน้าแรก">Home</a>
                    <a href="/courses.html" class="nav-link text-neutral-400" data-en="Courses" data-th="คอร์สเรียน">Courses</a>
                    <a href="/coaching.html" class="nav-link text-neutral-400" data-en="Coaching" data-th="เรียนตัวต่อตัว">Coaching</a>
                    <a href="/resources.html" class="nav-link text-neutral-400" data-en="Resources" data-th="แหล่งเรียนรู้">Resources</a>
                </nav>
            </div>
        </header>
        `;
        this.setupEventListeners();
        
        // OLD SETUP FOR LANGUAGE TOGGLE
        // Attach the language toggle logic to the button inside the component
        // const btn = this.querySelector('#lang-btn-nav');
        // if (btn) {
        //     btn.addEventListener('click', () => {
        //         // Call the existing toggleLang() function defined in your page's script
        //         if (typeof toggleLang === 'function') {
        //             toggleLang();
        //         } else if (typeof switchLang === 'function') {
        //             switchLang();
        //         }
        //     });
        // }
        
        this.updateLanguageDisplay();
    }

    setupEventListeners() {
        const menuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');
        const langBtn = this.querySelector('#lang-btn-nav');

        // Toggle Mobile Menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Change icon to an "X" when open
        });

        // Language Toggle
        langBtn.addEventListener('click', () => {
            if (typeof toggleLang === 'function') toggleLang();
        });
    }

    // Helper to update the navbar text based on the current global language variable
    updateLanguageDisplay() {
        //const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
        const lang = window.currentLang || 'en';
        const links = this.querySelectorAll('.nav-link');
        links.forEach(link => {
            const translation = link.getAttribute(`data-${lang}`);
            if (translation) link.textContent = translation;
        });
        const langText = this.querySelector('#lang-text-nav');
        if (langText) {
            langText.textContent = lang === 'en' ? 'TH' : 'EN';
        }
    }
}

customElements.define('my-navbar', MyNavbar);