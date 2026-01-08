-- 1. Create Tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "name" varchar(255) DEFAULT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "places" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "doctor_name" varchar(255) NOT NULL,
  "clinic_address" text NOT NULL,
  "specialty" varchar(255) NOT NULL,
  "clinic_hours" varchar(255) NOT NULL,
  "location" varchar(255) DEFAULT 'ALBAY TOWNS',
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "places_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "doctor_name" varchar(255) NOT NULL,
  "clinic_address" text NOT NULL,
  "specialty" varchar(255) NOT NULL,
  "clinic_hours" varchar(255) NOT NULL,
  "location" varchar(100) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "schedules_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- 2. Insert Data (Users)
INSERT INTO "users" ("id", "email", "password_hash", "name", "created_at") VALUES
(1, 'ghanel@gmail.com', '$2y$10$rhjOSfbLYKu/Wbp5m..n7eBexfULe13bDVoHtSLD6ArTsvmS1ZuQK', 'Ghanel', '2026-01-07 02:44:20'),
(2, 'bianca@gmail.com', '$2y$10$k3OMRlB//r9CvFyvX.TKFuVSq7r1DCJH.YMZotRnC8syzqaPPuXbi', 'bianca', '2026-01-07 03:16:48');

-- 3. Insert Data (Places)
INSERT INTO "places" ("id", "user_id", "doctor_name", "clinic_address", "specialty", "clinic_hours", "location", "created_at") VALUES
(1, 1, 'example', 'example', 'example', 'dsaw', 'ALBAY TOWNS', '2026-01-07 05:05:06'),
(2, 1, 'dsadw', 'GOLEKOH', 'dsawdsa', 'dsawd', 'TABACO', '2026-01-07 05:45:23'),
(3, 1, 'sample', 'CAMLIG RHU', 'samplee', 'samplee', 'ALBAY TOWNS', '2026-01-07 06:04:04'),
(4, 1, 'd', 'TABACO CHO', 's', 'M 4-12', 'TABACO', '2026-01-07 06:38:20'),
(5, 1, 'Hello', 'HEALTHLINE', 'HI', 'M 9-12', 'CATANDUANES', '2026-01-07 06:57:04'),
(6, 1, 'dasw', 'TUPLANO CLINIC', 'dawd', 'M 9-12', 'CATANDUANES', '2026-01-07 07:16:11'),
(7, 1, 'sample', 'CENTRAL LINK', 'sample', 'M-T 7-12', 'LEGAZPI', '2026-01-07 08:07:04');

-- 4. Insert Data (Schedules)
INSERT INTO "schedules" ("id", "user_id", "doctor_name", "clinic_address", "specialty", "clinic_hours", "location", "created_at") VALUES
(2, 1, 'dasw', 'TUPLANO CLINIC', 'dawd', 'M 9-12', 'CATANDUANES', '2026-01-07 07:16:11'),
(3, 1, 'sample', 'CENTRAL LINK', 'sample', 'M-T 7-12', 'LEGAZPI', '2026-01-07 08:07:04');

-- 5. Reset Sequences (Required for SERIAL columns after manual ID inserts)
SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1)) FROM users;
SELECT setval(pg_get_serial_sequence('places', 'id'), coalesce(max(id), 1)) FROM places;
SELECT setval(pg_get_serial_sequence('schedules', 'id'), coalesce(max(id), 1)) FROM schedules;