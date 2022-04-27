<?php

// this script returns the json file as an object

// our root dir, database dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";

// takes the json object sent from the website
try {
    $file = fopen($databasedir . "/userData.json", "r");
    $data = fread($file, filesize($databasedir . "/userData.json"));
    echo $data;
    fclose($file);
} catch(Error $e) {
    $error = 'console.log('.$e.')';
    echo "error:", $error;
    echo null;
}
exit();
?>