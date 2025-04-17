<?php

require_once __DIR__ . '/../controllers/EventsController.php';

$f3->route('GET /events', function($f3) use ($pdo) {
    EventsController::getAll($pdo);
});

$f3->route('POST /events', function($f3) use ($pdo) {
    EventsController::create($f3, $pdo);
});