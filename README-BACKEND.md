# Cargology prototype + backend

This folder contains your existing React/Vite frontend and a new Express backend.

## Requirements (Windows)
- Node.js 20 LTS or newer (install from https://nodejs.org)
- A browser such as Chrome
- Internet only for installing npm packages the first time

## 1. Start the backend
1. Extract this project ZIP to a normal folder, for example `C:\\Cargology`.
2. Open that folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```powershell
   cd backend
   npm install
   copy .env.example .env
   ```
5. Open `backend/.env`. Change `JWT_SECRET` to a long random value of at least 24 characters. Save it.
6. Start the API:
   ```powershell
   npm run dev
   ```
7. Visit `http://localhost:5000/api/health`. You should see JSON with `"status":"ok"`.
Keep this terminal running.

## 2. Start the frontend
Open a **second** terminal in VS Code, from the project root (the folder containing the root `package.json`):
```powershell
npm install
npm run dev
```
Open the local URL Vite prints, normally `http://localhost:5173`.

## Important: current frontend vs backend
The supplied frontend is a **UI prototype**. Several screens explicitly use sample data and local-only demo actions. The backend API is implemented and runs separately, but the current screens have **not yet been fully wired** to call it; opening the frontend will therefore still show its demo content. `src/lib/api.js` is a small API client helper for connecting screens. Do not treat sample figures, sample transporters, verification badges, ETAs, or tracking progress as real data.

## API overview
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/health` | API health check | No |
| POST | `/auth/register` | Create shipper/transporter account | No |
| POST | `/auth/login` | Sign in and receive JWT | No |
| GET | `/auth/me` | Current account | Bearer token |
| PATCH | `/profile` | Update name/company/phone/region | Bearer token |
| GET | `/dashboard` | Counts and current user's shipments | Bearer token |
| GET | `/loads` | Search/list loads | No |
| POST | `/loads` | Post a load | Shipper |
| GET | `/loads/:id` | Load detail | No |
| PATCH | `/loads/:id` | Update own load | Owner |
| DELETE | `/loads/:id` | Delete own load if no quotes | Owner |
| GET | `/vehicles` | List/search vehicles | No |
| POST | `/vehicles` | Add vehicle | Transporter |
| GET | `/quotes?loadId=CG-0001` | Review quotes visible to current user | Bearer token |
| POST | `/loads/:id/quotes` | Submit a freight quote | Transporter |
| PATCH | `/quotes/:id` | Accept/reject a quote | Load owner |
| GET | `/shipments` | Current user's shipments | Bearer token |
| GET | `/shipments/:id` | Shipment details | Bearer token |
| PATCH | `/shipments/:id/status` | Update milestone/status | Shipment participant |
| GET | `/notifications` | Notifications list | Bearer token |

## Quick API test (PowerShell)
Register a shipper (use your own email):
```powershell
$body = @{name="Demo Shipper"; email="shipper@example.com"; password="ChangeMe123!"; role="shipper"; company="Demo Company"} | ConvertTo-Json
$auth = Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/auth/register -ContentType "application/json" -Body $body
$token = $auth.token
Invoke-RestMethod -Uri http://localhost:5000/api/auth/me -Headers @{Authorization="Bearer $token"}
```
To create a load:
```powershell
$load = @{cargo="Packaged food"; from="Muzaffarpur, Bihar"; to="Patna, Bihar"; weight="8 tonnes"; vehicle="14 ft truck"; rate=12500; date="2026-11-01"} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/loads -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body $load
```

## Data storage and production cautions
- This starter backend persists data in `backend/data.json`; no database server is required for local testing.
- `data.json` is created automatically after first successful start. Keep a backup; do not edit while the server is running.
- For production, migrate to MongoDB Atlas or PostgreSQL, add email verification/password reset, document upload security, audit logs, robust validation, admin moderation, backups, payment-provider integration and privacy/legal review.
- Payments, real GPS, Google Maps routing, SMS/email alerts, document verification, insurance and payouts are **not connected**. The API tracks shipment status updates submitted by an authorized participant; it does not locate trucks live.
- Never use real customer documents or bank details in this prototype. Do not publish `.env` or JWT secrets.
