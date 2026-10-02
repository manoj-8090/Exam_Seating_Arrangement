<?php
require_once __DIR__ . '/db.php';

// Authentication check
if (empty($_SESSION['admin_logged_in'])) {
    header("Location: exam_seating.php");
    exit;
}

// Redirect back to admin if accessed directly without POST data
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST['year']) || empty($_POST['exam_date'])) {
    header("Location: admin.php");
    exit;
}

$year = trim($_POST['year']);
$exam_date = trim($_POST['exam_date']);

// Clear previous seating arrangement
$conn->query("DELETE FROM seating");

// Fetch students of selected year ordered by branch and roll_no using prepared statement
$stmtStudents = $conn->prepare("SELECT roll_no, branch FROM students WHERE year = ? ORDER BY branch ASC, roll_no ASC");
$stmtStudents->bind_param("s", $year);
$stmtStudents->execute();
$resStudents = $stmtStudents->get_result();

$students = [];
while ($row = $resStudents->fetch_assoc()) {
    $students[$row['branch']][] = $row['roll_no'];
}
$stmtStudents->close();
$branches = array_keys($students);

// Fetch subjects for each branch on this exam date
$stmtExams = $conn->prepare("SELECT branch, subject FROM exams WHERE year = ? AND exam_date = ?");
$stmtExams->bind_param("ss", $year, $exam_date);
$stmtExams->execute();
$resExams = $stmtExams->get_result();

$branch_subjects = [];
while ($r = $resExams->fetch_assoc()) {
    $branch_subjects[$r['branch']] = $r['subject'];
}
$stmtExams->close();

// Fetch rooms for this year
$stmtRooms = $conn->prepare("SELECT room_no, capacity FROM rooms WHERE year = ? ORDER BY room_no ASC");
$stmtRooms->bind_param("s", $year);
$stmtRooms->execute();
$resRooms = $stmtRooms->get_result();

$rooms = [];
while ($row = $resRooms->fetch_assoc()) {
    $rooms[] = $row;
}
$stmtRooms->close();

$seating = [];
$room_index = 0;
$no_students = empty(array_filter($students));
$no_rooms = empty($rooms);

if (!$no_students && !$no_rooms) {
    // Loop until all students are seated or rooms are full
    while (!empty(array_filter($students)) && $room_index < count($rooms)) {
        $room = $rooms[$room_index];
        $half_capacity = (int)floor($room['capacity'] / 2);
        if ($half_capacity < 1) $half_capacity = 1;

        // ----- LEFT SIDE -----
        $activeStudents = array_filter($students);
        $branchA = array_key_first($activeStudents);
        $rollsA = !empty($branchA) ? array_splice($students[$branchA], 0, $half_capacity) : [];
        $left_filled = false;

        if (!empty($rollsA)) {
            $seating[] = [
                'branch' => $branchA,
                'roll_range' => reset($rollsA) . ' - ' . end($rollsA),
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
            if (!empty($students[$b]) && ($branch_subjects[$b] ?? '') !== $subA && $b !== $branchA) {
                $branchB = $b;
                break;
            }
        }

        // If no alternate branch found, fill with remaining students from any branch
        if (!$branchB) {
            foreach ($branches as $b) {
                if (!empty($students[$b]) && $b !== $branchA) {
                    $branchB = $b;
                    break;
                }
            }
        }

        $right_filled = false;
        if ($branchB) {
            $rollsB = array_splice($students[$branchB], 0, $half_capacity);
            if (!empty($rollsB)) {
                $seating[] = [
                    'branch' => $branchB,
                    'roll_range' => reset($rollsB) . ' - ' . end($rollsB),
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
}

// Check if any students remain unseated
$remaining = [];
foreach ($students as $br => $rolls) {
    if (!empty($rolls)) {
        $remaining[$br] = count($rolls);
    }
}

// Insert generated seating into database using prepared statement
if (!empty($seating)) {
    $stmtInsert = $conn->prepare("INSERT INTO seating (branch, roll_range, room_no, capacity, column_side) VALUES (?, ?, ?, ?, ?)");
    foreach ($seating as $s) {
        $stmtInsert->bind_param("sssis", $s['branch'], $s['roll_range'], $s['room_no'], $s['capacity'], $s['column_side']);
        $stmtInsert->execute();
    }
    $stmtInsert->close();
}

$formatted_date = date("d-m-Y", strtotime($exam_date));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Seating Arrangement</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #89f7fe, #66a6ff);
      min-height: 100vh;
      text-align: center;
      padding: 40px 20px;
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
      background: #fff;
      border-radius: 16px;
      padding: 35px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    h2 {
      color: #222;
      font-size: 24px;
      margin-bottom: 25px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-badge {
      display: inline-block;
      background: #e9ecef;
      color: #495057;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .warning-box {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 25px;
      text-align: left;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      padding: 14px 18px;
      border-bottom: 1px solid #dee2e6;
      font-size: 15px;
      text-align: center;
    }

    th {
      background: linear-gradient(135deg, #007bff, #0056d2);
      color: white;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.5px;
    }

    tr:nth-child(even) {
      background-color: #f8f9fa;
    }

    tr:hover {
      background-color: #e9f2ff;
    }

    .side-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    .side-left { background: #e3f2fd; color: #0d47a1; }
    .side-right { background: #fce4ec; color: #880e4f; }

    .action-buttons {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 28px;
      font-size: 15px;
      border-radius: 25px;
      cursor: pointer;
      border: none;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary {
      background: linear-gradient(135deg, #007bff, #0056d2);
      color: white;
      box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 123, 255, 0.4);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }

    /* Print styling */
    @media print {
      body {
        background: #fff;
        padding: 0;
      }
      .container {
        box-shadow: none;
        border-radius: 0;
        padding: 0;
      }
      .action-buttons, .back-button {
        display: none !important;
      }
      th {
        background: #333 !important;
        color: #fff !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Examination Seating Arrangement</h2>
    <div class="meta-badge">
      Year: <?php echo htmlspecialchars($year); ?> | Date: <?php echo htmlspecialchars($formatted_date); ?>
    </div>

    <?php if ($no_students): ?>
      <div class="warning-box">
        <strong>Notice:</strong> No registered students found for Year <?php echo htmlspecialchars($year); ?>. Please add student data.
      </div>
    <?php elseif ($no_rooms): ?>
      <div class="warning-box">
        <strong>Notice:</strong> No examination rooms found for Year <?php echo htmlspecialchars($year); ?>. Please configure rooms.
      </div>
    <?php endif; ?>

    <?php if (!empty($remaining)): ?>
      <div class="warning-box">
        <strong>Warning:</strong> Available room capacity was insufficient for all students. Unseated counts:
        <ul style="margin: 8px 0 0 20px; padding: 0;">
          <?php foreach ($remaining as $br => $cnt): ?>
            <li>Branch <strong><?php echo htmlspecialchars($br); ?></strong>: <?php echo htmlspecialchars((string)$cnt); ?> student(s) unseated</li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <?php
    $resSeating = $conn->query("SELECT branch, roll_range, room_no, capacity, column_side FROM seating ORDER BY room_no ASC, column_side ASC");
    if ($resSeating && $resSeating->num_rows > 0):
    ?>
      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Side</th>
            <th>Branch</th>
            <th>Roll Range</th>
            <th>Students Count</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $resSeating->fetch_assoc()): ?>
            <tr>
              <td><strong><?php echo htmlspecialchars($row['room_no']); ?></strong></td>
              <td>
                <span class="side-badge <?php echo $row['column_side'] === 'Left' ? 'side-left' : 'side-right'; ?>">
                  <?php echo htmlspecialchars($row['column_side']); ?>
                </span>
              </td>
              <td><?php echo htmlspecialchars($row['branch']); ?></td>
              <td><?php echo htmlspecialchars($row['roll_range']); ?></td>
              <td><?php echo htmlspecialchars((string)$row['capacity']); ?></td>
            </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    <?php elseif (!$no_students && !$no_rooms): ?>
      <p>No seating arrangement could be generated. Please verify rooms and branch schedules.</p>
    <?php endif; ?>

    <div class="action-buttons">
      <button onclick="window.print()" class="btn btn-primary">Print Seating Plan</button>
      <a href="admin.php" class="btn btn-secondary">Back to Dashboard</a>
    </div>
  </div>

</body>
</html>
