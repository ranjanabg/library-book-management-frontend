# Library Book Management – Frontend

A web-based frontend application for the **Library Book Management System**, built using **React.js**.  
This application provides role-based interfaces for **Librarians** and **Readers**, enabling efficient book circulation, member management, rack verification, and intelligent book recommendations powered by RFID-based services.

🌐 **Base URL:**  
https://library-book-management.dustakar.com

---

## 🧩 Overview

The frontend acts as the user-facing layer of the Library Book Management platform and consumes REST APIs exposed by the backend service.

### Supported Roles
- **Librarian**
- **Reader**

Each role is presented with a dedicated dashboard and a tailored set of features.

---

## ✨ Key Features

### 🔐 Authentication & Role Selection
- Login page with role selection (Librarian / Reader)
- Dynamically loads features based on selected role

---

### 📚 Librarian Features
- **Books Management**
  - Add, view, update, delete books
  - Checkout, renew, and return books
  - View recommended books
- **Members Management**
  - Add, update, view, and delete members
- **Rack Management (RFID-powered)**
  - Verify all racks for misplaced books
  - Verify a specific rack
  - Verify correct rack placement for a book
- **Notifications**
  - Alerts for misplaced books detected via RFID scans

---

### 👤 Reader Features
- **Books**
  - View all books or search by title / ID
  - Checkout, renew, and return books using a unique PIN
  - RFID-based book return
- **Smart Recommendations**
  - Personalized book recommendations using TOPSIS & CRITIC methods
  - Priority ranking for user-selected books
- **Profile**
  - View personal details
  - Track issued books, limits, and overdue fees
  - Clear dues and cancel membership

---

## 🖥️ Tech Stack

- **Frontend Framework:** React.js
- **State Management:** React Hooks
- **HTTP Client:** Fetch API / Axios
- **Styling:** CSS
- **Build Tooling:** Create React App
- **API Integration:** RESTful services

---

## 🔗 Backend Integration

This frontend communicates with the backend service hosted at:

```
https://library-book-management-api.dustakar.com
```

Ensure the backend is accessible before running frontend features that depend on live data.

---

## 📁 Project Structure (High-Level)

```
src/
├── components/        # Reusable UI components
├── pages/             # Role-based views (Librarian / Reader)
├── services/          # API service calls
├── utils/             # Helper utilities
├── App.js             # Root component
└── index.js           # Entry point
```

---

## ▶️ Available Scripts

### `npm install`
Installs all project dependencies.

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the application for production into the `build/` directory.

---

## 📌 Notes

- This project was originally bootstrapped using Create React App, but has been customized to support a full-featured library management workflow.
- Role-based rendering ensures secure and intuitive navigation for both librarians and readers.
- Designed to work seamlessly with RFID-enabled backend services.

---

## 📣 Repository Context

This repository contains **only the frontend application**.  
For backend services, refer to the companion repository: [library-book-management-api](https://github.com/ranjanabg/library-book-management-api)

---

## 📜 License

[MIT License](https://choosealicense.com/licenses/mit/)