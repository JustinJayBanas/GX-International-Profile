<?php
// Helper to create a user (local/dev only). Usage:
// http://localhost/GX%20International/create_user.php?email=demo%40example.com&pass=secret&name=Demo

// WARNING: leave this file out of production. It's provided to assist local setup.

$host = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'gx_international';

$email = isset($_GET['email']) ? $_GET['email'] : '';
$pass = isset($_GET['pass']) ? $_GET['pass'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';

if (!$email || !$pass) {
    echo 'Provide email and pass in query string';
    exit;
}

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) die('DB connection failed');

$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $conn->prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $email, $hash, $name);
if ($stmt->execute()) {
    echo 'User created: ' . htmlspecialchars($email);
} else {
    echo 'Error: ' . $stmt->error;
}

$stmt->close();
$conn->close();

?>
