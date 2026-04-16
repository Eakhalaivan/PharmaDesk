-- Seed demo users with BCrypt encoded 'password'
-- BCrypt hash for 'password': $2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.

INSERT INTO users (id, employee_id, password, role, full_name, is_active, created_at) 
VALUES 
    (UUID(), 'ADMIN001', '$2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.', 'ADMIN', 'Admin User', 1, NOW()),
    (UUID(), 'EMP001', '$2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.', 'EMPLOYEE', 'Employee User', 1, NOW()),
    (UUID(), 'EMP002', '$2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.', 'EMPLOYEE', 'Staff User', 1, NOW())
ON DUPLICATE KEY UPDATE 
    password = VALUES(password),
    role = VALUES(role),
    full_name = VALUES(full_name);
