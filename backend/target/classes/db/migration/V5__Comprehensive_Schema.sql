-- COMPREHENSIVE SCHEMA UPDATE FOR PHARMACY SYSTEM (12 MODULES)

-- 1. Create New Tables
CREATE TABLE IF NOT EXISTS manufacturers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    license_number VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    address TEXT,
    date_of_birth DATE,
    total_purchases DOUBLE DEFAULT 0.0,
    loyalty_points INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tax_rates (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    percentage DOUBLE NOT NULL,
    applies_to VARCHAR(50) DEFAULT 'ALL',
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS pharmacy_settings (
    id INT PRIMARY KEY,
    pharmacy_name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    license_number VARCHAR(100),
    logo_url TEXT,
    currency_symbol VARCHAR(10) DEFAULT '₹',
    default_tax_id VARCHAR(36),
    low_stock_default_threshold INT DEFAULT 10,
    invoice_footer_note TEXT,
    updated_at DATETIME,
    updated_by VARCHAR(100),
    FOREIGN KEY (default_tax_id) REFERENCES tax_rates(id)
);

-- 2. Update Medicines Table (using individual ALTER statements with catch for existing columns)
-- Note: MySQL doesn't have IF NOT EXISTS for columns in ALTER TABLE without procedures, 
-- but Flyway can ignore errors if configured, or we can use a more robust way.
-- However, since this is a clean migrate from V4, these columns shouldn't exist.

ALTER TABLE medicines 
    ADD COLUMN generic_name VARCHAR(255),
    ADD COLUMN manufacturer_id VARCHAR(36),
    ADD COLUMN purchase_price DOUBLE DEFAULT 0.0,
    ADD COLUMN selling_price DOUBLE DEFAULT 0.0,
    ADD COLUMN stock_quantity INT DEFAULT 0,
    ADD COLUMN unit VARCHAR(50) DEFAULT 'Tablet',
    ADD COLUMN prescription_required BOOLEAN DEFAULT FALSE,
    ADD COLUMN created_at DATETIME,
    ADD COLUMN updated_at DATETIME;

-- Data Migration & Cleanup
UPDATE medicines SET stock_quantity = stock_count, selling_price = price, created_at = NOW();

ALTER TABLE medicines 
    DROP COLUMN stock_count,
    DROP COLUMN price,
    DROP COLUMN in_stock,
    DROP COLUMN reviews,
    DROP COLUMN rating,
    DROP COLUMN manufacturer;

-- 3. Invoices (fmr Billings)
RENAME TABLE billings TO invoices;

ALTER TABLE invoices 
    CHANGE COLUMN customer_name customer_id VARCHAR(36),
    CHANGE COLUMN tax tax_amount DOUBLE NOT NULL,
    CHANGE COLUMN status payment_status VARCHAR(50) DEFAULT 'PAID',
    ADD COLUMN invoice_number VARCHAR(50) UNIQUE,
    ADD COLUMN staff_id VARCHAR(36),
    ADD COLUMN discount_amount DOUBLE DEFAULT 0.0,
    ADD COLUMN payment_method VARCHAR(50) DEFAULT 'CASH';

-- 4. Invoice Items (fmr Billing Items)
RENAME TABLE billing_items TO invoice_items;

ALTER TABLE invoice_items 
    ADD COLUMN id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CHANGE COLUMN billing_id invoice_id VARCHAR(36),
    CHANGE COLUMN product_id medicine_id VARCHAR(36),
    CHANGE COLUMN product_name medicine_name VARCHAR(255),
    CHANGE COLUMN price unit_price DOUBLE NOT NULL,
    ADD COLUMN total_price DOUBLE NOT NULL;

-- 5. Remaining Tables
CREATE TABLE IF NOT EXISTS inventory_logs (
    id VARCHAR(36) PRIMARY KEY,
    medicine_id VARCHAR(36) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    quantity_changed INT NOT NULL,
    quantity_before INT NOT NULL,
    quantity_after INT NOT NULL,
    reference_id VARCHAR(100),
    notes TEXT,
    staff_id VARCHAR(36),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

CREATE TABLE IF NOT EXISTS returns (
    id VARCHAR(36) PRIMARY KEY,
    return_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_id VARCHAR(36) NOT NULL,
    medicine_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    reason TEXT,
    refund_amount DOUBLE NOT NULL,
    refund_method VARCHAR(50),
    status VARCHAR(50) DEFAULT 'PENDING',
    staff_id VARCHAR(36),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(36) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DOUBLE NOT NULL,
    description TEXT,
    reference_id VARCHAR(100),
    transaction_date DATETIME NOT NULL,
    staff_id VARCHAR(36),
    created_at DATETIME NOT NULL
);
