<?php

// This file returns the correct update file 

// our root dir, database dir & log file
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir . "/connectbase";
$databasedir = $rootdir . "/database";
$publicdir = $rootdir . "/public";
$userGroupArray = json_decode(file_get_contents($databasedir . "/userData.json", true), true); // associative true so the json file gets returned as an associative array

// args[7]: 0:patcomid, 1:installedversion, 2:downloadedversion, 3:tutype, 4:tuserial, 5:tutable, 6:tufw, 7:tulic
function getUpdateFile($args)
{

    $updateFilePath = "";
    $iv = convertVersionToNum($args[1]);
    $dv = convertVersionToNum($args[2]);

    try {
        // get usergroup or use public
        $a = lookForPatcomid($args[0]);
        if ($a[0]) {
            // true
            $updateFilePath = buildPathUG($a[1], $iv, $dv);
        } else {
            // false -> public
            $updateFilePath = buildPathPublic($iv, $dv);
        }

        return $updateFilePath;
    } catch (Exception $e) {
        $error = 'console.error(' . $e . ')';
        echo "error";
        echo $error;
    }
}

// looks if the id is found in any usergroup created on the website
// if so, return true 
function lookForPatcomid($id)
{
    global $userGroupArray;
   
    $userGroup = "0";
    $flag = false;

    // iterates over every array in $userGroupArray
    foreach ($userGroupArray as $groups) {
        // iterates over every userGroup found in $userGroupArray
        foreach ($groups as $group) {
            // iterates over every value inside the current userGroup
            foreach ($group as $groupvalue) {
                if (gettype($groupvalue) == 'array') {
                    // iterates over every user inside the current userGroup
                    foreach ($groupvalue as $users) {
                        // searches for $id in users[] with strict comparison enabeled;
                        if (array_search($id, $users, true)) {
                            // iterates over every value of the userGroup the found user is in to get the name
                            foreach ($group as $key => $keyvalue) {
                                // sets userGroup name, flips the flag and breaks the foreach loops
                                if ($key == "name") {
                                    $userGroup = $keyvalue;
                                    $flag = true;
                                    break 5;
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

// returns the path to the update file for a given usergorup if neccessary by verison
function buildPathUG($userGroup, $installedV, $downloadedV)
{
    global $rootdir;
    $fullpath = buildPath($rootdir . '/' . $userGroup);
    $filename = basename($fullpath, ".kavoupdate");
    $version = convertVersionToNum($filename);

    // compare all versions and determine if update is neccessary
    if ($installedV >= $version || $downloadedV >= $version) {
        $fullpath = false;
    }

    return $fullpath;
}

// returns the path for the "public group" if neccessary by version
function buildPathPublic($installedV, $downloadedV)
{
    global $publicdir;
    $fullpath = buildPath($publicdir);
    $filename = basename($fullpath, ".kavoupdate");
    $version = convertVersionToNum($filename);

    // compare all versions and determine if update is neccessary
    if ($installedV >= $version || $downloadedV >= $version) {
        $fullpath = false;
    }

    return $fullpath;
}

// removes all dots and letters from a given update file or version number and returns a clean number to work with
function convertVersionToNum($arg)
{
    $replaced = str_ireplace(array(".", "KCbaseV"), '', $arg);
    $num = intval($replaced);
    return $num;
}

// builds the full path form given directory, returns path for highest version number in the directory
function buildPath($dir)
{
    $files = scandir($dir, 1);
    $fulldir = $dir . '/' . $files[0];
    return $fulldir;
}
