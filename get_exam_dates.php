<?php
/**
 * AJAX Endpoint: Fetch Exam Dates for a given Year
 */
require_once __DIR__ . '/db.php';

$year = trim($_GET['year'] ?? '');

echo "<option value=''>--Select Exam Date--</option>";

if ($year === '') {
    exit;
}

// Use prepared statement to prevent SQL Injection
$stmt = $conn->prepare("
    SELECT DISTINCT 
        exam_date, 
        DATE_FORMAT(exam_date, '%d-%m-%Y') AS formatted_date 
    FROM exams 
    WHERE year = ? 
    ORDER BY exam_date ASC
");

if ($stmt) {
    $stmt->bind_param("s", $year);
    $stmt->execute();
    $result = $stmt->get_result();

    $found = false;
    while ($row = $result->fetch_assoc()) {
        $found = true;
        $val = htmlspecialchars($row['exam_date']);
        $lbl = htmlspecialchars($row['formatted_date'] ?: $row['exam_date']);
        echo "<option value='{$val}'>{$lbl}</option>";
    }

    if (!$found) {
        echo "<option value='' disabled>No exams scheduled for this year</option>";
    }

    $stmt->close();
} else {
    echo "<option value='' disabled>Error loading dates</option>";
}
?>
