<?php 

require 'vendor/autoload.php';

// Load DB connection
$pdo = require 'config/database.php';

// Fat-Free instance
$f3 = \Base::instance();

// Routes
require 'routes/index.php';
require 'routes/events.php';

$f3->run();