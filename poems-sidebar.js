// poems-sidebar-simple.js - ساده، سریع و کاملاً ریسپانسیو 2026
class PoemsSidebar {
  constructor() {
    this.sidebar = document.getElementById('poems-sidebar');
    this.list = document.getElementById('poems-list');
    this.search = document.getElementById('poems-search');
    this.openBtn = document.getElementById('open-poems-sidebar');
    this.closeBtn = document.getElementById('close-poems-sidebar');

    this.allPoets = [];
    this.filtered = [];
    this.lang = localStorage.getItem('lang') || (navigator.languages?.some(l => l.startsWith('fa')) ? 'fa' : 'en');
    this.isOpen = false;

    this.init();
  }

  t(fa, en) {
    return this.lang === 'fa' ? fa : en;
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    this.search.placeholder = this.t('جستجوی شاعر، شعر یا بیت...', 'Search poet, poem or verse...');
    this.render();
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    const mobile = window.innerWidth < 1024;
    this.sidebar.classList.remove(mobile ? '-translate-y-full' : '-translate-x-full');
    this.sidebar.classList.add('translate-y-0', 'translate-x-0');

    // Overlay ساده
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'fixed inset-0 bg-black/50 z-40';
    overlay.onclick = () => this.close();
    document.body.appendChild(overlay);

    document.body.classList.add('overflow-hidden');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    const mobile = window.innerWidth < 1024;
    this.sidebar.classList.add(mobile ? '-translate-y-full' : '-translate-x-full');
    this.sidebar.classList.remove('translate-y-0', 'translate-x-0');

    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.remove();
    document.body.classList.remove('overflow-hidden');
  }

  highlight(text, term) {
    if (!term) return this.escape(text);
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return this.escape(text).replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">$1</mark>');
  }

  escape(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  render() {
    if (!this.list) return;

    const data = this.filtered.length ? this.filtered : this.allPoets;
    const term = (this.search?.value || '').trim().toLowerCase();

    if (!data.length) {
      this.list.innerHTML = `<div class="text-center py-20 text-gray-500">${this.t('شاعری یافت نشد', 'No poets found')}</div>`;
      return;
    }

    this.list.innerHTML = data.map(poet => {
      const name = this.lang === 'fa' ? poet.poet : (poet.poet_en || poet.poet);
      const sample = poet.poems[0] || {};
      const title = this.lang === 'fa' ? (sample.title || '') : (sample.title_en || sample.title || '');
      const verse = this.lang === 'fa' ? (sample.firstLine || '') : (sample.firstLine_en || sample.firstLine || '');

      return `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
             onclick="poemsSidebar.goTo('${name}')">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              ${name.trim().charAt(0).toUpperCase()}
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">
              ${this.highlight(name, term)}
            </h3>
          </div>

          ${title ? `<p class="font-medium text-gray-700 dark:text-gray-200 mb-2">${this.highlight(title, term)}</p>` : ''}
          
          <p class="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-2">
            “${this.highlight(verse || this.t('شعری زیبا...', 'A beautiful poem...'), term)}”
          </p>

          <div class="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span class="text-sm font-medium text-amber-600 dark:text-amber-400">
              ${this.t('همه اشعار', 'All poems')} →
            </span>
            <span class="text-xs text-gray-500">
              ${poet.poems.length} ${this.t('شعر', 'poems')}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  goTo(name) {
    const url = `poet.html?poet=${encodeURIComponent(name)}&lang=${this.lang}`;
    this.close();
    setTimeout(() => location.href = url, 300);
  }

  setupSearch() {
    if (!this.search) return;
    let timer;
    this.search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = this.search.value.trim().toLowerCase();
        if (!term) {
          this.filtered = [];
          this.render();
          return;
        }
        this.filtered = this.allPoets.filter(p => {
          const names = `${p.poet} ${p.poet_en || ''}`.toLowerCase();
          const content = p.poems.flatMap(poem => 
            [poem.title, poem.title_en, poem.firstLine, poem.firstLine_en].filter(Boolean)
          ).join(' ').toLowerCase();
          return names.includes(term) || content.includes(term);
        });
        this.render();
      }, 200);
    });
  }

  async loadData() {
    this.list.innerHTML = `<div class="text-center py-20"><div class="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>`;

    try {
      const res = await fetch('poems-data.json?t=' + Date.now());
      const data = await res.json();
      this.allPoets = Array.isArray(data) ? data : [];
      this.render();
    } catch {
      this.list.innerHTML = `
        <div class="text-center py-20 text-red-500">
          <p class="mb-4">${this.t('خطا در بارگذاری شعرها', 'Failed to load poems')}</p>
          <button onclick="poemsSidebar.loadData()" class="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition">
            ${this.t('تلاش دوباره', 'Try again')}
          </button>
        </div>`;
    }
  }

  init() {
    if (!this.sidebar || !this.list) return;

    // تنظیم زبان اولیه
    this.setLang(this.lang);

    // دکمه‌ها
    this.openBtn?.addEventListener('click', () => this.open());
    this.closeBtn?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', e => e.key === 'Escape' && this.close());

    // گرید ریسپانسیو ساده
    this.list.className = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

    this.setupSearch();
    this.loadData();

    // سوییچ زبان جهانی
    window.switchLanguage = () => this.setLang(this.lang === 'fa' ? 'en' : 'fa');
  }
}

// راه‌اندازی
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.poemsSidebar = new PoemsSidebar());
} else {
  window.poemsSidebar = new PoemsSidebar();
}