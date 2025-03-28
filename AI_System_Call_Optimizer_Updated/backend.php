<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "ai_system_calls");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    file_put_contents("syscall_logs.txt", $data);

    // Python script ko execute karna
    $python_output = shell_exec("python3 analyze.py syscall_logs.txt");
    $response = json_decode($python_output, true);

    if (!empty($response["calls"])) {
        foreach ($response["calls"] as $index => $call) {
            $count = $response["counts"][$index];
            $execution_time = $response["times"][$index];

            // Data ko database me insert karna
            $stmt = $conn->prepare("INSERT INTO system_calls (call_name, call_count, execution_time) VALUES (?, ?, ?)");
            $stmt->bind_param("sii", $call, $count, $execution_time);
            $stmt->execute();
        }
    }

    echo json_encode(["message" => "Data saved successfully", "data" => $response]);
}
?>
