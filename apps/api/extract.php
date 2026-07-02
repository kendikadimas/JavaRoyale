<?php
// Secret token to prevent unauthorized execution
define('EXTRACT_TOKEN', 'a688b139de88fc90ab1288cde813');

if (!isset($_GET['token']) || $_GET['token'] !== EXTRACT_TOKEN) {
    header('HTTP/1.0 403 Forbidden');
    echo "Access Denied";
    exit;
}

if (!class_exists('ZipArchive')) {
    echo "ERROR: ZipArchive class is NOT enabled on this server. Please enable 'zip' extension in cPanel > Select PHP Version > Extensions.";
    exit;
}

$zipFile = __DIR__ . '/release.zip';

if (!file_exists($zipFile)) {
    echo "ERROR: release.zip not found in " . __DIR__;
    exit;
}

$zip = new ZipArchive;
$res = $zip->open($zipFile);
if ($res === TRUE) {
    if ($zip->extractTo(__DIR__)) {
        $zip->close();
        unlink($zipFile);
        echo "SUCCESS: Extraction completed successfully.";
    } else {
        echo "ERROR: Failed to extract files. Please check folder permissions.";
    }
} else {
    echo "ERROR: Failed to open release.zip. ZipArchive Error Code: " . $res;
}
