// app.js - مدیریت بوکمارک، شمارنده و سایدبار جدید
document.addEventListener('DOMContentLoaded', () => {
    initBookmarksSidebar();
    updateBookmarkCount();
    StorageManager.saveLastViewed(document.title);
});

// شمارنده زنده
function updateBookmarkCount() {
    const count = StorageManager.getBookmarks().length;
    document.querySelectorAll('.bookmark-count-live, .bookmark-count-badge').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// سایدبار ذخیره‌شده‌ها
function initBookmarksSidebar() {
    const sidebar = document.getElementById('bookmarks-sidebar');
    const openBtn = document.getElementById('open-bookmarks-sidebar');
    const closeBtn = document.getElementById('close-bookmarks-sidebar');

    openBtn?.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-full');
        renderBookmarks();
    });

    closeBtn?.addEventListener('click', () => {
        sidebar.classList.add('translate-x-full');
    });

    // بستن با کلیک بیرون
    sidebar.addEventListener('click', e => {
        if (e.target === sidebar) sidebar.classList.add('translate-x-full');
    });
}

function renderBookmarks() {
    const container = document.getElementById('bookmarks-list');
    const empty = document.getElementById('bookmarks-empty');
    const bookmarks = StorageManager.getBookmarks();

    if (bookmarks.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    container.innerHTML = bookmarks.map(b => `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex justify-between items-start gap-3">
            <div>
                <h3 class="font-bold text-primary">${b.title || 'بدون عنوان'}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${b.type || ''}</p>
            </div>
            <button onclick="removeAndUpdate('${b.id}')" class="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg p-2">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
}

window.removeAndUpdate = function(id) {
    StorageManager.removeBookmark(id);
    updateBookmarkCount();
    renderBookmarks();
};

// برای استفاده در script.js یا جاهای دیگه: ذخیره بوکمارک
window.bookmarkItem = function(item) {
    StorageManager.addBookmark(item);
    updateBookmarkCount();
    alert('ذخیره شد!');
};