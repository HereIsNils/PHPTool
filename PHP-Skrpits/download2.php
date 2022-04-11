<?php 

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


?>