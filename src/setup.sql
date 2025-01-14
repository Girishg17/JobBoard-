create database if not exists job_portal;

use job_portal;

CREATE TABLE IF NOT exists jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    jobType VARCHAR(100) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    requirements TEXT NOT NULL,
    datePosted DATETIME DEFAULT CURRENT_TIMESTAMP
);
