<?php
// Places management endpoint for XAMPP development.
// GET: action=list, POST: action=add/delete
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not logged in - session missing']);
    exit;
}

$host = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'gx_international';

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    error_log('Database connection error: ' . $conn->connect_error);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'list';

if ($action === 'list') {
    $stmt = $conn->prepare('SELECT id, doctor_name, clinic_address, specialty, clinic_hours, location FROM places WHERE user_id = ? ORDER BY location ASC, created_at DESC');
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Query prepare failed: ' . $conn->error]);
        error_log('List prepare failed: ' . $conn->error);
        exit;
    }
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $places = [];
    while ($row = $result->fetch_assoc()) {
        $places[] = $row;
    }

    echo json_encode(['success' => true, 'places' => $places]);
    $stmt->close();

} elseif ($action === 'add') {
    $doctor_name   = isset($_POST['doctor_name']) ? trim($_POST['doctor_name']) : '';
    $clinic_address = isset($_POST['clinic_address']) ? trim($_POST['clinic_address']) : '';
    $specialty     = isset($_POST['specialty']) ? trim($_POST['specialty']) : '';
    $clinic_hours  = isset($_POST['clinic_hours']) ? trim($_POST['clinic_hours']) : '';
    $location      = isset($_POST['location']) ? trim($_POST['location']) : '';

    if (!$doctor_name || !$clinic_address || !$specialty || !$clinic_hours || !$location) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        error_log('Missing fields - doctor_name: ' . $doctor_name . ', clinic_address: ' . $clinic_address . ', specialty: ' . $specialty . ', clinic_hours: ' . $clinic_hours . ', location: ' . $location);
        exit;
    }

    // Insert into places
    $stmt = $conn->prepare('INSERT INTO places (user_id, doctor_name, clinic_address, specialty, clinic_hours, location) VALUES (?, ?, ?, ?, ?, ?)');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        error_log('Prepare failed: ' . $conn->error);
        exit;
    }

    $stmt->bind_param('isssss', $user_id, $doctor_name, $clinic_address, $specialty, $clinic_hours, $location);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;

        // Mirror into schedules (with location)
        $sched = $conn->prepare('INSERT INTO schedules (user_id, doctor_name, clinic_address, specialty, clinic_hours, location) VALUES (?, ?, ?, ?, ?, ?)');
        if ($sched) {
            $sched->bind_param('isssss', $user_id, $doctor_name, $clinic_address, $specialty, $clinic_hours, $location);
            $sched->execute();
            $sched->close();
        }

        echo json_encode(['success' => true, 'message' => 'Place added', 'id' => $newId]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
        error_log('Execute failed: ' . $stmt->error);
    }

    $stmt->close();

} elseif ($action === 'delete') {
    $place_id = isset($_POST['place_id']) ? intval($_POST['place_id']) : 0;

    if ($place_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid place ID']);
        exit;
    }

    $stmt = $conn->prepare('DELETE FROM places WHERE id = ? AND user_id = ?');
    $stmt->bind_param('ii', $place_id, $user_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Place deleted']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Place not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete place']);
    }

    $stmt->close();
// Add this logic to your switch/if-else block in places.php
} elseif ($action === 'update') {
    $place_id = isset($_POST['place_id']) ? intval($_POST['place_id']) : 0;
    $doctor_name = isset($_POST['doctor_name']) ? trim($_POST['doctor_name']) : '';
    $clinic_address = isset($_POST['clinic_address']) ? trim($_POST['clinic_address']) : '';
    $specialty = isset($_POST['specialty']) ? trim($_POST['specialty']) : '';
    $clinic_hours = isset($_POST['clinic_hours']) ? trim($_POST['clinic_hours']) : '';
    $location = isset($_POST['location']) ? trim($_POST['location']) : '';

    if ($place_id > 0 && $doctor_name && $clinic_address) {
        $stmt = $conn->prepare('UPDATE places SET doctor_name=?, clinic_address=?, specialty=?, clinic_hours=?, location=? WHERE id=? AND user_id=?');
        $stmt->bind_param('sssssii', $doctor_name, $clinic_address, $specialty, $clinic_hours, $location, $place_id, $user_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Place updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields for update']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

$conn->close();

?>