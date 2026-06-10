# PraNam Cafe — Heritage QSR Customer Web Portal

Welcome to the **PraNam Cafe** web application! Built for customers to explore, customize, and order authentic regional street foods and delicacies of Uttar Pradesh (Varanasi, Prayagraj, Agra, Mathura, Muradabad, and Lucknow) in North India's first 100% vegan-forward QSR concept.

---

## 🏗️ How the Application Works

PraNam Cafe is designed as a high-fidelity, contactless dining application:
1. **Seat & Scan**: A customer scans a QR code at their table, which points to the portal (e.g. `http://localhost:3000/?table=4`). The table number is automatically synchronized in the app via URL parameters.
2. **Explore Regional Corridors**: The customer filters menu items by city (e.g., Kashi, Sangam, Taj Ganj, Brij) or category (Chaat, Mains, Sweets, Drinks).
3. **Plant-Based Toggle**: Every heritage item has an exact plant-based variant (substituting dairy/ghee with almond curd, organic tofu, soy rabri, etc.). Customers can toggle items individually or activate the global switch to convert the entire menu to vegan.
4. **Interactive AI Culinary Host ("Saras")**: Saras is a custom Gemini-powered culinary guide that shares historical narratives, brand philosophy, and details on how dishes are prepared.
5. **Contactless Ordering & Receipt**: Selecting items opens the drawer basket. Proceeding to checkout triggers a payment simulation modal (UPI QR scan or bank card inputs) and submits the order to the kitchen line queue.
6. **Live Preparation Tracker**: After checkout, a status panel maps out order fulfillment phases (Spices Assembly ➔ Wood Fire Dum ➔ Plating ➔ Served at Table) using simulated kitchen ticks.

---

## 🔌 Where is the Backend?

The backend is fully self-contained in the project root file **[server.ts](file:///c:/Users/hp/antigravity/PraNam-Cafe/server.ts)**. It is implemented in Node.js using **Express.js** and **Vite**:

- **Development Middleware Mode**: In local development, Express uses Vite's programmatic middleware mode to hot-reload and serve the React single-page application (SPA) front-end seamlessly.
- **Production Static Serving**: In production, it serving static compiled files in the `dist` directory.
- **REST Endpoints**:
  - `GET /api/menu`: Pulls the regional delicacies list from `src/data/menu.ts`.
  - `POST /api/chat`: Communicates with Google's **Gemini API** (`gemini-3.5-flash` model via the `@google/genai` SDK) to run the *Saras Culinary Host*. It injects structured system instructions including brand tone, guidelines, and raw menu JSON data to power storytelling chat.
  - `POST /api/order/create`: Receives table details and customized food counts to simulate prep timings.

---

## 🛠️ Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Key
The server reads the `GEMINI_API_KEY` to authenticate with Gemini models. Make sure you create a `.env` file in the root folder:
```env
GEMINI_API_KEY=your-actual-api-key-here
```
*(A default key is already pre-configured in the repository `.env` file)*.

### 3. Launch Development Server
Launch the Express.js server along with the Vite HMR middleware:
```bash
npm run dev
```
Once run, navigate to **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📂 Project Architecture

```
PraNam-Cafe/
├── assets/                  # Media and design files
├── src/
│   ├── components/
│   │   ├── CitySelector.tsx # Corridor horizontal pill sliders
│   │   ├── MenuCard.tsx     # Double-Bezel cards, steam animations, CTAs
│   │   ├── CartSidebar.tsx  # Drawer basket and table assignments
│   │   ├── CulinaryChatbot.tsx # Floating chatbot UI panel for Saras
│   │   ├── PaymentModal.tsx # Contactless scan and bank card mock fields
│   │   └── OrderStatusPanel.tsx # Kitchen cooking stage timer tracker
│   ├── data/
│   │   └── menu.ts          # Authentic dish dataset and Unsplash image maps
│   ├── App.tsx              # Main state sync and global shell layout
│   ├── index.css            # Custom Google fonts and overlay textures
│   └── types.ts             # TypeScript interface definitions
├── server.ts                # Express backend & Gemini integration server
├── package.json             # Build and dependency configuration
└── tsconfig.json            # TypeScript setup
```