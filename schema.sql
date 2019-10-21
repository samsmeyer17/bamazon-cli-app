DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
)

INSERT INTO products (product, department_name, price, stock_quantity)
VALUES ("bananas", "food", 2.5, 35),("call of duty", "electronics", 44.99, 10),("dyson vacuum cleaner", "household", 299.99, 30)