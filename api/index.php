<?php 

// Allow CORS from localhost:4200 (Ember)
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';

// Load DB connection
$pdo = require 'config/database.php';

// Fat-Free instance
$f3 = \Base::instance();

// Routes
require 'routes/index.php';
require 'routes/events.php';

$f3->run();