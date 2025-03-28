<?php
$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if ($_FILES["file"]["error"] == 0) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        $conn = new mysqli("localhost", "root", "", "ai_system_calls");

        if ($conn->connect_error) {
            die("Database connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO system_calls (file_name, call_name, call_count, execution_time) VALUES (?, 'unknown', 0, 0)");
        $stmt->bind_param("s", $fileName);

        if ($stmt->execute()) {
            echo "File uploaded successfully and stored in database!";
        } else {
            echo "Database error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        echo "File upload failed!";
    }
} else {
    echo "No file selected or an error occurred!";
}
?>