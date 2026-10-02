<?php
require_once __DIR__ . '/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome | Exam Seating Arrangement System</title>
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

    .card {
      background: #ffffff;
      padding: 50px 40px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      text-align: center;
      max-width: 480px;
      width: 90%;
      animation: fadeIn 0.8s ease-in-out;
    }

    h1 {
      color: #333;
      margin-bottom: 15px;
      font-size: 26px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }

    p.subtitle {
      color: #666;
      font-size: 15px;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }

    .main-btn {
      background: linear-gradient(135deg, #007bff, #0056d2);
      border: none;
      color: white;
      padding: 13px 36px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      text-decoration: none;
      display: inline-block;
      width: 80%;
      box-sizing: border-box;
    }

    .main-btn:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
    }

    .setup-btn {
      background: #6c757d;
      color: white;
      padding: 10px 25px;
      font-size: 14px;
      border-radius: 20px;
      text-decoration: none;
      transition: background 0.3s;
      display: inline-block;
    }

    .setup-btn:hover {
      background: #5a6268;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Exam Seating Arrangement System</h1>
    <p class="subtitle">Automated seating plan generator for examination centers and institutions.</p>
    
    <div class="btn-group">
      <?php if (!empty($_SESSION['admin_logged_in'])): ?>
        <a href="admin.php" class="main-btn">Go to Admin Dashboard</a>
        <a href="logout.php" style="color: #dc3545; font-size: 14px; text-decoration: none;">Logout</a>
      <?php else: ?>
        <a href="exam_seating.php" class="main-btn">Admin Login</a>
        <a href="setup.php" class="setup-btn">Database Setup & Installer</a>
      <?php endif; ?>
    </div>
  </div>
</body>
</html>
