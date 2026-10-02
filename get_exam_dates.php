<?php
include 'db.php';

$year = $_GET['year'];

// Fetch distinct exam dates for the selected year (formatted as dd-mm-yyyy)
$query = "
    SELECT DISTINCT 
        exam_date, 
        DATE_FORMAT(exam_date, '%d-%m-%Y') AS formatted_date 
    FROM exams 
    WHERE year = '$year' 
    ORDER BY exam_date
";

$result = $conn->query($query);

echo "<option value=''>--Select Exam Date--</option>";

while ($row = $result->fetch_assoc()) {
    // Use the real DB value in 'value' and formatted one as label
    echo "<option value='{$row['exam_date']}'>{$row['formatted_date']}</option>";
}
?>
