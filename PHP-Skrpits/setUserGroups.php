<?php

// this script writes the json object sent by the website to the database

// our root dir, database dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";

// takes the json object sent from the website 
$obj = json_decode($_POST["userGroups"], flase);

try {
    // creates or overwrides file with data from the POST request
    $file = fopen($databasedir . "/userData.json", "w+", false, $obj);
    fclose($file);
} catch(Exception $e) {
    echo $e->getMessage();
    fclose($file);
}

exit();
?>