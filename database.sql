-- ==========================================================
-- Exam Seating Arrangement System - Database Schema
-- Compatible with MySQL 5.7+ / MariaDB 10.2+
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `exam_seating` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `exam_seating`;

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS `admin` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin Account: username = admin, password = admin123
-- Stored with BCrypt hash for production security
INSERT INTO `admin` (`username`, `password`) VALUES
('admin', '$2y$10$wE8FkSj3c3pYQ7aP7V7Cdu7Hw4bA6iL71YkLp2Jc7Q5s4L7e1G0u2')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Students Table
CREATE TABLE IF NOT EXISTS `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `roll_no` VARCHAR(50) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    INDEX `idx_year_branch` (`year`, `branch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Student Records
INSERT INTO `students` (`roll_no`, `branch`, `year`) VALUES
('21CS01', 'CSE', '1'), ('21CS02', 'CSE', '1'), ('21CS03', 'CSE', '1'),
('21CS04', 'CSE', '1'), ('21CS05', 'CSE', '1'), ('21CS06', 'CSE', '1'),
('21CS07', 'CSE', '1'), ('21CS08', 'CSE', '1'), ('21CS09', 'CSE', '1'),
('21CS10', 'CSE', '1'),
('21EC01', 'ECE', '1'), ('21EC02', 'ECE', '1'), ('21EC03', 'ECE', '1'),
('21EC04', 'ECE', '1'), ('21EC05', 'ECE', '1'), ('21EC06', 'ECE', '1'),
('21EC07', 'ECE', '1'), ('21EC08', 'ECE', '1'), ('21EC09', 'ECE', '1'),
('21EC10', 'ECE', '1'),
('21ME01', 'MECH', '1'), ('21ME02', 'MECH', '1'), ('21ME03', 'MECH', '1'),
('21ME04', 'MECH', '1'), ('21ME05', 'MECH', '1'), ('21ME06', 'MECH', '1'),
('22CS01', 'CSE', '2'), ('22CS02', 'CSE', '2'), ('22CS03', 'CSE', '2'),
('22EC01', 'ECE', '2'), ('22EC02', 'ECE', '2'), ('22EC03', 'ECE', '2');

-- 3. Exams Table
CREATE TABLE IF NOT EXISTS `exams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year` VARCHAR(20) NOT NULL,
    `branch` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(100) NOT NULL,
    `exam_date` DATE NOT NULL,
    INDEX `idx_year_date` (`year`, `exam_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Exam Schedules
INSERT INTO `exams` (`year`, `branch`, `subject`, `exam_date`) VALUES
('1', 'CSE', 'Data Structures & Algorithms', '2026-10-15'),
('1', 'ECE', 'Digital Electronics', '2026-10-15'),
('1', 'MECH', 'Thermodynamics', '2026-10-15'),
('1', 'CSE', 'Discrete Mathematics', '2026-10-18'),
('1', 'ECE', 'Signals and Systems', '2026-10-18'),
('2', 'CSE', 'Operating Systems', '2026-10-20'),
('2', 'ECE', 'Microprocessors', '2026-10-20');

-- 4. Rooms Table
CREATE TABLE IF NOT EXISTS `rooms` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `room_no` VARCHAR(20) NOT NULL,
    `capacity` INT NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    INDEX `idx_room_year` (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Rooms
INSERT INTO `rooms` (`room_no`, `capacity`, `year`) VALUES
('LH-101', 30, '1'),
('LH-102', 30, '1'),
('LH-201', 20, '2');

-- 5. Seating Arrangement Output Table
CREATE TABLE IF NOT EXISTS `seating` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `branch` VARCHAR(50) NOT NULL,
    `roll_range` VARCHAR(255) NOT NULL,
    `room_no` VARCHAR(50) NOT NULL,
    `capacity` INT NOT NULL,
    `column_side` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
