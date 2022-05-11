<?php 

// manages the request from the unit and returns correct vlaue
// this can either be a file or nothing if a newer or the same version is already downloaded or/and installed

//TODO
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
}

$filename = basename($updateFile);
if (file_exists($updateFile)) 
		{
				header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
				header("Cache-Control: public"); // needed for internet explorer
				// set the headers, prevent caching
				header("Pragma: public");
				header("Expires: -1");
				header("Cache-Control: public, must-revalidate, post-check=0, pre-check=0");
				
				header("Content-Type: application/octet-stream");
				header("Content-Transfer-Encoding: Binary");
				header("Content-Disposition: attachment; filename=".$filename);
				//header("Content-Length:".filesize($fullfilename));
				
				//check if http_range is sent by browser (or download manager)
				$file_size  = filesize($updateFile);
				if(isset($_SERVER['HTTP_RANGE']))
				{
					list($size_unit, $range_orig) = explode('=', $_SERVER['HTTP_RANGE'], 2);
					if ($size_unit == 'bytes')
					{
						//multiple ranges could be specified at the same time, but for simplicity only serve the first range
						//http://tools.ietf.org/id/draft-ietf-http-range-retrieval-00.txt
						list($range, $extra_ranges) = explode(',', $range_orig, 2);
					}
					else
					{
						$range = '';
						header('HTTP/1.1 416 Requested Range Not Satisfiable');
						exit;
					}
				}
				else
				{
					$range = '';
				}
				
				//figure out download piece from range (if set)
				list($seek_start, $seek_end) = explode('-', $range, 2);

				//set start and end based on range (if set), else set defaults
				//also check for invalid ranges.
				$seek_end   = (empty($seek_end)) ? ($file_size - 1) : min(abs(intval($seek_end)),($file_size - 1));
				$seek_start = (empty($seek_start) || $seek_end < abs(intval($seek_start))) ? 0 : max(abs(intval($seek_start)),0);
			 
				//Only send partial content header if downloading a piece of the file (IE workaround)
				if ($seek_start > 0 || $seek_end < ($file_size - 1))
				{
					header('HTTP/1.1 206 Partial Content');
					header('Content-Range: bytes '.$seek_start.'-'.$seek_end.'/'.$file_size);
					header('Content-Length: '.($seek_end - $seek_start + 1));
				}
				else
				  header("Content-Length:".filesize($updateFile));
		
				header('Accept-Ranges: bytes');				
		
			$logstring = sprintf("%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s".PHP_EOL, $datetime, $userIp, $patcomid, $installedversion, $downloadedversion, $tutype, $tuserial, $tutable, $tufw, $tulic, $filename);
			file_put_contents($logfile, $logstring, FILE_APPEND); 
			//readfile($fullfilename); // use loop instead of pure readfile because of large files
			
			set_time_limit(0);
			$file = @fopen($updateFile,"rb");
			fseek($file, 0);
			
			while(!feof($file)) 
			{
				print(@fread($file, 1024*8));
				ob_flush();
				flush();
				if (connection_status()!=0) 
				{
					@fclose($file);
					exit;
				}			
			}
			// file save was a success
			@fclose($file);
			
			exit();
		}
exit();
?>