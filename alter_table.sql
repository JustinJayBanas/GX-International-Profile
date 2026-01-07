-- Add location column to places table if it doesn't exist
-- Run this in phpMyAdmin if the places table already exists without location column

ALTER TABLE places ADD COLUMN location VARCHAR(255) DEFAULT 'ALBAY TOWNS' AFTER clinic_hours;

-- Verify the column was added by checking the table structure
-- DESCRIBE places;
