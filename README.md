# Cargology Hybrid Frontend

Responsive freight-tech frontend built with React, Vite, Tailwind CSS v4, React Router, and Lucide icons. The operations workspace uses a premium dark navy + orange theme; the load marketplace and truck directory use a clean light surface inside the dark app shell.

## Requirements
- Node.js 20+ recommended
- npm

## Install and run
1. Extract the ZIP.
2. Open the `cargology-hybrid` folder in VS Code.
3. Open Terminal in that folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL Vite prints, normally `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Routes
- `/` — landing page and platform overview
- `/dashboard` — dark freight command center
- `/loads` — light load marketplace with search, destination, vehicle filters, and rate sorting
- `/trucks` — light truck directory with search and verified-only filter
- `/negotiations` — quote comparison and demo quote selection
- `/post-load` — shipment form with browser-side validation
- `/tracking` — shipment status and progress view
- `/shipper` — shipper workspace
- `/transporter` — transporter hub with sortable opportunities
- `/profile` — company profile and simulated verification
- `/settings` — preferences page
- `/login` — demo login page

## Main source files
- `src/main.jsx` — React entry point and router provider
- `src/App.jsx` — page routes
- `src/components/Layout.jsx` — responsive navigation, dark app shell, and marketplace surface switch
- `src/components/ui.jsx` — reusable UI components
- `src/data.js` — sample freight data and exports, including `initialShipments` alias
- `src/pages/Marketplace.jsx` — redesigned light load marketplace and truck directory
- `src/pages/Operations.jsx` — dashboard, shipper, transporter, and post-load views
- `src/pages/Negotiations.jsx` — negotiation workflow demo
- `src/pages/Tracking.jsx` — tracking demo
- `src/pages/Account.jsx` — login, profile, and settings
- `src/index.css` — Tailwind import, global styles, and marketplace field styles

## Important notes
- The freight records, rates, transporter names, ratings, and shipment progress are illustrative demo data.
- Buttons that imply contacting a transporter, publishing a load, GPS tracking, or negotiation are frontend demos unless you connect an API/backend.
- No API key is required to run this frontend.
