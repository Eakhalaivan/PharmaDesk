CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    details TEXT,
    resource_id VARCHAR(100),
    timestamp DATETIME NOT NULL
);

-- Seed initial admin user (password: admin123)
-- BCrypt encoded: $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2
INSERT INTO users (id, username, password, role, full_name, is_active, created_at)
VALUES (UUID(), 'admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2', 'ADMIN', 'System Administrator', TRUE, NOW());
