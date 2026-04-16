-- Update demo user passwords with verified BCrypt hash
-- BCrypt hash for 'password': $2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.

UPDATE users 
SET password = '$2a$10$h.dl5TiVyzclnoElIFsiJu66nS6X7oJbV0SbuK.qG4R6zO.O5aVp.'
WHERE employee_id IN ('ADMIN001', 'EMP001', 'EMP002');
