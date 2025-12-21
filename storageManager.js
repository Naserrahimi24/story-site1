// storageManager.js - مدیریت حرفه‌ای localStorage
class StorageManager {
    static get(key, defaultValue = []) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch { return defaultValue; }
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // بوکمارک‌ها
    static addBookmark(item) {
        let bookmarks = this.get('bookmarks', []);
        if (!bookmarks.some(b => b.id === item.id)) {
            bookmarks.push({ ...item, savedAt: Date.now() });
            this.set('bookmarks', bookmarks);
        }
    }

    static removeBookmark(id) {
        let bookmarks = this.get('bookmarks', []);
        bookmarks = bookmarks.filter(b => b.id !== id);
        this.set('bookmarks', bookmarks);
    }

    static getBookmarks() { return this.get('bookmarks', []); }
    static isBookmarked(id) { return this.get('bookmarks', []).some(b => b.id === id); }

    // آخرین مشاهده
    static saveLastViewed(title, url = location.href) {
        this.set('lastViewed', { title, url, timestamp: Date.now() });
    }

    // آخرین جستجوها
    static addSearchQuery(query) {
        if (!query.trim()) return;
        let history = this.get('searchHistory', []);
        history = history.filter(q => q !== query);
        history.unshift(query);
        this.set('searchHistory', history.slice(0, 15));
    }

    static getSearchHistory() { return this.get('searchHistory', []); }
}

window.StorageManager = StorageManager;