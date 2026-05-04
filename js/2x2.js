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

const content = {
    en: {
    nav: ['Home', 'Courses', 'Coaching', 'Resources', 'Contact'],
    heroSubtitle: 'Master the Cube with structured courses, modern resources, and personal coaching.',
    courseCards: [
        { title: 'Beginner 3×3', price: '$19', desc: 'Learn to solve from zero with clear steps.' },
        { title: 'Intermediate CFOP', price: '$39', desc: 'Improve efficiency and average times.' },
        { title: 'Advanced Speedcubing', price: '$79', desc: 'Full CFOP, lookahead, and TPS training.' }
    ],
    coachingTitle: '1-on-1 Coaching',
    coachingText: 'Book a private session tailored to your goals.',
    resourcesTitle: 'Free Resources',
    resourcesText: 'Algorithms, practice plans, and solving tips.',
    contactTitle: 'Book a Coaching Session'
    },
    th: {
    nav: ['หน้าแรก', 'คอร์สเรียน', 'เรียนตัวต่อตัว', 'แหล่งเรียนรู้', 'ติดต่อ'],
    heroSubtitle: 'เชี่ยวชาญรูบิกส์คิวบ์ ด้วยคอร์สเรียนที่เป็นระบบ แหล่งเรียนรู้ทันสมัย และโค้ชส่วนตัว',
    courseCards: [
        { title: 'พื้นฐาน 3×3', price: '฿690', desc: 'เริ่มต้นแก้รูบิกส์ตั้งแต่ศูนย์' },
        { title: 'ระดับกลาง CFOP', price: '฿1,390', desc: 'พัฒนาเทคนิคและความเร็ว' },
        { title: 'ขั้นสูง Speedcubing', price: '฿2,790', desc: 'เทคนิคแข่งขันและการพัฒนาความเร็วการหมุน' }
    ],
    coachingTitle: 'โค้ชแบบตัวต่อตัว',
    coachingText: 'จองเวลาสอนส่วนตัวตามเป้าหมายของคุณ',
    resourcesTitle: 'แหล่งเรียนรู้ฟรี',
    resourcesText: 'สูตรการหมุน แผนฝึก และเทคนิค',
    contactTitle: 'จองคลาสโค้ช'
    }
};

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