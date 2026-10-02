<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome | Exam Seating Arrangement</title>
  <link rel="stylesheet" href="style.css">
  <style>
    /* Page background */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #89f7fe, #66a6ff);
    }

    /* Card-style container */
    .center {
      background: #ffffff;
      padding: 50px 70px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .center:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    /* Heading */
    h1 {
      color: #333;
      margin-bottom: 30px;
      font-size: 28px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Button styling */
    button {
      background: linear-gradient(135deg, #007bff, #0056d2);
      border: none;
      color: white;
      padding: 12px 35px;
      font-size: 16px;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    button:hover {
      background: linear-gradient(135deg, #0056d2, #0041a8);
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
    }

    /* Footer (optional for college project look) */
    footer {
      position: absolute;
      bottom: 20px;
      text-align: center;
      width: 100%;
      color: #fff;
      font-size: 14px;
      opacity: 0.9;
    }

    footer span {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="center">
  <h1>Welcome to Exam Seating Arrangement</h1>
  <a href="exam_seating.php"><button>Admin Login</button></a>
  
</div>



</body>
</html>
