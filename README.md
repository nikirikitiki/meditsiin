# MEDITSIIN4.0

## Repository Index

This repository contains the public-facing website for the MEDITSIIN4.0 project and related helper scripts.  
Only files that are **not** listed in `.gitignore` (for example, `documents/` is ignored) are described here.

### Tracked Structure

```text
meditsiin4.0/
├── README.md          # This file – main index
├── .gitignore         # Ignore rules (e.g. documents/, Cursor files)
├── docs/              # Website files (HTML/CSS/JS) and assets
│   ├── index.html     # Homepage
│   ├── about.html     # About page
│   ├── offerings.html # Offerings page
│   ├── overview.html  # Service overview / one‑pager content
│   ├── settings.html  # Visual/settings playground for the site
│   ├── presentation.html # Slide-style presentation version
│   ├── css/           # Stylesheets for the site and presentation
│   ├── js/            # JavaScript (navigation, animations, i18n, settings)
│   ├── lang/          # Translation JSON files (et/ru/en)
│   ├── assets/        # Images and fonts used on the site
│   ├── server.py      # Simple local HTTP server for development
│   └── README.md      # Website-specific documentation
└── scripts/
    └── extract_companies.py # Helper script for data extraction
```

### Website

- **Site root:** `docs/` (can be used directly for GitHub Pages or any static host)
- **Website README:** `docs/README.md` – setup and deployment details
- **Local Development:** See [Running the Website Locally](#running-the-website-locally)

---

## Quick Start

### Reading the Documentation

Begin by reading the high-level documents to understand the project's direction:
1. Start with [Core](./docs/core.md) to understand the project foundation, problem statement, and business model
2. Review [One-Pager](./docs/one-pager.md) for a condensed overview of the service
3. Review [Pricing Model](./docs/pricing-model.md) to understand the subscription pricing structure
4. Explore [Revenue Strategy](./docs/revenue-strategy.md) for business model details
5. Check [Research](./docs/research/) for customer and market analysis

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
- Staff shortages among doctors and nurses
- Ageing hardware and outdated software
- Fragmented tools for communication, scheduling, and documentation
- No dedicated IT or operational support
- Limited visibility into workload, staff wellbeing, or patient satisfaction
- No time to manage multiple vendors
- Lack of internal IT expertise
- Capacity to design secure, compliant remote setups

**Our Solution:** We provide an integrated suite of services including:
- Hardware (optional) - Monthly hardware bundle, centrally managed
- IT & System Administration - One accountable owner for day-to-day reliability
- Secure Remote Access - VPN-based access with role-based permissions
- Communication - Unified setup for chat, calls, and email
- Office & Document Tools - Standard office software with centralized storage
- Workforce & Shift Management - Support hybrid staffing models
- Consulting on Personnel Management - Ways of working and collaboration
- Workload & Satisfaction Monitoring (Future) - Signals for staffing decisions

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

