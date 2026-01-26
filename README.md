# 📼 VHS_CLUB - Retro Video Store

**VHS_CLUB** to stylizowany na lata 80. i estetykę Cyberpunk sklep internetowy (wypożyczalnia) z kultowymi filmami na kasetach VHS. Projekt łączy nowoczesne technologie webowe z nostalgicznym designem (efekty CRT, glitch, szum, surowy interfejs).

---

## 🌐 Demo i Prezentacja

Tu możesz zobaczyć nasz projekt w akcji:

- **🎬 Wideo prezentacja (YouTube):** [https://youtu.be/1mZ5WS7HbkA]
- **🌍 Strona online :** [https://lago0na.github.io/WDAI-Projekt/]

---

## 👥 Autorzy (Grupa Projektowa)

* **Katarzyna Piskorz**
* **Jagoda Pietras** 

---

## 🛠️ Technologie i Biblioteki

Projekt został zrealizowany przy użyciu:

* **Frontend:**
    * [React](https://react.dev/) (Vite) - Główny framework.
    * [React Router DOM](https://reactrouter.com/) - Obsługa routingu (podstron).
    * [Tailwind CSS](https://tailwindcss.com/) - Stylowanie i responsywność.
    * **CSS Modules** - Dedykowane style dla komponentów.
* **Backend (Mock):**
    * [JSON Server](https://github.com/typicode/json-server) - Symulacja REST API.
    * [JSON Server Auth](https://github.com/jeremyben/json-server-auth) - Obsługa rejestracji, logowania i tokenów JWT.
* **Design & Assets:**
    * Google Fonts (Anton, Inter).
    * Custom SVG Cursors & Icons.
    * CSS Animations (Glitch, CRT Noise, Scanlines).

---

## 🚀 Instalacja i Uruchomienie (Lokalnie)

Aby uruchomić projekt na własnym komputerze, wykonaj następujące kroki:

### 1. Klonowanie repozytorium
```bash
git clone [https://github.com/lago0na/WDAI-Projekt]
cd vhs_club
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Uruchomienie Backend (Baza Danych)

Otwórz osobny terminal i uruchom serwer JSON (musi działać w tle, aby logowanie i produkty działały):

```bash
npm run sever
```
### 4. Uruchomienie Frontend (Aplikacja)

W drugim terminalu uruchom aplikację React:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:5173 (lub innym wskazanym przez Vite).

## 🔑 Konta Testowe
Dla ułatwienia testowania przygotowaliśmy gotowe konta z różnymi uprawnieniami:

Rola	Email	Hasło	Uprawnienia
ADMIN	admin@vhs.club	admin123	Panel Admina, Dodawanie/Usuwanie filmów, Usuwanie opinii
USER	kokos@gmail.com	kokos	Przeglądanie, Zakupy, Dodawanie opinii

## 🌟 Funkcjonalności
### 1. Strona Główna i Nawigacja
Unikalny Hero Section z efektem Glitch.

Responsywny Navbar (ukrywający się podczas scrollowania) z dynamicznym powitaniem.

Globalne efekty wizualne: Customowy Kursor (Kamera VHS).

### 2. Sklep (Shop) & Produkty
Pobieranie listy filmów z API.

Dynamicznie generowana siatka produktów ("TV Wall").

Szczegóły produktu (/movie/:id) z opisem, ceną, reżyserem i stanem magazynowym.

### 3. System Opinii (Reviews)
Użytkownicy mogą dodawać opinie (ocena gwiazdkowa + komentarz).

Opinie stylizowane na "ekrany telewizorów".

Admin Mode: Administrator widzi przycisk [X] przy każdej opinii i może ją trwale usunąć.

### 4. Autoryzacja i Bezpieczeństwo
Rejestracja: Tworzenie nowych kont (hasła są bezpiecznie hashowane).

Logowanie: Autoryzacja za pomocą tokena JWT.

Ochrona tras: Panel Admina jest niedostępny dla zwykłych użytkowników.

Persystencja sesji: Użytkownik pozostaje zalogowany po odświeżeniu strony.

### 5. Panel Administratora (CMS)
Dostępny tylko dla roli admin pod ścieżką /admin:

Widok tabelaryczny wszystkich filmów.

Dodawanie nowych filmów do sklepu.

Edycja istniejących filmów (ceny, stany magazynowe).

Usuwanie filmów z oferty.

### 📂 Struktura Projektu
```angular2html
vhs_club/
├── public/              # Zasoby statyczne (zdjęcia filmów)
├── src/
│   ├── components/      # Komponenty wielokrotnego użytku (Navbar, GlitchLogo)
│   ├── context/         # AuthContext (Zarządzanie stanem logowania)
│   ├── pages/           # Główne widoki (Home, Shop, Reviews, AdminPanel, Login)
│   │   └── css/         # Modularne style CSS dla podstron
│   ├── App.jsx          # Routing aplikacji
│   └── main.jsx         # Punkt wejścia
├── db.json              # Baza danych (Filmy, Użytkownicy, Opinie)
└── README.md            # Dokumentacja
```

Projekt wykonany w ramach zaliczenia przedmiotu Wstęp Do Aplikacji Internetowych. © 2025 VHS_CLUB Team.