<?php

// This file returns the correct update file 

// our root dir, database dir & log file
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir . "/connectbase";
$databasedir = $rootdir . "/database";
$userGroupArray = json_decode(file_get_contents($databasedir . "/userGroup.json", true)); // associative true so the json file gets returned as an associative array

// args[7]: 0:patcomid, 1:installedversion, 2:downloadedversion, 3:tutype, 4:tuserial, 5:tutable, 6:tufw, 7:tulic
function getUpdateFile($args)
{
    $updateFile = "0";

    // get usergroup or use public
    $a = lookForPatcomid($args[0]);
    if ($a[0]) {
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
function lookForPatcomid($id)
{
    global $userGroupArray;
    $userGroup = "0";
    $flag = false;

    // loops over every array in $userGroupArray
    foreach ($userGroupArray as $groups) {
        // loops over every userGroup found in $userGroupArray
        foreach ($groups as $group) {
            // loops over every value inside the current userGroup
            foreach ($group as $groupvalue) {
                if (gettype($groupvalue) == 'array') {
                    // loops over every user inside the current userGroup
                    foreach ($groupvalue as $users) {
                        // loops over every value inside the user
                        foreach ($users as $value) {
                            if (array_search($id, $users)) {
                                // loops over every value of the userGroup the found user is in to get the name
                                foreach ($group as $key => $keyvalue) {
                                    // sets userGroup name, flips the flag and breaks the foreach loops
                                    if ($key == "name") {
                                        $userGroup = $keyvalue;
                                        $flag = true;
                                        break 6;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return array($flag, $userGroup);
}

// get update file from userGroup
function updateFromUG($userGroup, $installedV, $downloadedV)
{
    $updateFile = "0";

    return $updateFile;
}

//get update file from public group
function updateFromPb($installedV, $downloadedV)
{
    $updateFile = "0";

    return $updateFile;
}
