<?php

// this script writes the json object sent by the website to the database

// our root dir, database dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";

// takes the json object sent from the website 

try {
    $obj = file_get_contents('php://input');
    // creates or overwrides file with data from the POST request
    $file = fopen($databasedir . "/userData.json", "w+");
    fwrite($file, $obj);
    fclose($file);
    $js_code = 'console.log('.json_encode($obj, JSON_PRETTY_PRINT).')';
    echo $js_code;
} catch(Exception $e) {
    $error = 'console.log('.$e.')';
    echo "error";
    echo $error;
    fclose($file);
}

exit();
?>