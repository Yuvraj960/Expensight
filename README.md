# 🧾 Expensight

**Expensight** is a fast, lightweight expense tracking web application built using **HTML, CSS, and JavaScript (ES6+)**.
It helps users **record, categorize, and analyze personal expenses** through a clean, responsive interface — all without requiring a backend server.

---

## 🚀 Features

* 💸 Add, edit, and delete expenses (date, amount, category, note)
* 🏷️ Manage categories (add / remove / rename)
* 🔍 Search and filter expenses by date or category
* 📊 Dashboard overview with total spending, top categories, and breakdowns
* 📱 Responsive UI for both desktop and mobile
* 🔐 Simple authentication for user sessions
* 💾 Persistent data storage using browser **localStorage**

---

## 🧰 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Storage:** Browser localStorage
* **Architecture:** Modular JS files for authentication, data handling, and UI logic

---

## 📁 Project Structure

```
expensight/
├── index.html          # Main HTML entry point  
├── styles.css          # Application styles (responsive design)  
├── app.js              # Main app initialization and logic  
├── auth.js             # Authentication and session handling  
├── expenses.js         # Expense CRUD and category logic  
├── storage.js          # LocalStorage handling  
├── ui.js               # UI rendering and event management  
└── README.md
```

---

## 🧩 Running the App

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expensight
   ```
2. **Run locally**
   Simply open `index.html` in your browser — no setup required.

## 🔗 Live Demo 

[Demo↗️](https://expensight.vercel.app/)

