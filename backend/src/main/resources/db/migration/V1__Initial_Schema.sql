CREATE TABLE IF NOT EXISTS medicines (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    image VARCHAR(255),
    category VARCHAR(100),
    stock_count INT DEFAULT 0,
    in_stock BOOLEAN DEFAULT FALSE,
    reviews INT DEFAULT 0,
    rating DOUBLE DEFAULT 0.0,
    manufacturer VARCHAR(255),
    expiry_date DATE,
    batch_number VARCHAR(100),
    low_stock_threshold INT DEFAULT 10
);

CREATE TABLE IF NOT EXISTS billings (
    id VARCHAR(36) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_email VARCHAR(255),
    subtotal DOUBLE NOT NULL,
    tax DOUBLE NOT NULL,
    total_amount DOUBLE NOT NULL,
    status VARCHAR(50),
    created_at DATETIME
);

CREATE TABLE IF NOT EXISTS billing_items (
    billing_id VARCHAR(36),
    product_id VARCHAR(36),
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    FOREIGN KEY (billing_id) REFERENCES billings(id)
);
