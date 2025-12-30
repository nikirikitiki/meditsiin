# MEDITSIIN4.0

## Document Index

This repository contains all documentation for the MEDITSIIN4.0 project. Use this README as a navigation hub to access all project documents.

### High-Level Documents

- **[Vision](./docs/vision.md)** - The long-term vision and aspirations for MEDITSIIN4.0
- **[Mission](./docs/mission.md)** - The core mission and purpose of the project
- **[Goals](./docs/goals.md)** - Strategic goals and objectives
- **[Offerings](./docs/offerings.md)** - Detailed product and service offerings
- **[Pricing Model](./docs/pricing-model.md)** - Subscription-based pricing model (per workplace)

### Documentation Structure

```
meditsiin4.0/
├── README.md          # This file - main index
├── docs/              # Documentation files
│   ├── vision.md     # Project vision
│   ├── mission.md     # Project mission
│   ├── goals.md       # Project goals
│   ├── offerings.md   # Product and service offerings
│   └── pricing-model.md # Pricing model documentation
└── website/           # Website files (HTML/CSS/JS)
    ├── index.html     # Homepage
    ├── about.html     # About page
    ├── offerings.html # Offerings page
    ├── sales.html     # Sales pitch page
    ├── settings.html  # Settings page
    ├── css/           # Stylesheets
    ├── js/            # JavaScript
    ├── lang/          # Translation files
    └── assets/        # Images and fonts
```

### Website

- **[Website README](./website/README.md)** - Website setup and deployment instructions
- **Local Development:** See [Running the Website Locally](#running-the-website-locally) section above
- **Deployment:** Ready for GitHub Pages deployment (see website README for details)

---

## Quick Start

### Reading the Documentation

Begin by reading the high-level documents to understand the project's direction:
1. Start with [Vision](./docs/vision.md) to understand the long-term aspirations
2. Review [Mission](./docs/mission.md) to understand the core purpose
3. Explore [Goals](./docs/goals.md) to see the strategic objectives
4. Review [Offerings](./docs/offerings.md) to understand our products and services
5. Review [Pricing Model](./docs/pricing-model.md) to understand the subscription pricing structure

### Running the Website Locally

To view and test the website locally, you need to run a local HTTP server. Opening HTML files directly in a browser (`file://`) will cause CORS errors because the language translation files need to be loaded via HTTP.

**Recommended: Using the provided Python server script**

```bash
cd website
python3 server.py
```

The server will start on `http://localhost:8000`. Open your browser and navigate to that URL.

**Alternative: Python's built-in HTTP server**

```bash
cd website
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

**Alternative: Node.js http-server**

```bash
cd website
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

**Note:** Press `Ctrl+C` to stop the server when you're done.

For more details, see the [Website README](./website/README.md).

---

## Project Overview

MEDITSIIN4.0 is a comprehensive digitalization platform designed to support GP centers (Family Centers) in Estonia as they transition to modern, remote-work-capable operations. 

**The Challenge:** GP centers in Estonia face significant digitalization challenges:
- Outdated computer infrastructure
- Fragmented software solutions for critical functions like shift planning and vacation management
- Inability to envision or implement remote workforce solutions
- Inefficient workforce planning without proper tools to manage nurse-to-doctor ratios and team composition
- Lack of dedicated system administrators

**Our Solution:** We provide an integrated suite of services including:
- Hardware rental (laptops, headphones)
- System administration services and IT infrastructure support
- Medical software update management
- Communication tools (chat, calls, email)
- Office suite solutions
- Workforce organization tools (shift planning, vacation/sick-leave management, advanced workforce planning)
- Organizational structure & design services
- Satisfaction tracking & workload monitoring

**Key Benefits:** Modernization makes GP centers more attractive to young professionals, who are drawn to modern, digitalized work environments with flexible work options.

**Target Market:** GP centers (Family Centers) in Estonia, typically with less than 50 employees

**Pricing Model:** Subscription-based per workplace with flexible configuration (workplaces with computers or software-only access). See [Pricing Model](./docs/pricing-model.md) for details.

**Timeline:** Offering ready by Spring 2026, with direct sales to customers beginning then.

**Long-term Vision:** Expand to include analytics, proprietary hardware solutions, a flexible staffing pool of medical professionals, and geographic expansion to Finland.

---

## Contributing

*Contributing guidelines will be added here.*

---

## License

*License information will be added here.*

