
 CREATE DATABASE cleveroad;
 USE cleveroad;
 CREATE TABLE `clever_users` 
 (`id` INT NOT NULL AUTO_INCREMENT, 
 `phone` CHAR(12) NOT NULL UNIQUE, 
 `name` CHAR(25) NOT NULL, 
 `email` CHAR(50) NOT NULL UNIQUE, 
 `password` CHAR (30) NOT NULL,
 `token` CHAR (100),
 PRIMARY KEY(`id`));


!!!!!!!!optional
INSERT INTO clever_users (phone, name, email, password) VALUES ("+380xxxxxx", "Alex", "alex@gmail.com", "qweery");