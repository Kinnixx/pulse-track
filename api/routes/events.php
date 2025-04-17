<?php

$f3->route('POST /events', function($f3) use ($pdo) {
    require_once __DIR__ . '/../controllers/EventsController.php';
    EventsController::create($f3, $pdo);
});