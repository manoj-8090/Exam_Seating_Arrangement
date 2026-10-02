-- ==========================================================
-- College Examination Seating Arrangement System - Database Schema
-- Compatible with MySQL 5.7+ / MariaDB 10.2+
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `exam_seating` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `exam_seating`;

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS `admin` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(150) DEFAULT 'Chief Superintendent',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin Account: username = admin, password = admin123
INSERT INTO `admin` (`username`, `password`, `name`) VALUES
('admin', '$2y$10$wE8FkSj3c3pYQ7aP7V7Cdu7Hw4bA6iL71YkLp2Jc7Q5s4L7e1G0u2', 'Chief Examination Superintendent')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Students Table (All 4 Years)
CREATE TABLE IF NOT EXISTS `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `roll_no` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    INDEX `idx_year_branch` (`year`, `branch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Student Records for All 4 Years
INSERT INTO `students` (`roll_no`, `name`, `branch`, `year`) VALUES
-- 1st Year (2024 Batch)
('24CS01', 'Aarav Sharma', 'CSE', '1'), ('24CS02', 'Vivaan Verma', 'CSE', '1'), ('24CS03', 'Aditya Reddy', 'CSE', '1'),
('24CS04', 'Vihaan Patel', 'CSE', '1'), ('24CS05', 'Arjun Rao', 'CSE', '1'),
('24EC01', 'Sai Kumar', 'ECE', '1'), ('24EC02', 'Reyansh Singh', 'ECE', '1'), ('24EC03', 'Ayaan Nair', 'ECE', '1'),
('24EC04', 'Krishna Mishra', 'ECE', '1'), ('24EC05', 'Ishaan Gupta', 'ECE', '1'),
('24ME01', 'Diya Sharma', 'MECH', '1'), ('24ME02', 'Saanvi Verma', 'MECH', '1'), ('24ME03', 'Ananya Reddy', 'MECH', '1'),
-- 2nd Year (2023 Batch)
('23CS01', 'Aadhya Patel', 'CSE', '2'), ('23CS02', 'Pari Rao', 'CSE', '2'), ('23CS03', 'Isha Kumar', 'CSE', '2'),
('23CS04', 'Myra Singh', 'CSE', '2'), ('23CS05', 'Navya Nair', 'CSE', '2'),
('23EC01', 'Riya Mishra', 'ECE', '2'), ('23EC02', 'Kavya Gupta', 'ECE', '2'), ('23EC03', 'Aarav Reddy', 'ECE', '2'),
('23IT01', 'Vivaan Patel', 'IT', '2'), ('23IT02', 'Aditya Rao', 'IT', '2'),
-- 3rd Year (2022 Batch)
('22CS01', 'Vihaan Kumar', 'CSE', '3'), ('22CS02', 'Arjun Singh', 'CSE', '3'), ('22CS03', 'Sai Nair', 'CSE', '3'),
('22EC01', 'Reyansh Mishra', 'ECE', '3'), ('22EC02', 'Ayaan Gupta', 'ECE', '3'), ('22EC03', 'Krishna Sharma', 'ECE', '3'),
('22ME01', 'Ishaan Verma', 'MECH', '3'), ('22ME02', 'Diya Reddy', 'MECH', '3'),
-- 4th Year (2021 Batch)
('21CS01', 'Saanvi Patel', 'CSE', '4'), ('21CS02', 'Ananya Rao', 'CSE', '4'), ('21CS03', 'Aadhya Kumar', 'CSE', '4'),
('21EC01', 'Pari Singh', 'ECE', '4'), ('21EC02', 'Isha Nair', 'ECE', '4');

-- 3. Exams Table
CREATE TABLE IF NOT EXISTS `exams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year` VARCHAR(20) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `subject_code` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(150) NOT NULL,
    `exam_date` DATE NOT NULL,
    `session` VARCHAR(100) DEFAULT 'Morning (09:30 AM - 12:30 PM)',
    INDEX `idx_year_date` (`year`, `exam_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Exam Schedules for All 4 Years
INSERT INTO `exams` (`year`, `branch`, `subject_code`, `subject`, `exam_date`, `session`) VALUES
('1', 'CSE', 'MAT101', 'Linear Algebra & Calculus', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('1', 'ECE', 'MAT101', 'Linear Algebra & Calculus', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('1', 'MECH', 'PHY101', 'Engineering Physics', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('2', 'CSE', 'CS201', 'Data Structures & Algorithms', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('2', 'ECE', 'EC201', 'Digital Logic & Circuit Design', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('2', 'IT', 'IT201', 'Object Oriented Programming', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('3', 'CSE', 'CS301', 'Database Management Systems', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('3', 'ECE', 'EC301', 'Microprocessors & Controllers', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('3', 'MECH', 'ME301', 'Design of Machine Elements', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('4', 'CSE', 'CS401', 'Artificial Intelligence & Deep Learning', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)'),
('4', 'ECE', 'EC401', 'VLSI Design & Embedded Systems', '2026-10-15', 'Morning (09:30 AM - 12:30 PM)');

-- 4. Rooms Table
CREATE TABLE IF NOT EXISTS `rooms` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `room_no` VARCHAR(50) NOT NULL,
    `block` VARCHAR(100) DEFAULT 'Main Academic Block',
    `capacity` INT NOT NULL,
    `benches` INT DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Classrooms & Halls
INSERT INTO `rooms` (`room_no`, `block`, `capacity`, `benches`) VALUES
('Hall 101', 'Academic Block A', 40, 20),
('Hall 102', 'Academic Block A', 40, 20),
('Hall 201', 'Academic Block B', 30, 15),
('Hall 202', 'Academic Block B', 30, 15),
('Seminar Hall 1', 'Main Auditorium Block', 60, 30);

-- 5. Seating Output Table
CREATE TABLE IF NOT EXISTS `seating` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `room_no` VARCHAR(50) NOT NULL,
    `column_side` VARCHAR(50) NOT NULL,
    `group_name` VARCHAR(100) NOT NULL,
    `roll_range` VARCHAR(255) NOT NULL,
    `capacity` INT NOT NULL,
    `subject` VARCHAR(150),
    `exam_date` DATE,
    `session` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
