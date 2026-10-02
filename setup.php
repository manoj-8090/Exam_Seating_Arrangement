<?php
/**
 * Automated Database Setup & Installer
 * Creates database, tables, and seeds initial data.
 */
require_once __DIR__ . '/config.php';

$message = '';
$status = 'info';

if ($_SERVER['REQUEST_METHOD'] === 'POST' || isset($_GET['auto'])) {
    try {
        // Connect to MySQL server without selecting database first
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, '', DB_PORT);
        if ($conn->connect_error) {
            throw new Exception("Connection to MySQL host failed: " . $conn->connect_error);
        }

        // Create database if not exists
        $dbName = DB_NAME;
        $sqlDb = "CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        if (!$conn->query($sqlDb)) {
            throw new Exception("Error creating database `$dbName`: " . $conn->error);
        }

        // Select the database
        $conn->select_db($dbName);

        // Read and execute database.sql
        $sqlFile = __DIR__ . '/database.sql';
        if (!file_exists($sqlFile)) {
            throw new Exception("database.sql file not found in project directory.");
        }

        $sqlContent = file_get_contents($sqlFile);
        
        // Remove comments and split statements
        $queries = explode(";\n", $sqlContent);
        foreach ($queries as $query) {
            $query = trim($query);
            if ($query !== '' && strpos($query, '--') !== 0) {
                // Execute individual query
                $conn->query($query);
            }
        }

        $message = "Database and tables created successfully! Sample data has been seeded.";
        $status = "success";
    } catch (Exception $e) {
        $message = $e->getMessage();
        $status = "error";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Database Setup | Exam Seating Arrangement</title>
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
    .setup-card {
      background: #fff;
      padding: 40px 50px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      text-align: center;
      max-width: 500px;
      width: 90%;
    }
    .setup-card h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 24px;
      text-transform: uppercase;
    }
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 15px;
      text-align: left;
    }
    .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .alert-info { background: #e2f0fb; color: #0c5460; border: 1px solid #bee5eb; }
    .btn {
      background: linear-gradient(135deg, #007bff, #0056d2);
      border: none;
      color: white;
      padding: 12px 28px;
      font-size: 16px;
      border-radius: 25px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin: 8px;
      transition: all 0.3s ease;
    }
    .btn:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: #6c757d;
    }
    .config-box {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      padding: 12px;
      border-radius: 8px;
      text-align: left;
      font-size: 13px;
      margin-bottom: 20px;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="setup-card">
    <h1>Database Setup</h1>

    <?php if ($message): ?>
      <div class="alert alert-<?php echo $status; ?>">
        <?php echo htmlspecialchars($message); ?>
      </div>
    <?php else: ?>
      <div class="alert alert-info">
        Click the button below to initialize the database and create all required tables.
      </div>
    <?php endif; ?>

    <div class="config-box">
      <strong>Active Database Settings:</strong><br>
      Host: <code><?php echo htmlspecialchars(DB_HOST); ?></code><br>
      Port: <code><?php echo htmlspecialchars((string)DB_PORT); ?></code><br>
      Database: <code><?php echo htmlspecialchars(DB_NAME); ?></code><br>
      User: <code><?php echo htmlspecialchars(DB_USER); ?></code>
    </div>

    <?php if ($status === 'success'): ?>
      <p style="color: #28a745; font-weight: bold;">Setup Complete!</p>
      <a href="exam_seating.php" class="btn">Proceed to Login</a>
      <a href="index.php" class="btn btn-secondary">Home</a>
    <?php else: ?>
      <form method="POST">
        <button type="submit" class="btn">Initialize Database Now</button>
      </form>
      <br>
      <a href="index.php" style="color: #666; font-size: 14px; text-decoration: none;">&larr; Back to Home</a>
    <?php endif; ?>
  </div>
</body>
</html>
