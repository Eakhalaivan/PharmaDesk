-- Remove legacy 'tax' column which causes 'Field tax doesn't have a default value'

SET @dbname = DATABASE();
SET @tablename = 'invoices';
SET @columnname = 'tax';

SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = @dbname
     AND TABLE_NAME = @tablename
     AND COLUMN_NAME = @columnname) > 0,
  'ALTER TABLE invoices DROP COLUMN tax',
  'SELECT 1'
));

PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
