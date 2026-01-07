<?php
// Simple registration endpoint for XAMPP development.
// POST: name, email, password, password_confirm
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

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

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$password_confirm = isset($_POST['password_confirm']) ? $_POST['password_confirm'] : '';

// Validation
if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

if ($password !== $password_confirm) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
    exit;
}

// Check if email already exists
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

$stmt->close();

// Hash password and insert user
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Query prepare failed']);
    exit;
}

$stmt->bind_param('sss', $email, $hash, $name);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created successfully. Please log in.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$conn->close();

?>
