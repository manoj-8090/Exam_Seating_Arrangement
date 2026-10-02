# Exam Seating Arrangement System

A robust, web-based application built to automate and optimize the process of assigning examination seats to students across halls and classrooms.

This application is designed to work seamlessly in both **local development environments (XAMPP / VS Code)** and **production hosting (Cloud, VPS, Docker, Shared Hosting)**.

---

## Features

- **Dynamic Seat Allocation** — Automatically balances students from different branches across examination rooms so that adjacent seats do not take the same subject.
- **Local & Production Ready** — Environment variable support (`.env` or system environment variables) with sensible local fallbacks.
- **One-Click Database Setup** — Built-in `setup.php` web installer automatically creates the database and populates schema and sample seed records.
- **SQL Injection & XSS Protection** — Prepared SQL statements and sanitization across all database endpoints.
- **Session Authentication** — Protected admin dashboard and generation workflows with secure session management.
- **Printable Seating Plan** — Dedicated print stylesheet generating clean, print-friendly reports for exam halls.
- **Responsive Interface** — Clean front-end interface built with HTML5, CSS3, and JavaScript.

---

## Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (Flexbox/Grid), JavaScript (AJAX) |
| **Backend** | PHP 7.4+ / PHP 8.x |
| **Database** | MySQL 5.7+ / MariaDB 10.2+ |
| **Environment** | XAMPP, Apache, Nginx, or PHP Built-in Server |
| **Version Control** | Git & GitHub |

---

## Installation & Setup

### Option 1: Running with XAMPP (Local)

1. **Clone the repository into your web root (`htdocs`)**:
   ```bash
   git clone https://github.com/manoj-8090/Exam_Seating_Arrangement.git C:/xampp/htdocs/Exam-Seating-Arrangement
   ```
2. **Start Apache and MySQL** from the XAMPP Control Panel.
3. **Run the One-Click Installer**:
   - Open your browser to: `http://localhost/Exam-Seating-Arrangement/setup.php`
   - Click **Initialize Database Now**. This creates the `exam_seating` database and populates sample data.
4. **Log in**:
   - Navigate to `http://localhost/Exam-Seating-Arrangement/` or click **Proceed to Login**.

---

### Option 2: Running directly with VS Code / PHP Built-in Server

1. **Open the project folder in VS Code**:
   ```bash
   code "C:\Users\manoj\Desktop\seating\Exam-Seating-Arrangement"
   ```
2. **Ensure MySQL is running** (e.g. from XAMPP, MySQL Service, or Docker).
3. **Start the PHP development server**:
   ```bash
   php -S localhost:8000
   ```
4. **Initialize database & launch**:
   - Open `http://localhost:8000/setup.php` to initialize the database.
   - Access the application at `http://localhost:8000/`.

---

### Option 3: Production Deployment (Docker / Cloud / Shared Hosting)

1. Configure environment variables in your hosting provider's dashboard or copy `.env.example` to `.env`:
   ```ini
   DB_HOST=your-db-hostname
   DB_PORT=3306
   DB_USER=your-db-user
   DB_PASS=your-db-password
   DB_NAME=your-db-name
   ```
2. Import `database.sql` into your production MySQL database or run `/setup.php`.
3. Point your web server's document root to the project directory.

---

## Default Admin Credentials

| Parameter | Default Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |

---

## Database Architecture

- `admin`: Stores coordinator login credentials (hashed passwords supported).
- `students`: Records roll numbers, branches, and academic years.
- `exams`: Stores branch-wise examination schedules and dates.
- `rooms`: Defines exam halls, their capacities, and year assignments.
- `seating`: Output table containing the generated seat allotments, room numbers, and column sides.

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
