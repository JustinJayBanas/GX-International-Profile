<?php
// Schedule management endpoint for XAMPP development.
// GET: action (list), POST: action (add/delete)
session_start();
header('Content-Type: application/json; charset=utf-8');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

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

$user_id = $_SESSION['user_id'];
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'list';

// list
// list
if ($action === 'list') {
    // Retrieve all schedules for this user
    $stmt = $conn->prepare('SELECT id, doctor_name, clinic_address, specialty, clinic_hours, location FROM schedules WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $schedules = [];
    while ($row = $result->fetch_assoc()) {
        $schedules[] = $row;
    }

    echo json_encode(['success' => true, 'schedules' => $schedules]);
    $stmt->close();

} elseif ($action === 'add') {
    $doctor_name   = isset($_POST['doctor_name']) ? trim($_POST['doctor_name']) : '';
    $clinic_address = isset($_POST['clinic_address']) ? trim($_POST['clinic_address']) : '';
    $specialty     = isset($_POST['specialty']) ? trim($_POST['specialty']) : '';
    $clinic_hours  = isset($_POST['clinic_hours']) ? trim($_POST['clinic_hours']) : '';
    $location      = isset($_POST['location']) ? trim($_POST['location']) : '';

    if (!$doctor_name || !$clinic_address || !$specialty || !$clinic_hours || !$location) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO schedules (user_id, doctor_name, clinic_address, specialty, clinic_hours, location) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->bind_param('isssss', $user_id, $doctor_name, $clinic_address, $specialty, $clinic_hours, $location);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Schedule added', 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add schedule']);
    }

    $stmt->close();

} elseif ($action === 'delete') {
    $schedule_id = isset($_POST['schedule_id']) ? intval($_POST['schedule_id']) : 0;

    if ($schedule_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid schedule ID']);
        exit;
    }

    // Verify the schedule belongs to this user
    $stmt = $conn->prepare('DELETE FROM schedules WHERE id = ? AND user_id = ?');
    $stmt->bind_param('ii', $schedule_id, $user_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Schedule deleted']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Schedule not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete schedule']);
    }

    $stmt->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

$conn->close();

?>
