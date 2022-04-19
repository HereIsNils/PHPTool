<?php

// This file returns the correct update file 


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
        $updateFile = updateFromPG($args[1], $args[2]);
    }

    return $updateFile;
}

// looks if the id is found in any usergroup created on the website
// if so, return true 
function lookForPatcomid($id) {
    $userGroup = "0";
    $flag = false;

    return array($flag, $userGroup);
}

// get update file from userGroup
function updateFromUG($userGroup, $installedV, $downloadedV) {
    $updateFile = "0";

    return $updateFile;
}

//get update file from public group
function updateFromPG($installedV, $downloadedV) {
    $updateFile = "0";

    return $updateFile; 
}
?>