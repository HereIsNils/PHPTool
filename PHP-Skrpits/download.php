<?php 

// Diese Datei bereitet die Daten die von der Einheit kommen auf und gibt sie an users.php weiter
// Dann wird auf die Update Datei gewartet und an die Einheit zurück gegeben

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

include "update.php";
$updateFile = getUpdateFile($parameters);

exit()
?>