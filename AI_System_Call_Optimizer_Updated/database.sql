
-- ALTER TABLE system_calls ADD COLUMN process_id INT NOT NULL AFTER call_name;


CREATE TABLE system_calls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    call_name VARCHAR(255),
    call_count INT,
    execution_time FLOAT,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
