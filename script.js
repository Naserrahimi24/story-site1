// script.js - نسخه نهایی 2025 با TTS مقاوم به خطا و لودینگ async
let currentLang = localStorage.getItem('lang') || 'fa';
let storiesData = null;
let currentCharId = null;
let currentUtterance = null;
let voicesLoaded = false; // فلگ برای لود شدن voices

const modal = document.getElementById('modal');
const themeToggle = document.getElementById('theme-toggle');
const languageSwitch = document.getElementById('language-switch');

// Promise برای لود شدن voices (رفع مشکل empty array)
function loadVoices() {
  return new Promise((resolve) => {
    if (voicesLoaded) {
      resolve(speechSynthesis.getVoices());
      return;
    }
    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesLoaded = true;
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = checkVoices; // event listener
        setTimeout(checkVoices, 100); // fallback timeout
      }
    };
    checkVoices();
  });
}

// انتخاب بهترین صدای فارسی (با fallback)
async function getPersianVoice() {
  try {
    const voices = await loadVoices();
    // اولویت: Google فارسی > Microsoft > هر صدای فارسی > پیش‌فرض
    return (
      voices.find(v => v.lang === 'fa-IR' && v.name.toLowerCase().includes('google')) ||
      voices.find(v => v.lang === 'fa-IR' && v.name.toLowerCase().includes('microsoft')) ||
      voices.find(v => v.lang === 'fa-IR') ||
      voices.find(v => v.lang.startsWith('fa')) ||
      voices[0] // fallback به اولین صدا
    );
  } catch (err) {
    console.warn('TTS voices failed to load:', err);
    return null;
  }
}

// پخش متن با صدای فارسی (با error handling)
window.speakText = async (text) => {
  try {
    if (currentUtterance) {
      speechSynthesis.cancel();
    }

    const voice = await getPersianVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn('No suitable voice found. Using default.');
      // می‌تونی alert اضافه کنی: alert('صدای فارسی در دسترس نیست. از تنظیمات مرورگر فعال کنید.');
    }

    utterance.lang = 'fa-IR';
    utterance.rate = 0.9; // سرعت طبیعی
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-play"></i>';
    };

    utterance.onerror = (e) => {
      console.error('TTS Error:', e);
      alert('خطا در پخش صدا. لطفاً مرورگر را به‌روزرسانی کنید یا صدای فارسی را در تنظیمات فعال کنید.');
      document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-play"></i>';
    };

    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
    document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-pause"></i>';
  } catch (err) {
    console.error('Speak error:', err);
    alert('TTS در دسترس نیست. صفحه بدون صدا کار می‌کند.');
  }
};

// توقف/ادامه
window.togglePlayPause = () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-play"></i>';
  } else if (speechSynthesis.paused) {
    speechSynthesis.resume();
    document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
};

// توقف کامل
window.stopSpeaking = () => {
  speechSynthesis.cancel();
  currentUtterance = null;
  document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-play"></i>';
};

// باز کردن مودال با TTS امن
window.openModal = async (title, text) => {
  document.getElementById('story-title').textContent = title;
  document.getElementById('story-text').innerHTML = text.replace(/\n/g, '<br><br>');

  // تنظیم پلیر (async برای voices)
  const cleanedText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  document.getElementById('play-pause-btn').onclick = () => speakText(cleanedText);

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  stopSpeaking();
};

// بستن مودال
window.closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  stopSpeaking();
};

// Event listeners برای close buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
});

// Dark Mode (همون قبلی)
if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
  themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// تغییر زبان (همون قبلی)
languageSwitch?.addEventListener('click', () => {
  currentLang = currentLang === 'fa' ? 'en' : 'fa';
  localStorage.setItem('lang', currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  languageSwitch.textContent = currentLang === 'fa' ? 'EN' : 'FA';
  renderAll();
});

// سایدبار و رندر (همون قبلی، بدون تغییر)
document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
  document.getElementById('poets-sidebar')?.classList.toggle('-translate-x-full');
});

document.querySelector('.close-btn')?.addEventListener('click', () => {
  document.getElementById('poets-sidebar')?.classList.add('-translate-x-full');
});

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
  if (list) {
    list.innerHTML = char.stories.map(story => `
      <div class="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700" 
           onclick="openModal('${story.title[currentLang]}', \`${story.text[currentLang]}\`)">
        <h3 class="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">${story.title[currentLang]}</h3>
        <p class="text-gray-600 dark:text-gray-400 line-clamp-3">${story.text[currentLang].split('\n')[0]}...</p>
      </div>
    `).join('');
  }
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

// جستجو (با safe querySelector)
document.getElementById('global-search')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#characters-grid > div').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

document.getElementById('stories-search')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#stories-list > div').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// لود داده‌ها (با try-catch برای امنیت)
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('stories.json');
    if (!response.ok) throw new Error('stories.json not found');
    storiesData = await response.json();
    renderAll();
    if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 800 });
  } catch (err) {
    console.error('خطا در بارگذاری داده‌ها:', err);
    // می‌تونی یک div error اضافه کنی: document.body.innerHTML += '<p class="text-red-500">داده‌ها لود نشد. فایل stories.json را چک کنید.</p>';
  }

  // لود voices در background (بدون بلاک کردن صفحه)
  loadVoices().catch(err => console.warn('Voices load failed:', err));
});