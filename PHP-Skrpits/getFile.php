<?php

// This file returns the correct update file 

// our root dir, database dir & log file
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$userGroupArray = json_decode(file_get_contents($databasedir . "/userGroup.json", true)); // associative true so the json file gets returned as an associative array

// args[7]: 0:patcomid, 1:installedversion, 2:downloadedversion, 3:tutype, 4:tuserial, 5:tutable, 6:tufw, 7:tulic
function getUpdateFile($args) {
    $updateFile = "0";

    // get usergroup or use public
    $a = lookForPatcomid($args[0]);
    if($a[0]) {
        // true
        $updateFile = updateFromUG($a[1], $args[1], $args[2]);
    } else {
        // false -> public
        $updateFile = updateFromPb($args[1], $args[2]);
    }

    return $updateFile;
}

// looks if the id is found in any usergroup created on the website
// if so, return true 
function lookForPatcomid($id) {
    global $userGroupArray;
    $userGroup = "0";
    $flag = false;

    foreach($userGroupArray as $groups) {
        foreach($groups as $group){
            foreach($group as $key => $groupvalue){
                if(gettype($groupvalue) == 'array') {
                    foreach($groupvalue as $users){
                        foreach($users as $key => $value){
                            if(array_search($id, $users)){
                                //get the usergroup name somehow
                            }
                            echo $key . ": " .  $value . "\n";
                        }
                    }
                } else {
                    echo $key . ": " . $groupvalue . "\n";
                }
            }
        }
    }

    //$key = array_search($id, array_column($userGroupArray, 'sn'));

    return array($flag, $userGroup);
}

// get update file from userGroup
function updateFromUG($userGroup, $installedV, $downloadedV) {
    $updateFile = "0";

    return $updateFile;
}

//get update file from public group
function updateFromPb($installedV, $downloadedV) {
    $updateFile = "0";

    return $updateFile; 
}
?>