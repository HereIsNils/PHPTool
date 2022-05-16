<?php

// deletes given directory 

// root directory
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir . "/connectbase";


if (isset($_REQUEST['dir'])) {
    // builds the directory to delete
    $dir = $rootdir . "/" . $_REQUEST['dir'];

    // deletes all files in directory since a directory can not be deleted if it contains any files
    delete_files($dir);
}

function delete_files($target)
{
    $response = 0;
    if (is_dir($target)) {
        $files = glob($target . '*', GLOB_MARK); //GLOB_MARK adds a slash to directories returned

        foreach ($files as $file) {
            delete_files($file);
        }

        if (rmdir($target)) {
            $response = 1;
            echo $response;
            exit();
        } else {
            echo $response;
        };
    } elseif (is_file($target)) {
        unlink($target);
    }
}
exit();
