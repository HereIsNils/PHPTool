<?php

// recieves file from website and creates a directory (if nesseccary) or replaces a file

// root directory
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";

if(isset($_FILES['file']['name']) && isset($_REQUEST['dir'])){
   // file and direcory name
   $filename = $_FILES['file']['name'];
   $dir = $_REQUEST['dir'];

   // create directory if it does not exist already
   if(!file_exists($rootdir."/".$dir)) {
      mkdir($rootdir."/".$dir);
   }

    // location, either overrides file in existing dir or creates new dir
    $location = $rootdir."/".$dir."/".$filename;
    
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = "kavoupdate";
 
    // if multiple file exstenrsions have to be supported:
    // make $valid_ext an array and replace "if()" with in_array($file_extension, $file_ext)
    $response = 0;
    if($file_extension === $valid_ext){
       // Upload file
       if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          $response = 1;
       } 
    }
 
    echo $response;
    exit();
 }
 echo $_REQUEST['dir'];
 echo $response;
 ?>