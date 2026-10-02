<?php
/**
 * Database Connection Handler
 * Supports local and production environments with graceful setup detection.
 */
require_once __DIR__ . '/config.php';

// Suppress default fatal warning so we can handle gracefully
mysqli_report(MYSQLI_REPORT_OFF);

$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

if ($conn->connect_error) {
    // If the database does not exist yet, suggest running setup.php
    $errorMsg = $conn->connect_error;
    $isMissingDb = (strpos($errorMsg, 'Unknown database') !== false || $conn->connect_errno == 1049);

    if ($isMissingDb && basename($_SERVER['PHP_SELF']) !== 'setup.php') {
        echo "<div style='font-family:Segoe UI, sans-serif; max-width:550px; margin:50px auto; padding:25px; border:1px solid #f5c6cb; background:#f8d7da; border-radius:12px; text-align:center;'>";
        echo "<h2 style='color:#721c24; margin-top:0;'>Database Not Found</h2>";
        echo "<p style='color:#491217;'>Database <code>" . htmlspecialchars(DB_NAME) . "</code> has not been created yet.</p>";
        echo "<a href='setup.php' style='display:inline-block; padding:10px 20px; background:#007bff; color:#fff; text-decoration:none; border-radius:20px; font-weight:bold;'>Run One-Click Setup</a>";
        echo "</div>";
        exit;
    }

    die("Database Connection Error: " . htmlspecialchars($errorMsg) . "<br><small>Check your database credentials in config.php or your environment variables.</small>");
}

// Set proper charset for UTF-8 compatibility
$conn->set_charset("utf8mb4");
?>
