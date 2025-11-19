// script.js - نسخه نهایی 2025 - کاملاً مدرن و حرفه‌ای
let currentLang = localStorage.getItem('lang') || 'fa';
let storiesData = null;
let currentCharId = null;

const modal = document.getElementById('modal');
const themeToggle = document.getElementById('theme-toggle');
const languageSwitch = document.getElementById('language-switch');

// Dark Mode
if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
  themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// تغییر زبان
languageSwitch?.addEventListener('click', () => {
  currentLang = currentLang === 'fa' ? 'en' : 'fa';
  localStorage.setItem('lang', currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  languageSwitch.textContent = currentLang === 'fa' ? 'EN' : 'FA';
  renderAll();
});

// باز و بسته کردن مودال
window.openModal = (title, text) => {
  document.getElementById('story-title').textContent = title;
  document.getElementById('story-text').innerHTML = text.replace(/\n/g, '<br><br>');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
};

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// سایدبار
document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
  document.getElementById('poets-sidebar').classList.toggle('-translate-x-full');
});

document.querySelector('.close-btn')?.addEventListener('click', () => {
  document.getElementById('poets-sidebar').classList.add('-translate-x-full');
});

// رندر همه چیز
function renderAll() {
  if (!storiesData) return;
  const page = document.body.dataset.page || (location.pathname.includes('character') ? 'character' : 'main');
  
  if (page === 'main') renderMainPage();
  if (page === 'character') renderCharacterPage();
  updateSidebar();
}

function renderMainPage() {
  const grid = document.getElementById('characters-grid');
  if (!grid) return;

  grid.innerHTML = storiesData.characters.map(char => `
    <div class="group cursor-pointer transform transition-all duration-500 hover:scale-105" data-aos="fade-up" onclick="location.href='character.html?id=${char.id}'">
      <div class="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700">
        <img src="${char.image}" alt="${char.name[currentLang]}" loading="lazy" class="w-full h-64 object-cover group-hover:scale-110 transition duration-700">
        <h3 class="text-xl font-bold text-center py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          ${char.name[currentLang]}
        </h3>
      </div>
    </div>
  `).join('');
}

function renderCharacterPage() {
  const params = new URLSearchParams(location.search);
  currentCharId = params.get('id');
  const char = storiesData.characters.find(c => c.id === currentCharId);
  if (!char) return;

  document.getElementById('character-name').textContent = char.name[currentLang];
  document.getElementById('character-image').src = char.image;
  document.getElementById('page-title').textContent = char.name[currentLang];

  const list = document.getElementById('stories-list');
  list.innerHTML = char.stories.map(story => `
    <div class="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700" 
         onclick="openModal('${story.title[currentLang]}', \`${story.text[currentLang]}\`)">
      <h3 class="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">${story.title[currentLang]}</h3>
      <p class="text-gray-600 dark:text-gray-400 line-clamp-3">${story.text[currentLang].split('\n')[0]}...</p>
    </div>
  `).join('');
}

function updateSidebar() {
  const list = document.getElementById('poets-list');
  if (!list) return;

  list.innerHTML = storiesData.characters.map(char => `
    <li><a href="character.html?id=${char.id}" class="${char.id === currentCharId ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} block px-6 py-4 rounded-xl transition font-medium">
      ${char.name[currentLang]}
    </a></li>
  `).join('');
}

// جستجو زنده
document.getElementById('global-search')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#characters-grid > div').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? '' : 'none';
  });
});

document.getElementById('stories-search')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('.story-card, #stories-list > div').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? '' : 'none';
  });
});

// لود داده‌ها
fetch('stories.json')
  .then(r => r.json())
  .then(data => {
    storiesData = data;
    renderAll();
    AOS.init({ once: true, duration: 800 });
  })
  .catch(err => console.error('خطا در بارگذاری داده‌ها:', err));