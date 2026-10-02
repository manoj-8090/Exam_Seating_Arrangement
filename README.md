# College Examination Seating Arrangement & Timetable System

A comprehensive web-based application built to automate and optimize the process of assigning examination seats across halls and classrooms for **all academic years (1st, 2nd, 3rd, and 4th Year)** and multiple branches (CSE, ECE, MECH, IT).

---

## Portals & Core Features

### 1. Student Portal (`student.html`)
- **Roll Number Search**: Students enter their roll number (e.g., `24CS01`, `23CS05`, `22EC02`, `21ME03`) to find their exam allotment.
- **Instant Hall Ticket**: Displays Allocated Room Number, Building Block, Column / Side, Seat Number, Exam Date, and Timing.
- **Student Timetable**: Full view of scheduled examinations, subject codes, and timings.
- **Printable Pass**: One-click printing of student seating passes.

### 2. Examination Controller Dashboard (`admin.html`)
- **Multi-Year Seating Generator**:
  - Automatically alternates benches across years and branches so adjacent students never share an exam paper.
  - Generates room-wise roll ranges, counts, and individual seat allocations.
- **Classroom Management**:
  - Add, view, and delete exam halls and classrooms with capacities and bench counts.
- **Timetable Scheduling**:
  - Schedule exams by Date, Session (Morning/Afternoon), Year, Branch, Subject Code, and Subject Name.
- **Student Roster Management**:
  - Year-wise breakdown (1st to 4th Year) and search capabilities.
- **System Reset**:
  - Instant one-click restore of realistic college sample datasets (200+ students, 20 exams, 5 halls).

---

## Multiple Ways to Run (No XAMPP Required!)

### Option 1: Press `F5` in VS Code
Press **`F5`** in VS Code (or click **Run** &rarr; **Start Debugging**). The server starts and launches your browser automatically at `http://localhost:3000`.

### Option 2: Live Server in VS Code
Right-click **[index.html](file:///C:/Users/manoj/Desktop/seating/Exam-Seating-Arrangement/index.html)** in the VS Code file explorer and click **Open with Live Server**.

### Option 3: Double-Click Launcher (`start.bat`)
Double-click **`start.bat`** in the project folder to start the server and open your default browser.

### Option 4: Terminal Command
Run either:
```bash
node server.js
```
or
```bash
python server.py
```

---

## Default Admin Credentials

| Parameter | Default Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |

---

## Sample Roll Numbers to Test

| Year | Branch | Sample Roll Numbers |
|---|---|---|
| **1st Year** | CSE, ECE, MECH, IT | `24CS01`, `24CS05`, `24EC01`, `24ME01` |
| **2nd Year** | CSE, ECE, MECH, IT | `23CS01`, `23CS05`, `23EC02`, `23IT01` |
| **3rd Year** | CSE, ECE, MECH, IT | `22CS01`, `22CS03`, `22EC01`, `22ME02` |
| **4th Year** | CSE, ECE, MECH, IT | `21CS01`, `21CS03`, `21EC01`, `21EC02` |

---

## Project Structure

```
Exam-Seating-Arrangement/
│
├── index.html            # College Examination Portal Landing Page
├── student.html          # Student Seating Allotment & Hall Ticket Pass
├── exam_seating.html     # Admin Login Page
├── admin.html            # Examination Controller Dashboard
├── generate_seating.html # Official Invigilator & Door Notice Charts
├── app.js                # Multi-year seating allocation algorithm & database
├── server.js             # Zero-dependency Node.js local runner
├── server.py             # Zero-dependency Python local runner
├── start.bat             # One-click Windows desktop launcher
│
├── index.php             # PHP welcome page
├── exam_seating.php      # PHP admin login
├── admin.php             # PHP admin dashboard
├── generate_seating.php  # PHP seating generation
├── get_exam_dates.php    # PHP AJAX date selector
├── db.php                # Database connector with auto-setup detection
├── config.php            # Environment configuration
├── setup.php             # One-click database installer
├── database.sql          # Complete MySQL schema & 4-year sample dataset
├── logout.php            # Session termination
├── style.css             # Responsive styling & print rules
└── screenshots/          # Application preview images
```
