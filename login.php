<?php
// Simple login endpoint for local XAMPP development.
// POST: email, password
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

session_start();
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'gx_international';

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

$stmt = $conn->prepare('SELECT id, password_hash, name FROM users WHERE email = ? LIMIT 1');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Query prepare failed']);
    exit;
}

$stmt->bind_param('s', $email);
$stmt->execute();
$id = $hash = $name = null;
$stmt->bind_result($id, $hash, $name);

if ($stmt->fetch()) {
    if (password_verify($password, $hash)) {
        // login ok
        session_regenerate_id(true);
        $_SESSION['user_id'] = $id;
        $_SESSION['user_name'] = $name;
        echo json_encode(['success' => true, 'message' => 'Login successful']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}

$stmt->close();
$conn->close();

?>
