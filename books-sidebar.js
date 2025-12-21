// books-sidebar.js - نسخه 2025 با جستجوی زنده و هوشمند + قابلیت ذخیره کتاب و هر فصل جداگانه
let currentLang = localStorage.getItem("preferredLang") || "fa";
let allBooks = [];
let filteredBooks = [];

// ترجمه‌ها (همون قبلی‌ت + پیام‌های ذخیره)
const t = {
  fa: {
    searchPlaceholder: "جستجو در کتاب‌ها و فصل‌ها...",
    noResults: "هیچ کتابی یافت نشد",
    resultsFound: (n) => `${n} کتاب یافت شد`,
    chapters: "فصل",
    saved: "ذخیره شد!",
    removed: "از ذخیره حذف شد",
  },
  en: {
    searchPlaceholder: "Search in books & chapters...",
    noResults: "No books found",
    resultsFound: (n) => `${n} book${n !== 1 ? 's' : ''} found`,
    chapters: "Chapters",
    saved: "Saved!",
    removed: "Removed from bookmarks",
  },
};

// کلاس ذخیره‌سازی مستقل (برای اطمینان از کار کردن)
class StorageManager {
  static get(key, def = []) { 
    try { return JSON.parse(localStorage.getItem(key)) || def; } 
    catch { return def; } 
  }
  static set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  static addBookmark(item) {
    let list = this.get('bookmarks', []);
    if (!list.some(i => i.id === item.id)) {
      list.push({ ...item, savedAt: Date.now() });
      this.set('bookmarks', list);
    }
  }
  static removeBookmark(id) {
    this.set('bookmarks', this.get('bookmarks', []).filter(i => i.id !== id));
  }
  static getBookmarks() { return this.get('bookmarks', []); }
}

// آپدیت شمارنده زنده (اگر وجود داشته باشه)
function updateBookmarkCount() {
  const count = StorageManager.getBookmarks().length;
  document.querySelectorAll('.bookmark-count-live, .bookmark-count-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// نوتیفیکیشن کوتاه
function showToast(message, color = "text-emerald-600") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full bg-gray-900/95 ${color} text-white text-sm font-bold shadow-2xl backdrop-blur-sm animate-pulse`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// تابع عمومی ذخیره/حذف (برای استفاده در همه جا)
window.toggleBookmark = function(id, title, type, fullTitle) {
  const exists = StorageManager.getBookmarks().some(b => b.id === id);
  if (exists) {
    StorageManager.removeBookmark(id);
    showToast(t[currentLang].removed, "text-red-600");
  } else {
    StorageManager.addBookmark({ id, title: fullTitle || title, type });
    showToast(t[currentLang].saved, "text-emerald-600");
  }
  updateBookmarkCount();
};

document.addEventListener("DOMContentLoaded", async () => {
  const sidebar       = document.getElementById("books-sidebar");
  const container     = document.getElementById("books-container");
  const openBtn       = document.getElementById("open-books-sidebar");
  const closeBtn      = document.getElementById("close-books-sidebar");
  const langBtn       = document.getElementById("language-switch");
  const modal         = document.getElementById("book-modal");
  const modalTitle    = document.getElementById("modal-book-title");
  const modalContent  = document.getElementById("modal-book-content");

  const searchWrapper = document.getElementById("books-search-wrapper");
  const searchInput   = document.getElementById("books-search-input");
  const searchClear   = document.getElementById("books-search-clear");
  const resultsCount  = document.getElementById("books-results-count");

  // تنظیم اولیه زبان
  applyLanguage(currentLang);

  // رویدادهای سایدبار
  openBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  sidebar?.addEventListener("click", (e) => e.target === sidebar && closeSidebar());

  function openSidebar() {
    sidebar.classList.remove("translate-x-full");
    document.body.classList.add("overflow-hidden");
    searchInput?.focus();
  }

  function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");
  }

  // سوئیچ زبان
  langBtn?.addEventListener("click", () => {
    currentLang = currentLang === "fa" ? "en" : "fa";
    localStorage.setItem("preferredLang", currentLang);
    applyLanguage(currentLang);
    updateSearchPlaceholder();
    performSearch();
  });

  function applyLanguage(lang) {
    const isRTL = lang === "fa";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    langBtn.textContent = lang === "fa" ? "EN" : "فارسی";
    updateSearchPlaceholder();
  }

  function updateSearchPlaceholder() {
    if (searchInput) {
      searchInput.placeholder = t[currentLang].searchPlaceholder;
    }
  }

  // لود کتاب‌ها
  try {
    const res = await fetch(`books.json?t=${Date.now()}`);
    if (!res.ok) throw new Error("Failed to load books.json");

    const data = await res.json();
    allBooks = data.books || [];
    filteredBooks = allBooks;

    if (allBooks.length === 0) {
      throw new Error("No books defined in JSON");
    }

    renderBooks(filteredBooks);
    updateResultsCount(filteredBooks.length);

  } catch (err) {
    console.error(err);
    container.innerHTML = getErrorHTML(err.message);
  }

  // ——————————————————————
  // جستجوی زنده و هوشمند
  // ——————————————————————
  let searchTimeout;

  searchInput?.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  });

  searchClear?.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.classList.add("hidden");
    performSearch();
  });

  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      searchClear.classList.add("hidden");
      performSearch();
      searchInput.blur();
    }
  });

  function performSearch() {
    const query = searchInput?.value.trim().toLowerCase() || "";

    if (!query) {
      filteredBooks = allBooks;
      searchClear?.classList.add("hidden");
    } else {
      searchClear?.classList.remove("hidden");

      filteredBooks = allBooks
        .map(book => {
          const isEn = currentLang === "en";

          const title = (isEn ? (book.title_en || book.title) : book.title || "").toLowerCase();
          const desc = (isEn ? (book.description_en || book.description || "") : (book.description || "")).toLowerCase();

          const matchingStories = (book.stories || []).filter(story => {
            const storyTitle = (isEn ? (story.title_en || story.title || "") : (story.title || "")).toLowerCase();
            const storyText = (isEn ? (story.text_en || story.text || story.text_fa || "") : (story.text || story.text_fa || story.text_en || "")).toLowerCase();
            return storyTitle.includes(query) || storyText.includes(query);
          });

          const matchesInBook = title.includes(query) || desc.includes(query) || matchingStories.length > 0;

          if (matchesInBook) {
            if (matchingStories.length > 0 && matchingStories.length < book.stories.length) {
              return { ...book, stories: matchingStories, partialMatch: true };
            }
            return book;
          }
          return null;
        })
        .filter(Boolean);
    }

    renderBooks(filteredBooks);
    updateResultsCount(filteredBooks.length);
  }

  function updateResultsCount(count) {
    if (resultsCount) {
      resultsCount.textContent = count === allBooks.length ? "" : t[currentLang].resultsFound(count);
      resultsCount.classList.toggle("opacity-100", count < allBooks.length);
    }
  }

  function getErrorHTML(message) {
    return `
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <svg class="w-20 h-20 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="text-2xl font-bold text-red-600 dark:text-red-400">خطا در بارگذاری</h3>
        <p class="mt-3 text-gray-600 dark:text-gray-400">فایل books.json را بررسی کنید</p>
        <p class="mt-2 text-sm text-gray-500">${message}</p>
      </div>
    `;
  }

  // رندر کتاب‌ها با دکمه ذخیره
  function renderBooks(books) {
    if (!container) return;
    container.innerHTML = books.length === 0
      ? `<div class="text-center py-20 text-gray-500 dark:text-gray-400">
           <i class="fa-solid fa-search text-6xl mb-4 opacity-30"></i>
           <p class="text-xl">${t[currentLang].noResults}</p>
         </div>`
      : "";

    books.forEach((book, index) => {
      const isEn = currentLang === "en";
      const title = isEn ? (book.title_en || book.title) : book.title;
      const description = isEn ? (book.description_en || book.description || "") : (book.description || "");

      const isBookmarked = StorageManager.getBookmarks().some(b => b.id === book.id);

      const card = document.createElement("div");
      card.className = `group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/90
                        shadow-lg hover:shadow-2xl border-r-4 border-${book.borderColor || "indigo"}-600
                        transition-all duration-500 hover:-translate-y-3 cursor-pointer backdrop-blur-sm
                        ring-1 ring-gray-200 dark:ring-gray-700 ${book.partialMatch ? "ring-2 ring-amber-500" : ""}`;

      card.innerHTML = `
        <div class="p-6 flex items-center gap-5 relative">
          <div class="flex-shrink-0 p-4 rounded-2xl bg-${book.bgLight || "indigo"}-100 dark:bg-${book.bgDark || "indigo"}-900 
                         group-hover:scale-110 transition-transform duration-500">
            <i class="fa-solid ${book.icon || "fa-book-open"} text-4xl text-${book.iconColor || "indigo"}-700"></i>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-extrabold text-gray-900 dark:text-white truncate">${title}</h3>
            ${description ? `<p class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">${description}</p>` : ""}
            <div class="flex items-center gap-2 mt-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              <i class="fa-solid fa-layer-group"></i>
              <span>${book.stories?.length || 0} ${t[currentLang].chapters}</span>
              ${book.partialMatch ? '<span class="mr-3 text-amber-600 dark:text-amber-400">برخی فصل‌ها</span>' : ''}
            </div>
          </div>

          <!-- دکمه ذخیره کل کتاب -->
          <button onclick="event.stopPropagation(); toggleBookmark('${book.id}', '${title.replace(/'/g, "\\'")}', 'کتاب', '${title}')" 
                  class="absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-xl transition-all hover:scale-110 ${isBookmarked ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}">
            <i class="fa-solid fa-bookmark ${isBookmarked ? 'fas' : 'far'}"></i>
          </button>

          <div class="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <i class="fa-solid ${currentLang === "fa" ? "fa-chevron-left" : "fa-chevron-right"} text-2xl text-${book.borderColor || "indigo"}-600"></i>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${book.borderColor || "indigo"}-600 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      `;

      card.dataset.aos = "fade-up";
      card.dataset.aosDelay = index * 100;

      card.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          openBookModal(book);
          closeSidebar();
        }
      });

      container.appendChild(card);
    });

    if (typeof AOS !== "undefined") AOS.refresh();
  }

  // باز کردن مودال با ذخیره هر فصل
  window.openBookModal = function (book) {
    if (!modal || !modalTitle || !modalContent) return;

    const isEn = currentLang === "en";
    modalTitle.textContent = isEn ? (book.title_en || book.title) : book.title;

    modalContent.innerHTML = "";
    modalContent.className = "space-y-12 py-8 overflow-y-auto max-h-[80vh] px-2";

    (book.stories || []).forEach((story, idx) => {
      const storyTitle = isEn
        ? (story.title_en || story.title || `Chapter ${idx + 1}`)
        : (story.title || `فصل ${idx + 1}`);

      const storyText = isEn
        ? (story.text_en || story.text || story.text_fa || "")
        : (story.text || story.text_fa || story.text_en || "");

      const chapterId = `${book.id}-chapter-${idx + 1}`;
      const isSaved = StorageManager.getBookmarks().some(b => b.id === chapterId);

      let highlightedText = storyText;
      if (searchInput?.value.trim()) {
        const regex = new RegExp(`(${searchInput.value.trim()})`, "gi");
        highlightedText = storyText.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">$1</mark>');
      }

      const chapter = document.createElement("article");
      chapter.className = "border-b border-gray-200 dark:border-gray-700 pb-12 last:border-0 relative";

      chapter.innerHTML = `
        <div class="flex items-start gap-4">
          <button onclick="event.stopPropagation(); toggleBookmark('${chapterId}', '${storyTitle.replace(/'/g, "\\'")}', 'فصل', '${book.title || book.title_en} — ${storyTitle}')" 
                  class="mt-2 w-11 h-11 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg flex items-center justify-center text-xl transition-all hover:scale-110 ${isSaved ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}">
            <i class="fa-solid fa-bookmark ${isSaved ? '' : 'far'}"></i>
          </button>

          <div class="flex-1">
            <h3 class="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
              <span class="inline-flex items-center justify-center w-12 h-12 rounded-full 
                           bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                ${idx + 1}
              </span>
              ${storyTitle}
            </h3>
            <div class="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-justify whitespace-pre-wrap">
              ${highlightedText.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
      `;

      modalContent.appendChild(chapter);
    });

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };

  // بستن مودال
  document.querySelectorAll(".close-modal").forEach(btn => btn.onclick = closeModal);
  modal?.addEventListener("click", e => e.target === modal && closeModal());
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
});