# MEDITSIIN4.0 Website

Simple HTML/CSS/JS website for MEDITSIIN4.0, designed for GitHub Pages deployment.

## Structure

```
website/
├── index.html          # Homepage
├── about.html          # About/Mission/Vision page
├── offerings.html      # Services/Offerings page
├── css/
│   ├── style.css       # Main stylesheet
│   └── responsive.css  # Mobile responsiveness
├── js/
│   └── main.js         # Interactive features
├── assets/
│   ├── images/         # Logo, icons, images
│   └── fonts/          # Custom fonts (if needed)
└── _config.yml         # GitHub Pages config (optional)
```

## Features

- **Responsive Design**: Mobile-first, works on all devices
- **Clean Navigation**: Simple header with logo and menu
- **Professional Aesthetics**: Medical/healthcare industry appropriate
- **Fast Loading**: Optimized, minimal dependencies
- **SEO Ready**: Proper meta tags, semantic HTML

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select the branch (usually `main` or `master`)
4. Select `/website` as the folder (or root if you move files)
5. Click Save
6. Your site will be available at `https://yourusername.github.io/meditsiin4.0`

## Local Development

**Important:** You must use a local HTTP server to test the website. Opening HTML files directly (`file://`) will cause CORS errors because the language translation files need to be loaded via HTTP.

### Option 1: Python Server (Recommended)
```bash
cd website
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Option 2: Use the provided server script
```bash
cd website
python3 server.py
# Then visit http://localhost:8000
```

### Option 3: Node.js (http-server)
```bash
cd website
npx http-server -p 8000
# Then visit http://localhost:8000
```

## Multi-Language Support

The website supports three languages:
- **Estonian (ET)** - Default language
- **Russian (RU)**
- **English (EN)**

Language is auto-detected from browser settings, and users can switch languages using the language switcher in the navigation.

**Note:** The language switcher will work perfectly on GitHub Pages. The CORS error only occurs when opening files directly from the file system - use a local server for testing.

## Customization

- Update colors in `css/style.css` (CSS variables in `:root`)
- Modify content in HTML files
- Add images to `assets/images/`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

