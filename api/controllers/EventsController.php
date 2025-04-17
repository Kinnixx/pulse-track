<?php

class EventsController
{
    /**
     * Handles POST /events
     * Inserts a new event into DB
     */
    public static function create($f3, $pdo)
    {
        $type = $f3->get('POST.type');
        $message = $f3->get('POST.message');

        if(!$type || $message) {
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