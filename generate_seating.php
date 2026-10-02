<?php
include 'db.php';

$year = $_POST['year'];
$exam_date = $_POST['exam_date'];

// Clear previous seating
$conn->query("DELETE FROM seating");

// Fetch students of selected year ordered by branch and roll_no
$result = $conn->query("SELECT * FROM students WHERE year='$year' ORDER BY branch, roll_no");
$students = [];
while ($row = $result->fetch_assoc()) {
    $students[$row['branch']][] = $row['roll_no'];
}
$branches = array_keys($students);

// Fetch subjects for each branch on this exam date
$branch_subjects = [];
$res = $conn->query("SELECT branch, subject FROM exams WHERE year='$year' AND exam_date='$exam_date'");
while ($r = $res->fetch_assoc()) {
    $branch_subjects[$r['branch']] = $r['subject'];
}

// Fetch rooms for this year
$result = $conn->query("SELECT * FROM rooms WHERE year='$year' ORDER BY room_no");
$rooms = [];
while ($row = $result->fetch_assoc()) {
    $rooms[] = $row;
}

$seating = [];
$room_index = 0;

// Loop until all students are seated or rooms are full
while (!empty(array_filter($students)) && $room_index < count($rooms)) {
    $room = $rooms[$room_index];
    $half_capacity = floor($room['capacity'] / 2);

    // ----- LEFT SIDE -----
    $branchA = array_key_first(array_filter($students));
    $rollsA = array_splice($students[$branchA], 0, $half_capacity);
    $left_filled = false;

    if (!empty($rollsA)) {
        $seating[] = [
            'branch' => $branchA,
            'roll_range' => reset($rollsA) . '-' . end($rollsA),
            'room_no' => $room['room_no'],
            'capacity' => count($rollsA),
            'column_side' => 'Left'
        ];
        $left_filled = true;
    }

    // ----- RIGHT SIDE -----
    $subA = $branch_subjects[$branchA] ?? '';
    $branchB = null;

    foreach ($branches as $b) {
        if (!empty($students[$b]) && ($branch_subjects[$b] ?? '') != $subA && $b != $branchA) {
            $branchB = $b;
            break;
        }
    }

    $right_filled = false;
    if ($branchB) {
        $rollsB = array_splice($students[$branchB], 0, $half_capacity);
        if (!empty($rollsB)) {
            $seating[] = [
                'branch' => $branchB,
                'roll_range' => reset($rollsB) . '-' . end($rollsB),
                'room_no' => $room['room_no'],
                'capacity' => count($rollsB),
                'column_side' => 'Right'
            ];
            $right_filled = true;
        }
    }

    if (!$left_filled && !$right_filled) {
        $room_index++;
        continue;
    }

    $room_index++;
}

// Warn if students remain unseated
$remaining = [];
foreach ($students as $br => $rolls) {
    if (!empty($rolls)) $remaining[$br] = count($rolls);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Seating Generated</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #89f7fe, #66a6ff);
      text-align: center;
      padding: 40px;
    }

    h2 {
      color: #222;
      font-size: 26px;
      margin-bottom: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h3 {
      color: red;
      margin-bottom: 20px;
    }

    table {
      margin: 0 auto;
      background: #fff;
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      width: 80%;
      max-width: 900px;
    }

    th, td {
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }

    th {
      background: linear-gradient(135deg, #007bff, #0056d2);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    tr:hover {
      background-color: #f2f7ff;
    }

    tr:last-child td {
      border-bottom: none;
    }
    /* --- Back Button --- */
    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      background: rgba(255, 255, 255, 0.8);
      padding: 8px 14px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: background 0.3s, box-shadow 0.3s;
    }

    .back-button svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      fill: #333;
      transition: fill 0.2s;
    }
 .back-button:hover {
      background: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      color: #000;
    }

    .back-button:hover svg {
      fill: #000;
    }

    button {
      background: linear-gradient(135deg, #007bff, #0056d2);
      border: none;
      color: white;
      padding: 12px 35px;
      font-size: 16px;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 20px 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    button:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
    }

    footer {
      margin-top: 40px;
      color: #fff;
      opacity: 0.9;
      font-size: 14px;
    }

    footer span {
      font-weight: bold;
    }
  </style>
</head>
<body>
 <!-- Back button -->
  <a href="http://localhost/exam_seating/admin.php" class="back-button">
    <svg viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
    Back
  </a>

<?php
if (!empty($remaining)) {
    echo "<h3>⚠ Rooms are filled but some students remain unseated!</h3>";
    echo "<pre style='text-align:center; background:#fff; display:inline-block; padding:10px 20px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1);'>";
    print_r($remaining);
    echo "</pre>";
}

// Insert seating into DB
foreach ($seating as $s) {
    $conn->query("INSERT INTO seating (branch, roll_range, room_no, capacity, column_side)
        VALUES ('{$s['branch']}', '{$s['roll_range']}', '{$s['room_no']}', '{$s['capacity']}', '{$s['column_side']}')");
}
// Format the date as dd-mm-yyyy for display
$formatted_date = date("d-m-Y", strtotime($exam_date));
echo "<h2>Seating Generated for Year $year on $formatted_date</h2>";


$res = $conn->query("SELECT branch, roll_range, room_no, capacity, column_side 
                     FROM seating 
                     WHERE branch != '---'
                     ORDER BY branch, room_no, column_side");

echo "<table>
      <tr>
        <th>Branch</th>
        <th>Room No</th>
        <th>Roll Range</th>
        <th>No. of Students</th>
      </tr>";

while ($row = $res->fetch_assoc()) {
    echo "<tr>
        <td>{$row['branch']}</td>
        <td>{$row['room_no']}</td>
        <td>{$row['roll_range']}</td>
        <td>{$row['capacity']}</td>
    </tr>";
}

echo "</table>";

echo "<button onclick='window.print()'>Print Seating</button>";
echo "<button onclick=\"window.location='admin.php'\">Cancel</button>";
?>


</body>
</html>
