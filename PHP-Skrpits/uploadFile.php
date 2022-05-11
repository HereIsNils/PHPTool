<?php

// recieves file from website and creates a directory (if nesseccary) or replaces a file

// root directory
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";

if(isset($_FILES['file']['name'])){
    // file name
    $filename = $_FILES['file']['name'];
 
    // location, either overrides file in existing dir or creates new dir
    
    
 
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
 
    $response = 0;
    if(in_array($file_extension,$valid_ext)){
       // Upload file
       if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          $response = 1;
       } 
    }
 
    echo $response;
    exit();
 }
 ?>