<?php

// this script returns the json file as an object

// our root dir, database dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";

// takes the json object sent from the website
if(file_exists($databasedir . "/userData.json")){
    $obj = file_get_contents($databasedir . "/userData.json", flase);
    echo  $obj;
} else {
    $obj = null;
}


exit();
?>