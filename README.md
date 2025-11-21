
# **Axiom Trade Replica**

A pixel-perfect, high-performance reconstruction of the **Axiom Trade** token discovery dashboard.

---
## **Live Demo**
🚀 **Deployed on Vercel:**  
🔗 https://axiom-trade-ten.vercel.app/

---

## **Features**
- **Real-time Updates** — WebSocket-based mock simulation for live price tickers  
- **Atomic Architecture** — Modular, reusable components  
- **High Performance** — Optimized rendering with `React.memo` + virtualization  
- **Responsive** — Fully adaptive layout down to **320px**

---
## **Screenshots**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2760a4b2-0f82-4aac-a7ea-bf11f8550002" />
<img width="642" height="1070" alt="axiom-trade-ten vercel app_" src="https://github.com/user-attachments/assets/ed63d1f4-c9dc-471b-958f-f86f27785b62" />


---

## **Tech Stack**
- **Framework:** Next.js 14 (App Router)  
- **Styling:** Tailwind CSS + Shadcn UI  
- **State:** Redux Toolkit + React Query  
- **Language:** TypeScript (Strict Mode)

---

## **Getting Started**

### **1. Install Dependencies**
```bash
npm install
````

### **2. Run the Development Server**

```bash
npm run dev
```

### **3. Open the App**

```
http://localhost:3000
```

---

## **Visual Regression & Snapshots**

Ensures UI consistency across screen sizes.

### **Desktop View (1920px)**

* Full-width data table
* All columns visible

### **Mobile View (375px / 320px)**

* Horizontally scrollable table
* No clipped data
* No layout breaks or forced zoom-out

---

## **Performance Score**

Lighthouse: **98+**

* Performance
* Accessibility
* Best Practices
* SEO

---

## **How to Verify 320px Responsiveness**

1. Run:

   ```bash
   npm run dev
   ```
2. Open **Chrome DevTools** (`F12`)
3. Click **Device Toggle**
4. Select **“Mobile S — 320px”** or manually type `320`
5. Verify:

   * You can **scroll horizontally**
   * Columns like **Age** and **Liquidity** remain accessible
   * No layout breaks

---

## **Project Structure (Overview)**

```
/
├── app/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── styles/
│   └── page.tsx
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

---

## **Scripts**

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm start`     | Runs the production build     |

---

## **Dependencies**

Key packages used:

* `next`
* `react`
* `@reduxjs/toolkit`
* `react-redux`
* `@tanstack/react-query`
* `tailwindcss`
* `shadcn/ui`

---

## **License**

This project is licensed under the **MIT License**.

---

