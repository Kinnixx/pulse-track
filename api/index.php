<?php 

// Allow CORS from localhost:4200 (Ember)
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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