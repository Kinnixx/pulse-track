<?php

class EventsController
{
    /**
     * Handles GET /events
     * Returns all events
     */    
    public static function getAll($pdo)
    {
        $stmt = $pdo->query("SELECT id, type, message, created_at FROM events ORDER BY created_at DESC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($events);
    }

    /**
     * Handles POST /events
     * Inserts a new event
     */
    public static function create($f3, $pdo)
    {
        $type = $f3->get('POST.type');
        $message = $f3->get('POST.message');

        if(!$type || !$message) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing type or message']);
            
            return;
        }

        $stmt = $pdo->prepare("INSERT INTO events(type,message) VALUES (:type, :message)");
        $stmt->execute([
            ':type' => $type,
            ':message' => $message
        ]);

        http_response_code(201);
        echo json_encode(['success' => true]);
    }
}