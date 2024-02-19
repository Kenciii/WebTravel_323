CREATE SCHEMA `dbtravel_323`;
USE `dbtravel_323`;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(500) NOT NULL,
    role NVARCHAR(20) NOT NULL,
    status NVARCHAR(15) NOT NULL
);

CREATE TABLE travels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(5000) NOT NULL,
    imageURL NVARCHAR(1500) NOT NULL
);

CREATE TABLE comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    comment NVARCHAR(1000) NOT NULL,
    travelsId INT,
    CONSTRAINT FK_CommentTravels FOREIGN KEY (travelsId) REFERENCES travels (id),
    userId INT,
    CONSTRAINT FK_CommentUser FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO users (username, password, role, status) VALUE('admin', 'admin', 'admin', 'aktivan');