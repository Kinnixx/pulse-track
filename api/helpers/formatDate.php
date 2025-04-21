<?php

/**
 * Format a MySQL datetime string into ISO 8601 in UTC.
 *
 * @param string $dateString
 * @return string
 */
function formatDateToISO8601(string $dateString): string {
    $dt = new \DateTime($dateString, new \DateTimeZone('UTC'));
    return $dt->format(\DateTime::ATOM); // ISO 8601
}
