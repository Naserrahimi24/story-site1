// proverbs-sidebar.js — Ultra Optimized Version (2025)

const sidebar = document.getElementById('proverbs-sidebar');
const openBtn = document.getElementById('open-proverbs-sidebar');
const closeBtn = document.getElementById('close-proverbs-sidebar');
const searchInput = document.getElementById('proverbs-search-input');
const clearBtn = document.getElementById('proverbs-search-clear');
const container = document.getElementById('proverbs-container');
const countEl = document.getElementById('proverbs-results-count');

let allProverbs = [];
let currentLang = localStorage.getItem("preferredLang") || 'fa';
let isLoading = false;

// تابع باز کردن (با lazy load)
const openSidebar = () => {
  if (sidebar.classList.contains('translate-x-0')) return;

  sidebar.classList.replace('translate-x-full', 'translate-x-0');
  sidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  searchInput.focus();

  if (allProverbs.length === 0 && !isLoading) {
    loadProverbs(); // فقط اولین بار لود میشه
  }
};

const closeSidebar = () => {
  sidebar.classList.replace('translate-x-0', 'translate-x-full');
  sidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  searchInput.value = '';
  clearBtn.classList.add('hidden');
};

// بارگذاری با cache هوشمند + fallback
async function loadProverbs() {
  if (isLoading || allProverbs.length > 0) return;
  isLoading = true;

  try {
    const res = await fetch('proverbs.json?t=' + Date.now(), { 
      cache: "no-cache" // فقط در توسعه — در تولید بذارید "force-cache"
    });
    if (!res.ok) throw new Error("Failed to fetch");

    allProverbs = await res.json();
    renderProverbs(allProverbs); // رندر اولیه
  } catch (err) {
    container.innerHTML = `<div class="col-span-2 text-center py-16 text-red-600 dark:text-red-400">خطا در بارگذاری ضرب‌المثل‌ها</div>`;
    console.error(err);
  } finally {
    isLoading = false;
  }
}

// رندر بهینه با requestAnimationFrame + Fragment
function renderProverbs(list) {
  if (!container) return;

  const isFa = currentLang === 'fa';
  countEl.textContent = isFa 
    ? `${list.length} ضرب‌المثل یافت شد` 
    : `${list.length} proverbs found`;
  countEl.classList.toggle('opacity-0', list.length === 0);

  if (list.length === 0) {
    container.innerHTML = `<div class="col-span-2 text-center py-16 text-gray-500">مثلی یافت نشد</div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  const template = document.createElement('template');

  const html = list.map(p => {
    const text = p[currentLang] || p.fa;
    const meaning = isFa ? p.meaning_fa : p.meaning_en;
    return `
      <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-400">
        <blockquote class="text-lg md:text-xl font-bold text-indigo-700 dark:text-indigo-400 leading-relaxed">
          “${text}”
        </blockquote>
        ${meaning ? `<p class="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300">${meaning}</p>` : ''}
      </article>`;
  }).join('');

  template.innerHTML = html;
  fragment.append(...template.content.childNodes);

  // رندر در فریم بعدی → بدون لگ
  requestAnimationFrame(() => {
    container.innerHTML = '';
    container.appendChild(fragment);
  });
}

// جستجوی فوق سریع (Debounce 150ms)
let searchTimeout;
const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performSearch, 150);
};

const performSearch = () => {
  const term = searchInput.value.trim().toLowerCase();
  clearBtn.classList.toggle('hidden', !term);

  if (!term) return renderProverbs(allProverbs);

  const filtered = allProverbs.filter(p => 
    [p.fa, p.en, p.meaning_fa, p.meaning_en]
      .some(field => field?.toLowerCase().includes(term))
  );

  renderProverbs(filtered);
};

// رویدادها
openBtn?.addEventListener('click', openSidebar);
closeBtn?.addEventListener('click', closeSidebar);
searchInput?.addEventListener('input', debouncedSearch);
clearBtn?.addEventListener('click', () => {
  searchInput.value = ''; searchInput.focus(); debouncedSearch();
});

// بستن با Escape و کلیک بیرون
const handleEscape = (e) => { if (e.key === 'Escape') closeSidebar(); };
const handleOutsideClick = (e) => { if (e.target === sidebar) closeSidebar(); };

sidebar.addEventListener('transitionend', (e) => {
  if (sidebar.classList.contains('translate-x-0')) {
    document.addEventListener('keydown', handleEscape);
    sidebar.addEventListener('click', handleOutsideClick);
  } else {
    document.removeEventListener('keydown', handleEscape);
    sidebar.removeEventListener('click', handleOutsideClick);
  }
});

// تغییر زبان زنده
const langObserver = new MutationObserver(() => {
  currentLang = document.documentElement.lang || localStorage.getItem("preferredLang") || 'fa';
  if (allProverbs.length > 0) performSearch();
});
langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });