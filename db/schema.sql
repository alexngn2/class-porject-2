DROP DATABASE IF EXISTS stocks_db;
CREATE DATABASE stocks_db;
USE stocks_db;
CREATE TABLE user_data (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(75) NOT NULL,
    email VARCHAR(85) NOT NULL,
    password VARCHAR(28) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE stocks_wishlist (
  id INT NOT NULL AUTO_INCREMENT,
  stock_symbol VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user_data (id)
);
