<?php 

require 'vendor/autoload.php';

$pdo = require 'config/database.php';
$f3 = \Base::instance();

// Routes
require 'routes/index.php';
require 'routes/events.php';

$f3->run();