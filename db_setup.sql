-- Database and users table setup for GX International (run in phpMyAdmin or mysql)
CREATE DATABASE IF NOT EXISTS gx_international CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gx_international;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schedules (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  clinic_address TEXT NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  clinic_hours VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS places (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  clinic_address TEXT NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  clinic_hours VARCHAR(255) NOT NULL,
  location VARCHAR(255) DEFAULT 'ALBAY TOWNS',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- To create a user securely, generate a password hash using PHP's password_hash.
-- Example (run locally with PHP):
-- <?php
-- $hash = password_hash('YourPasswordHere', PASSWORD_DEFAULT);
-- echo $hash;
-- ?>
-- Then insert using SQL (replace <HASH> with the generated value):
-- INSERT INTO users (email, password_hash, name) VALUES ('demo@example.com', '<HASH>', 'Demo User');
