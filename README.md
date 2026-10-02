# Exam Seating Arrangement System

A modern web-based application built to automate and optimize the process of assigning examination seats to students across halls and classrooms.

---

## Multiple Ways to Run (No XAMPP Required!)

You can run this project **immediately** without installing XAMPP, Apache, or MySQL:

### 1. In VS Code with "Live Server" (Zero Installation)
1. Open this folder in VS Code:
   ```bash
   code "C:\Users\manoj\Desktop\seating\Exam-Seating-Arrangement"
   ```
2. Right-click [index.html](file:///C:/Users/manoj/Desktop/seating/Exam-Seating-Arrangement/index.html) and select **Open with Live Server**.
3. That's it! The application opens directly in your browser.

---

### 2. Double-Click Launcher (`start.bat`)
Just double-click **`start.bat`** in the folder. It will start a local server using your installed Node.js or Python and immediately open your browser to `http://localhost:3000` (or `8000`).

---

### 3. Run with Node.js
If you have Node.js installed:
```bash
node server.js
```
The server starts at `http://localhost:3000` and automatically opens in your default browser. (No `npm install` needed).

---

### 4. Run with Python
If you have Python installed:
```bash
python server.py
```
The server starts at `http://localhost:8000` and automatically opens in your browser.

---

### 5. Classic PHP / MySQL Stack (Optional - for XAMPP / Production)
If you prefer running the PHP/MySQL backend:
1. Start Apache & MySQL in **XAMPP**.
2. Run the one-click installer in your browser:
   ```
   http://localhost/Exam-Seating-Arrangement/setup.php
   ```
3. Click **Initialize Database Now** to automatically create the database and seed tables.
4. Access the PHP app at `http://localhost/Exam-Seating-Arrangement/index.php`.

---

## Features

- **Dynamic Seat Allocation** — Automatically balances students from different branches across rooms so adjacent seats do not take the same subject.
- **Works 100% In-Browser** — Client-side storage and algorithms allow immediate execution with zero database dependencies.
- **Local & Production Ready** — Environment variable support (`.env`) for production hosting, with sensible local fallbacks.
- **Printable Seating Plan** — Dedicated print stylesheet generating clean, print-friendly reports for exam halls.
- **SQL Injection & XSS Protection** — Parameterized prepared statements across all database endpoints.
- **Session Authentication** — Protected admin dashboard and seating generation workflows.

---

## Default Admin Credentials

| Parameter | Default Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |

---

## Project Structure

```
Exam-Seating-Arrangement/
│
├── index.html            # Standalone browser entry point (No XAMPP required)
├── exam_seating.html     # Client-side admin login
├── admin.html            # Client-side admin seating dashboard
├── generate_seating.html # Client-side seating plan & print view
├── app.js                # Core browser application & seating algorithm
├── server.js             # Zero-dependency Node.js local runner
├── server.py             # Zero-dependency Python local runner
├── start.bat             # One-click Windows desktop launcher
│
├── index.php             # PHP welcome page
├── exam_seating.php      # PHP admin login
├── admin.php             # PHP admin dashboard
├── generate_seating.php  # PHP seating generation
├── get_exam_dates.php    # PHP AJAX date selector
├── db.php                # Modular database connector
├── config.php            # Environment configuration (.env support)
├── setup.php             # Automated one-click database installer
├── database.sql          # Complete MySQL schema & seed data
├── logout.php            # Session termination
├── style.css             # Unified responsive stylesheet with print rules
└── screenshots/          # Application preview images
```

---

## Screenshots

### Welcome Screen
![Index Screenshot](./screenshots/index.png)

### Admin Login
![Admin Login Screenshot](./screenshots/admin_login.png)

### Seating Generation
![Generated Seating](./screenshots/generate_seating.png)

### Printable Seating Layout
![Print Generated Seating](./screenshots/print_generate_seating.png)
