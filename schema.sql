DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE DATABASE employees_db;

CREATE TABLE employee (
    id int AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int AUTO_INCREMENT NOT NULL,
    tite VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);