# Meditsiin 4.0 Website

Simple HTML/CSS/JS website for Meditsiin 4.0, designed for GitHub Pages deployment.

## Structure

```
website/
├── index.html          # Homepage
├── about.html          # About/Mission/Vision page
├── offerings.html      # Services/Offerings page
├── contact.html        # Contact/Sales page
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

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then visit http://localhost:8000
```

## Customization

- Update colors in `css/style.css` (CSS variables in `:root`)
- Modify content in HTML files
- Add images to `assets/images/`
- Update contact form action in `contact.html` (currently shows success message)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

