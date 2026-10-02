<?php
require_once __DIR__ . '/db.php';

// If already logged in, redirect straight to admin panel
if (!empty($_SESSION['admin_logged_in'])) {
    header("Location: admin.php");
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = "Please enter both username and password.";
    } else {
        // Query admin by username
        $stmt = $conn->prepare("SELECT id, username, password FROM admin WHERE username = ? LIMIT 1");
        if ($stmt) {
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $res = $stmt->get_result();

            if ($row = $res->fetch_assoc()) {
                // Verify hashed password or allow legacy plain-text match
                if (password_verify($password, $row['password']) || $password === $row['password']) {
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_username'] = $row['username'];
                    header("Location: admin.php");
                    exit;
                } else {
                    $error = "Username or password is incorrect";
                }
            } else {
                $error = "Username or password is incorrect";
            }
            $stmt->close();
        } else {
            $error = "Database query error: " . $conn->error;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | Exam Seating Arrangement</title>
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

    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px 16px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }

    .back-button svg {
      width: 18px;
      height: 18px;
      margin-right: 6px;
      fill: #333;
    }

    .back-button:hover {
      background: #fff;
      color: #000;
      transform: translateY(-2px);
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
      width: 340px;
      text-align: center;
    }

    .login-card h1 {
      margin-bottom: 25px;
      font-size: 1.8em;
      color: #333;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      text-align: left;
    }

    .login-form label {
      font-weight: 600;
      color: #555;
      font-size: 14px;
      margin-bottom: 4px;
      display: block;
    }

    .login-form input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
      outline: none;
      transition: border-color 0.3s;
    }

    .login-form input:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 25px;
      background: linear-gradient(135deg, #007bff, #0056d2);
      color: white;
      border: none;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      transition: all 0.2s;
      margin-top: 10px;
    }

    .login-btn:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: translateY(-2px);
    }

    .error-msg {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .setup-link {
      margin-top: 20px;
      font-size: 13px;
      color: #666;
    }

    .setup-link a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- Dynamic Back button to Home -->
  <a href="index.php" class="back-button">
    <svg viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
    Home
  </a>

  <div class="login-card">
    <h1>Admin Login</h1>

    <?php if ($error): ?>
      <div class="error-msg"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" class="login-form">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required autocomplete="username">
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required autocomplete="current-password">
      </div>

      <button type="submit" class="login-btn">Login</button>
    </form>

    <div class="setup-link">
      Need to set up the database? <a href="setup.php">Click here</a>
    </div>
  </div>

</body>
</html>
