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
    heroTitle: 'My Cubing Resources',
    heroDesc: 'Algorithm sets I use, organized by event and difficulty.',
    section2x2: '2x2 Cube: EG Method',
    section3x3: '3×3 Cube (Coming Soon)',
    sectionMega: 'Megaminx: 4 Look Last Layer'
  },
  th: {
    heroTitle: 'คลังสูตรรูบิก',
    heroDesc: 'รวมเซตสูตรที่ผมใช้ แบ่งตามประเภทและความยาก เพื่อการฝึกซ้อมที่มีประสิทธิภาพ',
    section2x2: 'รูบิก 2×2: วิธี EG',
    section3x3: 'รูบิก 3×3 (เร็วๆ นี้)',
    sectionMega: 'Megaminx: แก้แถวสุดท้ายด้วย 4 ขั้นตอน'
  }
};

function applyLang() {
  const lang = window.currentLang || 'en';
  const c = content[lang];

  // Update elements by ID
  if(document.getElementById('hero-title')) document.getElementById('hero-title').textContent = c.heroTitle;
  if(document.getElementById('hero-desc')) document.getElementById('hero-desc').textContent = c.heroDesc;
  if(document.getElementById('2x2-title')) document.getElementById('2x2-title').textContent = c.section2x2;
  if(document.getElementById('3x3-title')) document.getElementById('3x3-title').textContent = c.section3x3;
  if(document.getElementById('mega-title')) document.getElementById('mega-title').textContent = c.sectionMega;
}

document.addEventListener('DOMContentLoaded', () => {
  //toggleLang();
  window.addEventListener('languageChanged', () => {
    applyLang();
  })
})