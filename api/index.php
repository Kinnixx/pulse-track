<?php 
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/');
$dotenv->load();

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = $_ENV['CORS_ORIGIN'];

if ($origin === $allowedOrigin) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';

// Load DB connection
$pdo = require 'config/database.php';

// Fat-Free instance
$f3 = \Base::instance();

// Routes
require 'routes/index.php';
require 'routes/events.php';

$f3->run();