<?php
// Secret token to prevent unauthorized execution
define('EXTRACT_TOKEN', 'a688b139de88fc90ab1288cde813');

if (!isset($_GET['token']) || $_GET['token'] !== EXTRACT_TOKEN) {
    header('HTTP/1.0 403 Forbidden');
    echo "Access Denied";
    exit;
}

$zipFile = __DIR__ . '/release.zip';

if (!file_exists($zipFile)) {
    echo "Error: release.zip not found.";
    exit;
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    // Extract to the current folder (public_html/api)
    $zip->extractTo(__DIR__);
    $zip->close();
    
    // Delete the ZIP file after successful extraction
    unlink($zipFile);
    
    echo "SUCCESS: Extraction completed successfully.";
} else {
    header('HTTP/1.0 500 Internal Server Error');
    echo "ERROR: Failed to open release.zip.";
}
