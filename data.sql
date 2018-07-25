DROP DATABASE IF EXISTS my_store;

CREATE DATABASE my_store;

USE my_store;

CREATE TABLE products(
item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30) NOT NULL,
price INTEGER (10),
Stock_quantity INTEGER (10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("guitar","instruments", 300, 5);

select*from products;