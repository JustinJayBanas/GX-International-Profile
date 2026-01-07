<?php
// Debug endpoint to check session status
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
header('Content-Type: application/json; charset=utf-8');

$response = [
    'session_id' => session_id(),
    'session_data' => $_SESSION,
    'user_id' => isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NOT SET',
    'cookies' => $_COOKIE,
    'post_data' => $_POST,
    'php_version' => phpversion(),
    'server' => [
        'HTTP_HOST' => $_SERVER['HTTP_HOST'] ?? 'N/A',
        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'N/A',
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>
