-- ==========================================================
-- Vignan's Lara Institute of Technology & Science (Autonomous)
-- Examination Branch & Seating Arrangement System - Database Schema
-- Compatible with MySQL 5.7+ / MariaDB 10.2+
-- Notice Reference: VLIT/ES/A/15/2026-27/11(E)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `exam_seating` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `exam_seating`;

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS `admin` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(150) DEFAULT 'Controller of Examinations',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin Account: username = admin, password = admin123
INSERT INTO `admin` (`username`, `password`, `name`) VALUES
('admin', '$2y$10$wE8FkSj3c3pYQ7aP7V7Cdu7Hw4bA6iL71YkLp2Jc7Q5s4L7e1G0u2', 'Controller of Examinations, VLIT')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Students Table (All 4 Years with Official VLIT Roll Numbers)
-- 4th Year: 23FE1A... / 24FE5A...
-- 3rd Year: 24FE1A... / 25FE5A...
-- 2nd Year: 25FE1A... / 26FE5A...
-- 1st Year: 26FE1A... / 27FE5A...
CREATE TABLE IF NOT EXISTS `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `roll_no` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    `enrolment_type` VARCHAR(50) DEFAULT 'Regular',
    INDEX `idx_year_branch` (`year`, `branch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Student Records matching Vignan's Lara Scheme
INSERT INTO `students` (`roll_no`, `name`, `branch`, `year`, `enrolment_type`) VALUES
-- 4th Year (IV B.Tech - 23FE1A regular & 24FE5A lateral)
('23FE1A0501', 'Aarav Reddy', 'CSE-A', '4', 'Regular'),
('23FE1A0502', 'Vivaan Chowdary', 'CSE-A', '4', 'Regular'),
('23FE1A0401', 'Aditya Sharma', 'ECE-A', '4', 'Regular'),
('23FE1A0402', 'Vihaan Verma', 'ECE-A', '4', 'Regular'),
('23FE1A0102', 'Arjun Patel', 'CIVIL-A', '4', 'Regular'),
('23FE1A0202', 'Sai Rao', 'EEE-A', '4', 'Regular'),
('23FE1A0303', 'Reyansh Kumar', 'ME-A', '4', 'Regular'),
('23FE1A1201', 'Ayaan Singh', 'IT-A', '4', 'Regular'),
('23FE1A4201', 'Krishna Nair', 'CSM-A', '4', 'Regular'),
('23FE1A4301', 'Ishaan Mishra', 'CAI-A', '4', 'Regular'),
('23FE1A4401', 'Diya Gupta', 'CSD-A', '4', 'Regular'),
('23FE1A6101', 'Saanvi Katta', 'AIML-A', '4', 'Regular'),
('24FE5A0501', 'Ananya Golla', 'CSE-A', '4', 'Lateral Entry'),
('24FE5A0101', 'Aadhya Yadav', 'CIVIL-A', '4', 'Lateral Entry'),

-- 3rd Year (III B.Tech - 24FE1A regular & 25FE5A lateral)
('24FE1A0501', 'Pari Kollipara', 'CSE-A', '3', 'Regular'),
('24FE1A0502', 'Isha Babu', 'CSE-A', '3', 'Regular'),
('24FE1A0401', 'Myra Naidu', 'ECE-A', '3', 'Regular'),
('24FE1A1201', 'Navya Setti', 'IT-A', '3', 'Regular'),
('24FE1A0202', 'Riya Gudipati', 'EEE-A', '3', 'Regular'),

-- 2nd Year (II B.Tech - 25FE1A regular & 26FE5A lateral)
('25FE1A0501', 'Kavya Mandava', 'CSE-A', '2', 'Regular'),
('25FE1A0502', 'Bhavya Reddy', 'CSE-A', '2', 'Regular'),
('25FE1A0401', 'Karthik Chowdary', 'ECE-A', '2', 'Regular'),
('25FE1A0303', 'Pranav Sharma', 'ME-A', '2', 'Regular'),

-- 1st Year (I B.Tech - 26FE1A regular)
('26FE1A0501', 'Varun Verma', 'CSE-A', '1', 'Regular'),
('26FE1A0502', 'Teja Patel', 'CSE-A', '1', 'Regular'),
('26FE1A0401', 'Harsha Rao', 'ECE-A', '1', 'Regular'),
('26FE1A0102', 'Nikhil Kumar', 'CIVIL-A', '1', 'Regular')
ON DUPLICATE KEY UPDATE `roll_no`=`roll_no`;

-- 3. Exams Table (Official Schedule 2026-09-29 from PDF)
CREATE TABLE IF NOT EXISTS `exams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year` VARCHAR(20) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `subject_code` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(150) NOT NULL,
    `exam_date` DATE NOT NULL,
    `session` VARCHAR(100) DEFAULT 'Afternoon (01:15 PM - 02:15 PM)',
    INDEX `idx_year_date` (`year`, `exam_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `exams` (`year`, `branch`, `subject_code`, `subject`, `exam_date`, `session`) VALUES
('4', 'CSE-A', 'CS4101', 'Deep Learning & Neural Architectures', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'ECE-A', 'EC4101', 'Optical Communications & Microwave Engg', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'CIVIL-A', 'CE4101', 'Advanced Structural Engineering', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'EEE-A', 'EE4101', 'Power System Operation & Control', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'ME-A', 'ME4101', 'Automation & Robotics Technology', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'IT-A', 'IT4101', 'Cloud Computing & Virtualization', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('4', 'CSM-A', 'AM4101', 'Natural Language Processing', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('3', 'CSE-A', 'CS3101', 'Compiler Design & Automata', '2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]'),
('2', 'CSE-A', 'CS2101', 'Data Structures & Algorithms', '2026-10-15', 'Morning (09:30 AM - 12:30 PM) [3 Hours]'),
('1', 'CSE-A', 'BS1101', 'Linear Algebra & Calculus', '2026-10-15', 'Morning (09:30 AM - 12:30 PM) [3 Hours]');

-- 4. Rooms Table (Official Lara Examination Halls: LTF-3 to LLF-14)
CREATE TABLE IF NOT EXISTS `rooms` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `room_no` VARCHAR(50) NOT NULL,
    `block` VARCHAR(100) DEFAULT 'Lara Block',
    `capacity` INT NOT NULL,
    `benches` INT DEFAULT 35
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `rooms` (`room_no`, `block`, `capacity`, `benches`) VALUES
('LTF-3', 'Lara Third Floor', 70, 35),
('LTF-4', 'Lara Third Floor', 70, 35),
('LTF-7', 'Lara Third Floor', 70, 35),
('LTF-8', 'Lara Third Floor', 70, 35),
('LTF-10', 'Lara Third Floor', 70, 35),
('LTF-12', 'Lara Third Floor', 70, 35),
('LLF-2', 'Lara Lower Floor', 70, 35),
('LLF-3', 'Lara Lower Floor', 70, 35),
('LLF-4', 'Lara Lower Floor', 70, 35),
('LLF-7', 'Lara Lower Floor', 70, 35),
('LLF-8', 'Lara Lower Floor', 70, 35),
('LLF-9', 'Lara Lower Floor', 70, 35),
('LLF-10', 'Lara Lower Floor', 70, 35),
('LLF-12', 'Lara Lower Floor', 70, 35),
('LLF-13', 'Lara Lower Floor', 70, 35),
('LLF-14', 'Lara Lower Floor', 70, 35);
