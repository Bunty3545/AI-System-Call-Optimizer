<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "syscall_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    $syscalls = explode("\n", trim($data));
    $callCounts = array_count_values($syscalls);

    $stmt = $conn->prepare("INSERT INTO syscall_logs (log_text) VALUES (?)");
    $stmt->bind_param("s", $data);
    $stmt->execute();
    
    $response = [
        "message" => "Analysis Complete!",
        "calls" => array_keys($callCounts),
        "counts" => array_values($callCounts)
    ];
    
    echo json_encode($response);
}
?>