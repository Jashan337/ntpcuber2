tailwind.config = {
    theme: {
    extend: {
        fontFamily: {
        sans: ['Inter', 'Sarabun', 'ui-sans-serif', 'system-ui'],
        },
    },
    },
}

const content = {
    en: {
    nav: ['Home', 'Courses', 'Coaching', 'Resources', 'Contact'],
    heroSubtitle: 'Master the Cube with structured courses, modern resources, and personal coaching.',
    journeyTitle: 'My Cubing Journey',
    journeySteps: [
        { year: '2018: Start', ach: 'Discovered the cube and achieved my first solve in 2 minutes.' },
        { year: '2020: Sub-20', ach: 'Mastered Full PLL and OLL, reaching a consistent sub-20 average.' },
        { year: '2022: Competition', ach: 'Attended my first WCA competition; reached 3x3 Finals.' },
        { year: '2024: Advanced', ach: 'Mastered full ZBLL and 1-look Last Layer strategies.' },
        { year: '2026: Coaching', ach: 'Launched NTP Cuber to coach students globally.' }
    ],
    // ... rest of content same as before
    introTitle: 'About Me',
    introText1: 'Hi, I’m Natthaphat Mahtani. I am a competitive speedcuber dedicated to helping others break their personal records through structured, logic-based, and fun training.',
    introText2: 'This website provides a complete ecosystem for cubers: from beginner courses to advanced techniques like Domino Reduction and ZBLL, plus 1-on-1 coaching to refine your hardware and execution.',
    courseCards: [
        { title: 'Beginner 3×3', price: '$19', desc: 'Learn to solve from zero.' },
        { title: 'Intermediate CFOP', price: '$39', desc: 'Improve efficiency.' },
        { title: 'Advanced Speedcubing', price: '$79', desc: 'Full CFOP and TPS training.' }
    ],
    coachingTitle: '1-on-1 Coaching',
    coachingText: 'Book a private session.',
    resourcesTitle: 'Free Resources',
    resourcesText: 'Algorithms and tips.',
    contactTitle: 'Book a Session'
    },
    th: {
    nav: ['หน้าแรก', 'คอร์สเรียน', 'เรียนตัวต่อตัว', 'แหล่งเรียนรู้', 'ติดต่อ'],
    heroSubtitle: 'เชี่ยวชาญรูบิกส์คิวบ์ ด้วยคอร์สเรียนที่เป็นระบบ',
    journeyTitle: 'เส้นทางรูบิกของผม',
    journeySteps: [
        { year: '2018: เริ่มต้น', ach: 'เริ่มหัดเล่นรูบิกและทำสถิติครั้งแรกที่ 2 นาที' },
        { year: '2020: ต่ำกว่า 20 วิ', ach: 'จำสูตร PLL และ OLL ได้ครบ' },
        { year: '2022: การแข่งขัน', ach: 'เข้าร่วมการแข่งขัน WCA ครั้งแรก' },
        { year: '2024: ขั้นสูง', ach: 'ฝึกฝนสูตร ZBLL จนชำนาญ' },
        { year: '2026: การสอน', ach: 'เปิดตัว NTP Cuber เพื่อสอนนักเรียนทั่วโลก' }
    ],
    // ... rest of content same as before
    introTitle: 'เกี่ยวกับผม',
    introText1: 'สวัสดีครับผมณัฐภัทร มาทานี ผมเป็นนักแข่งรูบิกที่มุ่งเน้นการช่วยให้ทุกคนทำลายสถิติส่วนตัวด้วยการฝึกฝนอย่างเป็นระบบและมีความสนุกไปกับการฝึก',
    introText2: 'เว็บไซต์นี้เป็นแหล่งรวมทุกอย่างสำหรับผู้ที่สนใจพัฒนาความสามารถด้านรูบิก ตั้งแต่คอร์สพื้นฐานไปจนถึงเทคนิคขั้นสูงอย่าง Domino Reduction และ ZBLL พร้อมคลาสสอนแบบตัวต่อตัวเพื่อพัฒนาทั้งทักษะและวิธีคิดของคุณ',
    courseCards: [
        { title: 'พื้นฐาน 3×3', price: '฿690', desc: 'เริ่มต้นแก้รูบิกส์ตั้งแต่ศูนย์' },
        { title: 'ระดับกลาง CFOP', price: '฿1,390', desc: 'พัฒนาเทคนิคและความเร็ว' },
        { title: 'ขั้นสูง Speedcubing', price: '฿2,790', desc: 'เทคนิคแข่งขัน' }
    ],
    coachingTitle: 'โค้ชแบบตัวต่อตัว',
    coachingText: 'จองเวลาสอนส่วนตัว',
    resourcesTitle: 'แหล่งเรียนรู้ฟรี',
    resourcesText: 'สูตรการหมุนและแผนฝึก',
    contactTitle: 'จองคลาสโค้ช'
    }
};

function applyLang() {
    const c = content[window.currentLang];
    
    // Update basic text
    document.getElementById('heroSubtitle').textContent = c.heroSubtitle;
    document.getElementById('journeyTitle').textContent = c.journeyTitle;
    document.getElementById('introTitle').textContent = c.introTitle;
    document.getElementById('introText1').textContent = c.introText1;
    document.getElementById('introText2').textContent = c.introText2;
    document.getElementById('coachingTitle').textContent = c.coachingTitle;
    document.getElementById('coachingText').textContent = c.coachingText;
    document.getElementById('resourcesTitle').textContent = c.resourcesTitle;
    document.getElementById('resourcesText').textContent = c.resourcesText;
    document.getElementById('contactTitle').textContent = c.contactTitle;

    // Update Journey Checkpoints
    const journeyGrid = document.getElementById('journeyGrid');
    if (journeyGrid) {
    journeyGrid.innerHTML = c.journeySteps.map((step, i) => `
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-500 bg-neutral-950 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            ${i + 1}
        </div>
        <div class="w-[calc(100%-3.5rem)] md:w-[45%] p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:border-indigo-500/40 transition-all backdrop-blur-sm">
            <span class="text-indigo-400 font-bold text-xs uppercase tracking-widest block mb-2">${step.year}</span>
            <p class="text-neutral-200">${step.ach}</p>
        </div>
        </div>
    `).join('');
    }

    // Update Course Cards
    const cards = document.getElementById('courseCards');
    cards.innerHTML = '';
    c.courseCards.forEach((card, index) => {
    const isPremium = index === 2; // Highlights the Advanced course
    cards.innerHTML += `
        <div class="relative group bg-neutral-900 border ${isPremium ? 'border-indigo-500/50' : 'border-neutral-800'} rounded-3xl p-8 hover:bg-neutral-800/50 transition-all duration-500 flex flex-col h-full">
        ${isPremium ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-indigo-600/20">Most Advanced</div>' : ''}
        
        <div class="mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">${card.title}</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">${card.desc}</p>
        </div>

        <div class="mt-auto">
            <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-bold text-white">${card.price}</span>
            <span class="text-neutral-500 text-sm">/ course</span>
            </div>
            
            <a href="courses.html" class="block text-center w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${isPremium ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-neutral-800 hover:bg-neutral-700'}">
            Get Started
            </a>
        </div>
        </div>`;
    });


    // Re-initialize the scroll reveal so it picks up the new HTML
    initScrollReveal();
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        }
    });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', toggleLang);
