# 📼 VHS_CLUB | Retro Video Store & Rental Platform

A frontend web application for an independent retro cinema and VHS rental club. Designed with a striking nostalgic aesthetic, featuring CRT scanlines, glitch animations, and interactive retro UI elements.

## 🎨 Design Philosophy
This project heavily utilizes the **Retro / 80s / Cyberpunk** aesthetic:
* Bold, non-standard typography (Anton & monospace fonts).
* Immersive CRT screen effects, scanlines, and static noise overlays.
* High-contrast neon borders and dark, atmospheric backgrounds.
* Custom SVG cursors (VHS Camera viewfinder) and hover animations.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Modern CSS (Tailwind & CSS Modules)
* **Backend & Auth:** `json-server` & `json-server-auth` (Mock REST API)
* **Security:** JWT (JSON Web Tokens)
* **Database:** `db.json` (Mock JSON Database)

## ✨ Key Features
* **Secure Authentication:** JWT-based login and registration system.
* **Role-Based Access Control (RBAC):** * *Guests:* View catalog, redirected to "Enter the Club" (login) for actions.
    * *Members (Users):* Browse detailed movie pages, add personal reviews.
    * *Admins:* Full moderation capabilities (delete any review) and access to a dedicated Admin Panel (CRUD for movies).
* **Interactive Catalog:** Dynamic "TV Wall" grid display and routing to detailed movie pages.
* **Review System:** Users can leave reviews (star rating + text) styled as retro TV screens.
* **Cart System:** Real-time price calculation and VHS tape management (WIP).
