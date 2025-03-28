CREATE DATABASE syscall_db;
USE syscall_db;

CREATE TABLE syscall_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);