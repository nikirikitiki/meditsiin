// Settings Page Functionality
(function() {
    const fontOptions = {
        'inter': 'Inter',
        'dm-sans': 'DM Sans',
        'poppins': 'Poppins',
        'plus-jakarta': 'Plus Jakarta Sans',
        'work-sans': 'Work Sans',
        'system': 'System Default'
    };

    function initSettings() {
        // Initialize font settings
        initFontSettings();
        
        // Initialize color scheme settings
        initColorSettings();
        
        // Initialize language settings
        initLanguageSettings();
        
        // Initialize reset button
        initResetButton();
    }

    function initFontSettings() {
        const buttons = document.querySelectorAll('#fontButtons .setting-btn');
        if (buttons.length === 0) return;

        // Load saved font preference
        const savedFont = localStorage.getItem('meditsiin4.0_font') || 'plus-jakarta';
        applyFont(savedFont);

        // Set active button
        buttons.forEach(btn => {
            const font = btn.getAttribute('data-font');
            if (font === savedFont) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                // Remove active from all buttons
                buttons.forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                btn.classList.add('active');
                
                // Apply font
                applyFont(font);
                // Save preference
                localStorage.setItem('meditsiin4.0_font', font);
            });
        });
    }

    function initColorSettings() {
        const buttons = document.querySelectorAll('#colorButtons .setting-btn');
        if (buttons.length === 0) {
            console.warn('Color scheme buttons not found');
            return;
        }

        console.log(`Found ${buttons.length} color scheme buttons`);

        // Load saved color scheme preference (default to navy)
        const savedScheme = localStorage.getItem('meditsiin4.0_colorscheme') || 'navy';
        console.log('Loading saved color scheme:', savedScheme);
        applyColorScheme(savedScheme);

        // Set active button
        buttons.forEach(btn => {
            const scheme = btn.getAttribute('data-scheme');
            if (!scheme) {
                console.warn('Button missing data-scheme attribute:', btn);
                return;
            }

            if (scheme === savedScheme) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Get scheme from button (in case click was on child element)
                const clickedScheme = btn.getAttribute('data-scheme') || scheme;
                console.log('Color scheme button clicked:', clickedScheme);
                
                // Remove active from all buttons
                buttons.forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                btn.classList.add('active');
                
                // Apply color scheme
                applyColorScheme(clickedScheme);
                // Save preference
                localStorage.setItem('meditsiin4.0_colorscheme', clickedScheme);
                
                console.log('Color scheme applied:', clickedScheme);
            });
            
            // Also handle clicks on child elements (like the color preview span)
            const colorPreview = btn.querySelector('.color-preview');
            if (colorPreview) {
                colorPreview.addEventListener('click', (e) => {
                    e.stopPropagation();
                    btn.click(); // Trigger the button's click handler
                });
            }
        });
    }

    function applyColorScheme(scheme) {
        console.log('Applying color scheme:', scheme);
        
        // Remove all color scheme classes
        document.documentElement.classList.remove(
            'color-scheme-default',
            'color-scheme-medical',
            'color-scheme-navy',
            'color-scheme-purple',
            'color-scheme-teal',
            'color-scheme-slate'
        );
        
        // Add selected color scheme class
        // 'navy' is now the default (no class needed - uses :root values)
        // 'default' applies blue & green (needs color-scheme-default class)
        if (scheme && scheme !== 'navy') {
            const className = `color-scheme-${scheme}`;
            document.documentElement.classList.add(className);
            console.log('Added class:', className);
        } else {
            // Navy is the default, so no class needed (it's already in :root)
            console.log('Using default navy color scheme (no class needed)');
        }
        
        // Force a repaint to ensure changes are visible
        document.documentElement.offsetHeight;
    }

    function initLanguageSettings() {
        const buttons = document.querySelectorAll('#languageButtons .setting-btn');
        if (buttons.length === 0) return;

        // Get current language from i18n if available
        const currentLang = localStorage.getItem('meditsiin4.0_lang') || 'et';
        
        // Set active button
        buttons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                // Remove active from all buttons
                buttons.forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                btn.classList.add('active');
                
                // Change language using i18n if available
                if (window.i18n) {
                    window.i18n.changeLanguage(lang);
                } else {
                    localStorage.setItem('meditsiin4.0_lang', lang);
                    // Reload page to apply language
                    window.location.reload();
                }
            });
        });
    }

    function initResetButton() {
        const resetBtn = document.getElementById('resetSettings');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to defaults?')) {
                // Clear all settings
                localStorage.removeItem('meditsiin4.0_font');
                localStorage.removeItem('meditsiin4.0_colorscheme');
                localStorage.removeItem('meditsiin4.0_lang');
                
                // Reset to defaults
                applyFont('plus-jakarta');
                applyColorScheme('navy');
                
                // Reload page
                window.location.reload();
            }
        });
    }

    function applyFont(font) {
        // Remove all font classes
        document.body.classList.remove('font-inter', 'font-dm-sans', 'font-poppins', 'font-plus-jakarta', 'font-work-sans', 'font-system');
        
        // Add selected font class
        if (font && font !== 'system') {
            document.body.classList.add(`font-${font}`);
        }
        
        // Update CSS variable for immediate effect
        const fontFamilies = {
            'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            'dm-sans': "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            'poppins': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            'plus-jakarta': "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            'work-sans': "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        };
        
        document.documentElement.style.setProperty('--font-family', fontFamilies[font] || fontFamilies['plus-jakarta']);
    }

    // Initialize when DOM is ready
    function initialize() {
        console.log('Initializing settings...');
        console.log('Document ready state:', document.readyState);
        
        // Check if color buttons exist
        const colorButtons = document.querySelectorAll('#colorButtons .setting-btn');
        console.log('Color buttons found:', colorButtons.length);
        
        try {
            initSettings();
            console.log('Settings initialized successfully');
        } catch (error) {
            console.error('Error initializing settings:', error);
            console.error(error.stack);
        }
    }

    // Wait for DOM and other scripts to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Wait a bit more for i18n to potentially modify DOM
            setTimeout(initialize, 200);
        });
    } else {
        // DOM already loaded, wait a bit for other scripts
        setTimeout(initialize, 200);
    }
    
    // Also try initializing after a language change event
    window.addEventListener('languageChanged', () => {
        console.log('Language changed, reinitializing color settings...');
        setTimeout(() => {
            initColorSettings();
        }, 100);
    });
})();

