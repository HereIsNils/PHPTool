<?php 

// manages the request from the unit and returns correct vlaue
// this can either be a file or nothing if a newer or the same version is already downloaded or/and installed

//TODO
//UserGruppe finden (wenn nichts gefunden wird -> public version)
// Versionsnummer überprüfen (wenn < wie downloaded -> public < downloaded -> return 0)
// wenn nicht public Version max downloads überprüfen
// Updatedatei zurückgeben
// ggf. Downloads der UserGroup erhöhen

// our root dir, database dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$databasedir = $rootdir."/database";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";

// hide notices
@ini_set('error_reporting', E_ALL & ~ E_NOTICE);

//- turn off compression on the server
//@apache_setenv('no-gzip', 1);
@ini_set('zlib.output_compression', 'Off');

function getParameter( $name )
{
    $returnvalue = "0";
    if (isset($_GET[ $name]))
	$returnvalue = $_GET[ $name ];
    
    return $returnvalue;
}

// return ip adress
function getUserIpAddr(){
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        //ip from share internet
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
        //ip pass from proxy
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    }elseif(!empty($_SERVER["REMOTE_ADDR"])){
        $ip = $_SERVER["REMOTE_ADDR"];
    }
    return $ip;
}


// get currently installed version from request parameter string
// if not found -> default version is 0
$patcomid = getParameter( "id" );
$installedversion = getParameter("fw");
$downloadedversion = getParameter("dlfw");
$tutype = getParameter("tutype" );
$tuserial = getParameter("tuid" );
$tutable = getParameter("tutable" );
$tufw = getParameter("tufw" );
$tulic = getParameter("tulic" );
// array with all parameters
$parameters = array($patcomid, $installedversion, $downloadedversion, $tutype, $tuserial, $tutable, $tufw, $tulic);
// some IoT log :-) 
$datetime = date("Y-m-d H:i:s");
$userIp = getUserIpAddr();

// get the file from getFile.php
include "getFile.php";
// if $updateFile is false, no update is neccessary beacause newer version is already installed or downloaded
$updateFile = getUpdateFile($parameters);

if(!$updateFile){
    // just log the request
    $logstring = sprintf("%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;noDL:%s".PHP_EOL, $datetime, $userIp, $patcomid, $installedversion, $downloadedversion, $tutype, $tuserial, $tutable, $tufw, $tulic, $version);
    file_put_contents($logfile, $logstring, FILE_APPEND);
    die();
} else {
    // prepare and send the file

    
}

exit()
?>