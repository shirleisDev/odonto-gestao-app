<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

if (empty($body['nome']) || empty($body['whatsapp'])) {
    http_response_code(400);
    echo json_encode(['error' => 'nome and whatsapp are required']);
    exit;
}

try {
    $client     = new MongoDB\Client($_ENV['MONGODB_URI']);
    $collection = $client->{$_ENV['MONGODB_DB']}->{$_ENV['MONGODB_COLLECTION']};

    $result = $collection->insertOne([
        'nome'      => $body['nome'],
        'whatsapp'  => $body['whatsapp'],
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
    ]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'id'      => (string) $result->getInsertedId(),
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
