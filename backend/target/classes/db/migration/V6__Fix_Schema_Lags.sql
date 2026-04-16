-- Fix for missing 'id' column in invoice_items and other potential schema gaps

-- 1. Ensure id column exists in invoice_items
SET @dbname = DATABASE();
SET @tablename = 'invoice_items';
SET @columnname = 'id';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = @dbname
     AND TABLE_NAME = @tablename
     AND COLUMN_NAME = @columnname) > 0,
  'SELECT 1',
  'ALTER TABLE invoice_items ADD COLUMN id BIGINT PRIMARY KEY AUTO_INCREMENT'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. Ensure total_price exists in invoice_items
SET @columnname = 'total_price';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = @dbname
     AND TABLE_NAME = @tablename
     AND COLUMN_NAME = @columnname) > 0,
  'SELECT 1',
  'ALTER TABLE invoice_items ADD COLUMN total_price DOUBLE NOT NULL'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. Update total_price data if it was just added
UPDATE invoice_items SET total_price = quantity * unit_price WHERE total_price = 0 OR total_price IS NULL;
