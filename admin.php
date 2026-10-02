<?php
require_once __DIR__ . '/db.php';

// Protect Admin Panel: redirect to login if not authenticated
if (empty($_SESSION['admin_logged_in'])) {
    header("Location: exam_seating.php");
    exit;
}

// Fetch years that actually exist in the database (or default to 1, 2, 3, 4)
$yearsInDb = [];
$yrRes = $conn->query("SELECT DISTINCT year FROM exams ORDER BY year");
if ($yrRes) {
    while ($r = $yrRes->fetch_assoc()) {
        $yearsInDb[] = $r['year'];
    }
}
if (empty($yearsInDb)) {
    $yearsInDb = ['1', '2', '3', '4'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard | Exam Seating Arrangement</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #89f7fe, #66a6ff);
    }

    .nav-buttons {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      gap: 10px;
    }

    .top-button {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      color: #333;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px 16px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.3s;
    }

    .top-button:hover {
      background: #fff;
      color: #000;
      transform: translateY(-2px);
    }

    .top-button svg {
      width: 18px;
      height: 18px;
      margin-right: 6px;
      fill: #333;
    }

    .logout-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
    }

    .logout-btn:hover {
      background: #bd2130;
      color: white;
    }

    .center {
      background: #ffffff;
      padding: 40px 50px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      text-align: center;
      width: 400px;
      max-width: 90%;
      animation: fadeIn 0.6s ease-in-out;
    }

    h1 {
      color: #333;
      margin-bottom: 25px;
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    label {
      display: block;
      text-align: left;
      margin-bottom: 6px;
      font-weight: 600;
      color: #444;
      font-size: 14px;
    }

    select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 15px;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
      box-sizing: border-box;
      background-color: #fff;
    }

    select:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .submit-btn {
      background: linear-gradient(135deg, #007bff, #0056d2);
      border: none;
      color: white;
      padding: 12px 35px;
      font-size: 16px;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 100%;
    }

    .submit-btn:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: translateY(-2px);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>

  <script>
    // AJAX fetch exam dates dynamically
    function fetchExamDates(year) {
      var dateSelect = document.getElementById("exam_dates");
      if (year === "") {
        dateSelect.innerHTML = "<option value=''>--Select Exam Date--</option>";
        return;
      }

      dateSelect.innerHTML = "<option value=''>Loading dates...</option>";

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            dateSelect.innerHTML = this.responseText;
          } else {
            dateSelect.innerHTML = "<option value=''>Failed to load dates</option>";
          }
        }
      };
      xhr.open("GET", "get_exam_dates.php?year=" + encodeURIComponent(year), true);
      xhr.send();
    }
  </script>
</head>

<body>

  <div class="nav-buttons">
    <a href="index.php" class="top-button">
      <svg viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
      Home
    </a>
  </div>

  <a href="logout.php" class="top-button logout-btn">Logout</a>

  <div class="center">
    <h1>Generate Seating</h1>
    <form action="generate_seating.php" method="POST">
      
      <div class="form-group">
        <label for="year">Select Year:</label>
        <select name="year" id="year" onchange="fetchExamDates(this.value)" required>
          <option value="">--Select Year--</option>
          <?php foreach ($yearsInDb as $y): ?>
            <option value="<?php echo htmlspecialchars($y); ?>">
              <?php 
                if ($y == '1') echo "1st Year";
                elseif ($y == '2') echo "2nd Year";
                elseif ($y == '3') echo "3rd Year";
                elseif ($y == '4') echo "4th Year";
                else echo "Year " . htmlspecialchars($y);
              ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <div class="form-group">
        <label for="exam_dates">Select Exam Date:</label>
        <select name="exam_date" id="exam_dates" required>
          <option value="">--Select Exam Date--</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Generate Seating</button>
    </form>
  </div>

</body>
</html>
