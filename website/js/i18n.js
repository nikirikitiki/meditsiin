// Internationalization (i18n) System
class I18n {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.supportedLangs = ['en', 'et', 'ru'];
        this.defaultLang = 'et'; // Default to Estonian for Estonia
    }

    // Detect browser language
    detectLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('meditsiin4.0_lang');
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            return savedLang;
        }

        // Detect from browser
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // Map browser language to supported languages
        if (langCode === 'et' || langCode === 'ee') {
            return 'et';
        } else if (langCode === 'ru') {
            return 'ru';
        } else if (langCode === 'en') {
            return 'en';
        }

        // Default to Estonian for Estonia
        return this.defaultLang;
    }

    // Load translation file
    async loadTranslations(lang) {
        // Check if already loaded
        if (this.translations[lang]) {
            return this.translations[lang];
        }

        try {
            // Check if we're using file:// protocol (won't work, need HTTP server)
            if (window.location.protocol === 'file:') {
                console.error('ERROR: File opened via file:// protocol. Please use a local HTTP server.');
                console.error('Run: cd website && python3 -m http.server 8000');
                console.error('Then visit: http://localhost:8000');
                throw new Error('Cannot load translations via file:// protocol. Use HTTP server.');
            }

            // Determine the correct path for lang files
            // Works for both local development (with server) and GitHub Pages
            let url;
            const currentPath = window.location.pathname;
            
            if (currentPath.includes('/website/')) {
                // If path includes /website/, use that as base
                const basePath = currentPath.substring(0, currentPath.indexOf('/website/') + '/website/'.length);
                url = `${basePath}lang/${lang}.json`;
            } else {
                // Use relative path from current directory
                const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                url = `${currentDir}lang/${lang}.json`;
            }
            
            console.log('Loading translations from:', url);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json: ${response.status} ${response.statusText}`);
            }
            
            this.translations[lang] = await response.json();
            console.log(`Translations loaded for ${lang}`);
            return this.translations[lang];
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Fallback to English if translation fails
            if (lang !== 'en') {
                console.log('Falling back to English');
                return this.loadTranslations('en');
            }
            return null;
        }
    }

    // Get translation by key path (e.g., "nav.home" or "home.hero.title")
    t(key, defaultValue = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }

        return typeof value === 'string' ? value : defaultValue || key;
    }

    // Apply translations to all elements with data-i18n attribute
    applyTranslations() {
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update meta description if exists
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const page = this.getCurrentPage();
            const descKey = `meta.description.${page}`;
            const description = this.t(descKey);
            if (description && description !== descKey) {
                metaDesc.setAttribute('content', description);
            }
        }

        // Update page title
        const page = this.getCurrentPage();
        const titleKey = `meta.title.${page}`;
        const title = this.t(titleKey);
        if (title && title !== titleKey) {
            document.title = title;
        }

        // Translate all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                    element.alt = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Translate elements with data-i18n-html (for HTML content)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                element.innerHTML = translation;
            }
        });

        // Update language switcher
        this.updateLanguageSwitcher();
    }

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('about.html')) return 'about';
        if (path.includes('offerings.html')) return 'offerings';
        return 'home';
    }

    // Update language switcher UI
    updateLanguageSwitcher() {
        const switcher = document.querySelector('.lang-switcher');
        if (!switcher) return;

        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Change language
    async changeLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return;
        }

        console.log(`Changing language to: ${lang}`);

        // Load translations if not already loaded
        if (!this.translations[lang]) {
            try {
                await this.loadTranslations(lang);
            } catch (error) {
                console.error('Error loading translations:', error);
                return;
            }
        }

        // Update current language
        this.currentLang = lang;
        localStorage.setItem('meditsiin4.0_lang', lang);

        // Apply translations
        this.applyTranslations();

        // Trigger custom event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        
        console.log(`Language changed to: ${lang}`);
    }

    // Initialize i18n system
    async init() {
        console.log('Initializing i18n system...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Detect and set language
        this.currentLang = this.detectLanguage();
        console.log('Detected language:', this.currentLang);

        // Load translations
        try {
            await this.loadTranslations(this.currentLang);
        } catch (error) {
            console.error('Error loading initial translations:', error);
            return;
        }

        // Apply translations
        this.applyTranslations();

        // Set up language switcher event listeners
        this.setupLanguageSwitcher();
    }

    // Setup language switcher event listeners
    setupLanguageSwitcher() {
        const switcher = document.querySelector('.lang-switcher');
        if (!switcher) {
            console.warn('Language switcher not found');
            return;
        }

        const buttons = switcher.querySelectorAll('.lang-btn');
        if (buttons.length === 0) {
            console.warn('No language buttons found');
            return;
        }

        console.log(`Setting up ${buttons.length} language buttons`);

        // Store reference to this for use in event handler
        const self = this;

        // Use event delegation on the switcher to handle clicks
        switcher.addEventListener('click', function(e) {
            const btn = e.target.closest('.lang-btn');
            if (!btn) return;

            e.preventDefault();
            e.stopPropagation();
            
            const lang = btn.getAttribute('data-lang');
            if (lang && self.supportedLangs.includes(lang)) {
                console.log('Language button clicked:', lang);
                self.changeLanguage(lang).catch(err => {
                    console.error('Error changing language:', err);
                });
            }
        });
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize immediately - init() will wait for DOM if needed
i18n.init();

