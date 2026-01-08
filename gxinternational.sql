-- PostgreSQL Migration Script for Render
-- Database: gx_international
-- Generated: 2026-01-07

BEGIN;

-- 1. Create Users Table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(255) NOT NULL UNIQUE,
  "password_hash" varchar(255) NOT NULL,
  "name" varchar(255) DEFAULT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Places Table
CREATE TABLE "places" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "doctor_name" varchar(255) NOT NULL,
  "clinic_address" text NOT NULL,
  "specialty" varchar(255) NOT NULL,
  "clinic_hours" varchar(255) NOT NULL,
  "location" varchar(255) DEFAULT 'ALBAY TOWNS',
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "places_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

-- 3. Create Schedules Table
CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "doctor_name" varchar(255) NOT NULL,
  "clinic_address" text NOT NULL,
  "specialty" varchar(255) NOT NULL,
  "clinic_hours" varchar(255) NOT NULL,
  "location" varchar(100) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

-- 4. Insert Data into Users
INSERT INTO "users" ("id", "email", "password_hash", "name", "created_at") VALUES
(1, 'ghanel@gmail.com', '$2y$10$rhjOSfbLYKu/Wbp5m..n7eBexfULe13bDVoHtSLD6ArTsvmS1ZuQK', 'Ghanel', '2026-01-07 02:44:20'),
(2, 'bianca@gmail.com', '$2y$10$k3OMRlB//r9CvFyvX.TKFuVSq7r1DCJH.YMZotRnC8syzqaPPuXbi', 'bianca', '2026-01-07 03:16:48');

-- 5. Insert Data into Places
INSERT INTO "places" ("id", "user_id", "doctor_name", "clinic_address", "specialty", "clinic_hours", "location", "created_at") VALUES
(1, 1, 'example', 'example', 'example', 'dsaw', 'ALBAY TOWNS', '2026-01-07 05:05:06'),
(2, 1, 'dsadw', 'GOLEKOH', 'dsawdsa', 'dsawd', 'TABACO', '2026-01-07 05:45:23'),
(3, 1, 'sample', 'CAMLIG RHU', 'samplee', 'samplee', 'ALBAY TOWNS', '2026-01-07 06:04:04'),
(4, 1, 'd', 'TABACO CHO', 's', 'M 4-12', 'TABACO', '2026-01-07 06:38:20'),
(5, 1, 'Hello', 'HEALTHLINE', 'HI', 'M 9-12', 'CATANDUANES', '2026-01-07 06:57:04'),
(6, 1, 'dasw', 'TUPLANO CLINIC', 'dawd', 'M 9-12', 'CATANDUANES', '2026-01-07 07:16:11'),
(7, 1, 'sample', 'CENTRAL LINK', 'sample', 'M-T 7-12', 'LEGAZPI', '2026-01-07 08:07:04');

-- 6. Insert Data into Schedules
INSERT INTO "schedules" ("id", "user_id", "doctor_name", "clinic_address", "specialty", "clinic_hours", "location", "created_at") VALUES
(2, 1, 'dasw', 'TUPLANO CLINIC', 'dawd', 'M 9-12', 'CATANDUANES', '2026-01-07 07:16:11'),
(3, 1, 'sample', 'CENTRAL LINK', 'sample', 'M-T 7-12', 'LEGAZPI', '2026-01-07 08:07:04');

-- 7. Reset Serial Sequences (Crucial for Postgres after manual ID inserts)
SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"));
SELECT setval('places_id_seq', (SELECT MAX(id) FROM "places"));
SELECT setval('schedules_id_seq', (SELECT MAX(id) FROM "schedules"));

COMMIT;