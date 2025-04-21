<?php

require_once __DIR__ . '/../helpers/formatDate.php';

class EventsController
{
    /**
     * Handles GET /events
     * Returns all events
     * 
     * @param PDO $pdo The database connection
     * @return void Outputs a JSON array of events
     */    
    public static function getAll($pdo)
    {
        $stmt = $pdo->query("SELECT id, type, message, created_at FROM events ORDER BY created_at DESC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format each event's created_at to ISO 8601
        foreach ($events as &$event) {
            $event['created_at'] = formatDateToISO8601($event['created_at']);
        }
        unset($event); // prevent accidental reference reuse


        header('Content-Type: application/json');
        echo json_encode($events);
    }

    /**
     * Retrieves a single event by its ID
     *
     * @param int $id The event's ID
     * @param PDO $pdo The database connection
     * @return array|null The event as an associative array if found, or null
     */
    public static function findById($id, $pdo)
    {
        if(!$id || !is_numeric($id)) {
            return null;
        }        

        $stmt = $pdo->prepare("SELECT id, type, message, created_at FROM events WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);     
    }

    /**
     * Handles POST /events
     * Inserts a new event into the database
     *
     * @param \Base $f3 The Fat-Free Framework instance
     * @param PDO $pdo The database connection
     * @return void Outputs a JSON message indicating success or failure
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

    /**
     * Handles DELETE /event/@id
     * Deletes an event by its ID if it exists
     *
     * @param \Base $f3 The Fat-Free Framework instance
     * @param PDO $pdo The database connection
     * @return void Outputs a JSON message indicating success or failure
     */
    public static function delete($f3, $pdo) 
    {
        $id = $f3->get('PARAMS.id');
        $event = self::findById($id, $pdo);

        if(!$event) {
            http_response_code(400);
            echo json_encode(['error' => 'Event not found']);
            return;
        }

        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->execute([':id' => $id]);

        http_response_code(200);
        echo json_encode(['success' => true, 'deleted_id' => $id]);
    }
}