DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id DECIMAL(10,2) NOT NULL,
    dep_id INT NOT NULL,
    manager_id INTEGER(11) NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Developer", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id,dep_id, manager_id)
VALUES ("Chase", "Lipscomb", 197,1, 198)