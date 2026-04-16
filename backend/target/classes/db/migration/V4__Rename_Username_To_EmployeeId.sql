-- Rename username to employee_id in users table (MySQL 8.0+ syntax)
ALTER TABLE users RENAME COLUMN username TO employee_id;

-- Rename username to employee_id in audit_logs table (MySQL 8.0+ syntax)
ALTER TABLE audit_logs RENAME COLUMN username TO employee_id;

-- Clear old users for new seeding
DELETE FROM users;
